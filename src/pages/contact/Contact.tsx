import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <PageLayout>
      <div className="bg-[#F5F2ED] text-[#111111] overflow-hidden min-h-[calc(100vh-80px)] pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Info */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="pt-12"
          >
            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Let's connect.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[#111111]/70 leading-relaxed max-w-md mb-16">
              Whether you're looking to host your space, curate an experience, or simply say hello — we're here.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-10">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white p-3 rounded-xl border border-[#111111]/5">
                  <Mail className="w-5 h-5 text-[#0A7C5C]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <a href="mailto:hello@inzustay.rw" className="text-[#111111]/70 hover:text-[#0A7C5C] transition-colors">hello@inzustay.rw</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white p-3 rounded-xl border border-[#111111]/5">
                  <MapPin className="w-5 h-5 text-[#0A7C5C]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Office</h3>
                  <p className="text-[#111111]/70">Norrsken House Kigali<br/>KN 78 St, Kigali, Rwanda</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white p-3 rounded-xl border border-[#111111]/5">
                  <Phone className="w-5 h-5 text-[#0A7C5C]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <a href="tel:+250780000000" className="text-[#111111]/70 hover:text-[#0A7C5C] transition-colors">+250 780 000 000</a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-8 md:p-12 rounded-3xl border border-[#111111]/5 shadow-xl shadow-black/5"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 bg-[#0A7C5C]/10 text-[#0A7C5C] rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold mb-4">Message Sent</h3>
                <p className="text-[#111111]/70 mb-8 max-w-[280px]">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-[#0A7C5C] font-semibold hover:text-[#08634a] transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    className={`w-full bg-[#F5F2ED] border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:border-[#0A7C5C] focus:ring-[#0A7C5C]'} rounded-xl px-4 py-3 outline-none transition-all`}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    className={`w-full bg-[#F5F2ED] border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:border-[#0A7C5C] focus:ring-[#0A7C5C]'} rounded-xl px-4 py-3 outline-none transition-all`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                    }}
                    rows={5}
                    className={`w-full bg-[#F5F2ED] border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:border-[#0A7C5C] focus:ring-[#0A7C5C]'} rounded-xl px-4 py-3 outline-none transition-all resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="text-red-500 text-xs font-medium mt-1.5">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] text-[#F5F2ED] font-semibold py-4 rounded-xl hover:bg-black transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-[56px]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-[#F5F2ED]/30 border-t-[#F5F2ED] rounded-full animate-spin" />
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
