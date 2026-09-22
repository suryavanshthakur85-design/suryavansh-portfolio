import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Upload, Plus, Trash2, Save, Terminal } from 'lucide-react';

export const EditModal = () => {
  const {
    editModalConfig,
    setEditModalConfig,
    updateHero,
    updateAbout,
    saveProject,
    saveEducation,
    saveCertification,
    saveAchievement,
    saveLearningItem,
    data
  } = usePortfolio();

  const { isOpen, type, data: initialData } = editModalConfig;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (type === 'project') {
        setFormData(
          initialData || {
            id: `proj-${Date.now()}`,
            title: '',
            category: data.projectCategories[1] || 'Web Development',
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
      } else {
        setFormData(initialData || {});
      }
    }
  }, [isOpen, type, initialData, data.projectCategories]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'hero') {
      updateHero(formData);
    } else if (type === 'about') {
      updateAbout(formData);
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
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="terminal-header justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-slate-300 capitalize">
              Edit {type} Form
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          {/* HERO SECTION EDIT */}
          {type === 'hero' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Tagline / Subtitle</label>
                <input
                  type="text"
                  required
                  value={formData.tagline || ''}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Introduction Bio</label>
                <textarea
                  rows={4}
                  required
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.social?.github || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, github: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.social?.linkedin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, linkedin: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.social?.email || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, email: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.social?.phone || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, phone: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
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
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Short Introduction Bio</label>
                <textarea
                  rows={2}
                  value={formData.shortBio || ''}
                  onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Detailed Biography Paragraphs (Separated by newlines)
                </label>
                <textarea
                  rows={4}
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
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              {/* Career Goals */}
              <div className="border-t border-slate-800 pt-3 space-y-3">
                <h4 className="text-xs font-mono text-amber-400 font-bold uppercase">Career Goal & Objectives</h4>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Career Objective</label>
                  <input
                    type="text"
                    value={formData.careerGoal?.objective || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        careerGoal: { ...formData.careerGoal, objective: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Future Goals</label>
                  <input
                    type="text"
                    value={formData.careerGoal?.futureGoals || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        careerGoal: { ...formData.careerGoal, futureGoals: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
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
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Branch / Specialization *</label>
                  <input
                    type="text"
                    required
                    value={formData.branch || ''}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
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
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Location (Optional)</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
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
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Expected Graduation / End</label>
                  <input
                    type="text"
                    value={formData.expectedGraduation || formData.endYear || ''}
                    onChange={(e) => setFormData({ ...formData, expectedGraduation: e.target.value, endYear: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">CGPA / Percentage (Optional)</label>
                  <input
                    type="text"
                    value={formData.cgpa || ''}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Relevant Coursework (Comma separated)
                </label>
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
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>
            </div>
          )}

          {/* LEARNING ITEM EDIT */}
          {type === 'learning' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Technology / Subject Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Learning Status</label>
                <select
                  value={formData.status || 'In Progress'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Exploring">Exploring</option>
                  <option value="Deep Dive">Deep Dive</option>
                  <option value="Planned">Planned</option>
                </select>
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
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                  <select
                    value={formData.category || 'Web Development'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  >
                    {data.projectCategories.filter(c => c !== 'All').map(c => (
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
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Project Thumbnail/Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image')}
                    className="text-xs text-slate-400"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-12 h-12 object-cover rounded-lg border" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Technologies Used (Comma separated e.g. React, Python, C++)
                </label>
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
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Repository Link</label>
                  <input
                    type="text"
                    value={formData.github || ''}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Live Demo Link</label>
                  <input
                    type="text"
                    value={formData.demo || ''}
                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
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
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization || formData.issuer || ''}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value, issuer: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Credential URL</label>
                <input
                  type="text"
                  value={formData.credentialUrl || ''}
                  onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
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
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Organization / Event</label>
                  <input
                    type="text"
                    value={formData.organization || ''}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Date</label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>
            </div>
          )}

          {/* Form Submit Footer */}
          <div className="pt-4 border-t border-slate-800 light:border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700 text-xs font-bold font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
