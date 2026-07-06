/**
 * Protected Route Component
 * Guards seller routes, redirects to login if not authenticated.
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSellerAuth } from '../context/SellerAuthContext';
import { Spinner } from '../components/ui';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSellerAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-sm text-gray-400 font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/seller/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
