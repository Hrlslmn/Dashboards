import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './components/PrivateRoute';

import Overview from './components/Overview';
import Homepage01 from './components/Homepage01';

import Dashboard from './components/Dashboard3';
import ComponentsPage from './pages/ComponentsPage';
import ButtonsPage from './pages/ButtonsPage';
import CardsPage from './pages/CardsPage';
import ModalsPage from './pages/ModalsPage';
import TablesPage from './pages/TablesPage';
import NavigationPage from './pages/Navigation';
import FormsPage from './pages/FormsPage';

import DesignsPage from './pages/DesignsPage';
import ThemesPage from './pages/ThemesPage';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

import GlobalLoader from './components/GlobalLoader';

export default function App() {
  return (
    <Router>
      <GlobalLoader />
      <SpeedInsights />
      <Analytics />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Overview />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/homepage1" element={<Homepage01 />} />

        {/* Authenticated Pages */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
        <Route path="/cancel" element={<PrivateRoute><Cancel /></PrivateRoute>} />

        {/* Component Pages (Private) */}
        <Route path="/components" element={<PrivateRoute><ComponentsPage /></PrivateRoute>} />
        <Route path="/components/buttons" element={<PrivateRoute><ButtonsPage /></PrivateRoute>} />
        <Route path="/components/cards" element={<PrivateRoute><CardsPage /></PrivateRoute>} />
        <Route path="/components/modals" element={<PrivateRoute><ModalsPage /></PrivateRoute>} />
        <Route path="/components/tables" element={<PrivateRoute><TablesPage /></PrivateRoute>} />
        <Route path="/components/navigation" element={<PrivateRoute><NavigationPage /></PrivateRoute>} />
        <Route path="/components/forms" element={<PrivateRoute><FormsPage /></PrivateRoute>} />

        {/* Design & Branding Pages (Private) */}
        <Route path="/designs" element={<PrivateRoute><DesignsPage /></PrivateRoute>} />
        <Route path="/themes" element={<PrivateRoute><ThemesPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

