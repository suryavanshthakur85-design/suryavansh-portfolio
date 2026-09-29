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
  ExternalLink,
  MessageSquare,
  Pencil
} from 'lucide-react';

export const Contact = () => {
  const { data, showToast, editMode, setEditModalConfig } = usePortfolio();

  // Extract contact & hero info cleanly
  const contactInfo = data.contact || {};
  const heroSocial = data.hero?.social || {};

  const email = contactInfo.email !== undefined && contactInfo.email !== '' ? contactInfo.email : heroSocial.email || '';
  const phone = contactInfo.phone !== undefined && contactInfo.phone !== '' ? contactInfo.phone : heroSocial.phone || '';
  const linkedin = contactInfo.linkedin !== undefined && contactInfo.linkedin !== '' ? contactInfo.linkedin : heroSocial.linkedin || '';
  const github = contactInfo.github !== undefined && contactInfo.github !== '' ? contactInfo.github : heroSocial.github || '';
  const location = contactInfo.location !== undefined && contactInfo.location !== '' ? contactInfo.location : data.hero?.location || '';
  const additionalLinks = contactInfo.additionalLinks || [];

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    <section id="contact" className="py-20 relative bg-grid-pattern">
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

          {editMode && (
            <button
              onClick={() => setEditModalConfig({ isOpen: true, type: 'contact', data: contactInfo })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Contact & Links</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info (Rendered ONLY if non-empty!) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl space-y-6 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-mono text-slate-100 light:text-slate-900">
                  Contact Information
                </h3>
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

                {linkedin && linkedin.trim() !== '' && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono uppercase text-slate-400">LinkedIn</p>
                      <p className="text-xs sm:text-sm font-bold font-mono text-slate-100 light:text-slate-800 truncate">
                        {linkedin.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                )}

                {github && github.trim() !== '' && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 hover:border-cyan-500/50 transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-slate-700/30 text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                      <Github className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono uppercase text-slate-400">GitHub</p>
                      <p className="text-xs sm:text-sm font-bold font-mono text-slate-100 light:text-slate-800 truncate">
                        {github.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                )}

                {location && location.trim() !== '' && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/40 light:border-slate-200">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
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

                {/* Additional Links */}
                {additionalLinks && additionalLinks.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {additionalLinks.map((linkItem, idx) => (
                      <a
                        key={idx}
                        href={linkItem.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 light:bg-slate-100 border border-slate-700 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                      >
                        <span>{linkItem.label}</span>
                        <ExternalLink className="w-3 h-3 text-cyan-400" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Fallback if no direct contacts entered */}
                {!hasContactInfo && (
                  <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/40 text-center">
                    <p className="text-xs font-mono text-slate-400">
                      Please use the contact form on the right to send a direct message.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Send Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-mono text-slate-100 light:text-slate-900">
                    Send a Message
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Responses typically within 24-48 hours.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-mono text-emerald-400">
                    Message Dispatched!
                  </h4>
                  <p className="text-xs font-mono text-slate-300 light:text-slate-600 max-w-sm mx-auto">
                    Thank you for reaching out. Your message has been sent successfully. I will get back to you shortly!
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
    </section>
  );
};
