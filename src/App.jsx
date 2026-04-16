import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MapPin,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Monitor,
  Video,
  PenTool,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Download,
  X
} from 'lucide-react';

// --- Main Portfolio Component ---
const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Set Page Title
  useEffect(() => {
    document.title = "Fariz Faiz | Creative Portfolio";
  }, []);

  // Prevent background scrolling when project modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- PROJECT DATA ---
  const projects = [
    {
      title: "Motion Design & Video Mapping",
      category: "Motion Animation",
      description: "Projection mapping and dynamic motion graphic projects. Including animated videos and kinetic typography projected directly onto building facades to create massive, engaging visual experiences.",
      tools: ["After Effects", "Illustrator", "Projection Mapping"],
      thumbnailSrc: "/MOTION DESIGN.png",
      gallery: [
        { type: "image", src: "/MOTION DESIGN.png" }, 
        { type: "video", src: "/soulfest faiz (1).mp4" },
        { type: "video", src: "/1000117783.mp4" }
      ]
    },
    {
      title: "Video Editing & Post-Production",
      category: "Video Editing",
      description: "Various editing projects ranging from public broadcast animated series (Durioo Studio) to short films and awareness campaigns. Focused on narrative pacing, color grading, and perfect audio syncing.",
      tools: ["Premiere Pro", "After Effects", "Audio Sync"],
      thumbnailSrc: "/VIDEO EDITING.png", 
      gallery: [
        { type: "image", src: "/VIDEO EDITING.png" },
        { type: "image", src: "/unnamed.png" },
        { type: "video", src: "/Mental health awareness.mp4" },
        { type: "video", src: "/Story of kindness.mp4" }
      ]
    },
    {
      title: "Graphic Design",
      category: "Digital Illustration",
      description: "A collection of digital drawings, custom apparel designs, and cartoon characters. I love playing with vibrant colors and creating lively, expressive shapes that bring the characters to life.",
      tools: ["Adobe Illustrator", "Digital Painting", "Character Design"],
      thumbnailSrc: "/ILLUSTRATION.png", 
      gallery: [
        { type: "image", src: "/ILLUSTRATION.png" },
        { type: "image", src: "/colle poster 1.png" },
        { type: "image", src: "/colle poster 2.png" },
        { type: "image", src: "/IMG_1135.PNG" }, 
        { type: "image", src: "/IMG_1214.JPG" }
      ]
    },
    {
      title: "3D Animation & Modeling",
      category: "3D Design",
      description: "3D modeling and animation projects exploring spatial environments, fluid character movements, and mechanical product visualization.",
      tools: ["Blender", "3D Animation", "Rendering"],
      thumbnailSrc: "/3D.png", 
      gallery: [
        { type: "image", src: "/3D.png" },
        { type: "video", src: "/Penyuu.mp4" },
        { type: "video", src: "/kilang.mp4" },
        { type: "video", src: "/1000117780.mp4" },
        { type: "video", src: "/1000117781.mp4" },
        { type: "video", src: "/1000117782.mp4" }
      ]
    }
  ];

  const experiences = [
    {
      company: "Peveyhack",
      role: "Graphic Designer (Intern)",
      period: "Nov 2022 - Jan 2023",
    },
    
    {
      company: "Durioo Studio",
      role: "Video Editor (Intern)",
      period: "Apr 2025 - Jan 2026",
    },

    {
      company: "Freelance",
      role: "Video Editor & Designer",
      period: "Present",
    },
  ];

  return (
    // 👉 1. MAIN BACKGROUND & TEXT COLOR 
    // Change 'bg-[#09090b]' to your preferred background color.
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* --- FULL PROJECT VIEW MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-[#09090b]/95 backdrop-blur-xl overflow-y-auto flex flex-col animate-in fade-in duration-300">
          
          <div className="sticky top-0 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/50 px-6 py-4 flex justify-between items-center z-10">
            <h2 className="font-bold text-lg text-zinc-100 line-clamp-1">{selectedProject.title}</h2>
            <button 
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-full text-sm font-bold transition-colors"
            >
              Close <X size={18} />
            </button>
          </div>

          <div className="flex-grow w-full max-w-5xl mx-auto py-12 px-4 md:px-8">
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                {selectedProject.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">{selectedProject.title}</h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">{selectedProject.description}</p>
              
              <div className="flex flex-wrap justify-center gap-2">
                 {selectedProject.tools.map((tool, i) => (
                    <span key={i} className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-bold rounded-xl shadow-sm">
                      {tool}
                    </span>
                 ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-10 rounded-2xl overflow-hidden">
              {selectedProject.gallery.map((media, idx) => (
                media.type === 'video' ? (
                  <video 
                    key={idx} 
                    src={media.src} 
                    controls 
                    autoPlay={idx === 0}
                    className="w-full h-auto object-cover rounded-2xl border border-zinc-800/50" 
                  />
                ) : (
                  <img 
                    key={idx}
                    src={media.src} 
                    alt={`${selectedProject.title} part ${idx + 1}`} 
                    className="w-full h-auto object-cover rounded-2xl border border-zinc-800/50" 
                  />
                )
              ))}
            </div>
            
            <div className="mt-16 mb-8 text-center">
              <button 
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-zinc-200 text-black rounded-full font-bold transition-all"
              >
                Back to Portfolio <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING NAVBAR --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-full px-2 py-2 flex items-center gap-1 md:gap-2">
        {['Home', 'Work', 'Experience', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item.toLowerCase())}
            className="px-4 md:px-6 py-2 text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full transition-all"
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-24">
        
        {/* --- BENTO GRID: HERO & ABOUT --- */}
        {/* 👉 2. LAYOUT: COLUMNS */}
        {/* Change 'md:grid-cols-3 lg:grid-cols-4' to adjust how many boxes per row */}
        <section id="home" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:auto-rows-[320px] mb-4">
          
          {/* Main Intro Box (Spans 2 cols, 1 row on large screens) */}
          {/* 👉 3. THEME: BOX COLORS & BORDERS */}
          {/* Change 'bg-zinc-900/50' for box color, 'rounded-[2rem]' for corner roundness */}
          <div className="md:col-span-2 lg:col-span-2 bg-zinc-900/50 border border-zinc-800/50 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group">
            
            {/* 👉 4. THEME: GLOW EFFECTS */}
            {/* Change 'bg-indigo-500/10' to change the glowing blur effect color */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-bold tracking-wide mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> AVAILABLE FOR HIRE
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
                Creative <br />
                {/* 👉 5. THEME: TEXT GRADIENTS */}
                {/* Change 'from-indigo-400 to-cyan-400' to change the text gradient colors */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Motion Designer.</span>
              </h1>
            </div>
            <p className="text-zinc-400 font-medium max-w-md">
              Translating complex ideas into engaging visual stories through 3D animation, graphic design, and video editing.
            </p>
          </div>

          {/* Profile Picture Box */}
          <div className="md:col-span-1 lg:col-span-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[2rem] overflow-hidden relative group">
            <img 
              src="/22.png" 
              alt="Fariz Faiz" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.src = "https://placehold.co/600x600/18181b/3f3f46?text=Fariz"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-black text-2xl">Fariz Faiz</p>
              <p className="text-zinc-300 text-sm font-medium flex items-center gap-1"><MapPin size={14}/> Malaysia</p>
            </div>
          </div>

          {/* Contact / Social Box */}
          <div className="md:col-span-1 lg:col-span-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[2rem] p-8 flex flex-col justify-between">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl mb-1">Let's Talk</h3>
              <p className="text-zinc-500 text-sm mb-6">Always open to new projects.</p>
              <div className="flex flex-col gap-2">
                <a href="https://www.linkedin.com/in/farizfaizz" target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl text-white text-sm font-bold transition-colors group">
                  LinkedIn <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-white transition-colors"/>
                </a>
                <a href="https://www.behance.net/farizfaizz" target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl text-white text-sm font-bold transition-colors group">
                  Behance <ExternalLink size={16} className="text-zinc-500 group-hover:text-white transition-colors"/>
                </a>
              </div>
            </div>
          </div>
          
        </section>

        {/* Second Row of Bento Grid */}
        <section id="experience" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
          
          {/* Skills Box */}
          <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800/50 rounded-[2rem] p-8 md:p-10">
            <h3 className="text-white font-bold text-xl mb-8">Software & Expertise</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { 
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="10" cy="14" r="5" stroke="#f97316" strokeWidth="2.5" />
                      <circle cx="10" cy="14" r="2.5" fill="#3b82f6" />
                      <path d="M14 11L19 5" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M10 9V3" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M15 14h5" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  ), 
                  label: "Blender" 
                },
                { 
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24">
                      <rect width="24" height="24" rx="4" fill="#2e1065" />
                      <rect x="1" y="1" width="22" height="22" rx="3" fill="none" stroke="#c084fc" strokeWidth="1.5" />
                      <text x="12" y="16.5" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#c084fc" textAnchor="middle">Pr</text>
                    </svg>
                  ), 
                  label: "Premiere Pro" 
                },
                { 
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24">
                      <rect width="24" height="24" rx="4" fill="#1e1b4b" />
                      <rect x="1" y="1" width="22" height="22" rx="3" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
                      <text x="12" y="16.5" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#a78bfa" textAnchor="middle">Ae</text>
                    </svg>
                  ), 
                  label: "After Effects" 
                },
                { 
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24">
                      <rect width="24" height="24" rx="4" fill="#451a03" />
                      <rect x="1" y="1" width="22" height="22" rx="3" fill="none" stroke="#f97316" strokeWidth="1.5" />
                      <text x="12" y="16.5" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#f97316" textAnchor="middle">Ai</text>
                    </svg>
                  ), 
                  label: "Illustrator" 
                },
              ].map((skill, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-300 shadow-inner border border-zinc-700/50">
                    {skill.icon}
                  </div>
                  <span className="text-xs font-bold text-zinc-400">{skill.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Mini-Timeline */}
          <div className="md:col-span-1 bg-zinc-900/50 border border-zinc-800/50 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center">
            <h3 className="text-white font-bold text-xl mb-6">Experience</h3>
            <div className="space-y-6 border-l-2 border-zinc-800 pl-4 ml-2">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-[#09090b]"></span>
                  <p className="text-white font-bold text-sm leading-tight">{exp.role}</p>
                  <p className="text-zinc-500 text-xs font-medium mt-1">{exp.company} • {exp.period}</p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* --- PROJECTS BENTO GRID --- */}
        <section id="work" className="mb-24">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-3xl font-black text-white tracking-tight">Selected Works</h2>
            <div className="h-px bg-zinc-800 flex-grow mx-6"></div>
            <span className="text-zinc-500 font-bold text-sm">{projects.length} Projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="group relative bg-zinc-900/50 border border-zinc-800/50 rounded-[2rem] overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-zinc-800 p-2">
                   <img 
                     src={project.thumbnailSrc} 
                     alt={project.title}
                     className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80"></div>
                </div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
                  <div>
                    <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-2">{project.category}</p>
                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{project.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- CTA / FOOTER BENTO --- */}
        <section id="contact" className="grid grid-cols-1 gap-4">
          {/* 👉 6. THEME: BOTTOM BANNER COLOR */}
          {/* Change 'from-indigo-600 to-cyan-600' to change the big bottom banner color */}
          <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
            
            <div className="text-center md:text-left mb-8 md:mb-0 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Got an idea?</h2>
              <p className="text-indigo-100 font-medium text-lg">Let's collaborate and build something amazing together.</p>
            </div>
            
            <div className="flex flex-col gap-3 relative z-10 w-full md:w-auto">
              <a href="mailto:farizfaiz7@gmail.com" className="px-8 py-4 bg-white text-black rounded-full font-bold transition-all hover:scale-105 flex justify-center items-center gap-2 shadow-xl">
                Get in Touch
              </a>
              <a 
                href="/RESUME_GRAPHIC_DESIGN_FARIZFAIZ.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-black/20 text-white border border-white/20 hover:bg-black/40 rounded-full font-bold transition-all flex justify-center items-center gap-2"
              >
                <Download size={18} /> Download CV
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-zinc-600 font-bold text-xs uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Fariz Faiz.</p>
        </footer>

      </main>
    </div>
  );
};

export default Portfolio;
