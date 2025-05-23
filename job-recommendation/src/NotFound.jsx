import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-2">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="mt-4 text-blue-500 underline">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
