'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/layout/PageLayout';
import Link from '../../components/ui/Link';
import { blogPosts } from '../../data/blogData';

export default function BlogPost() {
  const slug = typeof window !== 'undefined' ? window.location.pathname.replace('/blog/', '') : '';

  const post = useMemo(
    () => blogPosts.find((article) => article.slug === slug) ?? blogPosts[0],
    [slug],
  );

  const relatedPosts = blogPosts.filter((article) => article.slug !== post.slug).slice(0, 3);

  return (
    <PageLayout>
      <article className="bg-[#F5F2ED] text-[#111111]">
        <header className="mx-auto max-w-6xl px-6 pb-10 pt-28 md:px-12">
          <Link href="/blog" className="mb-8 inline-flex items-center text-sm font-medium text-[#0A7C5C] hover:text-[#085f49]">
            ← Back to blog
          </Link>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A7C5C]">{post.category}</p>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#111111]/60">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 pb-8 md:px-12">
          <img src={post.image} alt={post.title} className="h-[420px] w-full rounded-[28px] object-cover shadow-[0_30px_80px_rgba(17,17,17,0.08)] md:h-[560px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6 py-12 md:px-12">
          <div className="space-y-7 text-lg leading-8 text-[#111111]/72">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <section className="mx-auto max-w-6xl px-6 pb-24 md:px-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold md:text-4xl">More stories</h2>
            <Link href="/blog" className="text-sm font-semibold text-[#0A7C5C] hover:text-[#085f49]">
              View all articles
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {relatedPosts.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group overflow-hidden rounded-[26px] border border-[#111111]/5 bg-white shadow-[0_18px_45px_rgba(17,17,17,0.04)]">
                <img src={article.image} alt={article.title} className="h-52 w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0A7C5C]">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold leading-tight">{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
