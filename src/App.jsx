import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './components/PrivateRoute';
import SuccessPage from './pages/Success';
import CancelPage from './pages/Cancel';
import Overview from './components/Overview';

// New Sidebar pages
import ComponentsPage from './pages/ComponentsPage';
import DesignsPage from './pages/DesignsPage';
import ThemesPage from './pages/ThemesPage';
import CollectionsPage from './pages/CollectionsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />

        {/* Sidebar routes */}

        <Route path="/" element={<PrivateRoute><Overview /></PrivateRoute>} />
        <Route path="/components" element={<PrivateRoute><ComponentsPage /></PrivateRoute>} />
        <Route path="/designs" element={<PrivateRoute><DesignsPage /></PrivateRoute>} />
        <Route path="/themes" element={<PrivateRoute><ThemesPage /></PrivateRoute>} />
        <Route path="/collections" element={<PrivateRoute><CollectionsPage /></PrivateRoute>} />
        </Routes>
    </Router>
  );
}
