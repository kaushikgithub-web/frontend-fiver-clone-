import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import GigList from './pages/gigs/GigList';
import GigDetails from './pages/gigs/GigDetails';
import CreateGig from './pages/gigs/CreateGig';
import Orders from './pages/Orders';
import Chat from './pages/Chat';
import Review from './pages/Review';
import MyGigs from './pages/MyGigs';
import NewOrderPage from './pages/NewOrderPage';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gigs" element={<GigList />} />
            <Route path="/dashboard/my-gigs" element={<MyGigs />} />
            <Route path="/gig/:id" element={<GigDetails />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-gig"
              element={
                <ProtectedRoute requireRole="freelancer">
                  <CreateGig />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/new"
              element={
                <ProtectedRoute requireRole="client">
                  <NewOrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/review/:orderId"
              element={
                <ProtectedRoute requireRole="client">
                  <Review />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
