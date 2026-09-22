import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
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
import { EditModal } from './components/edit/EditModal';
import { AdminDashboardModal } from './components/edit/AdminDashboardModal';
import { Toast } from './components/Toast';

export function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300">
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
        <AdminDashboardModal />
        <EditModal />
        <Toast />
      </div>
    </PortfolioProvider>
  );
}

export default App;
