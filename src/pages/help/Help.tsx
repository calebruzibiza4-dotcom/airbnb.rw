'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';

const categories = ['All', 'Stays', 'Hosting', 'Payments', 'Safety', 'Experiences'];

const faqs = [
  {
    question: 'How do I book a stay in Rwanda?',
    answer: 'Browse available stays, choose your dates, and complete the checkout flow. Once your request is confirmed, your host will follow up with any final details.',
    category: 'Stays',
  },
  {
    question: 'Can I list my home or space as a host?',
    answer: 'Yes. Start in the host flow, complete your listing details, and submit your property information to begin receiving guest bookings.',
    category: 'Hosting',
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We support secure card payments and local payment flows for eligible transactions, with transparent pricing before checkout.',
    category: 'Payments',
  },
  {
    question: 'How is guest safety handled?',
    answer: 'Every listing and host is reviewed for quality, and our support team is available to help with any concerns before, during, or after a stay.',
    category: 'Safety',
  },
  {
    question: 'Can I book experiences and services in the same place?',
    answer: 'Yes. You can discover stays, experiences, events, and services across Rwanda in one unified marketplace experience.',
    category: 'Experiences',
  },
];

export default function Help() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesQuery = faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, search]);

  return (
    <PageLayout>
      <div className="bg-[#F5F2ED] text-[#111111] min-h-screen">
        <section className="mx-auto max-w-7xl px-6 pb-10 pt-28 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0A7C5C]">Help Center</p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              We’re here to help.
            </h1>
            <div className="relative mx-auto mt-8 max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111111]/50" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search FAQs"
                className="w-full rounded-full border border-[#111111]/10 bg-white px-12 py-3.5 text-sm text-[#111111] outline-none transition focus:border-[#0A7C5C]"
              />
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? 'bg-[#111111] text-[#F5F2ED]'
                    : 'bg-white text-[#111111]/70 hover:bg-[#111111]/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="overflow-hidden rounded-[22px] border border-[#111111]/5 bg-white shadow-[0_18px_45px_rgba(17,17,17,0.03)]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-[#111111]">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-[#111111]/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 text-base leading-7 text-[#111111]/70"
                    >
                      {faq.answer}
                    </motion.div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="mt-10 rounded-[22px] border border-dashed border-[#111111]/15 bg-white p-10 text-center text-[#111111]/70">
              No matching answers found.
            </div>
          ) : null}
        </section>
      </div>
    </PageLayout>
  );
}
