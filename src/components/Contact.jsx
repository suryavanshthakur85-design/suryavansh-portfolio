import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Terminal,
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Plus,
  Trash2,
  ExternalLink,
  Globe,
  MessageSquare,
  X
} from 'lucide-react';

export const Contact = () => {
  const { data, editMode, updateContactDetails, showToast } = usePortfolio();

  // Extract contact & hero info cleanly
  const contactInfo = data.contact || {};
  const heroSocial = data.hero?.social || {};

  const email = contactInfo.email !== undefined ? contactInfo.email : heroSocial.email || '';
  const phone = contactInfo.phone !== undefined ? contactInfo.phone : heroSocial.phone || '';
  const linkedin = contactInfo.linkedin !== undefined ? contactInfo.linkedin : heroSocial.linkedin || '';
  const github = contactInfo.github !== undefined ? contactInfo.github : heroSocial.github || '';
  const location = contactInfo.location !== undefined ? contactInfo.location : data.hero?.location || '';
  const additionalLinks = contactInfo.additionalLinks || [];

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    location: '',
    additionalLinks: []
  });

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Open Edit Contact Modal
  const openEditContactModal = () => {
    setEditForm({
      email: email || '',
      phone: phone || '',
      linkedin: linkedin || '',
      github: github || '',
      location: location || '',
      additionalLinks: [...additionalLinks]
    });
    setShowEditModal(true);
  };

  // Submit Edit Contact Form
  const handleSaveContactSubmit = (e) => {
    e.preventDefault();
    updateContactDetails(editForm);
    setShowEditModal(false);
  };

  // Custom Links Management in Modal
  const handleAddCustomLink = () => {
    setEditForm(prev => ({
      ...prev,
      additionalLinks: [...prev.additionalLinks, { label: '', url: '' }]
    }));
  };

  const handleCustomLinkChange = (index, field, value) => {
    setEditForm(prev => {
      const updated = [...prev.additionalLinks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, additionalLinks: updated };
    });
  };

  const handleRemoveCustomLink = (index) => {
    setEditForm(prev => ({
      ...prev,
      additionalLinks: prev.additionalLinks.filter((_, i) => i !== index)
    }));
  };

  // Contact Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      showToast('Thank you! Your message has been sent successfully.');
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 4000);
    }
  };

  // Check if any direct contact details exist
  const hasContactInfo =
    (email && email.trim()) ||
    (phone && phone.trim()) ||
    (linkedin && linkedin.trim()) ||
    (github && github.trim()) ||
    (location && location.trim()) ||
    (additionalLinks && additionalLinks.length > 0);

  return (
    <section id="contact" className="py-20 relative bg-slate-900/40 light:bg-slate-50 border-t border-slate-800/60 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight">
              Contact Me
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Open to technical discussions, collaborations, and project inquiries.
            </p>
          </div>

          <button
            onClick={openEditContactModal}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold flex items-center gap-2 shadow-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Contact ✏️</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info (Rendered ONLY if non-empty!) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl space-y-6 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-mono text-slate-100 light:text-slate-900">
                  Contact Information
                </h3>

                {editMode && (
                  <button
                    onClick={openEditContactModal}
                    className="p-1.5 bg-slate-800 text-cyan-400 rounded-lg border border-slate-700 hover:bg-slate-700"
                    title="Edit Contact Info"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                Feel free to reach out directly via email, phone, or connect with me on professional platforms.
              </p>

              {/* Render contact cards conditionally ONLY if populated! */}
              <div className="space-y-4 pt-2">
                {email && email.trim() !== '' && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono uppercase text-slate-400">Email Address</p>
                      <p className="text-xs sm:text-sm font-bold font-mono text-slate-100 light:text-slate-800 truncate">
                        {email}
                      </p>
                    </div>
                  </a>
                )}

                {phone && phone.trim() !== '' && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase text-slate-400">Phone</p>
                      <p className="text-xs sm:text-sm font-bold font-mono text-slate-100 light:text-slate-800">
                        {phone}
                      </p>
                    </div>
                  </a>
                )}

                {location && location.trim() !== '' && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase text-slate-400">Location</p>
                      <p className="text-xs sm:text-sm font-bold font-mono text-slate-100 light:text-slate-800">
                        {location}
                      </p>
                    </div>
                  </div>
                )}

                {github && github.trim() !== '' && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-slate-700/50 text-slate-200 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                      <Github className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono uppercase text-slate-400">GitHub Profile</p>
                      <p className="text-xs sm:text-sm font-bold font-mono text-slate-100 light:text-slate-800 truncate">
                        {github.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                )}

                {linkedin && linkedin.trim() !== '' && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono uppercase text-slate-400">LinkedIn Profile</p>
                      <p className="text-xs sm:text-sm font-bold font-mono text-slate-100 light:text-slate-800 truncate">
                        {linkedin.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                )}

                {/* Additional Custom Social Links */}
                {additionalLinks &&
                  additionalLinks.map((link, lIdx) => {
                    if (!link.url || !link.url.trim()) return null;
                    return (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 hover:border-cyan-500/50 transition-all group"
                      >
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-mono uppercase text-slate-400">
                            {link.label || 'Social Link'}
                          </p>
                          <p className="text-xs sm:text-sm font-bold font-mono text-slate-100 light:text-slate-800 truncate">
                            {link.url.replace('https://', '')}
                          </p>
                        </div>
                      </a>
                    );
                  })}

                {!hasContactInfo && (
                  <div className="p-6 rounded-2xl bg-slate-800/40 border border-dashed border-slate-700 text-center space-y-2">
                    <MessageSquare className="w-8 h-8 mx-auto text-cyan-400/50" />
                    <p className="text-xs font-mono text-slate-400">
                      No direct contact details uploaded yet.
                    </p>
                    <button
                      onClick={openEditContactModal}
                      className="px-4 py-2 bg-cyan-500 text-slate-950 font-mono text-xs font-bold rounded-xl"
                    >
                      + Enter Contact Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold font-mono text-slate-100 light:text-slate-900 mb-6">
                Send a Direct Message
              </h3>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 animate-bounce" />
                  <h4 className="text-lg font-bold font-mono text-emerald-400">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-300 light:text-slate-700">
                    Thank you for reaching out! Your message has been received.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800 light:bg-slate-100 border text-slate-100 light:text-slate-900 text-xs focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-rose-500'
                            : 'border-slate-700 light:border-slate-300 focus:border-cyan-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[10px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800 light:bg-slate-100 border text-slate-100 light:text-slate-900 text-xs focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500'
                            : 'border-slate-700 light:border-slate-300 focus:border-cyan-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[10px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      placeholder="Project Inquiry / Collaboration"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800 light:bg-slate-100 border text-slate-100 light:text-slate-900 text-xs focus:outline-none transition-colors ${
                        errors.subject
                          ? 'border-rose-500'
                          : 'border-slate-700 light:border-slate-300 focus:border-cyan-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[10px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Hi Suryavansh, I came across your portfolio and wanted to discuss..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800 light:bg-slate-100 border text-slate-100 light:text-slate-900 text-xs focus:outline-none transition-colors ${
                        errors.message
                          ? 'border-rose-500'
                          : 'border-slate-700 light:border-slate-300 focus:border-cyan-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[10px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- EDIT CONTACT MODAL --- */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="terminal-header justify-between sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs text-slate-300">
                  edit_contact_details.config
                </span>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveContactSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. suryavansh@example.com"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Profile URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/your-username"
                    value={editForm.github}
                    onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    placeholder="https://linkedin.com/in/your-username"
                    value={editForm.linkedin}
                    onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Location / City</label>
                <input
                  type="text"
                  placeholder="e.g. New Delhi, India"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-xl text-xs text-slate-100 light:text-slate-900"
                />
              </div>

              {/* Additional Custom Social Links */}
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase">
                    Additional Social & Coding Links
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddCustomLink}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono text-xs rounded-lg border border-slate-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Add Link
                  </button>
                </div>

                {editForm.additionalLinks.map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Label (e.g. LeetCode)"
                      value={link.label}
                      onChange={(e) => handleCustomLinkChange(idx, 'label', e.target.value)}
                      className="w-1/3 px-3 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 text-xs text-slate-100 light:text-slate-900 rounded-xl"
                    />
                    <input
                      type="text"
                      placeholder="URL (e.g. https://leetcode.com/username)"
                      value={link.url}
                      onChange={(e) => handleCustomLinkChange(idx, 'url', e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-800 light:bg-slate-100 border border-slate-700 text-xs text-slate-100 light:text-slate-900 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomLink(idx)}
                      className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold shadow-lg shadow-cyan-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
