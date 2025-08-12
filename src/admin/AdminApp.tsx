import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './shared/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pages from './pages/Pages';
import PageBuilder from './pages/PageBuilder';

import Posts from './pages/Posts';
import Media from './pages/Media';
import Menus from './pages/Menus';
import Settings from './pages/Settings';

const AdminApp: React.FC = () => {
  return (
    <AuthProvider>
      <Router basename="/nasim">
        <Routes>
          {/* Public Routes */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/pages" element={
            <ProtectedRoute requiredRole="editor">
              <Pages />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/pages/new" element={
            <ProtectedRoute requiredRole="editor">
              <PageBuilder />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/pages/:id/edit" element={
            <ProtectedRoute requiredRole="editor">
              <PageBuilder />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/posts" element={
            <ProtectedRoute requiredRole="editor">
              <Posts />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/media" element={
            <ProtectedRoute requiredRole="editor">
              <Media />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/menus" element={
            <ProtectedRoute requiredRole="admin">
              <Menus />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/settings" element={
            <ProtectedRoute requiredRole="admin">
              <Settings />
            </ProtectedRoute>
          } />
                 
          {/* Redirect root to admin */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          
          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">الصفحة غير موجودة</h2>
                <p className="text-gray-600 mb-6">الصفحة التي تبحث عنها غير موجودة</p>
                <a
                  href="/nasim/admin"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  العودة إلى لوحة التحكم
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AdminApp;