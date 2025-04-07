# Function to remove empty directories recursively
function Remove-EmptyDirectories {
    param (
        [string]$Path
    )
    
    $directories = Get-ChildItem -Path $Path -Directory -Recurse | Where-Object { 
        (Get-ChildItem -Path $_.FullName -Recurse -File).Count -eq 0 
    }
    
    foreach ($dir in $directories) {
        Write-Host "Removing empty directory: $($dir.FullName)"
        Remove-Item -Path $dir.FullName -Force -Recurse
    }
}

# Function to find duplicate files
function Find-DuplicateFiles {
    param (
        [string]$Path
    )
    
    $files = Get-ChildItem -Path $Path -File -Recurse
    $hashTable = @{}
    
    foreach ($file in $files) {
        $hash = Get-FileHash -Path $file.FullName -Algorithm MD5
        if ($hashTable.ContainsKey($hash.Hash)) {
            Write-Host "Duplicate found:"
            Write-Host "Original: $($hashTable[$hash.Hash])"
            Write-Host "Duplicate: $($file.FullName)"
            Write-Host "---"
        } else {
            $hashTable[$hash.Hash] = $file.FullName
        }
    }
}

# Function to find unused files
function Find-UnusedFiles {
    param (
        [string]$Path
    )
    
    # Get all TypeScript and JavaScript files
    $tsFiles = Get-ChildItem -Path $Path -Filter "*.ts" -Recurse
    $jsFiles = Get-ChildItem -Path $Path -Filter "*.js" -Recurse
    $allFiles = $tsFiles + $jsFiles
    
    # Get all imports from files
    $imports = $allFiles | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        [regex]::Matches($content, "import.*from\s+['""]([^'""]+)['""]") | ForEach-Object {
            $_.Groups[1].Value
        }
    }
    
    # Find files that are not imported
    $unusedFiles = $allFiles | Where-Object {
        $fileName = $_.Name
        $filePath = $_.FullName
        -not ($imports -contains $fileName -or $imports -contains $filePath)
    }
    
    return $unusedFiles
}

# Function to remove auth-related directories
function Remove-AuthDirectories {
    param (
        [string]$Path
    )
    
    $authDirs = @(
        "src/app/auth",
        "src/app/dashboard",
        "src/app/profile",
        "src/app/settings",
        "src/app/bookmarks",
        "src/app/api/auth",
        "src/app/api/user",
        "src/app/api/profile",
        "src/components/auth",
        "src/components/user",
        "src/components/profile",
        "src/components/settings",
        "src/lib/auth",
        "src/types/auth",
        "src/types/user",
        "src/types/profile",
        "src/hooks/auth",
        "src/hooks/user",
        "src/contexts/auth",
        "src/contexts/user"
    )
    
    foreach ($dir in $authDirs) {
        $fullPath = Join-Path $Path $dir
        if (Test-Path $fullPath) {
            Write-Host "Removing auth-related directory: $fullPath"
            Remove-Item -Path $fullPath -Force -Recurse
        }
    }
}

# Function to remove duplicate help directories
function Remove-DuplicateHelpDirs {
    param (
        [string]$Path
    )
    
    $helpDirs = @(
        "src/app/help",
        "src/app/help-support"
    )
    
    foreach ($dir in $helpDirs) {
        $fullPath = Join-Path $Path $dir
        if (Test-Path $fullPath) {
            Write-Host "Removing duplicate help directory: $fullPath"
            Remove-Item -Path $fullPath -Force -Recurse
        }
    }
}

# Main execution
$projectPath = "D:\educational-platform"

Write-Host "Cleaning up project directory: $projectPath"
Write-Host "----------------------------------------"

# Remove auth-related directories
Write-Host "`nRemoving auth-related directories..."
Remove-AuthDirectories -Path $projectPath

# Remove duplicate help directories
Write-Host "`nRemoving duplicate help directories..."
Remove-DuplicateHelpDirs -Path $projectPath

# Remove empty directories
Write-Host "`nRemoving empty directories..."
Remove-EmptyDirectories -Path $projectPath

# Find duplicate files
Write-Host "`nFinding duplicate files..."
Find-DuplicateFiles -Path $projectPath

# Find unused files
Write-Host "`nFinding unused files..."
$unusedFiles = Find-UnusedFiles -Path $projectPath
if ($unusedFiles) {
    Write-Host "Found unused files:"
    $unusedFiles | ForEach-Object {
        Write-Host $_.FullName
    }
} else {
    Write-Host "No unused files found."
}

Write-Host "`nCleanup completed!" 