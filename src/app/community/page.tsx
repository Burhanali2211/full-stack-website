export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Join Our Community</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Share your projects, ask questions, and connect with other learners!
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Project Showcase</h2>
          <p>Check out what others are building and get inspired!</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Discussion Forum</h2>
          <p>Join the conversation and get help from the community.</p>
        </div>
      </div>
    </div>
  );
} 