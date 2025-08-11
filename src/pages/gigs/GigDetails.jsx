import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  User,
  Heart,
  Share2,
  CheckCircle,
  Trash
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import axiosInstance from '../../utils/axiosInstance';

const GigDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch gig
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axiosInstance.get(`/gigs/${id}`);
        setGig(res.data);
      } catch (err) {
        console.error('Error fetching gig:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this gig?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/gigs/${gig._id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      alert('Gig deleted successfully');
      navigate('/gigs');
    } catch (error) {
      console.error('Error deleting gig:', error);
      alert('Failed to delete gig');
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Not Found
  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Gig not found</h2>
          <Link to="/gigs" className="btn-primary">Browse Other Gigs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={gig.images?.[0] || '/default-gig.jpg'}
              alt={gig.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Gig Information */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Seller Info */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={gig.seller?.avatar || '/default-avatar.png'}
                alt={gig.seller?.name || 'Seller'}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{gig.seller?.name || 'Unknown Seller'}</h3>
                <p className="text-sm text-gray-500 capitalize">{gig.seller?.role || 'Freelancer'}</p>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">{gig.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {gig.deliveryTime || 1} day delivery
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                Seller: {gig.seller?.name || 'N/A'}
              </div>
            </div>

            <p className="text-gray-700 mb-4 whitespace-pre-line">{gig.description}</p>

            {/* Features */}
            <h3 className="font-semibold mb-2">What you'll get:</h3>
            {gig.features?.length > 0 ? (
              <ul className="space-y-1 text-sm text-gray-700">
                {gig.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No specific features listed.</p>
            )}

            {/* Delete Option */}
            {user?._id === gig.seller?._id && (
              <button
                onClick={handleDelete}
                className="mt-6 flex items-center text-red-600 hover:underline"
              >
                <Trash size={18} className="mr-2" />
                Delete Gig
              </button>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="bg-white rounded-lg shadow p-6 sticky top-8 h-fit">
          {/* Pricing */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Gig Package</h3>
            <p className="text-3xl font-bold text-primary">${gig.price}</p>
            <p className="text-sm text-gray-500">{gig.deliveryTime || 1} Days Delivery</p>
          </div>

          {/* Order Button */}
          {isAuthenticated ? (
            <Link
              to={`/order/new?gig=${gig._id}`}
              className="btn-primary w-full block text-center"
            >
              Continue to Order
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-primary w-full block text-center">
                Login to Order
              </Link>
              <p className="text-sm text-center text-gray-500 mt-2">
                Please login to make a purchase.
              </p>
            </>
          )}

          {/* Save & Share */}
          <div className="flex justify-center space-x-4 mt-6 pt-6 border-t">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
              <Heart size={18} />
              <span>Save</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetails;
