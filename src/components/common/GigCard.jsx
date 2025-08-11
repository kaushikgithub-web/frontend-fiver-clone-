import { Link } from 'react-router-dom';
import { Star, Heart, Clock, User } from 'lucide-react';

const GigCard = ({ gig }) => {
  const seller = gig.seller || {};
  const avatar = seller.avatar || '/default-avatar.png';
  const sellerName = seller.name || 'Unknown Seller';
  const sellerLevel = seller.level || 'Beginner';

  return (
    <div className="gig-card group bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
      {/* Gig Image */}
      <div className="relative overflow-hidden">
        <img
          src={gig.image || '/default-gig.jpg'}
          alt={gig.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
          <Heart size={16} className="text-gray-600 hover:text-error-500 transition-colors" />
        </button>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="badge badge-success text-xs font-semibold">
            {gig.category || 'Category'}
          </span>
        </div>
      </div>

      {/* Gig Details */}
      <div className="p-6">
        {/* Seller Info */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={avatar}
            alt="Seller Avatar"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{sellerName}</p>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
              {sellerLevel}
            </span>
          </div>
        </div>

        {/* Gig Title */}
        <Link to={`/gig/${gig._id}`} className="block group/title">
          <h3 className="font-semibold text-text-primary group-hover/title:text-primary-500 transition-colors line-clamp-2 mb-3">
            {gig.title}
          </h3>
        </Link>

        {/* Rating and Delivery */}
        <div className="flex items-center justify-between mb-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium text-text-primary">{gig.rating || '5.0'}</span>
            <span className="text-text-secondary">({gig.reviews || 0})</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{gig.deliveryTime || 1}d</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">Starting at</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary-500">
              ${gig.price?.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
