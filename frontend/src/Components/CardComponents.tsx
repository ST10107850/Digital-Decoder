import { Link } from 'react-router-dom';

const CardComponents = ({ images, title = "", description = "" }: CardProps) => {
  const displayDescription = description || "No description available"; // Fallback to a default value
  return (
    <div className="max-w-sm mx-auto hover:shadow-lg transition-shadow duration">
      <div className="relative">
        <img
          src={images} // Use default logo if image is missing
          alt="Card Logo"
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {title.length > 50 ? `${title.substring(0, 50)}...` : title}
        </h2>
        <p className="text-gray-600 text-sm">
          {displayDescription.length > 100
            ? `${displayDescription.substring(0, 100)}...`
            : displayDescription}
        </p>
        
        {/* Read More link */}
        {/* <Link to={`/blog/${_id}`} className="inline-block mt-3 text-blue-500 hover:underline text-sm font-medium">
          Read More
        </Link> */}

        <hr className="mt-4 bg-orange-100 h-2" />
      </div>
    </div>
  );
};

export default CardComponents;
