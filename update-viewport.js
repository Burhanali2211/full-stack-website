const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

// Counter for tracking modified files
let modifiedCount = 0;

async function updateViewportInFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    
    // Only process files that export metadata but don't have viewport export
    if (content.includes('export const metadata') && !content.includes('export const viewport')) {
      // Check if the file imports from metadata.ts
      const hasMetadataImport = content.includes("from '@/app/metadata'") || content.includes('from "./metadata"');
      
      let updatedContent;
      
      if (hasMetadataImport) {
        // If already importing from metadata.ts, update to include defaultViewport
        if (content.includes('import { defaultMetadata }')) {
          updatedContent = content.replace(
            'import { defaultMetadata }',
            'import { defaultMetadata, defaultViewport }'
          );
        } else if (content.includes('defaultMetadata')) {
          // Handle other import patterns with defaultMetadata
          const importPattern = /import\s+\{([^}]*)\}\s+from\s+['"]([^'"]*metadata[^'"]*)['"]/;
          const importMatch = content.match(importPattern);
          
          if (importMatch) {
            const imports = importMatch[1].split(',').map(i => i.trim());
            if (!imports.includes('defaultViewport')) {
              imports.push('defaultViewport');
              const newImport = `import { ${imports.join(', ')} } from '${importMatch[2]}'`;
              updatedContent = content.replace(importPattern, newImport);
            } else {
              return; // defaultViewport already imported
            }
          } else {
            // If we can't reliably update the import, add a new import
            updatedContent = content.replace(
              /import/,
              `import { defaultViewport } from '@/app/metadata';\nimport`
            );
          }
        } else {
          // No existing metadata import, add a new import
          updatedContent = content.replace(
            /import/,
            `import { defaultViewport } from '@/app/metadata';\nimport`
          );
        }
      } else {
        // Add new import for defaultViewport
        updatedContent = content.replace(
          /import/,
          `import { defaultViewport } from '@/app/metadata';\nimport`
        );
      }
      
      // Add viewport export after metadata export if not already there
      if (updatedContent && !updatedContent.includes('export const viewport')) {
        updatedContent = updatedContent.replace(
          /export const metadata[^;]+;/s,
          (match) => `${match}\n\nexport const viewport = defaultViewport;`
        );
      }
      
      if (updatedContent && updatedContent !== content) {
        await writeFile(filePath, updatedContent, 'utf8');
        console.log(`Updated: ${filePath}`);
        modifiedCount++;
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

async function findAndUpdateFiles(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and .next directories
        if (entry.name !== 'node_modules' && entry.name !== '.next') {
          await findAndUpdateFiles(fullPath);
        }
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        // Only process page.tsx files and layout.tsx files
        if (entry.name === 'page.tsx' || entry.name === 'layout.tsx' || 
            (entry.name.includes('page') && fullPath.includes('app'))) {
          await updateViewportInFile(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

// Start updating files from the app directory
async function main() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  await findAndUpdateFiles(appDir);
  console.log(`Updated ${modifiedCount} files with viewport export.`);
}

main().catch(console.error); 