import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Dashboard from './pages/Dashboard';
import TrackingPage from './pages/TackingDashboard';
import ProductPage from './pages/Product';
import MessagesPage from './pages/Messages';
import ChatWithAI from './pages/ChatWithAI';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TodoPage from './pages/TodoPage';
import PrivateRoute from './components/PrivateRoute'; // ✅ import PrivateRoute

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><ChatWithAI /></PrivateRoute>} />
        <Route path="/Tracker" element={<PrivateRoute><TrackingPage /></PrivateRoute>} />
        <Route path="/todo" element={<PrivateRoute><TodoPage /></PrivateRoute>} />
        
      </Routes>
    </Router>
  );
}
