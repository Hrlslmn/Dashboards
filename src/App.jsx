import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProductPage from './pages/Product';
import ChatWithAI from './pages/ChatWithAI';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TodoPage from './pages/TodoPage';
import PrivateRoute from './components/PrivateRoute';


export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected routes */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/chat" element={<PrivateRoute><ChatWithAI /></PrivateRoute>} />
          <Route path="/todo" element={<PrivateRoute><TodoPage /></PrivateRoute>} />
        </Routes>
      </Router>
  );
}

