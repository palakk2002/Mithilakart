import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../admin/layouts/AdminLayout'; // Reusing premium layout for seller
import SellerDashboard from '../dashboard/Dashboard';
import InventoryList from '../inventory/InventoryList';
// ... other imports

const SellerRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout isSeller={true} />}>
        <Route path="home" element={<SellerDashboard />} />
        <Route path="inventory" element={<InventoryList />} />
        {/* Add more seller routes here */}
        <Route index element={<Navigate to="home" replace />} />
      </Route>
    </Routes>
  );
};

export default SellerRoutes;
