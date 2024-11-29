import { formatDistanceToNow } from 'date-fns';

const CardComponents = ({
  images,
  title = "",
  description = "",
  postedDate,
  updatedDate
}: CardProps) => {
  const displayDescription = description || "No description available";

  const isValidDate = (date: string) => !isNaN(new Date(date).getTime());

  const formattedDate = isValidDate(postedDate)
    ? formatDistanceToNow(new Date(postedDate), { addSuffix: true })
    : "Unknown date";

  const formattedUpdatedDate = isValidDate(updatedDate)
    ? formatDistanceToNow(new Date(updatedDate), { addSuffix: true })
    : "Unknown date";

  return (
    <div className="max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300 h-full relative">
      <div className="relative">
        <img
          src={images} // Use default logo if image is missing
          alt="Card Logo"
          className="w-full h-48 object-cover"
        />
        {/* Display the posted date at the top-right */}
        <p className="absolute top-2 right-2 text-white text-xs bg-gray-700 p-1 rounded-lg">
          {formattedDate}
        </p>
      </div>
      <div className="p-4 flex flex-col h-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 h-12 overflow-hidden text-ellipsis">
          {title.length > 50 ? `${title.substring(0, 50)}...` : title}
        </h2>
        <p className="text-gray-600 text-sm mb-2 h-20 overflow-hidden text-ellipsis">
          {displayDescription.length > 100
            ? `${displayDescription.substring(0, 100)}...`
            : displayDescription}
        </p>

        <p className="text-gray-500 text-xs">Last Updated: {formattedUpdatedDate}</p>

        <hr className="mt-4 bg-[#b0764d] h-2" />
      </div>
    </div>
  );
};

export default CardComponents;