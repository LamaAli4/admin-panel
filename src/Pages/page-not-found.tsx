export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
      >
        Back to Dashboard
      </a>
    </div>
  );
}
