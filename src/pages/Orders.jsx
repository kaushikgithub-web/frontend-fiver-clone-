import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Calendar, DollarSign, Package } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';

const Orders = () => {
  const { user, isFreelancer } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
  try {
    const res = await axiosInstance.get('/orders/my');
    setOrders(res.data);
  } catch (err) {
    console.error('Failed to fetch orders:', err);
  }
     finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  const filteredOrders =
    filter === 'all'
      ? orders
      : orders.filter(
          (order) =>
            order.status.toLowerCase().replace(/\s+/g, '-') === filter
        );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isFreelancer ? 'My Orders' : 'Order History'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isFreelancer
              ? 'Manage your client orders and track your progress'
              : 'View your order history and track delivery status'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'in-progress', 'delivered', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all'
                  ? 'All Orders'
                  : status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}{' '}
                (
                {
                  orders.filter((o) =>
                    status === 'all'
                      ? true
                      : o.status.toLowerCase().replace(/\s+/g, '-') === status
                  ).length
                }
                )
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.gigId?.title || 'Untitled Gig'}
                      </h3>
                      <span className={`badge ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Package size={16} />
                        <span>
                          {isFreelancer ? 'Client' : 'Seller'}:{' '}
                          {isFreelancer
                            ? order.buyerId?.name || 'Unknown'
                            : order.sellerId?.name || 'Unknown'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign size={16} />
                        <span>Price: ${order.price}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>
                          Order Date:{' '}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>
                          Delivery: {order.deliveryTime} day
                          {order.deliveryTime > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-700">
                        <strong>Description:</strong> {order.description || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>Requirements:</strong>{' '}
                        {order.requirements || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0 lg:ml-6">
                    <Link
                      to={`/order/${order._id}`}
                      className="btn-primary text-sm px-4 py-2 text-center"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/messages?order=${order._id}`}
                      className="btn-secondary text-sm px-4 py-2 text-center flex items-center justify-center space-x-1"
                    >
                      <MessageCircle size={16} />
                      <span>Message</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Package size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all'
                  ? isFreelancer
                    ? "You haven't received any orders yet. Create some gigs to get started!"
                    : "You haven't placed any orders yet. Browse our services to get started!"
                  : `No orders with status "${filter.replace('-', ' ')}" found.`}
              </p>
              {filter === 'all' && (
                <Link
                  to={isFreelancer ? '/create-gig' : '/gigs'}
                  className="btn-primary"
                >
                  {isFreelancer ? 'Create Your First Gig' : 'Browse Services'}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
