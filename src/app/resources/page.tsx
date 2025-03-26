export default function ResourcesPage() {
  const resources = [
    { name: 'MDN Web Docs', link: 'https://developer.mozilla.org/', description: 'Comprehensive resource for web developers, with documentation and tutorials.' },
    { name: 'Python.org', link: 'https://www.python.org/', description: 'Official Python website with documentation, downloads, and community resources.' },
    { name: 'React', link: 'https://reactjs.org/', description: 'Official React documentation and resources for building user interfaces.' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Learning Resources</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {resources.map(resource => (
          <div key={resource.name} className="card bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-foreground mb-2">{resource.name}</h2>
            <p className="text-muted-foreground mb-4">{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-accent">Visit</a>
          </div>
        ))}
      </div>
    </div>
  );
} 