import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Save,
  Terminal,
  FileText,
  User,
  GraduationCap,
  FolderGit2,
  Award,
  Trophy,
  Compass,
  Mail,
  Target,
  Wrench,
  Loader2
} from 'lucide-react';

export const EditModal = () => {
  const {
    editModalConfig,
    setEditModalConfig,
    updateHero,
    updateAbout,
    updateContactDetails,
    updateResume,
    saveProject,
    saveEducation,
    saveCertification,
    saveAchievement,
    saveLearningItem,
    addSkillCategory,
    updateSkillCategory,
    uploadFile,
    data
  } = usePortfolio();

  const { isOpen, type, data: initialData } = editModalConfig;
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (type === 'project') {
        setFormData(
          initialData || {
            id: `proj-${Date.now()}`,
            title: '',
            category: data.projectCategories?.[1] || 'Web Development',
            status: 'Completed',
            date: new Date().getFullYear().toString(),
            description: '',
            image: '',
            technologies: ['React.js', 'Tailwind CSS', 'JavaScript'],
            github: '',
            demo: '',
            video: '',
            docUrl: '',
            problemStatement: '',
            solution: '',
            features: ['Responsive UI', 'Interactive Controls'],
            architecture: '',
            challenges: '',
            whatILearned: ''
          }
        );
      } else if (type === 'education') {
        setFormData(
          initialData || {
            id: `edu-${Date.now()}`,
            degree: 'Bachelor of Technology (B.Tech)',
            branch: 'Computer Science & Engineering (CSE Core)',
            institution: '',
            location: 'India',
            startYear: '2023',
            endYear: '2027',
            expectedGraduation: '2027',
            cgpa: '',
            relevantCoursework: ['Data Structures', 'OOP', 'DBMS'],
            description: '',
            achievements: '',
            image: ''
          }
        );
      } else if (type === 'learning') {
        setFormData(
          initialData || {
            id: `exp-${Date.now()}`,
            name: '',
            description: '',
            status: 'In Progress'
          }
        );
      } else if (type === 'certification') {
        setFormData(
          initialData || {
            id: `cert-${Date.now()}`,
            title: '',
            organization: '',
            date: new Date().getFullYear().toString(),
            credentialId: '',
            credentialUrl: '',
            certificateFile: ''
          }
        );
      } else if (type === 'achievement') {
        setFormData(
          initialData || {
            id: `ach-${Date.now()}`,
            title: '',
            organization: '',
            date: new Date().getFullYear().toString(),
            description: '',
            image: '',
            link: ''
          }
        );
      } else if (type === 'careerGoal') {
        setFormData(
          initialData || {
            objective: data.about?.careerGoal?.objective || '',
            futureGoals: data.about?.careerGoal?.futureGoals || '',
            areasOfInterest: data.about?.careerGoal?.areasOfInterest || ''
          }
        );
      } else if (type === 'resume') {
        setFormData(
          initialData || {
            fileName: data.resume?.fileName || 'Suryavansh_Thakur_Resume.pdf',
            resumeUrl: data.resume?.resumeUrl || '',
            lastUpdated: data.resume?.lastUpdated || 'Recently Updated'
          }
        );
      } else if (type === 'contact') {
        const heroSocial = data.hero?.social || {};
        const contactInfo = data.contact || {};
        setFormData(
          initialData || {
            email: contactInfo.email || heroSocial.email || '',
            phone: contactInfo.phone || heroSocial.phone || '',
            location: contactInfo.location || data.hero?.location || '',
            linkedin: contactInfo.linkedin || heroSocial.linkedin || '',
            github: contactInfo.github || heroSocial.github || ''
          }
        );
      } else if (type === 'skillCategory') {
        setFormData(
          initialData || {
            id: `cat-${Date.now()}`,
            name: '',
            description: '',
            icon: 'Code'
          }
        );
      } else if (type === 'hero') {
        setFormData(
          initialData || {
            name: data.hero?.name || '',
            tagline: data.hero?.tagline || '',
            bio: data.hero?.bio || '',
            availability: data.hero?.availability || '',
            location: data.hero?.location || '',
            social: { ...(data.hero?.social || {}) }
          }
        );
      } else {
        setFormData(initialData || {});
      }
    }
  }, [isOpen, type, initialData, data]);

  if (!isOpen) return null;

  const handleClose = () => {
    setEditModalConfig({ isOpen: false, type: null, data: null });
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => ({ ...prev, [fieldName]: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadFile(file);
      if (res && res.fileUrl) {
        setFormData(prev => ({
          ...prev,
          resumeUrl: res.fileUrl,
          fileName: res.fileName || file.name,
          lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        }));
      } else {
        // Fallback to local Data URL preview
        const reader = new FileReader();
        reader.onload = (ev) => {
          setFormData(prev => ({
            ...prev,
            resumeUrl: ev.target.result,
            fileName: file.name,
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          }));
        };
        reader.readAsDataURL(file);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'hero') {
      updateHero(formData);
    } else if (type === 'about') {
      updateAbout(formData);
    } else if (type === 'careerGoal') {
      updateAbout({
        ...data.about,
        careerGoal: {
          ...data.about?.careerGoal,
          ...formData
        }
      });
    } else if (type === 'project') {
      saveProject(formData);
    } else if (type === 'education') {
      saveEducation(formData);
    } else if (type === 'certification') {
      saveCertification(formData);
    } else if (type === 'achievement') {
      saveAchievement(formData);
    } else if (type === 'learning') {
      saveLearningItem(formData);
    } else if (type === 'resume') {
      updateResume(formData);
    } else if (type === 'contact') {
      updateContactDetails(formData);
    } else if (type === 'skillCategory') {
      if (initialData?.id) {
        updateSkillCategory(initialData.id, formData);
      } else {
        addSkillCategory(formData);
      }
    }
    handleClose();
  };

  const getModalTitle = () => {
    switch (type) {
      case 'hero':
        return 'Edit Hero & Profile';
      case 'about':
        return 'Edit About Me';
      case 'careerGoal':
        return 'Edit Career Goals & Objectives';
      case 'education':
        return initialData ? 'Edit Education Entry' : 'Add Education Entry';
      case 'project':
        return initialData ? 'Edit Project' : 'Add New Project';
      case 'certification':
        return initialData ? 'Edit Certification' : 'Add Certification';
      case 'achievement':
        return initialData ? 'Edit Achievement' : 'Add Achievement';
      case 'learning':
        return initialData ? 'Edit Learning Item' : 'Add Learning Item';
      case 'resume':
        return 'Edit Resume & Upload CV';
      case 'contact':
        return 'Edit Contact & Social Links';
      case 'skillCategory':
        return initialData ? 'Edit Skill Category' : 'Add Skill Category';
      default:
        return `Edit ${type || 'Item'}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col font-sans">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-mono text-sm font-bold text-slate-100">
              {getModalTitle()}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          {/* HERO SECTION EDIT */}
          {type === 'hero' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Tagline / Subtitle *</label>
                <input
                  type="text"
                  required
                  value={formData.tagline || ''}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Introduction Bio *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 leading-relaxed focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Availability Tag</label>
                  <input
                    type="text"
                    value={formData.availability || ''}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Social Links</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={formData.social?.github || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          social: { ...formData.social, github: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={formData.social?.linkedin || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          social: { ...formData.social, linkedin: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.social?.email || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          social: { ...formData.social, email: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Phone</label>
                    <input
                      type="text"
                      value={formData.social?.phone || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          social: { ...formData.social, phone: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT SECTION EDIT */}
          {type === 'about' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Section Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Short Introduction Bio</label>
                <textarea
                  rows={3}
                  value={formData.shortBio || ''}
                  onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 leading-relaxed focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Detailed Biography Paragraphs (Separated by blank lines)
                </label>
                <textarea
                  rows={5}
                  value={
                    Array.isArray(formData.description)
                      ? formData.description.join('\n\n')
                      : formData.description || ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value.split('\n\n')
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 leading-relaxed focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* CAREER GOALS EDIT */}
          {type === 'careerGoal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Career Objective</label>
                <textarea
                  rows={3}
                  value={formData.objective || ''}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  placeholder="Your primary career objective..."
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 leading-relaxed focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Future Goals</label>
                <textarea
                  rows={3}
                  value={formData.futureGoals || ''}
                  onChange={(e) => setFormData({ ...formData, futureGoals: e.target.value })}
                  placeholder="Your long-term milestones and ambitions..."
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 leading-relaxed focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Core Domains / Areas of Interest</label>
                <input
                  type="text"
                  value={formData.areasOfInterest || ''}
                  onChange={(e) => setFormData({ ...formData, areasOfInterest: e.target.value })}
                  placeholder="e.g. Full Stack Development, Cloud Computing, AI"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* EDUCATION EDIT */}
          {type === 'education' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Degree Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.degree || ''}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Branch / Specialization *</label>
                  <input
                    type="text"
                    required
                    value={formData.branch || ''}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">University / College *</label>
                  <input
                    type="text"
                    required
                    value={formData.institution || ''}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Start Year</label>
                  <input
                    type="text"
                    value={formData.startYear || ''}
                    onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={formData.expectedGraduation || formData.endYear || ''}
                    onChange={(e) => setFormData({ ...formData, expectedGraduation: e.target.value, endYear: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">CGPA / Grade</label>
                  <input
                    type="text"
                    value={formData.cgpa || ''}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Relevant Coursework (Comma separated)</label>
                <input
                  type="text"
                  value={
                    Array.isArray(formData.relevantCoursework)
                      ? formData.relevantCoursework.join(', ')
                      : formData.relevantCoursework || ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      relevantCoursework: e.target.value.split(',').map(s => s.trim())
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* PROJECT EDIT */}
          {type === 'project' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                  <select
                    value={formData.category || 'Web Development'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  >
                    {(data.projectCategories || ['All', 'Web Development', 'C/C++', 'Java', 'Python', 'AI/ML'])
                      .filter(c => c !== 'All')
                      .map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Short Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 leading-relaxed focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Project Image (URL or file)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image')}
                    className="text-xs text-slate-400"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-slate-700" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Technologies Used (Comma separated)</label>
                <input
                  type="text"
                  value={
                    Array.isArray(formData.technologies)
                      ? formData.technologies.join(', ')
                      : formData.technologies || ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technologies: e.target.value.split(',').map(s => s.trim())
                    })
                  }
                  placeholder="e.g. React.js, Node.js, Tailwind CSS"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Link</label>
                  <input
                    type="text"
                    value={formData.github || ''}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Live Demo Link</label>
                  <input
                    type="text"
                    value={formData.demo || ''}
                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* CERTIFICATION EDIT */}
          {type === 'certification' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Certification Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Organization / Issuer *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization || formData.issuer || ''}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value, issuer: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Credential URL</label>
                <input
                  type="text"
                  value={formData.credentialUrl || ''}
                  onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* ACHIEVEMENT EDIT */}
          {type === 'achievement' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Achievement Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Organization / Event</label>
                  <input
                    type="text"
                    value={formData.organization || ''}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Date</label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 leading-relaxed focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Certificate / Event Link</label>
                <input
                  type="text"
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* LEARNING ITEM EDIT */}
          {type === 'learning' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Topic / Technology Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 leading-relaxed focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Status</label>
                <select
                  value={formData.status || 'In Progress'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Exploring">Exploring</option>
                  <option value="Deep Dive">Deep Dive</option>
                  <option value="Planned">Planned</option>
                </select>
              </div>
            </div>
          )}

          {/* RESUME EDIT */}
          {type === 'resume' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Display File Name</label>
                <input
                  type="text"
                  value={formData.fileName || ''}
                  onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                  placeholder="e.g. Suryavansh_Thakur_Resume.pdf"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Upload New Resume File (PDF / DOC)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeFileUpload}
                    disabled={isUploading}
                    className="text-xs text-slate-400"
                  />
                  {isUploading && (
                    <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Or Direct Resume URL / Path</label>
                <input
                  type="text"
                  value={formData.resumeUrl || ''}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  placeholder="/uploads/resume.pdf or external link"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Last Updated Tag</label>
                <input
                  type="text"
                  value={formData.lastUpdated || ''}
                  onChange={(e) => setFormData({ ...formData, lastUpdated: e.target.value })}
                  placeholder="e.g. September 2026"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* CONTACT & SOCIAL EDIT */}
          {type === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Profile</label>
                  <input
                    type="text"
                    value={formData.github || ''}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SKILL CATEGORY EDIT */}
          {type === 'skillCategory' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Programming Languages"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Core languages used for software development"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Icon Style</label>
                <select
                  value={formData.icon || 'Code'}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Code">Code</option>
                  <option value="Layers">Layers / Frontend</option>
                  <option value="Server">Server / Backend</option>
                  <option value="Database">Database</option>
                  <option value="Cpu">CPU / Computer Science</option>
                  <option value="Globe">Globe / Web</option>
                  <option value="Wrench">Wrench / Tools</option>
                  <option value="Shield">Shield / Security</option>
                  <option value="Binary">Binary</option>
                  <option value="FolderGit2">Git</option>
                </select>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 sticky bottom-0 bg-slate-900/95 backdrop-blur-md">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold font-mono transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
