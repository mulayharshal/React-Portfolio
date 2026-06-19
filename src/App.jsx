import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import {
  Download, ExternalLink, Code2, Mail, Phone, MapPin, Menu, X, GraduationCap, Award, Briefcase
} from 'lucide-react';

/* ─── CONSTANTS ─── */
const SKILLS = [
  { name: 'HTML',        img: '/images/html.png' },
  { name: 'CSS',         img: '/images/css.png' },
  { name: 'JavaScript',  img: '/images/javascript.png' },
  { name: 'Java',        img: '/images/java.png' },
  { name: 'Python',      img: '/images/python.png' },
  { name: 'MySQL',       img: '/images/mysql.png' },
  { name: 'MongoDB',     img: '/images/mongodb.png' },
  { name: 'React',       img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Angular',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
  { name: 'Spring Boot', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { name: 'Node.js',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Git',         img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'PostgreSQL',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'VS Code',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'Docker',      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'IntelliJ',    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg' },
  { name: 'Eclipse',     img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eclipse/eclipse-original.svg' },
];

const PROJECTS = [
  {
    title: 'LifeTrace System',
    desc: 'Decentralized healthcare platform connecting donors, recipients, and hospitals. Features role-based access, OTP verification, ABO matching, and Polygon blockchain for tamper-proof transplant records.',
    img: 'https://raw.githubusercontent.com/mulayharshal/LifeTrace-Blockchain-Based-Organ-Donor-Registry-and-Matching-System/refs/heads/main/screenshots/hospitalDashboard.png',
    tech: ['Spring Boot', 'React', 'Polygon', 'IPFS', 'JWT', 'MySQL'],
    github: 'https://github.com/mulayharshal/LifeTrace-Blockchain-Based-Organ-Donor-Registry-and-Matching-System',
    live: 'https://lifetrace.netlify.app',
    featured: true,
  },
  {
    title: 'Employee Management System',
    desc: 'Full-stack EMS with JWT auth, role-based access control, CRUD operations, dashboard analytics, and automated email notifications via REST APIs.',
    img: 'https://github.com/mulayharshal/Employee-Management-System/raw/main/screenshots/dashboard.png',
    tech: ['Spring Boot', 'React', 'MySQL', 'JWT', 'REST API'],
    github: 'https://github.com/mulayharshal/Employee-Management-System',
    live: 'https://employeemanagementportals.netlify.app',
    featured: false,
  },
  {
    title: 'Online MCQ Exam Portal',
    desc: 'Full-stack exam platform where admins create timed quizzes, students log in securely and receive instant results. Built with Angular & Spring Boot.',
    img: 'https://raw.githubusercontent.com/mulayharshal/OnlineExamPortal/main/screenshots/homepage.png',
    tech: ['Angular', 'TypeScript', 'Spring Boot', 'MySQL'],
    github: 'https://github.com/mulayharshal/OnlineExamPortal',
    live: 'https://onlineexamportal.up.railway.app',
    featured: false,
  },
  {
    title: 'Movie Explorer',
    desc: 'React + Spring Boot app with real-time OMDB API integration and in-memory caching for blazing-fast movie search and discovery.',
    img: 'https://github.com/mulayharshal/Movie-Explorer/raw/main/screenshots/SearchPage.png',
    tech: ['React', 'Spring Boot', 'OMDB API', 'Caching'],
    github: 'https://github.com/mulayharshal/Movie-Explorer',
    live: 'https://movieexplorersapp.netlify.app',
    featured: false,
  },
  {
    title: 'MeghaCast — Weather App',
    desc: 'Sleek, responsive React-powered weather dashboard featuring real-time city weather via OpenWeatherMap API with elegant visual design.',
    img: 'https://raw.githubusercontent.com/mulayharshal/WeatherWebApp/main/src/assets/screenshot.png',
    tech: ['React', 'Vite', 'OpenWeatherMap'],
    github: 'https://github.com/mulayharshal/WeatherWebApp',
    live: 'https://meghacast.netlify.app/',
    featured: false,
  },
];

/* ─── INLINE SOCIAL SVG ICONS ─── */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const SOCIALS = [
  { label: 'GitHub',    Icon: GithubIcon,    url: 'https://github.com/mulayharshal',              color: '#6e5494' },
  { label: 'LinkedIn',  Icon: LinkedInIcon,  url: 'https://www.linkedin.com/in/mulayharshal',      color: '#0A66C2' },
  { label: 'Facebook',  Icon: FacebookIcon,  url: 'https://www.facebook.com/harshal.mulay.35',     color: '#1877F2' },
  { label: 'Instagram', Icon: InstagramIcon, url: 'https://www.instagram.com/harshalmulay.96k',    color: '#E4405F' },
];

/* ─── REVEAL WRAPPER ─── */
function Reveal({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <div className="nav-logo">HM.</div>
          <ul className="nav-links">
            {navLinks.map(l => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
          <a href="/files/Harshal_Mulay_Resume.pdf" target="_blank" rel="noreferrer" className="nav-cta">Resume ↗</a>
          <button className="mobile-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.div
          className="mobile-nav"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
        </motion.div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="hero-bg-orb orb-1" />
        <div className="hero-bg-orb orb-2" />
        <div className="hero-bg-orb orb-3" />

        <div className="container" style={{ width: '100%' }}>
          <div className="hero-grid">
            {/* LEFT */}
            <motion.div
              className="hero-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="hero-badge">
                <span className="dot" />
                Available for opportunities
              </div>

              <h1 className="hero-name">
                <span className="line-1">Harshal Mulay</span>
                <span className="line-2">Full Stack Dev</span>
              </h1>

              <div className="hero-type">
                <TypeAnimation
                  sequence={[
                    'Java Full Stack Developer', 2000,
                    'MERN Stack Developer', 2000,
                    'Spring Boot Specialist', 2000,
                    'React Developer', 2000,
                  ]}
                  wrapper="span"
                  repeat={Infinity}
                />
              </div>

              <p className="hero-desc">
                Entry-level Full Stack Developer with hands-on internship experience in building scalable web applications with REST APIs, JWT auth, and relational database management. Based in Pune, Maharashtra.
              </p>

              <div className="hero-actions">
                <a href="/files/Harshal_Mulay_Resume.pdf" target="_blank" rel="noreferrer" className="btn-primary">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={16} /> Download CV
                  </span>
                </a>
                <a href="#projects" className="btn-secondary">
                  View Projects
                </a>
              </div>

              <div className="hero-socials">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                    title={s.label}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}55`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <s.Icon />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              className="hero-right"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            >
              <div style={{ position: 'relative' }}>
                <div className="hero-img-glow" />
                <div className="hero-img-wrap">
                  <div className="hero-img-ring">
                    <div className="hero-img-ring-inner" />
                  </div>
                  <img
                    src="/images/mulay.png"
                    alt="Harshal Mulay"
                    className="hero-img"
                    onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=Harshal+Mulay&size=400&background=8b5cf6&color=fff&bold=true'; }}
                  />
                </div>
                <div className="hero-stats">
                  <div className="stat-chip"><span className="num">2+</span> Internships</div>
                  <div className="stat-chip"><span className="num">5+</span> Projects</div>
                  <div className="stat-chip"><span className="num">1</span> Certification</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <Reveal>
              <div className="about-img-wrap">
                <div className="about-img-bg" />
                <div className="about-img-main">
                  <img
                    src="/images/harshal.png"
                    alt="Harshal Mulay"
                    onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=Harshal+Mulay&size=600&background=8b5cf6&color=fff&bold=true'; }}
                  />
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <div className="section-label">About Me</div>
                <h2 className="section-title">Crafting digital<br /><span>experiences</span></h2>
                <p style={{ color: 'var(--text-2)', lineHeight: 1.9, marginBottom: '1rem' }}>
                  I'm a passionate Java Full Stack and MERN Stack Developer currently pursuing B.E. in Information Technology at PDEA's College of Engineering, Pune. I love building scalable, clean web applications that solve real-world problems.
                </p>
                <p style={{ color: 'var(--text-2)', lineHeight: 1.9, marginBottom: '2rem' }}>
                  From blockchain-backed organ donor systems to EMS platforms — I thrive at the intersection of good architecture and great user experience. Familiar with <strong style={{ color: 'var(--text-1)' }}>Microservices</strong> architecture patterns for building scalable, loosely-coupled backend systems.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="about-info">
                  {[
                    { label: 'Full Name', val: 'Harshal Ambadas Mulay' },
                    { label: 'Phone', val: '+91 8767344847' },
                    { label: 'Email', val: 'harshalmulay1039@gmail.com' },
                    { label: 'Location', val: 'Pune, Maharashtra, India' },
                  ].map(item => (
                    <div key={item.label} className="info-item">
                      <div className="info-label">{item.label}</div>
                      <div className="info-val">{item.val}</div>
                    </div>
                  ))}
                </div>
                <a href="/files/Harshal_Mulay_Resume.pdf" target="_blank" rel="noreferrer" className="btn-primary">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={16} /> Download Resume
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="skills-section">
        <div className="container">
          <Reveal>
            <div className="section-label">Technical Skills</div>
            <h2 className="section-title">Tech <span>Stack</span></h2>
            <p className="section-sub">Technologies I use to turn ideas into real, scalable products.</p>
          </Reveal>

          <motion.div
            className="skills-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.name}
                className="skill-item"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <img src={s.img} alt={s.name} />
                <span>{s.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CONCEPTS ROW ── */}
          <Reveal delay={200}>
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace', marginBottom: '1rem' }}>
                // Concepts & Architecture
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', justifyContent: 'center' }}>
                {[
                  '⚙️ Microservices',
                  '🔗 REST APIs',
                  '🏗️ MVC Architecture',
                  '🔐 JWT Authentication',
                  '🔄 Agile / Scrum',
                  '📦 OOP Principles',
                  '🗄️ Database Design',
                  '🔧 SDLC',
                ].map(concept => (
                  <span key={concept} style={{
                    padding: '0.45rem 1.1rem',
                    background: 'rgba(139,92,246,0.07)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    color: 'var(--text-2)',
                    transition: 'all 0.3s',
                    cursor: 'default',
                  }}>
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience">
        <div className="container" style={{ maxWidth: '800px' }}>
          <Reveal>
            <div className="section-label">Career</div>
            <h2 className="section-title">Work <span>Experience</span></h2>
            <p className="section-sub">Internships that shaped my engineering mindset.</p>
          </Reveal>

          <div className="timeline">
            {[
              {
                role: 'MERN Stack Developer Intern',
                company: 'P Intellects Info Solution Pvt. Ltd, Pune',
                date: 'Jan 2025 – Feb 2025',
                points: [
                  'Built and deployed full-stack web apps using MongoDB, Express.js, React.js, and Node.js with RESTful API integration.',
                  'Implemented responsive UI components, scalable backend architecture, and database management for production-ready solutions.',
                ],
              },
              {
                role: 'Java Full Stack Intern',
                company: 'The Kiran Academy, Pune',
                date: 'Jun 2024 – Jul 2024',
                points: [
                  'Developed frontend and backend modules using Spring Boot, REST APIs, and MySQL following MVC architecture and OOP principles.',
                  'Gained practical SDLC experience and received appreciation certificate for technical excellence and dedication.',
                ],
              },
            ].map((exp, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="timeline-item">
                  <div className="tl-header">
                    <div>
                      <div className="tl-role">{exp.role}</div>
                      <div className="tl-company">{exp.company}</div>
                    </div>
                    <div className="tl-date">{exp.date}</div>
                  </div>
                  <ul className="tl-points">
                    {exp.points.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="projects-section">
        <div className="container">
          <Reveal>
            <div className="section-label">Work</div>
            <h2 className="section-title">Featured <span>Projects</span></h2>
            <p className="section-sub">A showcase of real-world applications I've built end-to-end.</p>
          </Reveal>

          <motion.div
            className="projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                className="project-card"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <div className="project-img-wrap">
                  <img src={p.img} alt={p.title} />
                  <div className="project-overlay" />
                  {p.featured && <div className="project-featured-badge">⭐ Final Year</div>}
                  <div className="project-links-overlay">
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-link-btn" title="Source Code">
                      <Code2 size={15} />
                    </a>
                    <a href={p.live} target="_blank" rel="noreferrer" className="project-link-btn" title="Live Demo">
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>

                <div className="project-body">
                  <div className="project-tech-stack">
                    {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <h3 className="project-name">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-footer">
                    <a href={p.github} target="_blank" rel="noreferrer">
                      <Code2 size={14} /> Source Code
                    </a>
                    <a href={p.live} target="_blank" rel="noreferrer">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education">
        <div className="container">
          <Reveal>
            <div className="section-label">Background</div>
            <h2 className="section-title">Education & <span>Certifications</span></h2>
            <p className="section-sub">Academic foundation and professional credentials.</p>
          </Reveal>

          <div className="edu-grid">
            {[
              {
                icon: '🎓',
                degree: 'B.E. Information Technology',
                school: "PDEA's College of Engineering Pune | SPPU",
                year: '2022 – 2026',
                status: 'Pursuing · CGPA 6.7',
              },
              {
                icon: '📚',
                degree: 'HSC (12th Science)',
                school: 'Mahatma Gandhi Vidhyalay Karjat | Maharashtra Board',
                year: '2021 – 2022',
                status: 'Completed',
              },
              {
                icon: '📖',
                degree: 'SSC (10th)',
                school: 'Mahatma Gandhi Vidhyalay Karjat | Maharashtra Board',
                year: '2019 – 2020',
                status: 'Completed',
              },
            ].map((e, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="edu-card">
                  <div className="edu-icon">{e.icon}</div>
                  <div className="edu-degree">{e.degree}</div>
                  <div className="edu-school">{e.school}</div>
                  <div className="edu-year">{e.year}</div>
                  <div className="edu-badge">{e.status}</div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={300}>
              <div className="edu-card cert-card">
                <div className="edu-icon">🏆</div>
                <div className="edu-degree">Java Full Stack Certification</div>
                <div className="edu-school">Symbiosis Skills & Capgemini Program</div>
                <div className="edu-year">2024</div>
                <div className="edu-badge" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--orange)', borderColor: 'rgba(245,158,11,0.2)' }}>
                  Certified
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="container">
          <Reveal>
            <div className="section-label">Contact</div>
            <h2 className="section-title">Let's <span>Connect</span></h2>
            <p className="section-sub">Open to full-time roles, internships, and freelance collaborations.</p>
          </Reveal>

          <div className="contact-wrapper">
            <Reveal>
              <div className="contact-info-side">
                <h3>Get in touch</h3>
                <p>Have a project in mind or just want to say hi? I'm always happy to chat about interesting opportunities.</p>

                <div className="contact-items">
                  <a href="mailto:harshalmulay1039@gmail.com" className="contact-item">
                    <div className="contact-item-icon"><Mail size={18} /></div>
                    <div className="contact-item-info">
                      <div className="label">Email</div>
                      <div className="val">harshalmulay1039@gmail.com</div>
                    </div>
                  </a>
                  <a href="tel:+918767344847" className="contact-item">
                    <div className="contact-item-icon"><Phone size={18} /></div>
                    <div className="contact-item-info">
                      <div className="label">Phone</div>
                      <div className="val">+91 8767344847</div>
                    </div>
                  </a>
                  <div className="contact-item">
                    <div className="contact-item-icon"><MapPin size={18} /></div>
                    <div className="contact-item-info">
                      <div className="label">Location</div>
                      <div className="val">Pune, Maharashtra, India</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
                  {SOCIALS.map(s => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill"
                      title={s.label}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}55`}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <s.Icon />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@email.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="Job Opportunity / Collaboration"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <a
                  href={`mailto:harshalmulay1039@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Hi Harshal,\n\n${formData.message}\n\n— ${formData.name}\n${formData.email}`)}`}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} /> Send Message
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} <strong style={{ color: 'var(--text-2)' }}>Harshal Mulay</strong>. Built with React & Vite. All rights reserved.
          </p>
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="social-pill"
                title={s.label}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}55`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <s.Icon />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
