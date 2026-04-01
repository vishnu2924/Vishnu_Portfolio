import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1, type: 'IoT',
    title: 'Smart Shopping Cart System',
    short: 'Automated IoT shopping cart with real-time item detection, billing, and obstacle avoidance.',
    desc: 'Designed and built an intelligent shopping cart that uses RFID sensors to automatically detect items, calculate billing in real-time, and navigate obstacles using ultrasonic sensors.',
    tech: ['IoT', 'Arduino', 'RFID', 'Ultrasonic Sensors', 'C++', 'LCD Display'],
    features: [
      'Real-time item detection via RFID tags',
      'Automatic billing and price calculation',
      'Obstacle avoidance with ultrasonic sensors',
      'LCD display for live cart summary',
      'Weight sensor for item verification',
      'Wireless data transmission to billing system',
    ]
  },
  {
    id: 2, type: 'ML',
    title: 'Cyberbullying Detection System',
    short: 'Web application using ML & NLP to detect cyberbullying with an admin dashboard.',
    desc: 'Built a full-stack web application that uses Machine Learning and Natural Language Processing to analyze text content, detect cyberbullying patterns, and provide an admin dashboard to manage reported content.',
    tech: ['Python', 'Flask', 'NLP', 'Machine Learning', 'React', 'CSS', 'REST API'],
    features: [
      'Real-time text analysis using NLP algorithms',
      'ML model trained on annotated datasets',
      'Admin dashboard with case management',
      'User report submission portal',
      'Severity level classification',
      'Analytics and reporting charts',
    ]
  },
  {
    id: 3, type: 'Web',
    title: 'Gas Cylinder Booking System',
    short: 'Full-featured booking app using Java and Firebase with real-time delivery tracking.',
    desc: 'Developed a comprehensive gas cylinder booking platform with Firebase backend, enabling users to schedule deliveries, track real-time delivery status, and receive push notifications.',
    tech: ['Java', 'Firebase', 'Android', 'XML', 'Realtime Database', 'Push Notifications'],
    features: [
      'User authentication with Firebase Auth',
      'Cylinder booking with scheduled delivery',
      'Real-time delivery status tracking',
      'Push notifications for updates',
      'Order history and management',
      'Admin panel for managing deliveries',
    ]
  },
];

const SKILLS = [
  { group: 'Programming', color: 'blue', icon: '💻', items: ['Java', 'C', 'C++', 'Python'] },
  { group: 'Web & Frameworks', color: 'green', icon: '🌐', items: ['HTML5', 'CSS3', 'React', 'Flask', 'Firebase'] },
  { group: 'Tools & Platforms', color: 'orange', icon: '🛠️', items: ['Git', 'GitHub', 'Postman', 'Arduino IDE', 'Android Studio'] },
  { group: 'Core Domains', color: 'purple', icon: '🧠', items: ['Machine Learning', 'NLP', 'IoT Basics', 'SQL', 'Data Analysis'] },
];

const EXPERIENCE = [
  {
    role: 'Data Analyst Intern',
    company: 'Inetz Tech',
    date: 'March 2026',
    type: 'Internship',
    tasks: [
      'Worked on data analysis tasks using Python and Excel-based tools',
      'Hands-on practice in cleaning and preprocessing datasets',
      'Created data visualizations and summary dashboards',
      'Generated analytical reports for stakeholder review',
    ]
  },
  {
    role: 'App Development Intern',
    company: 'E-Soft IT Solution',
    date: 'June 2025',
    type: 'Internship',
    tasks: [
      'Developed Android applications using Java and XML layouts',
      'Focused on cross-device UI compatibility and enhancements',
      'Implemented Material Design guidelines for polished UIs',
      'Collaborated with team on feature development and testing',
    ]
  },
];

const EDUCATION = [
  { icon: '🎓', title: 'P.S.R Engineering College, Sivakasi', sub: 'B.E. Computer Science & Engineering', grade: 'Expected Apr 2026 · CGPA: 7.6/10' },
  { icon: '📘', title: 'MMM.Hr.Sec.School, Theni', sub: 'Higher Secondary Certificate (HSC)', grade: 'May 2022 · 70%' },
  { icon: '📗', title: 'MMM.Hr.Sec.School, Theni', sub: 'Secondary School Leaving Certificate (SSLC)', grade: 'March 2020 · 80%' },
];

const TYPING_ROLES = [
  'CS Fresher & Developer',
  'IoT Engineer',
  'ML Enthusiast',
  'Full Stack Developer',
  'Problem Solver',
];

const STATUS_OPTIONS = ['Applied', 'Interview', 'Selected', 'Rejected'];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const s = doc.scrollTop || document.body.scrollTop;
      const h = doc.scrollHeight - doc.clientHeight;
      setW(h ? (s / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return w;
}

function useActiveSection(ids) {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useTyping(phrases, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = phrases[idx];
    let timeout;
    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
      } else {
        setDeleting(false);
        setIdx((idx + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, idx, deleting, phrases, speed, pause]);
  return text;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = ['home', 'about', 'skills', 'projects', 'experience', 'contact', 'tracker'];
function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const label = (id) => id === 'tracker' ? '📋 Tracker' : id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a className="nav-logo" href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}>
          Vishnu<span>.</span>
        </a>
        <ul className="nav-links">
          {NAV_ITEMS.map(id => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(id); }}>
                {label(id)}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="dark-toggle" onClick={() => setDark(!dark)}>
            {dark ? '☀️' : '🌙'} {dark ? 'Light' : 'Dark'}
          </button>
          <button className="hamburger" onClick={() => setOpen(!open)}
            aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {NAV_ITEMS.map(id => (
          <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
            {label(id)}
          </a>
        ))}
        <button className="dark-toggle" style={{ margin: '8px 0 0', alignSelf: 'flex-start' }}
          onClick={() => { setDark(!dark); setOpen(false); }}>
          {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </>
  );
}

// ─── 3D ANIMATED BG ──────────────────────────────────────────────────────────
function HeroBg() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouse);

    // Create particles
    const TOTAL = 70;
    particlesRef.current = Array.from({ length: TOTAL }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 900,
      z: Math.random() * 3 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      hue: Math.random() * 40 + 190, // blues
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Gradient bg
      const grd = ctx.createLinearGradient(0, 0, W, H);
      grd.addColorStop(0, 'rgba(240,249,255,0)');
      grd.addColorStop(1, 'rgba(186,230,253,0.15)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      const mouse = mouseRef.current;
      const pts = particlesRef.current;

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14,165,233,${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach(p => {
        // Mouse interaction
        const mdx = mouse.x - p.x, mdy = mouse.y - p.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 120) {
          p.vx -= (mdx / md) * 0.15;
          p.vy -= (mdy / md) * 0.15;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Draw 3D sphere effect
        const gradient = ctx.createRadialGradient(p.x - p.r * 0.3, p.y - p.r * 0.3, 0, p.x, p.y, p.r * p.z);
        gradient.addColorStop(0, `hsla(${p.hue},80%,75%,${p.alpha})`);
        gradient.addColorStop(1, `hsla(${p.hue},70%,50%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.z, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="hero-canvas-bg"
      style={{ width: '100%', height: '100%', display: 'block' }} />
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const role = useTyping(TYPING_ROLES);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home">
      <HeroBg />
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-greeting">
            <span>👋</span> Hello Everyone!
          </div>
          <h1 className="hero-name">
            Vishnu Varthan<br /><span className="highlight">Prakash</span>
          </h1>
          <div className="hero-role">
            {role}<span className="cursor-blink" />
          </div>
          <p className="hero-desc">
            Motivated CSE fresher with strong foundations in programming, AI, and IoT.
            Building real-world applications that solve real problems — one commit at a time.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              🚀 View Projects
            </button>
            <button className="btn btn-accent" onClick={() => scrollTo('contact')}>
              📬 Contact Me
            </button>
            <a className="btn btn-ghost" href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
              📄 Resume
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">3+</div>
              <div className="stat-label">Projects Built</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">2</div>
              <div className="stat-label">Internships</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">10+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">76%</div>
              <div className="stat-label">CGPA Score</div>
            </div>
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-photo-ring">
            <div className="ring-outer" />
            <div className="ring-inner" />
            <img src="/photo.png" alt="Vishnu Varthan Prakash" className="hero-photo" />
          </div>
          <div className="hero-badge top-right">
            <div className="badge-dot" />
            Open to Opportunities
          </div>
          <div className="hero-badge bottom-left">
            <div className="badge-dot orange" />
            CSE · Apr 2026
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about">
      <div className="section-label">About Me</div>
      <h2 className="section-title">Who I Am</h2>
      <div className="about-grid">
        <div>
          <div className="about-objective fade-up">
            "Motivated fresher with a strong foundation in programming, AI, and IoT. Quick learner with
            good problem-solving skills and hands-on experience in developing real-time applications.
            Eager to gain practical experience and contribute effectively to the organization."
          </div>
          <div className="fade-up" style={{ marginTop: 20 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Certifications</div>
            <div className="cert-list">
              <span className="cert-badge">🏆 App Development Course</span>
              <span className="cert-badge">📊 Data Analyst Internship</span>
            </div>
          </div>
        </div>
        <div>
          <div className="section-label" style={{ marginBottom: 16 }}>Education</div>
          {EDUCATION.map((e, i) => (
            <div className="edu-card fade-up" key={i} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="edu-icon" style={{ fontSize: '1.3rem' }}>{e.icon}</div>
              <div>
                <div className="edu-title">{e.title}</div>
                <div className="edu-sub">{e.sub}</div>
                <div className="edu-grade">{e.grade}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills">
      <div className="section-label">Technical Skills</div>
      <h2 className="section-title">Tools & Technologies</h2>
      <p className="section-desc">A diverse skill set spanning systems programming, web development, AI/ML, and IoT.</p>
      <div className="skills-grid">
        {SKILLS.map((grp, gi) => (
          <div className="skill-group card fade-up" key={gi} style={{ transitionDelay: `${gi * 80}ms` }}>
            <div className="skill-group-title">{grp.icon} {grp.group}</div>
            <div className="skill-badges">
              {grp.items.map(s => (
                <span className={`skill-badge ${grp.color}`} key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ p }) {
  const [expanded, setExpanded] = useState(false);
  const typeBadge = { IoT: 'badge-iot', ML: 'badge-ml', Web: 'badge-web' };
  const typeIcon = { IoT: '📡', ML: '🤖', Web: '🌐' };

  return (
    <div className="project-card fade-up">
      <div className="project-header">
        <span className={`project-type-badge ${typeBadge[p.type]}`}>
          {typeIcon[p.type]} {p.type}
        </span>
        <div className="project-title">{p.title}</div>
        <div className="project-desc">{p.short}</div>
      </div>
      <div className="project-body">
        <div className="project-tech">
          {p.tech.map(t => <span className="tech-chip" key={t}>{t}</span>)}
        </div>
        <div className={`project-details${expanded ? ' expanded' : ''}`}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', marginBottom: 14 }}>{p.desc}</p>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '1px' }}>Key Features</div>
          <ul>
            {p.features.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="project-actions">
          <button className="btn btn-primary btn-sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? '🔼 Show Less' : '🔍 View Details'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'IoT', 'ML', 'Web'];
  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter);

  return (
    <section id="projects">
      <div className="section-label">My Work</div>
      <h2 className="section-title">Featured Projects</h2>
      <p className="section-desc">Real-world applications built with IoT, ML, and web technologies.</p>
      <div className="project-filters">
        {filters.map(f => (
          <button key={f} className={`filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}>{f === 'All' ? '🔍 All' : f}</button>
        ))}
      </div>
      <div className="projects-grid">
        {shown.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience">
      <div className="section-label">Work Experience</div>
      <h2 className="section-title">Professional Journey</h2>
      <p className="section-desc">Internship experiences that shaped my real-world skills.</p>
      <div className="timeline">
        {EXPERIENCE.map((e, i) => (
          <div className="timeline-item fade-up" key={i} style={{ transitionDelay: `${i * 150}ms` }}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-meta">
                <span className="timeline-role">{e.role}</span>
                <span className="timeline-company">{e.company}</span>
                <span style={{ background: '#f0fdf4', color: '#15803d', fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: '50px' }}>{e.type}</span>
              </div>
              <div className="timeline-date">📅 {e.date}</div>
              <ul className="timeline-tasks">
                {e.tasks.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:vishnuvarthandec2004@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact">
      <div className="section-label">Get In Touch</div>
      <h2 className="section-title">Let's Connect</h2>
      <p className="section-desc">I'm actively looking for opportunities. My inbox is always open!</p>
      <div className="contact-grid">
        <div>
          <div className="contact-links">
            <a href="mailto:vishnuvarthandec2004@gmail.com" className="contact-link fade-up">
              <span className="contact-icon ci-email">📧</span>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 500 }}>Email</div>
                vishnuvarthandec2004@gmail.com
              </div>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link fade-up" style={{ transitionDelay: '100ms' }}>
              <span className="contact-icon ci-linkedin">💼</span>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 500 }}>LinkedIn</div>
                linkedin.com/in/vishnuvarthan
              </div>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link fade-up" style={{ transitionDelay: '200ms' }}>
              <span className="contact-icon ci-github">🐙</span>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 500 }}>GitHub</div>
                github.com/vishnuvarthan
              </div>
            </a>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="contact-link fade-up" style={{ transitionDelay: '300ms' }}>
              <span className="contact-icon" style={{ background: '#f0fdf4', color: '#16a34a', width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📄</span>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 500 }}>Resume</div>
                Download / View PDF
              </div>
            </a>
          </div>
        </div>
        <div className="contact-form fade-up">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Send a Message</div>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" type="text" placeholder="John Doe"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="john@example.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" placeholder="Tell me about the opportunity..."
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleSubmit}>
            {sent ? '✅ Message Sent!' : '📬 Send Message'}
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── JOB TRACKER ─────────────────────────────────────────────────────────────
const INIT_JOBS = [
  { id: 1, company: 'Infosys', role: 'Systems Engineer', status: 'Applied', date: '2026-03-20', notes: 'Applied via campus portal' },
  { id: 2, company: 'TCS', role: 'Junior Developer', status: 'Interview', date: '2026-03-22', notes: 'Technical interview scheduled for Apr 5' },
  { id: 3, company: 'Wipro', role: 'Software Engineer', status: 'Rejected', date: '2026-03-15', notes: 'Did not clear aptitude round' },
];

function JobModal({ job, onSave, onClose }) {
  const [form, setForm] = useState(job || { company: '', role: '', status: 'Applied', date: new Date().toISOString().split('T')[0], notes: '' });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-title">
          {job ? '✏️ Edit Application' : '➕ New Application'}
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {['company', 'role'].map(field => (
          <div className="form-group" key={field}>
            <label className="form-label">{field === 'company' ? 'Company Name' : 'Role / Position'}</label>
            <input className="form-input" type="text" placeholder={field === 'company' ? 'e.g. Google' : 'e.g. Software Engineer'}
              value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-input" value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}>
              {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Applied Date</label>
            <input className="form-input" type="date" value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea className="form-textarea" style={{ minHeight: 80 }} placeholder="Any notes..."
            value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-sm"
            onClick={() => { if (form.company && form.role) onSave(form); }}>
            {job ? 'Save Changes' : 'Add Application'}
          </button>
        </div>
      </div>
    </div>
  );
}

function JobTracker() {
  const [jobs, setJobs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('jobs')) || INIT_JOBS; }
    catch { return INIT_JOBS; }
  });
  const [modal, setModal] = useState(null); // null | 'new' | job object
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    try { localStorage.setItem('jobs', JSON.stringify(jobs)); } catch {}
  }, [jobs]);

  const saveJob = (form) => {
    if (modal === 'new') {
      setJobs(prev => [...prev, { ...form, id: Date.now() }]);
    } else {
      setJobs(prev => prev.map(j => j.id === modal.id ? { ...form, id: j.id } : j));
    }
    setModal(null);
  };

  const deleteJob = (id) => {
    if (window.confirm('Delete this application?')) setJobs(prev => prev.filter(j => j.id !== id));
  };

  const filtered = jobs.filter(j => {
    const matchSearch = !search || j.company.toLowerCase().includes(search.toLowerCase()) || j.role.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || j.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = { total: jobs.length, applied: jobs.filter(j => j.status === 'Applied').length, interview: jobs.filter(j => j.status === 'Interview').length, selected: jobs.filter(j => j.status === 'Selected').length, rejected: jobs.filter(j => j.status === 'Rejected').length };

  const statusClass = { Applied: 'status-applied', Interview: 'status-interview', Selected: 'status-selected', Rejected: 'status-rejected' };
  const statusIcon = { Applied: '📤', Interview: '📞', Selected: '✅', Rejected: '❌' };

  return (
    <section id="tracker">
      <div className="section-label">Career Dashboard</div>
      <h2 className="section-title">Job Application Tracker</h2>
      <p className="section-desc">Keep track of every application — statuses, notes, and next steps.</p>

      <div className="tracker-summary fade-up">
        {[
          { label: 'Total', num: counts.total, color: 'var(--primary)' },
          { label: 'Interview', num: counts.interview, color: '#d97706' },
          { label: 'Selected', num: counts.selected, color: '#16a34a' },
          { label: 'Rejected', num: counts.rejected, color: '#dc2626' },
        ].map(c => (
          <div className="summary-card" key={c.label}>
            <div className="summary-num" style={{ color: c.color }}>{c.num}</div>
            <div className="summary-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="tracker-controls fade-up">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search company or role..." value={search}
            onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="status-filter-select" value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}>
          <option>All</option>
          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="btn btn-accent btn-sm" onClick={() => setModal('new')}>
          ➕ Add New
        </button>
      </div>

      <div className="tracker-table-wrap fade-up">
        <table className="tracker-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <div className="icon">📭</div>
                    <p>No applications found. Start tracking by clicking "Add New"!</p>
                  </div>
                </td>
              </tr>
            ) : filtered.map((j, i) => (
              <tr key={j.id}>
                <td style={{ color: 'var(--text-light)', fontWeight: 600 }}>{i + 1}</td>
                <td style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{j.company}</td>
                <td>{j.role}</td>
                <td>
                  <span className={`status-chip ${statusClass[j.status]}`}>
                    {statusIcon[j.status]} {j.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-light)' }}>{j.date}</td>
                <td style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  title={j.notes}>{j.notes || '—'}</td>
                <td>
                  <div className="tracker-actions">
                    <button className="action-btn edit" onClick={() => setModal(j)}>✏️ Edit</button>
                    <button className="action-btn delete" onClick={() => deleteJob(j.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <JobModal
          job={modal === 'new' ? null : modal}
          onSave={saveJob}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <p>Designed & built with ❤️ by <span>Vishnu Varthan Prakash</span> · {new Date().getFullYear()}</p>
      <p style={{ marginTop: 6, fontSize: '0.8rem', opacity: 0.6 }}>Built with React · Deployed on Vercel</p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const progress = useScrollProgress();
  useFadeIn();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
  }, [dark]);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Contact />
        <div className="section-divider" />
        <JobTracker />
      </main>
      <Footer />
    </>
  );
}
