import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/defaultData';

const PortfolioContext = createContext();

const STORAGE_KEY = 'suryavansh_thakur_portfolio_data_v2';
const THEME_KEY = 'suryavansh_thakur_portfolio_theme';

export const PortfolioProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme ? savedTheme : 'dark';
  });

  // Global Edit Mode state
  const [editMode, setEditMode] = useState(false);

  // Admin Dashboard Modal
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Active Project for Detail Modal
  const [activeProject, setActiveProject] = useState(null);

  // Active Edit Modal item state
  const [editModalConfig, setEditModalConfig] = useState({ isOpen: false, type: null, data: null });

  // Notification Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Portfolio Data state
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        return { ...initialPortfolioData, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage', e);
    }
    return initialPortfolioData;
  });

  // Persist Theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Persist Data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  }, [data]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleEditMode = () => {
    setEditMode(prev => {
      const next = !prev;
      showToast(next ? 'Edit Mode Activated! Customize your portfolio anytime.' : 'Edit Mode Deactivated.');
      return next;
    });
  };

  // Hero update
  const updateHero = (heroData) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...heroData }
    }));
    showToast('Hero section updated!');
  };

  // Contact Details Update (Synchronizes contact and hero.social)
  const updateContactDetails = (contactObj) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        ...contactObj
      },
      hero: {
        ...prev.hero,
        location: contactObj.location !== undefined ? contactObj.location : prev.hero.location,
        social: {
          ...prev.hero.social,
          email: contactObj.email !== undefined ? contactObj.email : prev.hero.social.email,
          phone: contactObj.phone !== undefined ? contactObj.phone : prev.hero.social.phone,
          linkedin: contactObj.linkedin !== undefined ? contactObj.linkedin : prev.hero.social.linkedin,
          github: contactObj.github !== undefined ? contactObj.github : prev.hero.social.github
        }
      }
    }));
    showToast('Contact details saved!');
  };

  // About update
  const updateAbout = (aboutData) => {
    setData(prev => ({
      ...prev,
      about: { ...prev.about, ...aboutData }
    }));
    showToast('About Me section updated!');
  };

  // About Interests CRUD
  const addInterest = (interest) => {
    if (!interest) return;
    setData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        interests: prev.about.interests.includes(interest)
          ? prev.about.interests
          : [...prev.about.interests, interest]
      }
    }));
    showToast(`Added interest: "${interest}"`);
  };

  const removeInterest = (interest) => {
    setData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        interests: prev.about.interests.filter(i => i !== interest)
      }
    }));
    showToast(`Removed interest: "${interest}"`);
  };

  // About Highlights CRUD
  const saveHighlightCard = (highlightObj) => {
    setData(prev => {
      const existing = prev.about.highlights || [];
      const index = existing.findIndex(h => h.id === highlightObj.id);
      let updated = [...existing];
      if (index >= 0) updated[index] = highlightObj;
      else updated.push(highlightObj);
      return {
        ...prev,
        about: { ...prev.about, highlights: updated }
      };
    });
    showToast('Highlight card saved!');
  };

  const deleteHighlightCard = (id) => {
    setData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        highlights: (prev.about.highlights || []).filter(h => h.id !== id)
      }
    }));
    showToast('Highlight card deleted.');
  };

  // TECHNICAL SKILLS CRUD
  const updateAllSkillCategories = (newCategories) => {
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        categories: newCategories
      }
    }));
    showToast('Technical Skills updated & saved successfully!');
  };

  const addSkillCategory = (categoryData) => {
    const name = typeof categoryData === 'string' ? categoryData : categoryData.name;
    const desc = typeof categoryData === 'object' ? categoryData.description || '' : '';
    const icon = typeof categoryData === 'object' ? categoryData.icon || 'Code' : 'Code';
    const newId = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();

    const newCat = {
      id: newId,
      name,
      description: desc,
      icon,
      skills: []
    };

    setData(prev => ({
      ...prev,
      skills: {
        categories: [...prev.skills.categories, newCat]
      }
    }));
    showToast(`Skill Category "${name}" added!`);
  };

  const updateSkillCategory = (categoryId, updatedObj) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.map(c => {
          if (c.id === categoryId) {
            return { ...c, ...updatedObj };
          }
          return c;
        })
      }
    }));
    showToast('Category updated!');
  };

  const removeSkillCategory = (categoryId) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.filter(c => c.id !== categoryId)
      }
    }));
    showToast('Skill Category deleted.');
  };

  const reorderSkillCategories = (fromIndex, toIndex) => {
    setData(prev => {
      const list = [...prev.skills.categories];
      if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) {
        return prev;
      }
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return {
        ...prev,
        skills: { ...prev.skills, categories: list }
      };
    });
  };

  const addSkillToCategory = (categoryId, skillInput) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.map(c => {
          if (c.id === categoryId) {
            const currentSkills = Array.isArray(c.skills) ? c.skills : [];
            return { ...c, skills: [...currentSkills, skillInput] };
          }
          return c;
        })
      }
    }));
    const skillName = typeof skillInput === 'string' ? skillInput : skillInput.name;
    showToast(`Skill "${skillName}" added!`);
  };

  const updateSkillInCategory = (categoryId, skillIndex, updatedSkill) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.map(c => {
          if (c.id === categoryId) {
            const updatedList = [...c.skills];
            updatedList[skillIndex] = updatedSkill;
            return { ...c, skills: updatedList };
          }
          return c;
        })
      }
    }));
    showToast('Skill updated!');
  };

  const removeSkillFromCategory = (categoryId, skillIndexOrName) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.map(c => {
          if (c.id === categoryId) {
            let filtered;
            if (typeof skillIndexOrName === 'number') {
              filtered = c.skills.filter((_, idx) => idx !== skillIndexOrName);
            } else {
              filtered = c.skills.filter(s => (typeof s === 'string' ? s : s.name) !== skillIndexOrName);
            }
            return { ...c, skills: filtered };
          }
          return c;
        })
      }
    }));
    showToast('Skill deleted.');
  };

  const reorderSkillsInCategory = (categoryId, fromIndex, toIndex) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.map(c => {
          if (c.id === categoryId) {
            const list = [...c.skills];
            if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) {
              return c;
            }
            const [moved] = list.splice(fromIndex, 1);
            list.splice(toIndex, 0, moved);
            return { ...c, skills: list };
          }
          return c;
        })
      }
    }));
  };

  // Projects CRUD
  const saveProject = (projectData) => {
    setData(prev => {
      const existingIndex = prev.projects.findIndex(p => p.id === projectData.id);
      let updatedProjects = [...prev.projects];

      if (existingIndex >= 0) {
        updatedProjects[existingIndex] = projectData;
      } else {
        updatedProjects = [projectData, ...updatedProjects];
      }

      return { ...prev, projects: updatedProjects };
    });
    showToast(`Project "${projectData.title}" saved!`);
  };

  const deleteProject = (projectId) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
    showToast('Project deleted.');
  };

  // Education CRUD
  const saveEducation = (eduData) => {
    setData(prev => {
      const index = prev.education.findIndex(e => e.id === eduData.id);
      let list = [...prev.education];
      if (index >= 0) list[index] = eduData;
      else list.push(eduData);
      return { ...prev, education: list };
    });
    showToast('Education details saved!');
  };

  const deleteEducation = (eduId) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== eduId)
    }));
    showToast('Education entry deleted.');
  };

  // Certifications CRUD
  const saveCertification = (certData) => {
    setData(prev => {
      const index = prev.certifications.findIndex(c => c.id === certData.id);
      let list = [...prev.certifications];
      if (index >= 0) list[index] = certData;
      else list.push(certData);
      return { ...prev, certifications: list };
    });
    showToast('Certification saved!');
  };

  const deleteCertification = (certId) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== certId)
    }));
    showToast('Certification deleted.');
  };

  // Achievements CRUD
  const saveAchievement = (achData) => {
    setData(prev => {
      const index = prev.achievements.findIndex(a => a.id === achData.id);
      let list = [...prev.achievements];
      if (index >= 0) list[index] = achData;
      else list.push(achData);
      return { ...prev, achievements: list };
    });
    showToast('Achievement saved!');
  };

  const deleteAchievement = (achId) => {
    setData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a.id !== achId)
    }));
    showToast('Achievement deleted.');
  };

  // Currently Exploring / Learning CRUD
  const saveLearningItem = (item) => {
    setData(prev => {
      const existing = prev.exploring || [];
      const index = existing.findIndex(e => e.id === item.id);
      let updated = [...existing];
      if (index >= 0) updated[index] = item;
      else updated.push(item);
      return { ...prev, exploring: updated };
    });
    showToast('Learning item saved!');
  };

  const deleteLearningItem = (itemId) => {
    setData(prev => ({
      ...prev,
      exploring: (prev.exploring || []).filter(e => e.id !== itemId)
    }));
    showToast('Learning item removed.');
  };

  // Resume Upload
  const updateResume = (resumeData) => {
    setData(prev => ({
      ...prev,
      resume: { ...prev.resume, ...resumeData }
    }));
    showToast('Resume updated successfully!');
  };

  // Reset to initial data
  const resetToDefault = () => {
    if (window.confirm('Reset all portfolio data to default for Suryavansh Thakur? All custom edits will be restored to original template.')) {
      setData(initialPortfolioData);
      localStorage.removeItem(STORAGE_KEY);
      showToast('Portfolio reset to initial data.');
    }
  };

  // Export JSON
  const exportDataJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'suryavansh-thakur-portfolio-data.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Portfolio data exported as JSON file!');
  };

  // Import JSON
  const importDataJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        setData(importedData);
        showToast('Portfolio data successfully imported!');
      } catch (err) {
        showToast('Invalid JSON file format', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        editMode,
        toggleEditMode,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
        data,
        activeProject,
        setActiveProject,
        editModalConfig,
        setEditModalConfig,
        toast,
        showToast,
        updateHero,
        updateContactDetails,
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
        resetToDefault,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
