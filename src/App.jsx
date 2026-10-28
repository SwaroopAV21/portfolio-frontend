import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { useAuth } from './auth/authContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Metrics from './pages/Metrics';

function AdminMetrics() {
  const { isAdmin } = useAuth();
  const location = useLocation();

  return isAdmin
    ? <Metrics />
    : <Navigate to="/login" state={{ from: location }} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/metrics" element={<AdminMetrics />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
