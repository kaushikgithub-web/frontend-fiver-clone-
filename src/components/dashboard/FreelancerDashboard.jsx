import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  DollarSign, 
  Package, 
  Star, 
  TrendingUp, 
  MessageCircle,
  Calendar,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { gigs, orders, reviews } from '../../data/dummyData';

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Get freelancer's data
  const freelancerGigs = gigs.filter(gig => gig.seller.id === user.id);
  const freelancerOrders = orders.filter(order => order.sellerId === user.id);
  const freelancerReviews = reviews.filter(review => 
    freelancerGigs.some(gig => gig.id === review.gigId)
  );

  const stats = {
    totalEarnings: freelancerOrders.reduce((sum, order) => sum + order.price, 0),
    activeGigs: freelancerGigs.length,
    totalOrders: freelancerOrders.length,
    avgRating: freelancerReviews.length > 0 
      ? (freelancerReviews.reduce((sum, review) => sum + review.rating, 0) / freelancerReviews.length).toFixed(1)
      : 0
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Earnings"
          value={`$${stats.totalEarnings}`}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Active Gigs"
          value={stats.activeGigs}
          icon={Package}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={Users}
          color="bg-purple-500"
        />
        <StatCard
          title="Average Rating"
          value={stats.avgRating}
          icon={Star}
          color="bg-yellow-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/create-gig"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="text-primary" size={20} />
            <span className="font-medium">Create New Gig</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Package className="text-primary" size={20} />
            <span className="font-medium">Manage Orders</span>
          </Link>
          <Link
            to="/messages"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="text-primary" size={20} />
            <span className="font-medium">View Messages</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('gigs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'gigs'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Gigs
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Recent Orders
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {freelancerOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${
                          order.status === 'Completed' ? 'bg-green-500' :
                          order.status === 'In Progress' ? 'bg-blue-500' :
                          order.status === 'Delivered' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="font-medium">{order.gigTitle}</p>
                          <p className="text-sm text-gray-600">{order.buyerName}</p>
                        </div>
                        <span className="text-sm font-medium text-primary">${order.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
                  <div className="space-y-4">
                    {freelancerReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.reviewerName}</span>
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gigs' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">My Gigs</h3>
                <Link to="/create-gig" className="btn-primary">
                  Create New Gig
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {freelancerGigs.map((gig) => (
                  <div key={gig.id} className="border rounded-lg overflow-hidden">
                    <img
                      src={gig.image}
                      alt={gig.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium mb-2">{gig.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <Star size={14} className="text-yellow-400 fill-current mr-1" />
                          {gig.rating} ({gig.reviews})
                        </span>
                        <span className="font-medium text-primary">${gig.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <div className="space-y-4">
                {freelancerOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{order.gigTitle}</h4>
                      <span className={`badge ${
                        order.status === 'Completed' ? 'badge-success' :
                        order.status === 'In Progress' ? 'badge-info' :
                        order.status === 'Delivered' ? 'badge-warning' : 'badge-error'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Client: {order.buyerName}</span>
                      <span className="font-medium text-primary">${order.price}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                      <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;