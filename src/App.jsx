import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/HomePage'
import Dashboard from './pages/DashboardComponent';
import ComponentsPage from './pages/ComponentsPage';
import ButtonsPage from './pages/ButtonsPage';
import CardsPage from './pages/CardsPage';
import ModalsPage from './pages/ModalsPage';
import TablesPage from './pages/TablesPage';
import NavigationPage from './pages/Navigation';
import FormsPage from './pages/FormsPage';
import UploadComponent from './components/UploadComponent';
import PagePreview from './components/PagePreview'; 
import PurchaseHistory from './pages/PurchaseHistory';
import ResumePortfolioPage from './pages/ResumePortfolioPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import TShirtDesignPage from './pages/TShirtDesignsPage';
import SocialMediaContentPage from './pages/SocialMediaContentPage';
import ComingSoon from './pages/ComingSoon';

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

      <Suspense fallback={<div className="text-center text-gray-400 mt-10">Loading...</div>}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/upload" element={<UploadComponent />} />
          <Route path="/preview" element={<PagePreview />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />

          {/* Authenticated Pages */}
          <Route path="/dashboards" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
          <Route path="/cancel" element={<PrivateRoute><Cancel /></PrivateRoute>} />

          {/* Component Pages */}
          <Route path="/components" element={<PrivateRoute><ComponentsPage /></PrivateRoute>} />
          <Route path="/components/buttons" element={<PrivateRoute><ButtonsPage /></PrivateRoute>} />
          <Route path="/components/cards" element={<PrivateRoute><CardsPage /></PrivateRoute>} />
          <Route path="/components/modals" element={<PrivateRoute><ModalsPage /></PrivateRoute>} />
          <Route path="/components/tables" element={<PrivateRoute><TablesPage /></PrivateRoute>} />
          <Route path="/components/navigation" element={<PrivateRoute><NavigationPage /></PrivateRoute>} />
          <Route path="/components/landing-pages" element={<PrivateRoute><FormsPage /></PrivateRoute>} />
          <Route path="/resume-portfolio" element={<PrivateRoute><ResumePortfolioPage /></PrivateRoute>} />
          <Route path="/resume-builder" element={<PrivateRoute><ResumeBuilderPage /></PrivateRoute>} />
          <Route path="/designs/tshirt" element={<PrivateRoute><TShirtDesignPage /></PrivateRoute>} />
          <Route path="/designs/socialmedia" element={<PrivateRoute><SocialMediaContentPage /></PrivateRoute>} />



          {/* Design & Branding */}
          <Route path="/designs" element={<PrivateRoute><DesignsPage /></PrivateRoute>} />
          <Route path="/themes" element={<PrivateRoute><ThemesPage /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
}


