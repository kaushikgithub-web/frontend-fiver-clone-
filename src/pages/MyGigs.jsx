import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import GigCard from '../components/common/GigCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MyGigs = () => {
  const { token } = useAuth();
  const [myGigs, setMyGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const res = await axiosInstance.get('/gigs/my');
        setMyGigs(res.data);
      } catch (err) {
        console.error('Failed to fetch my gigs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyGigs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">My Gigs</h1>
      {myGigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myGigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You haven't created any gigs yet.</p>
      )}
    </div>
  );
};

export default MyGigs;
