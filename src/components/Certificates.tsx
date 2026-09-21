'use client';

import { motion } from 'framer-motion';

const CERTIFICATE_ITEMS = [
  {
    number: '01',
    title: 'Python for Data Science',
    issuer: 'IBM • DATA ANALYTICS & PYTHON',
    description:
      'Demonstrated core proficiency in Python programming, Pandas, NumPy, and data manipulation techniques for analytical workflows.',
  },
  {
    number: '02',
    title: 'Big Data Foundation',
    issuer: 'IBM SKILLSBUILD • BIG DATA & ANALYTICS',
    description:
      'Mastered fundamental Big Data concepts, Hadoop ecosystem components, MapReduce paradigms, and enterprise analytics architectures.',
  },
  {
    number: '03',
    title: 'Data Science Internship Certificate',
    issuer: 'CODEALPHA • PRACTICAL EXPERIENCE',
    description:
      'Completed intensive practical internship projects involving end-to-end data preprocessing, feature engineering, and predictive modeling.',
  },
  {
    number: '04',
    title: 'AI for Beginners',
    issuer: 'HP LIFE • ARTIFICIAL INTELLIGENCE',
    description:
      'Gained fundamental knowledge in artificial intelligence principles, neural networks, machine learning algorithms, and real-world business applications.',
  },
  {
    number: '05',
    title: 'Full Stack Web Development',
    issuer: 'ELITETECH • WEB DEVELOPMENT',
    description:
      'Built modern responsive web applications using frontend and backend technologies with clean HTML, CSS, JavaScript, and database integration.',
  },
];

export function CertificatesSection() {
  return (
    <section id="certificate" className="pt-20 pb-28 bg-transparent text-left relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#78786C] block mb-[19px] font-semibold">
            CREDENTIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E5DFD3] tracking-tight">
            Certificates
          </h2>
        </motion.div>

        {/* Compact Stacked Flex List */}
        <div className="space-y-8 sm:space-y-10">
          {CERTIFICATE_ITEMS.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-start gap-6 sm:gap-10 group"
            >
              {/* Left Side: Index Number */}
              <div className="font-mono text-xl md:text-2xl font-medium text-[#BFA678] flex-none pt-0.5 w-8">
                {item.number}
              </div>

              {/* Right Side: Vertical Stacked Content */}
              <div className="space-y-1.5 max-w-3xl">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#666668] block">
                  {item.issuer}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#E5DFD3] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#888888] leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CertificatesSection;
