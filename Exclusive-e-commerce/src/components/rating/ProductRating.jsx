import { FaStar } from "react-icons/fa6";
import { IoIosStarHalf } from "react-icons/io";
import { FaRegStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
const ProductRating = ({ rating }) => {
  const fullRating = Math.floor(rating) || 0;
  const hasDecimal = rating % 1 > 0; // ✅ যেকোনো decimal থাকলে true
  const halfRating = hasDecimal && rating % 1 < 1; // ✅ decimal আছে কিনা check
  const emptyRating = 5 - fullRating - (halfRating ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullRating)].map((_, index) => (
        <FaStar key={`full-${index}`} className="text-amber-500" />
      ))}
      
      {halfRating && (
        <FaRegStarHalfStroke key="half" className="text-amber-500" />
      )}
      
      {[...Array(emptyRating)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-gray-300" />
      ))}
    </div>
  );
};
export default ProductRating;
