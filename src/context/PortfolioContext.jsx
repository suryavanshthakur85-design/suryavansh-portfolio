import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/defaultData';
import { useAuth } from './AuthContext';

const PortfolioContext = createContext();

const STORAGE_KEY = 'suryavansh_thakur_portfolio_data_v2';
const THEME_KEY = 'suryavansh_thakur_portfolio_theme';

export const PortfolioProvider = ({ children }) => {
  const { token, isAuthenticated, getAuthHeaders } = useAuth();

  // Theme state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme ? savedTheme : 'dark';
  });

  // Edit Mode state (only applicable when admin is authenticated)
  const [editMode, setEditMode] = useState(false);

  // If user logs out, deactivate edit mode immediately
  useEffect(() => {
    if (!isAuthenticated) {
      setEditMode(false);
    }
  }, [isAuthenticated]);

  // Admin Dashboard Modal
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Active Project for Detail Modal
  const [activeProject, setActiveProject] = useState(null);

  // Active Edit Modal item state
  const [editModalConfig, setEditModalConfig] = useState({ isOpen: false, type: null, data: null });

  // Notification Toast state
  const [toast, setToast] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

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

  // Fetch latest portfolio data from server API on mount
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && typeof serverData === 'object' && Object.keys(serverData).length > 0) {
            setData(prev => ({ ...prev, ...serverData }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
          }
        }
      } catch (err) {
        console.warn('Could not connect to /api/portfolio, using cached/local data:', err);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchServerData();
  }, []);

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

  // Helper to persist data changes to backend with Authorization check
  const persistToServer = async (updatedData, section = null) => {
    // If not authenticated, reject mutation
    if (!isAuthenticated) {
      showToast('Unauthorized: Admin authentication required to make changes.', 'error');
      return false;
    }

    try {
      const url = section ? `/api/portfolio/${section}` : '/api/portfolio';
      const method = section ? 'PATCH' : 'PUT';
      const body = section ? JSON.stringify(updatedData[section]) : JSON.stringify(updatedData);

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        showToast(errorData.error || 'Server error: Failed to save changes', 'error');
        return false;
      }

      // Sync local cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      return true;
    } catch (err) {
      console.error('Error saving data to server:', err);
      showToast('Network error: Could not reach server.', 'error');
      return false;
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleEditMode = () => {
    if (!isAuthenticated) {
      showToast('Admin authentication required.', 'error');
      return;
    }
    setEditMode(prev => {
      const next = !prev;
      showToast(next ? 'Inline Edit Mode Activated!' : 'Inline Edit Mode Deactivated.');
      return next;
    });
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const exitEditMode = () => {
    setEditMode(false);
    setEditModalConfig({ isOpen: false, type: null, data: null });
  };

  // Upload file to server
  const uploadFile = async (file) => {
    if (!isAuthenticated) {
      showToast('Unauthorized: Admin authentication required to upload files.', 'error');
      return null;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          ...getAuthHeaders()
        },
        body: formData
      });

      const resData = await res.json();
      if (!res.ok) {
        showToast(resData.error || 'File upload failed', 'error');
        return null;
      }

      showToast(`File "${resData.fileName}" uploaded successfully!`);
      return resData;
    } catch (err) {
      console.error('Upload error:', err);
      showToast('Network error during file upload', 'error');
      return null;
    }
  };

  // Hero update
  const updateHero = async (heroData) => {
    const nextData = {
      ...data,
      hero: { ...data.hero, ...heroData }
    };
    const success = await persistToServer(nextData, 'hero');
    if (success) {
      setData(nextData);
      showToast('Hero section updated & saved!');
    }
  };

  // Contact Details Update
  const updateContactDetails = async (contactObj) => {
    const nextData = {
      ...data,
      contact: {
        ...data.contact,
        ...contactObj
      },
      hero: {
        ...data.hero,
        location: contactObj.location !== undefined ? contactObj.location : data.hero.location,
        social: {
          ...data.hero.social,
          email: contactObj.email !== undefined ? contactObj.email : data.hero.social.email,
          phone: contactObj.phone !== undefined ? contactObj.phone : data.hero.social.phone,
          linkedin: contactObj.linkedin !== undefined ? contactObj.linkedin : data.hero.social.linkedin,
          github: contactObj.github !== undefined ? contactObj.github : data.hero.social.github
        }
      }
    };
    const success = await persistToServer(nextData);
    if (success) {
      setData(nextData);
      showToast('Contact details saved successfully!');
    }
  };

  // About update
  const updateAbout = async (aboutData) => {
    const nextData = {
      ...data,
      about: { ...data.about, ...aboutData }
    };
    const success = await persistToServer(nextData, 'about');
    if (success) {
      setData(nextData);
      showToast('About Me section saved!');
    }
  };

  // About Interests CRUD
  const addInterest = async (interest) => {
    if (!interest) return;
    const currentInterests = data.about?.interests || [];
    if (currentInterests.includes(interest)) return;

    const nextData = {
      ...data,
      about: {
        ...data.about,
        interests: [...currentInterests, interest]
      }
    };
    const success = await persistToServer(nextData, 'about');
    if (success) {
      setData(nextData);
      showToast(`Added interest: "${interest}"`);
    }
  };

  const removeInterest = async (interest) => {
    const currentInterests = data.about?.interests || [];
    const nextData = {
      ...data,
      about: {
        ...data.about,
        interests: currentInterests.filter(i => i !== interest)
      }
    };
    const success = await persistToServer(nextData, 'about');
    if (success) {
      setData(nextData);
      showToast(`Removed interest: "${interest}"`);
    }
  };

  // About Highlights CRUD
  const saveHighlightCard = async (highlightObj) => {
    const existing = data.about?.highlights || [];
    const index = existing.findIndex(h => h.id === highlightObj.id);
    let updated = [...existing];
    if (index >= 0) updated[index] = highlightObj;
    else updated.push(highlightObj);

    const nextData = {
      ...data,
      about: { ...data.about, highlights: updated }
    };
    const success = await persistToServer(nextData, 'about');
    if (success) {
      setData(nextData);
      showToast('Highlight card saved!');
    }
  };

  const deleteHighlightCard = async (id) => {
    const existing = data.about?.highlights || [];
    const nextData = {
      ...data,
      about: {
        ...data.about,
        highlights: existing.filter(h => h.id !== id)
      }
    };
    const success = await persistToServer(nextData, 'about');
    if (success) {
      setData(nextData);
      showToast('Highlight card deleted.');
    }
  };

  // TECHNICAL SKILLS CRUD
  const updateAllSkillCategories = async (newCategories) => {
    const nextData = {
      ...data,
      skills: {
        ...data.skills,
        categories: newCategories
      }
    };
    const success = await persistToServer(nextData, 'skills');
    if (success) {
      setData(nextData);
      showToast('Technical Skills updated & saved!');
    }
  };

  const addSkillCategory = async (categoryData) => {
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

    const nextData = {
      ...data,
      skills: {
        ...data.skills,
        categories: [...(data.skills?.categories || []), newCat]
      }
    };
    const success = await persistToServer(nextData, 'skills');
    if (success) {
      setData(nextData);
      showToast(`Skill Category "${name}" added!`);
    }
  };

  const updateSkillCategory = async (categoryId, updatedObj) => {
    const nextCategories = (data.skills?.categories || []).map(c => {
      if (c.id === categoryId) {
        return { ...c, ...updatedObj };
      }
      return c;
    });

    const nextData = {
      ...data,
      skills: {
        ...data.skills,
        categories: nextCategories
      }
    };
    const success = await persistToServer(nextData, 'skills');
    if (success) {
      setData(nextData);
      showToast('Category updated!');
    }
  };

  const removeSkillCategory = async (categoryId) => {
    const nextCategories = (data.skills?.categories || []).filter(c => c.id !== categoryId);
    const nextData = {
      ...data,
      skills: {
        ...data.skills,
        categories: nextCategories
      }
    };
    const success = await persistToServer(nextData, 'skills');
    if (success) {
      setData(nextData);
      showToast('Skill Category deleted.');
    }
  };

  const reorderSkillCategories = async (fromIndex, toIndex) => {
    const list = [...(data.skills?.categories || [])];
    if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) {
      return;
    }
    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);

    const nextData = {
      ...data,
      skills: { ...data.skills, categories: list }
    };
    const success = await persistToServer(nextData, 'skills');
    if (success) {
      setData(nextData);
    }
  };

  const addSkillToCategory = async (categoryId, skillInput) => {
    const nextCategories = (data.skills?.categories || []).map(c => {
      if (c.id === categoryId) {
        const currentSkills = Array.isArray(c.skills) ? c.skills : [];
        return { ...c, skills: [...currentSkills, skillInput] };
      }
      return c;
    });

    const nextData = {
      ...data,
      skills: {
        ...data.skills,
        categories: nextCategories
      }
    };
    const success = await persistToServer(nextData, 'skills');
    if (success) {
      setData(nextData);
      const skillName = typeof skillInput === 'string' ? skillInput : skillInput.name;
      showToast(`Skill "${skillName}" added!`);
    }
  };

  const updateSkillInCategory = async (categoryId, skillIndex, updatedSkill) => {
    const nextCategories = (data.skills?.categories || []).map(c => {
      if (c.id === categoryId) {
        const updatedList = [...c.skills];
        updatedList[skillIndex] = updatedSkill;
        return { ...c, skills: updatedList };
      }
      return c;
    });

    const nextData = {
      ...data,
      skills: {
        ...data.skills,
        categories: nextCategories
      }
    };
    const success = await persistToServer(nextData, 'skills');
    if (success) {
      setData(nextData);
      showToast('Skill updated!');
    }
  };

  const removeSkillFromCategory = async (categoryId, skillIndexOrName) => {
    const nextCategories = (data.skills?.categories || []).map(c => {
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
    });

    const nextData = {
      ...data,
      skills: {
        ...data.skills,
        categories: nextCategories
      }
    };
    const success = await persistToServer(nextData, 'skills');
    if (success) {
      setData(nextData);
      showToast('Skill deleted.');
    }
  };

  const reorderSkillsInCategory = async (categoryId, fromIndex, toIndex) => {
    const nextCategories = (data.skills?.categories || []).map(c => {
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
    });

    const nextData = {
      ...data,
      skills: {
        ...data.skills,
        categories: nextCategories
      }
    };
    const success = await persistToServer(nextData, 'skills');
    if (success) {
      setData(nextData);
    }
  };

  // Projects CRUD
  const saveProject = async (projectData) => {
    const existingIndex = (data.projects || []).findIndex(p => p.id === projectData.id);
    let updatedProjects = [...(data.projects || [])];

    if (existingIndex >= 0) {
      updatedProjects[existingIndex] = projectData;
    } else {
      updatedProjects = [projectData, ...updatedProjects];
    }

    const nextData = { ...data, projects: updatedProjects };
    const success = await persistToServer(nextData, 'projects');
    if (success) {
      setData(nextData);
      showToast(`Project "${projectData.title}" saved!`);
    }
  };

  const deleteProject = async (projectId) => {
    const updatedProjects = (data.projects || []).filter(p => p.id !== projectId);
    const nextData = { ...data, projects: updatedProjects };
    const success = await persistToServer(nextData, 'projects');
    if (success) {
      setData(nextData);
      showToast('Project deleted.');
    }
  };

  // Education CRUD
  const saveEducation = async (eduData) => {
    const index = (data.education || []).findIndex(e => e.id === eduData.id);
    let list = [...(data.education || [])];
    if (index >= 0) list[index] = eduData;
    else list.push(eduData);

    const nextData = { ...data, education: list };
    const success = await persistToServer(nextData, 'education');
    if (success) {
      setData(nextData);
      showToast('Education details saved!');
    }
  };

  const deleteEducation = async (eduId) => {
    const list = (data.education || []).filter(e => e.id !== eduId);
    const nextData = { ...data, education: list };
    const success = await persistToServer(nextData, 'education');
    if (success) {
      setData(nextData);
      showToast('Education entry deleted.');
    }
  };

  // Certifications CRUD
  const saveCertification = async (certData) => {
    const index = (data.certifications || []).findIndex(c => c.id === certData.id);
    let list = [...(data.certifications || [])];
    if (index >= 0) list[index] = certData;
    else list.push(certData);

    const nextData = { ...data, certifications: list };
    const success = await persistToServer(nextData, 'certifications');
    if (success) {
      setData(nextData);
      showToast('Certification saved!');
    }
  };

  const deleteCertification = async (certId) => {
    const list = (data.certifications || []).filter(c => c.id !== certId);
    const nextData = { ...data, certifications: list };
    const success = await persistToServer(nextData, 'certifications');
    if (success) {
      setData(nextData);
      showToast('Certification deleted.');
    }
  };

  // Achievements CRUD
  const saveAchievement = async (achData) => {
    const index = (data.achievements || []).findIndex(a => a.id === achData.id);
    let list = [...(data.achievements || [])];
    if (index >= 0) list[index] = achData;
    else list.push(achData);

    const nextData = { ...data, achievements: list };
    const success = await persistToServer(nextData, 'achievements');
    if (success) {
      setData(nextData);
      showToast('Achievement saved!');
    }
  };

  const deleteAchievement = async (achId) => {
    const list = (data.achievements || []).filter(a => a.id !== achId);
    const nextData = { ...data, achievements: list };
    const success = await persistToServer(nextData, 'achievements');
    if (success) {
      setData(nextData);
      showToast('Achievement deleted.');
    }
  };

  // Currently Exploring / Learning CRUD
  const saveLearningItem = async (item) => {
    const existing = data.exploring || [];
    const index = existing.findIndex(e => e.id === item.id);
    let updated = [...existing];
    if (index >= 0) updated[index] = item;
    else updated.push(item);

    const nextData = { ...data, exploring: updated };
    const success = await persistToServer(nextData, 'exploring');
    if (success) {
      setData(nextData);
      showToast('Learning item saved!');
    }
  };

  const deleteLearningItem = async (itemId) => {
    const updated = (data.exploring || []).filter(e => e.id !== itemId);
    const nextData = { ...data, exploring: updated };
    const success = await persistToServer(nextData, 'exploring');
    if (success) {
      setData(nextData);
      showToast('Learning item removed.');
    }
  };

  // Resume Update
  const updateResume = async (resumeData) => {
    const nextData = {
      ...data,
      resume: { ...data.resume, ...resumeData }
    };
    const success = await persistToServer(nextData, 'resume');
    if (success) {
      setData(nextData);
      showToast('Resume updated successfully!');
    }
  };

  // Reset to initial data (protected)
  const resetToDefault = async () => {
    if (!isAuthenticated) {
      showToast('Unauthorized: Admin authentication required.', 'error');
      return;
    }
    if (window.confirm('Reset all portfolio data to default for Suryavansh Thakur? All custom edits will be restored.')) {
      try {
        const res = await fetch('/api/portfolio/reset', {
          method: 'POST',
          headers: getAuthHeaders()
        });
        if (res.ok) {
          const resData = await res.json();
          setData(resData.data);
          localStorage.removeItem(STORAGE_KEY);
          showToast('Portfolio reset to initial data.');
        } else {
          showToast('Failed to reset portfolio data', 'error');
        }
      } catch (e) {
        showToast('Network error while resetting data', 'error');
      }
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
    if (!isAuthenticated) {
      showToast('Unauthorized: Admin authentication required to import data.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        const success = await persistToServer(importedData);
        if (success) {
          setData(importedData);
          showToast('Portfolio data successfully imported!');
        }
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
        setEditMode,
        activateEditMode,
        exitEditMode,
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
        isLoadingData,
        uploadFile,
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
