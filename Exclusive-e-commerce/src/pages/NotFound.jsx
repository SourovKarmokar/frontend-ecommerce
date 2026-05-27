import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="py-16 md:py-24 text-center font-poppins">
      <h1 className="font-inter font-medium text-5xl md:text-7xl lg:text-8xl text-primary mb-6">
        404 Not Found
      </h1>
      <p className="text-gray-500 text-sm md:text-base mb-10">
        Your visited page not found. You may go home page.
      </p>
      <Link
        to="/"
        className="inline-block bg-secondary hover:bg-red-600 text-white font-medium px-12 py-4 rounded transition-colors"
      >
        Back to home page
      </Link>
    </div>
  );
};

export default NotFound;
