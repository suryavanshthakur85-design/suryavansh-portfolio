import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

// Public Portfolio Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { Exploring } from './components/Exploring';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { EditModal } from './components/edit/EditModal';

// Private Admin Components
import { PrivateEditAccess } from './components/admin/PrivateEditAccess';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Loader2 } from 'lucide-react';

// Public View Component
function PortfolioHome() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300">
      <PrivateEditAccess />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Achievements />
        <Exploring />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <ProjectModal />
      <EditModal />
      <Toast />
    </div>
  );
}

// Protected Admin Route Handler
function AdminRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-mono text-xs">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="text-slate-400">Verifying admin session...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <>
      <AdminDashboard />
      <Toast />
    </>
  ) : (
    <>
      <AdminLogin />
      <Toast />
    </>
  );
}

export function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Portfolio Route: View Only */}
            <Route path="/" element={<PortfolioHome />} />

            {/* Private Admin Route: Login / Dashboard */}
            <Route path="/admin" element={<AdminRoute />} />

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
