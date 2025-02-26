export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page Not Found</p>
      <a href="/" className="text-blue-500">
        <button className="py-2 px-4 bg-white text-black rounded-md mt-4 font-bold hover:bg-gray-200">
          Go back to home
        </button>
      </a>
    </div>
  );
}
