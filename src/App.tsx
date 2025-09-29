export default function App() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-3">
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Users
          </a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">
            Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Welcome, Admin</h2>
          <button className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">
            Logout
          </button>
        </header>

        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Dashboard Overview</h3>
          <p className="text-gray-600">This is a simple admin panel layout.</p>
        </section>
      </main>
    </div>
  );
}
