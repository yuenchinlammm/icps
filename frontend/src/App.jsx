import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import ProtectedRoute from './auth/ProtectedRoute';
import ClaimList from './components/ClaimList';
import ClaimForm from './components/ClaimForm';
import ClaimDetails from './components/ClaimDetails';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        
        <Route path="/" element={<Navigate to="/claims" replace />} />
        <Route path="/claims" element={<ProtectedRoute><ClaimList /></ProtectedRoute>} />
        <Route path="/claims/new" element={<ProtectedRoute><ClaimForm mode="create" /></ProtectedRoute>} />
        <Route path="/claims/:id" element={<ProtectedRoute><ClaimDetails /></ProtectedRoute>} />
        <Route path="/claims/:id/edit" element={<ProtectedRoute><ClaimForm mode="edit" /></ProtectedRoute>} />

        <Route path="*" element={<div style={{padding:24}}>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
