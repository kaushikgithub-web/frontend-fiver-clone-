import { useAuth } from '../context/AuthContext';
import FreelancerDashboard from '../components/dashboard/FreelancerDashboard';
import ClientDashboard from '../components/dashboard/ClientDashboard';

const Dashboard = () => {
  const { user, isFreelancer } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {isFreelancer ? 'Manage your gigs and track your earnings' : 'Track your orders and find new services'}
          </p>
        </div>
        
        {isFreelancer ? <FreelancerDashboard /> : <ClientDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;