import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Star, Download, Send, Clock } from 'lucide-react';

const projects = [
  { title: 'Landing Page for Startup', status: 'Completed' },
  { title: 'E-commerce UI Kit', status: 'In Progress' },
  { title: 'Portfolio Website', status: 'Completed' },
  { title: 'Blog Redesign', status: 'In Review' },
];

const skills = [
  { name: 'React.js', level: '90%' },
  { name: 'Tailwind CSS', level: '85%' },
  { name: 'Figma', level: '75%' },
  { name: 'Framer Motion', level: '70%' },
];

const testimonials = [
  { name: 'Client A', feedback: 'Great communication and clean code!', rating: 5 },
  { name: 'Client B', feedback: 'Delivered ahead of schedule. Highly recommended!', rating: 5 },
];

const timeline = [
  {
    year: '2024 - Present',
    role: 'Senior Frontend Engineer',
    company: 'InnovateX Solutions',
    desc: 'Architected frontend infrastructure for a scalable SaaS platform using React, TypeScript, and Tailwind. Mentored junior devs and led weekly code reviews.'
  },
  {
    year: '2022 - 2024',
    role: 'UI/UX Developer',
    company: 'Creative Labs',
    desc: 'Built user-focused components and implemented Figma designs into production-grade apps. Specialized in component reusability and accessibility.'
  },
  {
    year: '2020 - 2022',
    role: 'Frontend Developer',
    company: 'Techwave Co.',
    desc: 'Shipped multiple features across React-based applications. Integrated APIs, enhanced performance, and wrote unit tests with Jest.'
  },
  {
    year: '2019 - 2020',
    role: 'Web Development Intern',
    company: 'PixelForge Studio',
    desc: 'Worked on internal dashboards and CMS themes. Gained hands-on experience with HTML, CSS, JavaScript, and Git.'
  }
];

export default function FreelancerDashboard() {
  return (
    <div className="min-h-screen bg-[#222831] text-[#DFD0B8] px-4 py-8 sm:px-6 lg:px-8 font-sans">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold">🎨 Freelancer Dashboard</h1>
          <p className="text-sm text-[#948979]">Showcasing your skills and recent projects</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-[#DFD0B8] text-[#222831] px-5 py-2 rounded-lg hover:bg-[#e4d5b9] text-sm font-medium transition"
        >
          <Download className="inline w-4 h-4 mr-1" /> Download Resume
        </motion.button>
      </motion.header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile + Skills */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#393E46] rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[#DFD0B8] text-[#222831] flex items-center justify-center font-bold text-xl">
              JD
            </div>
            <div>
              <p className="text-lg font-semibold">Jane Doe</p>
              <p className="text-sm text-[#948979]">Senior Frontend Developer</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-bold text-[#DFD0B8] mb-2">Skill Levels</h3>
            <ul className="space-y-3">
              {skills.map((skill, i) => (
                <li key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="w-full bg-[#222831] rounded h-2">
                    <motion.div
                      className="h-2 rounded bg-[#DFD0B8]"
                      initial={{ width: 0 }}
                      animate={{ width: skill.level }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm text-[#948979] flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" /> 4.9 Rating from 23 clients
          </div>
        </motion.div>

        {/* Projects + Testimonials + Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-2 bg-[#393E46] rounded-xl p-6 shadow-md"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" /> Recent Projects
          </h3>
          <ul className="space-y-4">
            {projects.map((project, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-lg border border-[#222831] flex justify-between items-center hover:bg-[#222831] transition"
              >
                <span>{project.title}</span>
                <span className="text-sm text-[#948979]">{project.status}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" /> Professional Timeline
            </h3>
            <div className="space-y-8 pl-4">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-[#DFD0B8] border-2 border-[#222831]" />
                  <span className="text-xs text-[#948979]">{item.year}</span>
                  <h4 className="text-md font-bold text-[#DFD0B8]">{item.role}</h4>
                  <p className="text-sm text-[#AFA59C]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-bold mb-4">Testimonials</h3>
            <div className="space-y-4">
              {testimonials.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.2 }}
                  className="p-4 border border-[#222831] rounded-lg bg-[#2a2e34]"
                >
                  <p className="text-sm mb-2 text-[#DFD0B8]">"{item.feedback}"</p>
                  <span className="text-sm text-[#948979]">- {item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 bg-[#DFD0B8] text-[#222831] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-center sm:text-left">Looking for new opportunities?</h3>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-[#222831] text-[#DFD0B8] px-5 py-2 rounded-lg hover:bg-[#393E46] transition text-sm font-medium"
        >
          <Send className="w-4 h-4 inline mr-2" /> Contact Me
        </motion.button>
      </motion.div>
    </div>
  );
}
