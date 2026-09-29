import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  User,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Trophy,
  Compass,
  FileText,
  Mail,
  Share2,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Upload,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Terminal,
  Calendar,
  Layers,
  Building,
  Target,
  Bookmark,
  Camera,
  X
} from 'lucide-react';

export const AdminDashboard = () => {
  const { adminUser, logout } = useAuth();
  const {
    data,
    updateHero,
    updateAbout,
    addInterest,
    removeInterest,
    saveHighlightCard,
    deleteHighlightCard,
    updateAllSkillCategories,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    reorderSkillCategories,
    addSkillToCategory,
    updateSkillInCategory,
    removeSkillFromCategory,
    reorderSkillsInCategory,
    saveProject,
    deleteProject,
    saveEducation,
    deleteEducation,
    saveCertification,
    deleteCertification,
    saveAchievement,
    deleteAchievement,
    saveLearningItem,
    deleteLearningItem,
    updateResume,
    updateContactDetails,
    uploadFile,
    resetToDefault,
    exportDataJSON,
    showToast
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('about');

  // --- LOCAL EDIT STATES FOR SECTIONS ---
  // 1. About Me State
  const [aboutForm, setAboutForm] = useState(() => ({
    title: data.about?.title || 'About Me',
    subtitle: data.about?.subtitle || '',
    shortBio: data.about?.shortBio || '',
    description: Array.isArray(data.about?.description)
      ? data.about.description
      : [data.about?.description || ''],
    careerGoal: data.about?.careerGoal || {
      objective: '',
      futureGoals: '',
      areasOfInterest: ''
    }
  }));

  const [newInterestInput, setNewInterestInput] = useState('');
  const [highlightModal, setHighlightModal] = useState({ isOpen: false, item: null });

  // 2. Education Modal State
  const [eduModal, setEduModal] = useState({ isOpen: false, data: null });

  // 3. Technical Skills State
  const [newCatInput, setNewCatInput] = useState({ name: '', icon: 'Code', description: '' });
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [skillInputModal, setSkillInputModal] = useState({ isOpen: false, catId: null, skill: null, index: null });

  // 4. Projects State
  const [projectModal, setProjectModal] = useState({ isOpen: false, project: null });

  // 5. Certifications State
  const [certModal, setCertModal] = useState({ isOpen: false, cert: null });

  // 6. Achievements State
  const [achieveModal, setAchieveModal] = useState({ isOpen: false, item: null });

  // 7. Learning State
  const [learningModal, setLearningModal] = useState({ isOpen: false, item: null });

  // 8. Contact Form State
  const [contactForm, setContactForm] = useState(() => ({
    email: data.contact?.email || data.hero?.social?.email || '',
    phone: data.contact?.phone || data.hero?.social?.phone || '',
    location: data.contact?.location || data.hero?.location || '',
    linkedin: data.contact?.linkedin || data.hero?.social?.linkedin || '',
    github: data.contact?.github || data.hero?.social?.github || '',
    additionalLinks: data.contact?.additionalLinks || []
  }));

  // 9. Social Links State
  const [socialForm, setSocialForm] = useState(() => ({
    github: data.hero?.social?.github || '',
    linkedin: data.hero?.social?.linkedin || '',
    email: data.hero?.social?.email || '',
    phone: data.hero?.social?.phone || ''
  }));

  // 10. Hero State
  const [heroForm, setHeroForm] = useState(() => ({
    name: data.hero?.name || '',
    tagline: data.hero?.tagline || '',
    bio: data.hero?.bio || '',
    availability: data.hero?.availability || '',
    location: data.hero?.location || ''
  }));

  // File upload helper
  const handleFileUploadAsync = async (e, callback) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const res = await uploadFile(file);
      if (res && res.fileUrl) {
        callback(res.fileUrl, res.fileName);
      }
    }
  };

  const navTabs = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Technical Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'learning', label: 'Learning', icon: Compass },
    { id: 'contact', label: 'Contact Information', icon: Mail },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'social', label: 'Social Links', icon: Share2 },
    { id: 'hero', label: 'Hero & Profile', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-mono font-bold text-sm sm:text-base text-slate-100">
                Surya Portfolio Admin
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                ● Admin Authorized
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Logged in as: <span className="text-cyan-400">{adminUser?.username || 'admin'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Preview live public portfolio in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">View Live Portfolio</span>
          </a>

          <button
            onClick={exportDataJSON}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs hidden md:flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Download JSON backup"
          >
            Backup JSON
          </button>

          <button
            onClick={resetToDefault}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-rose-300 font-mono text-xs hidden lg:flex items-center gap-1.5 transition-colors border border-slate-700 hover:border-rose-500/40"
            title="Restore default data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span>Reset Data</span>
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800/80 p-3 sm:p-4 space-y-1 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col">
          <div className="text-[10px] font-mono uppercase text-slate-500 px-3 py-2 hidden md:block">
            Content Modules
          </div>

          <div className="flex md:flex-col gap-1 w-full overflow-x-auto custom-scrollbar">
            {navTabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all text-left ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto custom-scrollbar max-w-6xl">
          {/* ========================================================= */}
          {/* 1. ABOUT ME TAB */}
          {/* ========================================================= */}
          {activeTab === 'about' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <User className="w-6 h-6 text-cyan-400" />
                    <span>Manage About Me</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Update biographical paragraphs, vision, career goals, interests, and highlights.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAboutForm({
                        title: data.about?.title || 'About Me',
                        subtitle: data.about?.subtitle || '',
                        shortBio: data.about?.shortBio || '',
                        description: Array.isArray(data.about?.description)
                          ? data.about.description
                          : [data.about?.description || ''],
                        careerGoal: data.about?.careerGoal || {
                          objective: '',
                          futureGoals: '',
                          areasOfInterest: ''
                        }
                      });
                      showToast('About Me edits reverted.');
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-mono text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => updateAbout(aboutForm)}
                    className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save About Section</span>
                  </button>
                </div>
              </div>

              {/* Main Fields */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={aboutForm.title}
                      onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Subtitle / Current Role</label>
                    <input
                      type="text"
                      value={aboutForm.subtitle}
                      onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Short Callout Bio</label>
                  <textarea
                    rows={2}
                    value={aboutForm.shortBio}
                    onChange={(e) => setAboutForm({ ...aboutForm, shortBio: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                  />
                </div>

                {/* Description Paragraphs List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-300 font-bold">
                      Main Description Paragraphs
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setAboutForm({
                          ...aboutForm,
                          description: [...aboutForm.description, '']
                        })
                      }
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono rounded-lg border border-slate-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> + Add Paragraph
                    </button>
                  </div>

                  {aboutForm.description.map((p, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <span className="text-xs font-mono text-slate-500 pt-2.5">P{idx + 1}</span>
                      <textarea
                        rows={3}
                        value={p}
                        onChange={(e) => {
                          const updated = [...aboutForm.description];
                          updated[idx] = e.target.value;
                          setAboutForm({ ...aboutForm, description: updated });
                        }}
                        className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono"
                      />
                      {aboutForm.description.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = aboutForm.description.filter((_, i) => i !== idx);
                            setAboutForm({ ...aboutForm, description: updated });
                          }}
                          className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Goal Form */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-mono text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Career Objective & Vision</span>
                </h3>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Career Objective</label>
                  <textarea
                    rows={2}
                    value={aboutForm.careerGoal.objective || ''}
                    onChange={(e) =>
                      setAboutForm({
                        ...aboutForm,
                        careerGoal: { ...aboutForm.careerGoal, objective: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Future Goals</label>
                    <textarea
                      rows={2}
                      value={aboutForm.careerGoal.futureGoals || ''}
                      onChange={(e) =>
                        setAboutForm({
                          ...aboutForm,
                          careerGoal: { ...aboutForm.careerGoal, futureGoals: e.target.value }
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Core Domains</label>
                    <textarea
                      rows={2}
                      value={aboutForm.careerGoal.areasOfInterest || ''}
                      onChange={(e) =>
                        setAboutForm({
                          ...aboutForm,
                          careerGoal: { ...aboutForm.careerGoal, areasOfInterest: e.target.value }
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Areas of Interest (Tags) */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="font-mono text-sm font-bold text-cyan-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Areas of Interest Tags</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {(data.about?.interests || []).map((interest, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs"
                    >
                      <span>{interest}</span>
                      <button
                        onClick={() => removeInterest(interest)}
                        className="text-slate-400 hover:text-rose-400 ml-1 font-bold"
                        title="Delete tag"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 max-w-md pt-2">
                  <input
                    type="text"
                    placeholder="Add area (e.g. Distributed Systems)"
                    value={newInterestInput}
                    onChange={(e) => setNewInterestInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                  />
                  <button
                    onClick={() => {
                      if (newInterestInput.trim()) {
                        addInterest(newInterestInput.trim());
                        setNewInterestInput('');
                      }
                    }}
                    className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl font-mono"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Personal Highlights Cards */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Personal Highlights Cards</span>
                  </h3>
                  <button
                    onClick={() =>
                      setHighlightModal({
                        isOpen: true,
                        item: { id: `h-${Date.now()}`, label: '', value: '' }
                      })
                    }
                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Highlight Card
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(data.about?.highlights || []).map((h) => (
                    <div
                      key={h.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-[10px] font-mono uppercase text-slate-400">{h.label}</p>
                        <p className="text-sm font-bold font-mono text-slate-100 mt-0.5">{h.value}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setHighlightModal({ isOpen: true, item: h })}
                          className="p-1.5 text-cyan-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteHighlightCard(h.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. EDUCATION TAB */}
          {/* ========================================================= */}
          {activeTab === 'education' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-cyan-400" />
                    <span>Manage Education Entries</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Add, edit, or delete degree qualifications and academic coursework.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setEduModal({
                      isOpen: true,
                      data: {
                        id: `edu-${Date.now()}`,
                        degree: 'Bachelor of Technology (B.Tech)',
                        branch: 'Computer Science & Engineering (CSE Core)',
                        institution: '',
                        location: 'India',
                        startYear: '2023',
                        endYear: '2027',
                        expectedGraduation: '2027',
                        cgpa: '',
                        relevantCoursework: ['Data Structures & Algorithms', 'OOP', 'DBMS'],
                        description: '',
                        achievements: ''
                      }
                    })
                  }
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-4">
                {(data.education || []).map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row justify-between items-start gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                          {item.branch}
                        </span>
                        {item.cgpa && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                            CGPA: {item.cgpa}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold font-mono text-slate-100">{item.degree}</h3>
                      <p className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-cyan-400" />
                        <span>{item.institution}</span>
                        {item.location && <span className="text-xs text-slate-500 font-normal">({item.location})</span>}
                      </p>
                      <p className="text-xs font-mono text-slate-400">
                        Duration: {item.startYear} - {item.endYear || item.expectedGraduation || 'Present'}
                      </p>
                      {item.description && (
                        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start">
                      <button
                        onClick={() => setEduModal({ isOpen: true, data: item })}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl font-mono text-xs font-bold flex items-center gap-1 border border-slate-700"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete education entry "${item.degree}"?`)) {
                            deleteEducation(item.id);
                          }
                        }}
                        className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl font-mono text-xs font-bold flex items-center gap-1 border border-rose-500/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}

                {(data.education || []).length === 0 && (
                  <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-2xl">
                    No education entries recorded. Click "+ Add Education" above.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. TECHNICAL SKILLS TAB */}
          {/* ========================================================= */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <Wrench className="w-6 h-6 text-cyan-400" />
                    <span>Manage Technical Skills</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Add categories, edit skills, reorder items, and manage proficiencies.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddCatModal(true)}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill Category</span>
                </button>
              </div>

              {/* Categories Accordion / Grid */}
              <div className="space-y-6">
                {(data.skills?.categories || []).map((cat, catIdx) => (
                  <div
                    key={cat.id}
                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                          #{catIdx + 1}
                        </span>
                        <div>
                          <h3 className="font-mono font-bold text-slate-100 text-base">{cat.name}</h3>
                          {cat.description && (
                            <p className="text-xs text-slate-400 font-mono">{cat.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Category Action Buttons */}
                      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                        <button
                          onClick={() => reorderSkillCategories(catIdx, catIdx - 1)}
                          disabled={catIdx === 0}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 disabled:opacity-30"
                          title="Move Category Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => reorderSkillCategories(catIdx, catIdx + 1)}
                          disabled={catIdx === (data.skills?.categories || []).length - 1}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 disabled:opacity-30"
                          title="Move Category Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingCategory(cat)}
                          className="p-1.5 text-cyan-400 hover:text-cyan-300"
                          title="Edit Category Name/Icon"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete category "${cat.name}" and all its skills?`)) {
                              removeSkillCategory(cat.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Skills pills inside category */}
                    <div className="flex flex-wrap gap-2">
                      {(cat.skills || []).map((skill, sIdx) => {
                        const skillName = typeof skill === 'string' ? skill : skill.name;
                        return (
                          <div
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200"
                          >
                            <span>{skillName}</span>
                            <div className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-800">
                              <button
                                onClick={() => reorderSkillsInCategory(cat.id, sIdx, sIdx - 1)}
                                disabled={sIdx === 0}
                                className="text-slate-500 hover:text-cyan-400 disabled:opacity-20 text-[10px]"
                                title="Move Left"
                              >
                                &larr;
                              </button>
                              <button
                                onClick={() => reorderSkillsInCategory(cat.id, sIdx, sIdx + 1)}
                                disabled={sIdx === (cat.skills || []).length - 1}
                                className="text-slate-500 hover:text-cyan-400 disabled:opacity-20 text-[10px]"
                                title="Move Right"
                              >
                                &rarr;
                              </button>
                              <button
                                onClick={() =>
                                  setSkillInputModal({
                                    isOpen: true,
                                    catId: cat.id,
                                    skill: skillName,
                                    index: sIdx
                                  })
                                }
                                className="text-cyan-400 hover:text-cyan-300"
                                title="Edit Skill"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeSkillFromCategory(cat.id, sIdx)}
                                className="text-rose-400 hover:text-rose-300"
                                title="Delete Skill"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() =>
                          setSkillInputModal({
                            isOpen: true,
                            catId: cat.id,
                            skill: '',
                            index: null
                          })
                        }
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono text-xs rounded-xl border border-slate-700 flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> + Add Skill to {cat.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. PROJECTS TAB */}
          {/* ========================================================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <FolderGit2 className="w-6 h-6 text-cyan-400" />
                    <span>Manage Projects</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Add new projects, update GitHub/Live demo links, tech stacks, and specifications.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setProjectModal({
                      isOpen: true,
                      project: {
                        id: `proj-${Date.now()}`,
                        title: '',
                        category: (data.projectCategories && data.projectCategories[1]) || 'Web Development',
                        status: 'Completed',
                        date: new Date().getFullYear().toString(),
                        description: '',
                        image: '',
                        technologies: ['React.js', 'Tailwind CSS', 'JavaScript'],
                        github: '',
                        demo: '',
                        video: '',
                        features: ['Responsive UI']
                      }
                    })
                  }
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.projects || []).map((project) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setProjectModal({ isOpen: true, project })}
                            className="p-1.5 text-cyan-400 hover:text-cyan-300 rounded-lg hover:bg-slate-800"
                            title="Edit Project"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete project "${project.title}"?`)) {
                                deleteProject(project.id);
                              }
                            }}
                            className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-mono font-bold text-slate-100 text-base">{project.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {(project.technologies || []).slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono text-[10px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono text-slate-400">
                      <span>{project.status || 'Active'}</span>
                      <div className="flex items-center gap-3">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:underline"
                          >
                            GitHub &rarr;
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:underline"
                          >
                            Demo &rarr;
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {(data.projects || []).length === 0 && (
                  <div className="col-span-full p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-2xl">
                    No projects uploaded yet. Click "+ Add Project" above.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. CERTIFICATIONS TAB */}
          {/* ========================================================= */}
          {activeTab === 'certifications' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <Award className="w-6 h-6 text-cyan-400" />
                    <span>Manage Certifications</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Add certificates, course credentials, verification links, and certificate files.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setCertModal({
                      isOpen: true,
                      cert: {
                        id: `cert-${Date.now()}`,
                        title: '',
                        organization: '',
                        date: new Date().getFullYear().toString(),
                        credentialId: '',
                        credentialUrl: '',
                        certificateFile: ''
                      }
                    })
                  }
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certification</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data.certifications || []).map((cert) => (
                  <div
                    key={cert.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          {cert.organization || cert.issuer || 'Certification'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setCertModal({ isOpen: true, cert })}
                            className="p-1.5 text-cyan-400 hover:text-cyan-300"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete certification "${cert.title}"?`)) {
                                deleteCertification(cert.id);
                              }
                            }}
                            className="p-1.5 text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-mono font-bold text-slate-100 text-sm mt-1">{cert.title}</h3>
                      {cert.date && <p className="text-xs text-slate-400 font-mono mt-1">Issued: {cert.date}</p>}
                      {cert.credentialId && (
                        <p className="text-[11px] text-slate-500 font-mono">ID: {cert.credentialId}</p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline"
                        >
                          Verify Credential &rarr;
                        </a>
                      ) : (
                        <span className="text-slate-500">No URL</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. ACHIEVEMENTS TAB */}
          {/* ========================================================= */}
          {activeTab === 'achievements' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    <span>Manage Achievements</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Record hackathon wins, competitive programming ranks, awards, and milestones.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setAchieveModal({
                      isOpen: true,
                      item: {
                        id: `ach-${Date.now()}`,
                        title: '',
                        organization: '',
                        date: new Date().getFullYear().toString(),
                        description: '',
                        image: '',
                        link: ''
                      }
                    })
                  }
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Achievement</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data.achievements || []).map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          {item.organization || 'Milestone'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setAchieveModal({ isOpen: true, item })}
                            className="p-1.5 text-cyan-400 hover:text-cyan-300"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete achievement "${item.title}"?`)) {
                                deleteAchievement(item.id);
                              }
                            }}
                            className="p-1.5 text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-mono font-bold text-slate-100 text-sm mt-1">{item.title}</h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.description}</p>
                    </div>

                    {item.link && (
                      <div className="pt-2 border-t border-slate-800 text-xs font-mono">
                        <a href={item.link} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                          View Event Link &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. LEARNING TAB */}
          {/* ========================================================= */}
          {activeTab === 'learning' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <Compass className="w-6 h-6 text-rose-400" />
                    <span>Currently Exploring / Learning</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Topics, frameworks, or engineering subjects currently under active study.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setLearningModal({
                      isOpen: true,
                      item: {
                        id: `exp-${Date.now()}`,
                        name: '',
                        description: '',
                        status: 'In Progress'
                      }
                    })
                  }
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Learning Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(data.exploring || []).map((item, idx) => {
                  const isObj = typeof item === 'object' && item !== null;
                  const name = isObj ? item.name : item;
                  const desc = isObj ? item.description : '';
                  const status = isObj ? item.status : 'In Progress';
                  const id = isObj ? item.id : idx;

                  return (
                    <div
                      key={id}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold">
                            {status}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                setLearningModal({
                                  isOpen: true,
                                  item: isObj ? item : { id, name, description: desc, status }
                                })
                              }
                              className="p-1.5 text-cyan-400 hover:text-cyan-300"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteLearningItem(id)}
                              className="p-1.5 text-rose-400 hover:text-rose-300"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-mono font-bold text-slate-100 text-sm mt-2">{name}</h3>
                        {desc && <p className="text-xs text-slate-400 font-mono mt-1 leading-relaxed">{desc}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 8. CONTACT INFORMATION TAB */}
          {/* ========================================================= */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <Mail className="w-6 h-6 text-cyan-400" />
                    <span>Manage Contact Information</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Update direct communication channels, location, and professional links.
                  </p>
                </div>

                <button
                  onClick={() => updateContactDetails(contactForm)}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. suryavansh@example.com"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Location / City</label>
                    <input
                      type="text"
                      value={contactForm.location}
                      onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                      placeholder="e.g. New Delhi, India"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      value={contactForm.linkedin}
                      onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Profile</label>
                  <input
                    type="text"
                    value={contactForm.github}
                    onChange={(e) => setContactForm({ ...contactForm, github: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                  />
                </div>

                {/* Additional Links */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-300 font-bold">
                      Additional Platform Links (LeetCode, HackerRank, Twitter, etc.)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setContactForm({
                          ...contactForm,
                          additionalLinks: [...contactForm.additionalLinks, { label: '', url: '' }]
                        })
                      }
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono rounded-lg border border-slate-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Link
                    </button>
                  </div>

                  {contactForm.additionalLinks.map((link, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Label (e.g. LeetCode)"
                        value={link.label}
                        onChange={(e) => {
                          const updated = [...contactForm.additionalLinks];
                          updated[idx].label = e.target.value;
                          setContactForm({ ...contactForm, additionalLinks: updated });
                        }}
                        className="w-1/3 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                      />
                      <input
                        type="text"
                        placeholder="URL (e.g. https://leetcode.com/user)"
                        value={link.url}
                        onChange={(e) => {
                          const updated = [...contactForm.additionalLinks];
                          updated[idx].url = e.target.value;
                          setContactForm({ ...contactForm, additionalLinks: updated });
                        }}
                        className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = contactForm.additionalLinks.filter((_, i) => i !== idx);
                          setContactForm({ ...contactForm, additionalLinks: updated });
                        }}
                        className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 9. RESUME TAB */}
          {/* ========================================================= */}
          {activeTab === 'resume' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-cyan-400" />
                    <span>Manage Resume / CV</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Upload official PDF resume, replace the file, or delete it.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-mono text-slate-100">
                        {data.resume?.fileName || 'Suryavansh_Thakur_Resume.pdf'}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">
                        Status: {data.resume?.resumeUrl ? 'Active & Published' : 'No file currently attached'}
                      </p>
                      {data.resume?.lastUpdated && (
                        <p className="text-[11px] font-mono text-emerald-400 mt-1">
                          Last Updated: {data.resume.lastUpdated}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold rounded-xl cursor-pointer shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      <span>{data.resume?.resumeUrl ? 'Replace Resume (PDF)' : 'Upload Resume (PDF)'}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          handleFileUploadAsync(e, (url, name) => {
                            updateResume({
                              resumeUrl: url,
                              fileName: name,
                              lastUpdated: new Date().toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric'
                              })
                            });
                          })
                        }
                        className="hidden"
                      />
                    </label>

                    {data.resume?.resumeUrl && (
                      <button
                        onClick={() => {
                          if (window.confirm('Delete attached resume file?')) {
                            updateResume({
                              resumeUrl: '',
                              fileName: '',
                              lastUpdated: ''
                            });
                          }
                        }}
                        className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono text-xs font-bold rounded-xl flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Resume Live Preview */}
                {data.resume?.resumeUrl ? (
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase mb-2">Live PDF Document Preview:</h4>
                    <iframe
                      src={data.resume.resumeUrl}
                      title="Admin Resume Preview"
                      className="w-full h-[550px] rounded-2xl border border-slate-800"
                    />
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-2xl">
                    No resume document uploaded yet. Click "Upload Resume (PDF)" above to attach your resume file.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 10. SOCIAL LINKS TAB */}
          {/* ========================================================= */}
          {activeTab === 'social' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <Share2 className="w-6 h-6 text-cyan-400" />
                    <span>Manage Social & Network Links</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Update links shown across Hero, Footer, and Contact sections.
                  </p>
                </div>

                <button
                  onClick={() => {
                    updateContactDetails({
                      github: socialForm.github,
                      linkedin: socialForm.linkedin,
                      email: socialForm.email,
                      phone: socialForm.phone
                    });
                  }}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Social Links</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={socialForm.github}
                    onChange={(e) => setSocialForm({ ...socialForm, github: e.target.value })}
                    placeholder="https://github.com/your-username"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={socialForm.linkedin}
                    onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/your-username"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Primary Email</label>
                  <input
                    type="email"
                    value={socialForm.email}
                    onChange={(e) => setSocialForm({ ...socialForm, email: e.target.value })}
                    placeholder="your-email@example.com"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={socialForm.phone}
                    onChange={(e) => setSocialForm({ ...socialForm, phone: e.target.value })}
                    placeholder="+91 ..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 11. HERO & PROFILE TAB */}
          {/* ========================================================= */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                    <span>Manage Hero & Profile Header</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Update your full name, student tagline, intro bio, and profile photo.
                  </p>
                </div>

                <button
                  onClick={() => updateHero(heroForm)}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hero Section</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={heroForm.name}
                        onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Tagline / Major</label>
                      <input
                        type="text"
                        value={heroForm.tagline}
                        onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Hero Introduction Bio</label>
                    <textarea
                      rows={3}
                      value={heroForm.bio}
                      onChange={(e) => setHeroForm({ ...heroForm, bio: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Availability Pill Text</label>
                      <input
                        type="text"
                        value={heroForm.availability}
                        onChange={(e) => setHeroForm({ ...heroForm, availability: e.target.value })}
                        placeholder="e.g. Open for Collaborations"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={heroForm.location}
                        onChange={(e) => setHeroForm({ ...heroForm, location: e.target.value })}
                        placeholder="e.g. India"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Photo Upload Panel */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden bg-slate-950 border-2 border-dashed border-slate-700 flex items-center justify-center relative group">
                    {data.hero?.avatarUrl ? (
                      <img
                        src={data.hero.avatarUrl}
                        alt="Profile Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Terminal className="w-12 h-12 text-slate-600" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono text-xs font-bold rounded-xl cursor-pointer border border-slate-700 inline-flex items-center gap-1.5">
                      <Camera className="w-4 h-4" />
                      <span>{data.hero?.avatarUrl ? 'Change Photo' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUploadAsync(e, (url) => {
                            updateHero({ avatarUrl: url });
                          })
                        }
                        className="hidden"
                      />
                    </label>

                    {data.hero?.avatarUrl && (
                      <button
                        onClick={() => updateHero({ avatarUrl: '' })}
                        className="block text-[11px] font-mono text-rose-400 hover:underline mx-auto"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =================================================================== */}
      {/* MODALS */}
      {/* =================================================================== */}

      {/* 1. Education Modal */}
      {eduModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 my-auto max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono font-bold text-base text-slate-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>{eduModal.data?.id ? 'Edit Education Entry' : 'Add Education Entry'}</span>
              </h3>
              <button onClick={() => setEduModal({ isOpen: false, data: null })} className="text-slate-400 hover:text-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Degree *</label>
                <input
                  type="text"
                  value={eduModal.data?.degree || ''}
                  onChange={(e) => setEduModal({ ...eduModal, data: { ...eduModal.data, degree: e.target.value } })}
                  placeholder="e.g. Bachelor of Technology (B.Tech)"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Branch / Major</label>
                <input
                  type="text"
                  value={eduModal.data?.branch || ''}
                  onChange={(e) => setEduModal({ ...eduModal, data: { ...eduModal.data, branch: e.target.value } })}
                  placeholder="e.g. Computer Science & Engineering (CSE Core)"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Institution / University *</label>
                <input
                  type="text"
                  value={eduModal.data?.institution || ''}
                  onChange={(e) => setEduModal({ ...eduModal, data: { ...eduModal.data, institution: e.target.value } })}
                  placeholder="University Name"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={eduModal.data?.location || ''}
                  onChange={(e) => setEduModal({ ...eduModal, data: { ...eduModal.data, location: e.target.value } })}
                  placeholder="e.g. India"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Start Year</label>
                <input
                  type="text"
                  value={eduModal.data?.startYear || ''}
                  onChange={(e) => setEduModal({ ...eduModal, data: { ...eduModal.data, startYear: e.target.value } })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">End / Grad Year</label>
                <input
                  type="text"
                  value={eduModal.data?.endYear || eduModal.data?.expectedGraduation || ''}
                  onChange={(e) =>
                    setEduModal({
                      ...eduModal,
                      data: {
                        ...eduModal.data,
                        endYear: e.target.value,
                        expectedGraduation: e.target.value
                      }
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">CGPA / Grade</label>
                <input
                  type="text"
                  value={eduModal.data?.cgpa || ''}
                  onChange={(e) => setEduModal({ ...eduModal, data: { ...eduModal.data, cgpa: e.target.value } })}
                  placeholder="e.g. 8.9"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
              <textarea
                rows={3}
                value={eduModal.data?.description || ''}
                onChange={(e) => setEduModal({ ...eduModal, data: { ...eduModal.data, description: e.target.value } })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setEduModal({ isOpen: false, data: null })}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-mono text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (eduModal.data?.degree && eduModal.data?.institution) {
                    saveEducation(eduModal.data);
                    setEduModal({ isOpen: false, data: null });
                  } else {
                    alert('Please enter degree and institution.');
                  }
                }}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl"
              >
                Save Education
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Highlight Card Modal */}
      {highlightModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-mono font-bold text-sm text-slate-100">Highlight Card</h3>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Label</label>
              <input
                type="text"
                value={highlightModal.item?.label || ''}
                onChange={(e) =>
                  setHighlightModal({
                    ...highlightModal,
                    item: { ...highlightModal.item, label: e.target.value }
                  })
                }
                placeholder="e.g. Major Field"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Value</label>
              <input
                type="text"
                value={highlightModal.item?.value || ''}
                onChange={(e) =>
                  setHighlightModal({
                    ...highlightModal,
                    item: { ...highlightModal.item, value: e.target.value }
                  })
                }
                placeholder="e.g. B.Tech CSE Core"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setHighlightModal({ isOpen: false, item: null })}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 font-mono text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (highlightModal.item?.label && highlightModal.item?.value) {
                    saveHighlightCard(highlightModal.item);
                    setHighlightModal({ isOpen: false, item: null });
                  }
                }}
                className="px-4 py-1.5 bg-cyan-500 text-slate-950 font-bold font-mono text-xs rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Add Category Modal */}
      {showAddCatModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-mono font-bold text-sm text-slate-100">Add Skill Category</h3>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Category Name *</label>
              <input
                type="text"
                value={newCatInput.name}
                onChange={(e) => setNewCatInput({ ...newCatInput, name: e.target.value })}
                placeholder="e.g. Cloud & DevOps"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
              <input
                type="text"
                value={newCatInput.description}
                onChange={(e) => setNewCatInput({ ...newCatInput, description: e.target.value })}
                placeholder="Brief category summary"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddCatModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 font-mono text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newCatInput.name.trim()) {
                    addSkillCategory(newCatInput);
                    setNewCatInput({ name: '', icon: 'Code', description: '' });
                    setShowAddCatModal(false);
                  }
                }}
                className="px-4 py-1.5 bg-cyan-500 text-slate-950 font-bold font-mono text-xs rounded-xl"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-mono font-bold text-sm text-slate-100">Edit Category</h3>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Category Name</label>
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
              <input
                type="text"
                value={editingCategory.description || ''}
                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingCategory(null)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 font-mono text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateSkillCategory(editingCategory.id, {
                    name: editingCategory.name,
                    description: editingCategory.description
                  });
                  setEditingCategory(null);
                }}
                className="px-4 py-1.5 bg-cyan-500 text-slate-950 font-bold font-mono text-xs rounded-xl"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Add/Edit Skill Modal */}
      {skillInputModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-mono font-bold text-sm text-slate-100">
              {skillInputModal.index !== null ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Skill Name *</label>
              <input
                type="text"
                value={skillInputModal.skill || ''}
                onChange={(e) => setSkillInputModal({ ...skillInputModal, skill: e.target.value })}
                placeholder="e.g. Docker, TypeScript"
                autoFocus
                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSkillInputModal({ isOpen: false, catId: null, skill: null, index: null })}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 font-mono text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (skillInputModal.skill && skillInputModal.skill.trim()) {
                    if (skillInputModal.index !== null) {
                      updateSkillInCategory(skillInputModal.catId, skillInputModal.index, skillInputModal.skill.trim());
                    } else {
                      addSkillToCategory(skillInputModal.catId, skillInputModal.skill.trim());
                    }
                    setSkillInputModal({ isOpen: false, catId: null, skill: null, index: null });
                  }
                }}
                className="px-4 py-1.5 bg-cyan-500 text-slate-950 font-bold font-mono text-xs rounded-xl"
              >
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Project Modal */}
      {projectModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 my-auto max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono font-bold text-base text-slate-100 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-cyan-400" />
                <span>{projectModal.project?.title ? 'Edit Project' : 'Add New Project'}</span>
              </h3>
              <button onClick={() => setProjectModal({ isOpen: false, project: null })} className="text-slate-400 hover:text-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={projectModal.project?.title || ''}
                  onChange={(e) =>
                    setProjectModal({ ...projectModal, project: { ...projectModal.project, title: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                <select
                  value={projectModal.project?.category || 'Web Development'}
                  onChange={(e) =>
                    setProjectModal({ ...projectModal, project: { ...projectModal.project, category: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                >
                  {(data.projectCategories || ['Web Development', 'C/C++', 'Java', 'Python', 'AI/ML', 'Data', 'Other']).map(
                    (cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description *</label>
              <textarea
                rows={3}
                value={projectModal.project?.description || ''}
                onChange={(e) =>
                  setProjectModal({ ...projectModal, project: { ...projectModal.project, description: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={projectModal.project?.github || ''}
                  onChange={(e) =>
                    setProjectModal({ ...projectModal, project: { ...projectModal.project, github: e.target.value } })
                  }
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Live Demo URL</label>
                <input
                  type="text"
                  value={projectModal.project?.demo || ''}
                  onChange={(e) =>
                    setProjectModal({ ...projectModal, project: { ...projectModal.project, demo: e.target.value } })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                value={(projectModal.project?.technologies || []).join(', ')}
                onChange={(e) => {
                  const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                  setProjectModal({ ...projectModal, project: { ...projectModal.project, technologies: arr } });
                }}
                placeholder="React.js, Node.js, Tailwind CSS"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setProjectModal({ isOpen: false, project: null })}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-mono text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (projectModal.project?.title && projectModal.project?.description) {
                    saveProject(projectModal.project);
                    setProjectModal({ isOpen: false, project: null });
                  } else {
                    alert('Please enter project title and description.');
                  }
                }}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Certification Modal */}
      {certModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-mono font-bold text-base text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>{certModal.cert?.title ? 'Edit Certification' : 'Add Certification'}</span>
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Certification Title *</label>
              <input
                type="text"
                value={certModal.cert?.title || ''}
                onChange={(e) => setCertModal({ ...certModal, cert: { ...certModal.cert, title: e.target.value } })}
                placeholder="e.g. AWS Certified Cloud Practitioner"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Organization / Issuer</label>
                <input
                  type="text"
                  value={certModal.cert?.organization || ''}
                  onChange={(e) =>
                    setCertModal({ ...certModal, cert: { ...certModal.cert, organization: e.target.value } })
                  }
                  placeholder="e.g. Coursera, NPTEL"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Date</label>
                <input
                  type="text"
                  value={certModal.cert?.date || ''}
                  onChange={(e) => setCertModal({ ...certModal, cert: { ...certModal.cert, date: e.target.value } })}
                  placeholder="2024"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Credential ID</label>
                <input
                  type="text"
                  value={certModal.cert?.credentialId || ''}
                  onChange={(e) =>
                    setCertModal({ ...certModal, cert: { ...certModal.cert, credentialId: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Credential URL</label>
                <input
                  type="text"
                  value={certModal.cert?.credentialUrl || ''}
                  onChange={(e) =>
                    setCertModal({ ...certModal, cert: { ...certModal.cert, credentialUrl: e.target.value } })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setCertModal({ isOpen: false, cert: null })}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-mono text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (certModal.cert?.title) {
                    saveCertification(certModal.cert);
                    setCertModal({ isOpen: false, cert: null });
                  }
                }}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Achievement Modal */}
      {achieveModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-mono font-bold text-base text-slate-100 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>{achieveModal.item?.title ? 'Edit Achievement' : 'Add Achievement'}</span>
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Title *</label>
              <input
                type="text"
                value={achieveModal.item?.title || ''}
                onChange={(e) => setAchieveModal({ ...achieveModal, item: { ...achieveModal.item, title: e.target.value } })}
                placeholder="e.g. 1st Place at Hackathon"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Organization / Event</label>
                <input
                  type="text"
                  value={achieveModal.item?.organization || ''}
                  onChange={(e) =>
                    setAchieveModal({ ...achieveModal, item: { ...achieveModal.item, organization: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Date</label>
                <input
                  type="text"
                  value={achieveModal.item?.date || ''}
                  onChange={(e) => setAchieveModal({ ...achieveModal, item: { ...achieveModal.item, date: e.target.value } })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
              <textarea
                rows={2}
                value={achieveModal.item?.description || ''}
                onChange={(e) =>
                  setAchieveModal({ ...achieveModal, item: { ...achieveModal.item, description: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Event / Certificate Link</label>
              <input
                type="text"
                value={achieveModal.item?.link || ''}
                onChange={(e) => setAchieveModal({ ...achieveModal, item: { ...achieveModal.item, link: e.target.value } })}
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setAchieveModal({ isOpen: false, item: null })}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-mono text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (achieveModal.item?.title) {
                    saveAchievement(achieveModal.item);
                    setAchieveModal({ isOpen: false, item: null });
                  }
                }}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Learning Item Modal */}
      {learningModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-mono font-bold text-base text-slate-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-rose-400" />
              <span>{learningModal.item?.name ? 'Edit Learning Item' : 'Add Learning Item'}</span>
            </h3>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Technology / Topic Name *</label>
              <input
                type="text"
                value={learningModal.item?.name || ''}
                onChange={(e) => setLearningModal({ ...learningModal, item: { ...learningModal.item, name: e.target.value } })}
                placeholder="e.g. Kubernetes, Rust"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Status</label>
              <select
                value={learningModal.item?.status || 'In Progress'}
                onChange={(e) =>
                  setLearningModal({ ...learningModal, item: { ...learningModal.item, status: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              >
                <option value="Deep Dive">Deep Dive</option>
                <option value="In Progress">In Progress</option>
                <option value="Exploring">Exploring</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Brief Description</label>
              <textarea
                rows={2}
                value={learningModal.item?.description || ''}
                onChange={(e) =>
                  setLearningModal({ ...learningModal, item: { ...learningModal.item, description: e.target.value } })
                }
                placeholder="What you are exploring or building with it..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-slate-100"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setLearningModal({ isOpen: false, item: null })}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-mono text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (learningModal.item?.name) {
                    saveLearningItem(learningModal.item);
                    setLearningModal({ isOpen: false, item: null });
                  }
                }}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
