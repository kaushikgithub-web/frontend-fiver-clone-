import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Star } from 'lucide-react';
import { orders, users } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const schema = yup.object({
  rating: yup.number().required('Rating is required').min(1, 'Please select a rating'),
  comment: yup.string().required('Review comment is required').min(10, 'Review must be at least 10 characters')
});

const Review = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  });

  const order = orders.find(o => o.id === parseInt(orderId));
  const seller = order ? users.find(u => u.id === order.sellerId) : null;

  if (!order || order.buyerId !== user.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
          <p className="text-gray-600 mb-4">
            The order you're looking for doesn't exist or you don't have permission to review it.
          </p>
          <button
            onClick={() => navigate('/orders')}
            className="btn-primary"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Submitting review:', {
      orderId: order.id,
      gigId: order.gigId,
      rating: data.rating,
      comment: data.comment,
      reviewerId: user.id
    });
    
    setLoading(false);
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Leave a Review
            </h1>
            <p className="text-gray-600">
              Share your experience with this service
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-gray-900 mb-2">Order Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Service:</strong> {order.gigTitle}</p>
              <p><strong>Seller:</strong> {seller?.name}</p>
              <p><strong>Price:</strong> ${order.price}</p>
              <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rate your experience *
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= selectedRating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      } hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                ))}
              </div>
              {selectedRating > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {selectedRating === 1 && "Poor - Not satisfied"}
                  {selectedRating === 2 && "Fair - Below expectations"}
                  {selectedRating === 3 && "Good - Met expectations"}
                  {selectedRating === 4 && "Very Good - Exceeded expectations"}
                  {selectedRating === 5 && "Excellent - Outstanding work"}
                </p>
              )}
              {errors.rating && (
                <p className="form-error">{errors.rating.message}</p>
              )}
            </div>

            {/* Review Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Write your review *
              </label>
              <textarea
                {...register('comment')}
                rows={6}
                className="input-field"
                placeholder="Tell others about your experience with this service. What did you like? Was it delivered on time? Would you recommend it?"
              />
              {errors.comment && (
                <p className="form-error">{errors.comment.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/orders')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Review</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;