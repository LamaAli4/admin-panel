export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="absolute top-5 left-5 text-2xl font-bold">LOGO</div>

      <h1 className="text-3xl font-bold mb-3">Sorry, page not found!</h1>

      <p className="text-gray-600 max-w-md text-center">
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </p>

      <img
        src="/public/assets/image.png"
        alt="404"
        className="w-80 h-auto my-10"
      />

      <a
        href="/"
        className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
      >
        Go to home
      </a>
    </div>
  );
}
