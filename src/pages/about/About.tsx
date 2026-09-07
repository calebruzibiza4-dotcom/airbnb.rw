import React from 'react';
import { motion, type Variants } from 'framer-motion';
import PageLayout from '../../components/layout/PageLayout';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function About() {
  return (
    <PageLayout>
      <div className="bg-[#F5F2ED] text-[#111111] overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.p variants={fadeUp} className="text-[#0A7C5C] font-semibold tracking-[0.2em] uppercase text-sm mb-6">
              Our Origin
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
              The Rwanda Story,<br /> Told Differently.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#111111]/70 leading-relaxed max-w-2xl">
              We started with a simple belief: experiencing Rwanda should be as breathtaking as the country itself. No generic tours, no disconnected stays. Just pure, intentional connections.
            </motion.p>
          </motion.div>
        </section>

        {/* Our Story / Image Grid */}
        <section className="px-6 md:px-12 py-24 bg-[#111111] text-[#F5F2ED]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
                Redefining the Journey
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#F5F2ED]/70 text-lg leading-relaxed mb-6">
                For too long, discovering Rwanda meant navigating fragmented systems or settling for templated experiences. We built Inzu Stay to bridge the gap between luxury, authenticity, and accessibility.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[#F5F2ED]/70 text-lg leading-relaxed">
                Whether you are seeking a serene retreat in Musanze or a vibrant cultural immersion in Kigali, we curate spaces and moments that resonate deeply.
              </motion.p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1580556272826-b5ce9db8db37?q=80&w=2000&auto=format&fit=crop" 
                alt="Rwanda landscape" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent mix-blend-multiply" />
            </motion.div>
          </div>
        </section>

        {/* Why We Exist / For Everyone */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold mb-6">
              Designed for the Discerning
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-[#111111]/70 leading-relaxed">
              Our platform serves both the curious traveler and the dedicated local host, creating an ecosystem where quality meets authenticity.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Curated Stays",
                desc: "Every property on our platform is vetted for design, comfort, and unique character."
              },
              {
                title: "Local Experiences",
                desc: "Connect with the culture through immersive, host-led activities across the country."
              },
              {
                title: "Seamless Hosting",
                desc: "We provide hosts with powerful tools to manage their listings and grow their business."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-10 rounded-2xl border border-[#111111]/5 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-12 w-12 bg-[#0A7C5C]/10 text-[#0A7C5C] flex items-center justify-center rounded-xl mb-6 font-display font-bold text-xl">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-[#111111]/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-32 bg-[#0A7C5C] text-[#F5F2ED] text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold mb-8">
              Ready to explore?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-[#F5F2ED]/80 mb-12">
              Join us in uncovering the hidden gems of Rwanda.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a 
                href="/?view=browse"
                className="inline-block bg-[#111111] text-[#F5F2ED] px-8 py-4 rounded-xl font-semibold hover:bg-black transition-colors duration-200"
              >
                Start Browsing
              </a>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </PageLayout>
  );
}
