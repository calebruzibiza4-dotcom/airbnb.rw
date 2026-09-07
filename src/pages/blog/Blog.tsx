'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/layout/PageLayout';
import Link from '../../components/ui/Link';
import { blogPosts, featuredBlog } from '../../data/blogData';

const categories = ['All', 'Culture', 'Stay', 'Experience', 'Travel Guide', 'Eco Tourism'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesQuery =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <PageLayout>
      <div className="bg-[#F5F2ED] text-[#111111] min-h-screen">
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 max-w-3xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0A7C5C]">Journal</p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Rwanda, in stories.
            </h1>
          </motion.div>

          <div className="mb-10 flex flex-col gap-5 rounded-[28px] border border-[#111111]/5 bg-white p-4 shadow-[0_24px_60px_rgba(17,17,17,0.04)] md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles"
                className="w-full rounded-full border border-[#111111]/10 bg-[#F5F2ED] px-5 py-3.5 text-sm text-[#111111] outline-none transition focus:border-[#0A7C5C]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? 'bg-[#111111] text-[#F5F2ED]'
                      : 'bg-[#F5F2ED] text-[#111111]/70 hover:bg-[#111111]/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="group mb-20 block overflow-hidden rounded-[32px] border border-[#111111]/5 bg-white shadow-[0_28px_80px_rgba(17,17,17,0.08)]"
          >
            <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[320px] overflow-hidden">
                <img src={featuredBlog.image} alt={featuredBlog.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A7C5C]">Featured</p>
                <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">{featuredBlog.title}</h2>
                <p className="mt-4 text-base leading-7 text-[#111111]/70">{featuredBlog.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-sm text-[#111111]/60">
                  <span>{featuredBlog.date}</span>
                  <span className="h-1 w-1 rounded-full bg-[#111111]/40" />
                  <span>{featuredBlog.readTime}</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-[26px] border border-[#111111]/5 bg-white shadow-[0_18px_45px_rgba(17,17,17,0.04)]"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="overflow-hidden">
                    <img src={post.image} alt={post.title} className="h-60 w-full object-cover transition duration-700 hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A7C5C]">
                      <span>{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold leading-tight">{post.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#111111]/70">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-[#111111]/5 pt-4 text-xs font-medium uppercase tracking-[0.18em] text-[#111111]/50">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="mt-12 rounded-[22px] border border-dashed border-[#111111]/15 bg-white p-10 text-center text-[#111111]/70">
              No articles match your search yet.
            </div>
          ) : null}
        </section>
      </div>
    </PageLayout>
  );
}
