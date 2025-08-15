import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import ClaimList from './components/ClaimList';
import ClaimForm from './components/ClaimForm';
import ClaimDetails from './components/ClaimDetails';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/claims" replace/>}/>
        <Route path="/claims" element={<ProtectedRoute><ClaimList/></ProtectedRoute>} />
        <Route path="/claims/new" element={<ProtectedRoute><ClaimForm mode="create"/></ProtectedRoute>} />
        <Route path="/claims/:id" element={<ProtectedRoute><ClaimDetails/></ProtectedRoute>} />
        <Route path="/claims/:id/edit" element={<ProtectedRoute><ClaimForm mode="edit"/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
