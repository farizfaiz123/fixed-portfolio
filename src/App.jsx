import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Mail, Phone, Layers, PenTool, Video, Monitor,
  Briefcase, GraduationCap, ChevronDown, Maximize2,
  ExternalLink, Download, ChevronLeft, ChevronRight, ArrowUpRight
} from 'lucide-react';

// ─── Font Loader ──────────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-display: 'Syne', sans-serif;
        --font-body: 'Outfit', sans-serif;
        --c-bg: #060810;
        --c-surface: #0d1120;
        --c-border: rgba(255,255,255,0.07);
        --c-border-hover: rgba(0,210,255,0.35);
        --c-cyan: #00D2FF;
        --c-cyan-dim: rgba(0,210,255,0.12);
        --c-amber: #FFB547;
        --c-amber-dim: rgba(255,181,71,0.12);
        --c-text: #E8EAF0;
        --c-muted: #6B7280;
        --c-subtle: rgba(255,255,255,0.05);
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: var(--c-bg); color: var(--c-text); font-family: var(--font-body); }
      ::selection { background: var(--c-cyan); color: #060810; }
      
      .reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
      }
      .reveal.visible { opacity: 1; transform: none; }
      .reveal-d1 { transition-delay: 0.1s; }
      .reveal-d2 { transition-delay: 0.2s; }
      .reveal-d3 { transition-delay: 0.3s; }
      .reveal-d4 { transition-delay: 0.4s; }

      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes pulse-ring { 0%{transform:scale(1);opacity:.4} 100%{transform:scale(1.6);opacity:0} }
      @keyframes spin-slow { to { transform: rotate(360deg); } }
      @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

      .ticker-wrap { overflow: hidden; white-space: nowrap; }
      .ticker-inner { display: inline-block; animation: ticker 22s linear infinite; }
      .ticker-inner:hover { animation-play-state: paused; }

      .nav-dot { 
        position: relative;
        transition: color .25s;
      }
      .nav-dot::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 100%;
        height: 1.5px;
        background: var(--c-cyan);
        transition: transform .3s cubic-bezier(.16,1,.3,1);
        transform-origin: center;
      }
      .nav-dot.active::after,
      .nav-dot:hover::after { transform: translateX(-50%) scaleX(1); }
      .nav-dot.active { color: var(--c-cyan); }

      .skill-bar-fill {
        height: 2px;
        background: linear-gradient(90deg, var(--c-cyan), var(--c-amber));
        border-radius: 999px;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 1.2s cubic-bezier(.16,1,.3,1);
      }
      .skill-bar-fill.animated { transform: scaleX(1); }

      .project-card {
        cursor: pointer;
        border: 1px solid var(--c-border);
        border-radius: 16px;
        overflow: hidden;
        background: var(--c-surface);
        transition: border-color .3s, transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s;
      }
      .project-card:hover {
        border-color: var(--c-border-hover);
        transform: translateY(-6px);
        box-shadow: 0 24px 64px rgba(0,210,255,0.08);
      }
      .project-card .overlay {
        opacity: 0;
        transition: opacity .3s;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(2px);
      }
      .project-card:hover .overlay { opacity: 1; }
      .project-card:hover .card-title { color: var(--c-cyan); }

      .contact-card {
        border: 1px solid var(--c-border);
        border-radius: 16px;
        padding: 1.5rem;
        background: var(--c-surface);
        transition: border-color .3s, transform .3s, background .3s;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: var(--c-text);
      }
      .contact-card:hover {
        border-color: var(--c-border-hover);
        background: var(--c-cyan-dim);
        transform: translateY(-4px);
      }
      .contact-card:hover .contact-icon { background: var(--c-cyan-dim); color: var(--c-cyan); }

      .btn-primary {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 14px 32px;
        background: var(--c-cyan);
        color: #060810;
        font-family: var(--font-body);
        font-weight: 600;
        font-size: 15px;
        border-radius: 999px;
        border: none;
        cursor: pointer;
        transition: background .2s, transform .2s, box-shadow .2s;
        text-decoration: none;
      }
      .btn-primary:hover { background: #33dcff; transform: scale(1.03); box-shadow: 0 8px 32px rgba(0,210,255,0.25); }

      .btn-ghost {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 13px 32px;
        background: transparent;
        color: var(--c-text);
        font-family: var(--font-body);
        font-weight: 500;
        font-size: 15px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.18);
        cursor: pointer;
        transition: border-color .2s, color .2s, background .2s;
        text-decoration: none;
      }
      .btn-ghost:hover { border-color: var(--c-cyan); color: var(--c-cyan); background: var(--c-cyan-dim); }

      .tag {
        padding: 4px 12px;
        background: var(--c-subtle);
        border: 1px solid var(--c-border);
        border-radius: 999px;
        font-size: 12px;
        color: var(--c-muted);
        font-family: var(--font-body);
      }

      .section-label {
        font-family: var(--font-body);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--c-cyan);
      }

      .display-heading {
        font-family: var(--font-display);
        font-weight: 800;
        line-height: 1.05;
        color: var(--c-text);
      }

      .timeline-item::before {
        content: '';
        position: absolute;
        left: -29px;
        top: 6px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--c-cyan);
        box-shadow: 0 0 0 3px rgba(0,210,255,0.15);
      }

      .mobile-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(6,8,16,0.98);
        border-bottom: 1px solid var(--c-border);
        backdrop-filter: blur(20px);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .mobile-nav-btn {
        background: none; border: none; cursor: pointer;
        font-family: var(--font-body); font-size: 1.1rem; font-weight: 500;
        color: var(--c-muted); padding: 0.5rem 0; text-align: left;
        transition: color .2s;
      }
      .mobile-nav-btn.active, .mobile-nav-btn:hover { color: var(--c-cyan); }

      .grain {
        position: fixed; inset: 0; pointer-events: none; z-index: 9999;
        opacity: 0.025;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      }

      @media (max-width: 768px) {
        .hide-mobile { display: none !important; }
        .show-mobile { display: flex !important; }
      }
      @media (min-width: 769px) {
        .show-mobile { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

// ─── Particle Canvas ──────────────────────────────────────────────────────────
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };

    class P {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.r = Math.random() * 1.5 + 0.3;
        this.color = Math.random() > 0.6 ? 'rgba(0,210,255,0.4)' : 'rgba(255,181,71,0.2)';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          const f = ((120 - d) / 120) * 0.4;
          this.x -= (dx / d) * f * 15;
          this.y -= (dy / d) * f * 15;
        }
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const n = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < n; i++) particles.push(new P());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.strokeStyle = `rgba(0,210,255,${0.07 - d / 1300})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        particles[a].update();
        particles[a].draw();
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    resize();
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'var(--c-bg)' }}
    />
  );
};

// ─── Reveal Hook ─────────────────────────────────────────────────────────────
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
};

// ─── Portfolio ────────────────────────────────────────────────────────────────
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [slide, setSlide] = useState(0);
  const skillsRef = useRef(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

  useReveal();

  useEffect(() => {
    document.title = 'Fariz Faiz | Creative Motion Designer';
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top >= -100 && r.top <= 320) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  // Skills bar animation
  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const nextSlide = (e) => {
    e.stopPropagation();
    if (selectedProject) setSlide(p => (p + 1) % selectedProject.gallery.length);
  };
  const prevSlide = (e) => {
    e.stopPropagation();
    if (selectedProject) setSlide(p => (p === 0 ? selectedProject.gallery.length - 1 : p - 1));
  };

  const nav = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const skills = [
    { icon: <Layers size={20} />, title: 'Motion Graphics', pct: 60, desc: 'Kinetic Typography · VFX · Compositing', color: '#A78BFA' },
    { icon: <Monitor size={20} />, title: '3D Modelling', pct: 55, desc: 'Blender · Texturing · Rigging', color: 'var(--c-cyan)' },
    { icon: <PenTool size={20} />, title: 'Illustration', pct: 40, desc: 'Illustrator · Photoshop · Vector Art', color: 'var(--c-amber)' },
    { icon: <Video size={20} />, title: 'Video Editing', pct: 28, desc: 'Premiere Pro · After Effects · Audio', color: '#F87171' },
  ];

  const projects = [
    {
      title: 'Eco-Responsibility AR Experience',
      category: 'AR / 3D Design',
      description: 'A spatial environment built in Adobe Aero bridging technology and nature. Gamified AR storytelling significantly outperforms static media in promoting ecological understanding.',
      tools: ['Adobe Aero', 'Blender', 'Interactive Design'],
      accent: '#34D399',
      thumbnailSrc: '/3D.png',
      gallery: [
        { type: 'video', src: '/Penyuu.mp4' },
        { type: 'video', src: '/kilang.mp4' },
      ],
    },
    {
      title: 'Motion Design',
      category: 'Motion Graphics',
      description: 'Dynamic motion graphics featuring kinetic typography and complex vector art. Leverages projection mapping to transform physical spaces into immersive visual narratives.',
      tools: ['After Effects', 'Illustrator', 'Motion Design'],
      accent: '#A78BFA',
      thumbnailSrc: '/MOTION DESIGN.png',
      gallery: [
        { type: 'video', src: '/soulfest faiz (1).mp4' },
        { type: 'video', src: '/Final Submission 17 1 24 (17 Jan 2024 At 15 10).mp4' },
      ],
    },
    {
      title: 'Durioo Studio Content',
      category: 'Video Editing',
      description: 'Managed end-to-end editing for animated series with thousands of subscribers. Ensured brand consistency and perfect audio-visual sync for broadcast delivery.',
      tools: ['Premiere Pro', 'After Effects', 'Audio Sync'],
      accent: '#FB923C',
      thumbnailSrc: '/VIDEO EDITING.png',
      gallery: [
        { type: 'image', src: '/unnamed.png' },
        { type: 'image', src: '/Screenshot 2026-01-14 131207.png' },
      ],
    },
    {
      title: 'Creative Illustration Series',
      category: 'Illustration',
      description: 'Vector-based character designs and digital art. Stylized portraits and concept art made in Adobe Illustrator, demonstrating a keen eye for color theory and form.',
      tools: ['Adobe Illustrator', 'Digital Painting', 'Character Design'],
      accent: '#F472B6',
      thumbnailSrc: '/ILLUSTRATION.png',
      gallery: [
        { type: 'image', src: '/1135.jpg' },
        { type: 'image', src: '/IMG_1214.JPG' },
      ],
    },
    {
      title: 'Visual Storytelling',
      category: 'Storytelling',
      description: 'Compelling visual narratives through storyboarding, sequence planning, and creative direction — ensuring every frame contributes to the emotional arc.',
      tools: ['Storyboarding', 'Creative Direction', 'Narrative Planning'],
      accent: 'var(--c-cyan)',
      thumbnailSrc: 'https://placehold.co/600x400/0d1120/00D2FF?text=Visual+Storytelling',
      gallery: [
        { type: 'video', src: 'Mental health awareness.mp4' },
        { type: 'video', src: 'Story of kindness.mp4' },
      ],
    },
  ];

  const experiences = [
    {
      role: 'Video Editor (Intern)',
      company: 'Durioo Studio',
      period: 'Apr 2025 – Jan 2026',
      location: 'Cyberjaya, Malaysia',
      points: [
        'Managed end-to-end editing workflow for animated series using Premiere Pro & After Effects.',
        'Coordinated with animators and sound engineers to meet broadcast deadlines.',
        'Built a file management system that optimised team workflow efficiency.',
      ],
    },
    {
      role: 'Graphic Designer (Intern)',
      company: 'Peveyhack',
      period: 'Nov 2022 – Jan 2023',
      points: [
        'Spearheaded editing for 20+ high-volume wedding photography albums.',
        'Achieved 80% client satisfaction through consistent visual delivery.',
        'Organised raw footage assets to reduce retrieval time significantly.',
      ],
    },
    {
      role: 'Freelance Editor',
      company: 'Self-Employed',
      period: 'Ongoing',
      points: [
        'Diverse projects ranging from corporate videos to social media content.',
      ],
    },
  ];

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', minHeight: '100vh', fontFamily: 'var(--font-body)', color: 'var(--c-text)' }}>
      <FontLoader />
      <ParticleCanvas />
      <div className="grain" />

      {/* ── MODAL ── */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--c-surface)',
              border: '1px solid var(--c-border)',
              borderRadius: 20,
              maxWidth: 900, width: '100%', maxHeight: '92vh',
              overflowY: 'auto', position: 'relative',
              boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute', top: 16, right: 16, zIndex: 10,
                background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff', transition: 'background .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#EF4444'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
            >
              <X size={20} />
            </button>

            {/* Carousel */}
            <div style={{ position: 'relative', background: '#000', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="overlay" style={{ position: 'absolute', inset: 0 }} />
              {selectedProject.gallery[slide].type === 'video' ? (
                <video
                  key={slide} src={selectedProject.gallery[slide].src}
                  controls autoPlay
                  style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain' }}
                />
              ) : (
                <img
                  key={slide} src={selectedProject.gallery[slide].src}
                  alt=""
                  style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain' }}
                />
              )}
              {selectedProject.gallery.length > 1 && (
                <>
                  <button onClick={prevSlide} style={{ position: 'absolute', left: 12, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'background .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--c-cyan)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                  ><ChevronLeft size={22} /></button>
                  <button onClick={nextSlide} style={{ position: 'absolute', right: 12, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'background .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--c-cyan)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                  ><ChevronRight size={22} /></button>
                  <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                    {selectedProject.gallery.map((_, i) => (
                      <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 8, height: 8, borderRadius: 999, background: i === slide ? 'var(--c-cyan)' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'width .3s, background .3s' }} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div style={{ padding: '2rem' }}>
              <span className="section-label">{selectedProject.category}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, marginTop: 8, marginBottom: 12 }}>{selectedProject.title}</h3>
              <p style={{ color: 'var(--c-muted)', lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>{selectedProject.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedProject.tools.map((t, i) => <span key={i} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background .3s, padding .3s, border-color .3s',
        background: scrolled ? 'rgba(6,8,16,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--c-border)' : '1px solid transparent',
        padding: scrolled ? '12px 0' : '20px 0',
      }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => scrollTo('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '0.04em', color: 'var(--c-text)', lineHeight: 1 }}>
            FARIZ<span style={{ color: 'var(--c-cyan)' }}>FAIZ</span>
          </button>

          <div className="hide-mobile" style={{ display: 'flex', gap: '2.5rem' }}>
            {nav.map(n => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`nav-dot${activeSection === n.id ? ' active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: activeSection === n.id ? 'var(--c-cyan)' : 'var(--c-muted)', letterSpacing: '0.02em' }}
              >{n.name}</button>
            ))}
          </div>

          <button className="show-mobile" onClick={() => setMenuOpen(m => !m)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-text)', display: 'none' }}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {nav.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className={`mobile-nav-btn${activeSection === n.id ? ' active' : ''}`}>{n.name}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80, zIndex: 1 }}>
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', width: 500, height: 500, top: '10%', left: '5%', background: 'radial-gradient(circle, rgba(0,210,255,0.06) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, bottom: '15%', right: '10%', background: 'radial-gradient(circle, rgba(255,181,71,0.05) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 2rem', textAlign: 'center', position: 'relative' }}>
          <div className="reveal" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
            padding: '6px 16px', borderRadius: 999,
            border: '1px solid rgba(0,210,255,0.25)',
            background: 'rgba(0,210,255,0.06)',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 0 0 rgba(34,197,94,0.5)', animation: 'pulse-ring 1.5s ease-out infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', color: 'var(--c-cyan)', textTransform: 'uppercase' }}>Available for Hire</span>
          </div>

          <h1 className="reveal reveal-d1 display-heading" style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)', marginBottom: 20 }}>
            Creative{' '}
            <span style={{ color: 'var(--c-cyan)', position: 'relative', display: 'inline-block' }}>
              Motion
              <svg style={{ position: 'absolute', bottom: -6, left: 0, width: '100%', overflow: 'visible' }} height="8" viewBox="0 0 300 8">
                <path d="M0 6 Q75 0 150 6 Q225 12 300 6" stroke="var(--c-amber)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            Designer
          </h1>

          <p className="reveal reveal-d2" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--c-muted)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
            I translate complex concepts into compelling visual narratives — 3D modeling, kinetic typography, and immersive VFX.
          </p>

          <div className="reveal reveal-d3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('projects')} className="btn-primary">
              View My Work <ChevronDown size={18} />
            </button>
            <button onClick={() => scrollTo('contact')} className="btn-ghost">
              Contact Me <Mail size={18} />
            </button>
          </div>

          {/* Stats row */}
          <div className="reveal reveal-d4" style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 64, flexWrap: 'wrap' }}>
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '5+', label: 'Projects Delivered' },
              { value: '3.26', label: 'Diploma CGPA' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--c-cyan)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--c-muted)', marginTop: 4, letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: 'float 2.5s ease-in-out infinite', color: 'var(--c-muted)' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background: 'var(--c-surface)', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)', padding: '12px 0', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div className="ticker-inner" style={{ display: 'inline-flex', gap: 0 }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '3rem', alignItems: 'center', paddingRight: '3rem', whiteSpace: 'nowrap' }}>
              {['Motion Design', '·', '3D Modelling', '·', 'Video Editing', '·', 'Illustration', '·', 'AR Experience', '·', 'Projection Mapping', '·', 'After Effects', '·', 'Blender', '·', 'Premiere Pro', '·'].map((t, j) => (
                <span key={j} style={{ fontSize: 13, fontWeight: t === '·' ? 400 : 500, color: t === '·' ? 'var(--c-border)' : 'var(--c-muted)', letterSpacing: '0.05em' }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '7rem 0', background: 'rgba(13,17,32,0.9)', backdropFilter: 'blur(10px)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 2rem', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Image */}
          <div className="reveal" style={{ flex: '0 0 auto', width: 'clamp(220px, 35%, 380px)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -1, background: 'linear-gradient(135deg, var(--c-cyan), var(--c-amber))', borderRadius: 20, opacity: 0.4, filter: 'blur(16px)' }} />
            <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--c-border)', aspectRatio: '1', background: 'var(--c-surface)' }}>
              <img
                src="/AUDG5UDLL5R51IN6JE2T.jpg"
                alt="Fariz Faiz"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={e => { e.target.src = 'https://placehold.co/400x400/0d1120/6B7280?text=FF'; }}
              />
              {/* Accent badge */}
              <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(6,8,16,0.85)', backdropFilter: 'blur(10px)', border: '1px solid var(--c-border)', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-text)' }}>Open to Work</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div style={{ flex: '1 1 300px' }}>
            <div className="reveal section-label" style={{ marginBottom: 12 }}>About Me</div>
            <h2 className="reveal reveal-d1 display-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 20 }}>
              Designing Experiences,<br />
              <span style={{ color: 'var(--c-cyan)' }}>Not Just Visuals</span>
            </h2>

            <div className="reveal reveal-d2" style={{ display: 'flex', flexDirection: 'column', gap: 14, color: 'var(--c-muted)', fontSize: 15, lineHeight: 1.75 }}>
              <p>Hi, I'm <strong style={{ color: 'var(--c-text)', fontWeight: 600 }}>Fariz Faiz</strong>. Born in Pahang, based in Selangor — I've had a deep passion for graphic arts my entire life.</p>
              <p>I started with a <span style={{ color: 'var(--c-text)' }}>Diploma in Computer Graphic Design</span> and am currently in my final year of a <span style={{ color: 'var(--c-text)' }}>Bachelor's in Creative Motion Design at UiTM</span>.</p>
              <p>My work fuses technical precision with artistic intuition. Whether it's 3D animation, video editing, or projection mapping, I create immersive experiences that drive engagement and tell a story.</p>
            </div>

            <div className="reveal reveal-d3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 }}>
              {[
                { val: '3.26', sub: 'CGPA — Diploma', color: 'var(--c-cyan)' },
                { val: 'Final Yr', sub: 'Undergraduate', color: 'var(--c-amber)' },
                { val: 'UiTM', sub: 'Puncak Alam', color: 'var(--c-cyan)' },
                { val: 'Selangor', sub: 'Malaysia', color: 'var(--c-amber)' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '16px 18px', background: 'var(--c-subtle)', border: '1px solid var(--c-border)', borderRadius: 12 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: 'var(--c-muted)', marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" ref={skillsRef} style={{ padding: '7rem 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 2rem' }}>
          <div className="reveal" style={{ marginBottom: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
            <span className="section-label">Capabilities</span>
            <h2 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Technical <span style={{ color: 'var(--c-cyan)' }}>Arsenal</span></h2>
            <p style={{ color: 'var(--c-muted)', maxWidth: 480, fontSize: 15, lineHeight: 1.7 }}>My proficiency across tools and disciplines within the creative industry.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {skills.map((sk, i) => (
              <div
                key={i}
                className="reveal"
                style={{ padding: '1.75rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 16, transitionDelay: `${i * 0.08}s`, transition: 'border-color .3s, transform .3s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-border-hover)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ color: sk.color, marginBottom: 14 }}>{sk.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>{sk.title}</div>
                <div style={{ fontSize: 12, color: 'var(--c-muted)', marginBottom: 20, lineHeight: 1.5 }}>{sk.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 2, background: 'var(--c-subtle)', borderRadius: 999, overflow: 'hidden' }}>
                    <div
                      className={`skill-bar-fill${skillsVisible ? ' animated' : ''}`}
                      style={{ width: `${sk.pct}%`, transitionDelay: `${0.3 + i * 0.1}s` }}
                    />
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: sk.color, minWidth: 32 }}>{sk.pct}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Software badges */}
          <div className="reveal" style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {['After Effects', 'Premiere Pro', 'Blender', 'Illustrator', 'Photoshop', 'Adobe Aero', 'DaVinci Resolve'].map((s, i) => (
              <div key={i} style={{ padding: '8px 18px', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 999, fontSize: 13, color: 'var(--c-muted)', fontWeight: 500 }}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: '7rem 0', background: 'rgba(13,17,32,0.95)', backdropFilter: 'blur(10px)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80 }}>

          {/* Experience */}
          <div>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
              <Briefcase size={22} style={{ color: 'var(--c-cyan)' }} />
              <h2 className="display-heading" style={{ fontSize: '1.75rem' }}>Experience</h2>
            </div>
            <div style={{ borderLeft: '1px solid var(--c-border)', paddingLeft: 28, marginLeft: 6, display: 'flex', flexDirection: 'column', gap: 36 }}>
              {experiences.map((exp, i) => (
                <div key={i} className="reveal timeline-item" style={{ position: 'relative', transitionDelay: `${i * 0.1}s` }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{exp.role}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: 'var(--c-cyan)', fontWeight: 600 }}>{exp.company}</span>
                    <span style={{ color: 'var(--c-border)' }}>·</span>
                    <span style={{ fontSize: 13, color: 'var(--c-muted)' }}>{exp.period}</span>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.6, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ marginTop: 7, width: 4, height: 4, borderRadius: '50%', background: 'var(--c-border)', flexShrink: 0 }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education + Achievements */}
          <div>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
              <GraduationCap size={22} style={{ color: 'var(--c-cyan)' }} />
              <h2 className="display-heading" style={{ fontSize: '1.75rem' }}>Education</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { degree: "Bachelor in Creative Motion Design", inst: "UiTM Puncak Alam", period: "2023 – 2026", note: "Final Year · Specialisation in 3D Dynamics" },
                { degree: "Diploma in Computer Graphic Design", inst: "KPTM Batu Pahat", period: "2020 – 2022", note: "Dean's List · CGPA 3.26" },
              ].map((ed, i) => (
                <div key={i} className="reveal" style={{ padding: '1.25rem 1.5rem', background: 'var(--c-subtle)', border: '1px solid var(--c-border)', borderRadius: 14, transitionDelay: `${i * 0.1}s` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 2 }}>{ed.degree}</div>
                      <div style={{ fontSize: 13, color: 'var(--c-cyan)', fontWeight: 500 }}>{ed.inst}</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: 999, color: 'var(--c-muted)', whiteSpace: 'nowrap' }}>{ed.period}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--c-muted)' }}>{ed.note}</div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="reveal" style={{ marginTop: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{ color: 'var(--c-amber)', fontSize: 16 }}>★</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700 }}>Key Achievements</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { title: 'AR Innovation', desc: 'Gamified AR proved superior to static media in eco-engagement studies.' },
                  { title: 'Broadcast Reach', desc: 'Content reached thousands via Durioo Studio's animated series.' },
                ].map((a, i) => (
                  <div key={i} style={{ padding: '14px', background: 'var(--c-subtle)', border: '1px solid var(--c-border)', borderRadius: 12 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--c-muted)', lineHeight: 1.5 }}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: '7rem 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 2rem' }}>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
            <div>
              <span className="section-label" style={{ display: 'block', marginBottom: 10 }}>Portfolio</span>
              <h2 className="display-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                Featured <span style={{ background: 'linear-gradient(90deg, #C084FC, #F472B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Works</span>
              </h2>
              <p style={{ color: 'var(--c-muted)', marginTop: 8, fontSize: 15 }}>Selected projects from academic and professional career.</p>
            </div>
            <a href="https://www.behance.net/farizfaizz" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--c-cyan)', fontWeight: 600, fontSize: 14, textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#33dcff'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--c-cyan)'}
            >
              Behance Profile <ArrowUpRight size={16} />
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {projects.map((p, i) => (
              <div
                key={i}
                className={`reveal project-card${i === 0 ? ' reveal-d1' : ''}`}
                style={{ transitionDelay: `${i * 0.07}s` }}
                onClick={() => { setSelectedProject(p); setSlide(0); }}
              >
                <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#0a0e1a' }}>
                  <img
                    src={p.thumbnailSrc}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.target.style.transform = 'none'}
                    onError={e => { e.target.src = `https://placehold.co/600x400/0d1120/${p.accent.replace('#', '')}?text=${encodeURIComponent(p.category)}`; }}
                  />
                  <div className="overlay" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ padding: '12px 24px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#fff' }}>
                      <Maximize2 size={16} /> Open Project
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: p.accent, border: `1px solid ${p.accent}40` }}>
                    {p.category}
                  </div>
                </div>
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <h3 className="card-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 8, transition: 'color .3s' }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.65, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.tools.map((t, j) => <span key={j} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '7rem 0', background: 'rgba(13,17,32,0.95)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div className="reveal section-label" style={{ marginBottom: 12 }}>Get In Touch</div>
          <h2 className="reveal reveal-d1 display-heading" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: 20 }}>
            Let's Create Something <span style={{ color: 'var(--c-cyan)' }}>Extraordinary</span>
          </h2>
          <p className="reveal reveal-d2" style={{ color: 'var(--c-muted)', fontSize: 16, lineHeight: 1.75, marginBottom: 56, maxWidth: 500, margin: '0 auto 56px' }}>
            Looking for internships and freelance opportunities in Motion Design. Have a project in mind? Let's talk.
          </p>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 32 }}>
            <a href="mailto:farizfaiz7@gmail.com" className="contact-card">
              <div className="contact-icon" style={{ padding: 14, background: 'var(--c-subtle)', borderRadius: '50%', transition: 'background .3s, color .3s' }}><Mail size={22} /></div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Email</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>farizfaiz7@gmail.com</div>
              </div>
            </a>
            <a href="https://wa.me/60197713321" target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-icon" style={{ padding: 14, background: 'var(--c-subtle)', borderRadius: '50%', transition: 'background .3s, color .3s' }}><Phone size={22} /></div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>WhatsApp</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>+60-197713321</div>
              </div>
            </a>
            <a href="https://www.behance.net/farizfaizz" target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-icon" style={{ padding: 14, background: 'var(--c-subtle)', borderRadius: '50%', transition: 'background .3s, color .3s' }}><Layers size={22} /></div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Portfolio</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Behance ↗</div>
              </div>
            </a>
          </div>

          <div className="reveal reveal-d2">
            <a
              href="/RESUME_GRAPHIC_DESIGN_FARIZFAIZ.pdf"
              download="RESUME_GRAPHIC_DESIGN_FARIZFAIZ.pdf"
              className="btn-ghost"
              style={{ display: 'inline-flex' }}
            >
              <Download size={18} /> Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '2rem', borderTop: '1px solid var(--c-border)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: 'var(--c-muted)' }}>
            © {new Date().getFullYear()} <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>Fariz Faiz</span>. All Rights Reserved.
          </div>
          <div style={{ fontSize: 11, color: 'rgba(107,114,128,0.5)', marginTop: 6, letterSpacing: '0.05em' }}>Designed & Developed with React · Syne & Outfit Typefaces</div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
