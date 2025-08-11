import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ERROR_MESSAGES } from '../utils/constants';
import { toast } from 'react-toastify';

const NewOrderPage = () => {
  const [searchParams] = useSearchParams();
  const gigId = searchParams.get('gig');
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!gigId) {
      setError('Invalid gig URL. Please select a gig and try again.');
      setLoading(false);
      return;
    }

    const fetchGig = async () => {
      try {
        const { data } = await axiosInstance.get(`/gigs/${gigId}`);
        if (!data) {
          throw new Error('Gig not found');
        }
        setGig(data);
      } catch (err) {
        console.error('Error fetching gig:', err);
        setError(err.response?.data?.message || 'Failed to load gig details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [gigId]);

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to continue with your order');
      return navigate('/login', { state: { from: `/order/new?gig=${gigId}` } });
    }

    if (!gig) return;

    setIsSubmitting(true);
    try {
      // Create order draft
      const { data: order } = await axiosInstance.post('/orders', {
        gigId: gig._id,
        specialRequest,
        price: gig.price,
      });

      toast.success('Order created successfully!');
      navigate(`/payment/${order._id}`);
    } catch (err) {
      console.error('Order creation failed:', err);
      toast.error(err.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <ErrorMessage 
          message={error} 
          onRetry={() => window.location.reload()} 
          retryText="Reload Page"
        />
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Browse Other Gigs
        </button>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Gig Not Available</h2>
          <p className="text-gray-600 mb-6">
            The gig you're looking for is no longer available or may have been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Available Gigs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to gig
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Confirm Your Order</h1>
                <p className="text-gray-500 mt-1">Review your order details before proceeding</p>
              </div>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mt-2 md:mt-0">
                Gig # {gig._id.slice(-6).toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{gig.title}</h2>
                  <p className="text-gray-600">{gig.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Instructions</h3>
                  <textarea
                    rows={4}
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Describe exactly what you need (requirements, deadlines, special requests)..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-1">Clear instructions help the seller deliver exactly what you need</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service</span>
                    <span className="font-medium">{gig.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-bold text-blue-600">${gig.price.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${gig.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 flex flex-col-reverse sm:flex-row justify-end gap-4">
              <button
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  'Continue to Payment'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;