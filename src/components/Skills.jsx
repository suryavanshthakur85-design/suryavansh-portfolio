import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Terminal,
  Plus,
  X,
  Trash2,
  Edit2,
  Code,
  Database,
  Cpu,
  Wrench,
  Layers,
  Brain,
  Cloud,
  Globe,
  Server,
  Sparkles,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Check,
  AlertTriangle,
  Save,
  RotateCcw
} from 'lucide-react';

export const Skills = () => {
  const {
    data,
    editMode: globalEditMode,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    reorderSkillCategories,
    addSkillToCategory,
    updateSkillInCategory,
    removeSkillFromCategory,
    reorderSkillsInCategory,
    updateAllSkillCategories,
    showToast
  } = usePortfolio();

  const { categories } = data.skills;

  // Local Edit Skills toggle state
  const [sectionEditMode, setSectionEditMode] = useState(false);
  const isEditing = globalEditMode || sectionEditMode;

  // Backup data state for Cancel functionality
  const [originalCategoriesBackup, setOriginalCategoriesBackup] = useState(null);

  // Modal States
  const [categoryModal, setCategoryModal] = useState({ isOpen: false, mode: 'add', category: null });
  const [skillModal, setSkillModal] = useState({ isOpen: false, categoryId: null, skillIndex: null, skill: null });
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ isOpen: false, type: null, categoryId: null, skillIndex: null, name: '', hasSkills: false });

  // Form Field States
  const [catForm, setCatForm] = useState({ name: '', description: '', icon: 'Code' });
  const [skillForm, setSkillForm] = useState({ name: '', icon: '', description: '' });

  // Available Icon Map
  const ICON_OPTIONS = [
    { name: 'Code', icon: Code },
    { name: 'Cpu', icon: Cpu },
    { name: 'Layers', icon: Layers },
    { name: 'Database', icon: Database },
    { name: 'Wrench', icon: Wrench },
    { name: 'Brain', icon: Brain },
    { name: 'Terminal', icon: Terminal },
    { name: 'Cloud', icon: Cloud },
    { name: 'Globe', icon: Globe },
    { name: 'Server', icon: Server },
    { name: 'Sparkles', icon: Sparkles },
    { name: 'BookOpen', icon: BookOpen }
  ];

  const renderIcon = (iconName, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Cpu': return <Cpu className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Database': return <Database className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'Terminal': return <Terminal className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Server': return <Server className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Code':
      default: return <Code className={className} />;
    }
  };

  // Toggle Section Edit Mode
  const handleToggleEditSkills = () => {
    if (!sectionEditMode) {
      setOriginalCategoriesBackup(JSON.parse(JSON.stringify(categories)));
      setSectionEditMode(true);
      showToast('Edit Skills mode enabled! You can now manage categories and skills.');
    } else {
      setSectionEditMode(false);
    }
  };

  // Save all changes
  const handleSaveSection = () => {
    setSectionEditMode(false);
    setOriginalCategoriesBackup(null);
    showToast('Technical Skills section changes saved!');
  };

  // Cancel & discard unsaved changes
  const handleCancelSection = () => {
    if (originalCategoriesBackup) {
      updateAllSkillCategories(originalCategoriesBackup);
    }
    setSectionEditMode(false);
    setOriginalCategoriesBackup(null);
    showToast('Unsaved skill changes discarded.', 'error');
  };

  // --- Category Handlers ---
  const openAddCategoryModal = () => {
    setCatForm({ name: '', description: '', icon: 'Brain' });
    setCategoryModal({ isOpen: true, mode: 'add', category: null });
  };

  const openEditCategoryModal = (cat) => {
    setCatForm({
      name: cat.name || '',
      description: cat.description || '',
      icon: cat.icon || 'Code'
    });
    setCategoryModal({ isOpen: true, mode: 'edit', category: cat });
  };

  const handleCategoryFormSubmit = (e) => {
    e.preventDefault();
    if (!catForm.name.trim()) return;

    if (categoryModal.mode === 'add') {
      addSkillCategory({
        name: catForm.name.trim(),
        description: catForm.description.trim(),
        icon: catForm.icon
      });
    } else if (categoryModal.mode === 'edit' && categoryModal.category) {
      updateSkillCategory(categoryModal.category.id, {
        name: catForm.name.trim(),
        description: catForm.description.trim(),
        icon: catForm.icon
      });
    }
    setCategoryModal({ isOpen: false, mode: 'add', category: null });
  };

  const openDeleteCategoryConfirm = (cat) => {
    const hasSkills = Array.isArray(cat.skills) && cat.skills.length > 0;
    setDeleteConfirmModal({
      isOpen: true,
      type: 'category',
      categoryId: cat.id,
      name: cat.name,
      hasSkills
    });
  };

  // --- Skill Handlers ---
  const openAddSkillModal = (categoryId) => {
    setSkillForm({ name: '', icon: '', description: '' });
    setSkillModal({ isOpen: true, categoryId, skillIndex: null, skill: null });
  };

  const openEditSkillModal = (categoryId, skillIndex, skill) => {
    const isObj = typeof skill === 'object' && skill !== null;
    setSkillForm({
      name: isObj ? skill.name : skill,
      icon: isObj ? skill.icon || '' : '',
      description: isObj ? skill.description || '' : ''
    });
    setSkillModal({ isOpen: true, categoryId, skillIndex, skill });
  };

  const handleSkillFormSubmit = (e) => {
    e.preventDefault();
    if (!skillForm.name.trim() || !skillModal.categoryId) return;

    const newSkillData = {
      name: skillForm.name.trim(),
      ...(skillForm.description.trim() ? { description: skillForm.description.trim() } : {}),
      ...(skillForm.icon.trim() ? { icon: skillForm.icon.trim() } : {})
    };

    // If no extra description or icon, save clean string or object
    const skillValue = (newSkillData.description || newSkillData.icon)
      ? newSkillData
      : newSkillData.name;

    if (skillModal.skillIndex !== null) {
      updateSkillInCategory(skillModal.categoryId, skillModal.skillIndex, skillValue);
    } else {
      addSkillToCategory(skillModal.categoryId, skillValue);
    }

    setSkillModal({ isOpen: false, categoryId: null, skillIndex: null, skill: null });
  };

  const openDeleteSkillConfirm = (categoryId, skillIndex, skill) => {
    const name = typeof skill === 'string' ? skill : skill.name;
    setDeleteConfirmModal({
      isOpen: true,
      type: 'skill',
      categoryId,
      skillIndex,
      name,
      hasSkills: false
    });
  };

  // Confirm Deletion Execution
  const handleConfirmDelete = () => {
    if (deleteConfirmModal.type === 'category' && deleteConfirmModal.categoryId) {
      removeSkillCategory(deleteConfirmModal.categoryId);
    } else if (deleteConfirmModal.type === 'skill' && deleteConfirmModal.categoryId && deleteConfirmModal.skillIndex !== null) {
      removeSkillFromCategory(deleteConfirmModal.categoryId, deleteConfirmModal.skillIndex);
    }
    setDeleteConfirmModal({ isOpen: false, type: null, categoryId: null, skillIndex: null, name: '', hasSkills: false });
  };

  return (
    <section id="skills" className="py-20 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Technical Skills
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              * Categorized technical proficiencies & core computer science knowledge
            </p>
          </div>

          {/* Edit Skills Section Toggle & Save/Cancel Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {sectionEditMode && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveSection}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancelSection}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 border border-slate-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}

            <button
              onClick={handleToggleEditSkills}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all border shadow-lg ${
                isEditing
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                  : 'bg-slate-800/80 light:bg-slate-100 border-slate-700 light:border-slate-300 text-slate-200 light:text-slate-800 hover:border-cyan-500/50'
              }`}
            >
              <Edit2 className="w-4 h-4 text-cyan-400" />
              <span>{isEditing ? 'Edit Skills Mode Active' : 'Edit Skills ✏️'}</span>
            </button>
          </div>
        </div>

        {/* Status Indicator Bar when Edit Mode is active */}
        {isEditing && (
          <div className="mb-8 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs font-mono text-cyan-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Edit Mode Active: You can edit categories, add skills, reorder items, or create custom categories below.
            </span>
          </div>
        )}

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, catIdx) => (
            <div
              key={category.id}
              className="p-6 rounded-2xl bg-slate-900/90 light:bg-white border border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-all shadow-md flex flex-col justify-between group relative"
            >
              <div>
                {/* Category Card Header */}
                <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-800 light:border-slate-200 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-800 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-cyan-400">
                      {renderIcon(category.icon || 'Code')}
                    </div>
                    <div>
                      <h3 className="font-bold font-mono text-slate-100 light:text-slate-900 text-base flex items-center gap-1.5">
                        <span>{category.name}</span>
                      </h3>
                      {category.description && (
                        <p className="text-[11px] text-slate-400 light:text-slate-500 font-mono mt-0.5 line-clamp-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category Controls (Edit / Reorder / Delete) */}
                  {isEditing && (
                    <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
                      {/* Reorder Left/Up */}
                      <button
                        onClick={() => reorderSkillCategories(catIdx, catIdx - 1)}
                        disabled={catIdx === 0}
                        className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-30"
                        title="Move category left/up"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      {/* Reorder Right/Down */}
                      <button
                        onClick={() => reorderSkillCategories(catIdx, catIdx + 1)}
                        disabled={catIdx === categories.length - 1}
                        className="p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-30"
                        title="Move category right/down"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Category */}
                      <button
                        onClick={() => openEditCategoryModal(category)}
                        className="p-1 text-cyan-400 hover:text-cyan-300"
                        title="Edit category"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Category */}
                      <button
                        onClick={() => openDeleteCategoryConfirm(category)}
                        className="p-1 text-rose-400 hover:text-rose-300"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Skill Pills Container */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.skills &&
                    category.skills.map((skill, sIdx) => {
                      const isObj = typeof skill === 'object' && skill !== null;
                      const skillName = isObj ? skill.name : skill;
                      const skillIcon = isObj ? skill.icon : '';

                      return (
                        <div
                          key={sIdx}
                          className="group/pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-slate-200 light:text-slate-800 text-xs font-mono font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                        >
                          {skillIcon && <span>{skillIcon}</span>}
                          <span>{skillName}</span>

                          {/* Skill Controls when Edit Mode active */}
                          {isEditing && (
                            <div className="inline-flex items-center gap-1 ml-1 pl-1 border-l border-slate-700">
                              {/* Reorder Skill Left */}
                              <button
                                onClick={() => reorderSkillsInCategory(category.id, sIdx, sIdx - 1)}
                                disabled={sIdx === 0}
                                className="text-slate-400 hover:text-cyan-400 disabled:opacity-30 text-[10px]"
                                title="Move left"
                              >
                                &larr;
                              </button>
                              {/* Reorder Skill Right */}
                              <button
                                onClick={() => reorderSkillsInCategory(category.id, sIdx, sIdx + 1)}
                                disabled={sIdx === category.skills.length - 1}
                                className="text-slate-400 hover:text-cyan-400 disabled:opacity-30 text-[10px]"
                                title="Move right"
                              >
                                &rarr;
                              </button>
                              {/* Edit Skill */}
                              <button
                                onClick={() => openEditSkillModal(category.id, sIdx, skill)}
                                className="text-cyan-400 hover:text-cyan-300"
                                title="Edit skill"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              {/* Delete Skill */}
                              <button
                                onClick={() => openDeleteSkillConfirm(category.id, sIdx, skill)}
                                className="text-rose-400 hover:text-rose-300"
                                title="Delete skill"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                  {(!category.skills || category.skills.length === 0) && (
                    <p className="text-xs text-slate-500 italic py-2">No skills in this category yet.</p>
                  )}
                </div>
              </div>

              {/* Add Skill Button inside Category */}
              {isEditing && (
                <div className="pt-3 border-t border-slate-800/60 light:border-slate-200">
                  <button
                    onClick={() => openAddSkillModal(category.id)}
                    className="w-full py-2 bg-slate-800/60 hover:bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold rounded-xl border border-dashed border-cyan-500/40 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Skill</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Skill Category Button */}
        {isEditing && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={openAddCategoryModal}
              className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-extrabold rounded-2xl shadow-xl flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Skill Category</span>
            </button>
          </div>
        )}
      </div>

      {/* --- CATEGORY EDIT / ADD MODAL --- */}
      {categoryModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold font-mono text-slate-100 light:text-slate-900">
                {categoryModal.mode === 'add' ? 'Add New Skill Category' : 'Edit Category'}
              </h3>
              <button
                onClick={() => setCategoryModal({ isOpen: false, mode: 'add', category: null })}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategoryFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI & Machine Learning"
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 light:bg-slate-100 border border-slate-700 text-xs text-slate-100 light:text-slate-900 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Models, frameworks, and data libraries"
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 light:bg-slate-100 border border-slate-700 text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">Category Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {ICON_OPTIONS.map((opt) => {
                    const IconC = opt.icon;
                    const isSel = catForm.icon === opt.name;
                    return (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setCatForm({ ...catForm, icon: opt.name })}
                        className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                          isSel
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <IconC className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCategoryModal({ isOpen: false, mode: 'add', category: null })}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-mono font-bold hover:bg-cyan-400"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SKILL EDIT / ADD MODAL --- */}
      {skillModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold font-mono text-slate-100 light:text-slate-900">
                {skillModal.skillIndex !== null ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button
                onClick={() => setSkillModal({ isOpen: false, categoryId: null, skillIndex: null, skill: null })}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSkillFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PyTorch"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 light:bg-slate-100 border border-slate-700 text-xs text-slate-100 light:text-slate-900 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Optional Skill Icon (Emoji)</label>
                <input
                  type="text"
                  placeholder="e.g. ⚡ or 🤖"
                  value={skillForm.icon}
                  onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 light:bg-slate-100 border border-slate-700 text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Optional Description</label>
                <input
                  type="text"
                  placeholder="e.g. Deep learning models"
                  value={skillForm.description}
                  onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 light:bg-slate-100 border border-slate-700 text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSkillModal({ isOpen: false, categoryId: null, skillIndex: null, skill: null })}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-mono font-bold hover:bg-cyan-400"
                >
                  {skillModal.skillIndex !== null ? 'Save' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION MODAL FOR DELETION --- */}
      {deleteConfirmModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono text-slate-100 light:text-slate-900">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
              {deleteConfirmModal.type === 'category' ? (
                deleteConfirmModal.hasSkills ? (
                  <span className="text-rose-400 font-bold">
                    This category contains skills. Deleting it will remove the category "{deleteConfirmModal.name}" and all its skills.
                  </span>
                ) : (
                  `Are you sure you want to delete the category "${deleteConfirmModal.name}"?`
                )
              ) : (
                `Are you sure you want to delete the skill "${deleteConfirmModal.name}"?`
              )}
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteConfirmModal({ isOpen: false, type: null, categoryId: null, skillIndex: null, name: '', hasSkills: false })}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-mono font-bold shadow-lg shadow-rose-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
