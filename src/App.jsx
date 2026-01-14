import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Mail, 
  Phone, 
  Layers, 
  PenTool, 
  Video, 
  Monitor, 
  Briefcase, 
  GraduationCap,
  ChevronDown,
  Maximize2,
  Play,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- Background Animation Component ---
const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3; // Velocity X
        this.vy = (Math.random() - 0.5) * 0.3; // Velocity Y
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = Math.random() > 0.5 ? 'rgba(34, 211, 238, 0.3)' : 'rgba(59, 130, 246, 0.3)'; // Cyan/Blue
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 150;
        const force = (maxDistance - distance) / maxDistance;

        if (distance < maxDistance) {
          this.x -= forceDirectionX * force * this.density * 0.5;
          this.y -= forceDirectionY * force * this.density * 0.5;
        }

        // Screen wrapping
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000); // Responsive count
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connecting lines
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 - distance/1000})`; // Faint cyan lines
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        particles[a].update();
        particles[a].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-slate-950"
    />
  );
};

// --- Main Portfolio Component ---
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // State for the active modal
  const [currentSlide, setCurrentSlide] = useState(0); // Carousel State

  // Set Page Title
  useEffect(() => {
    document.title = "Fariz Faiz | Creative Motion Designer";
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.gallery) {
        setCurrentSlide((prev) => (prev + 1) % selectedProject.gallery.length);
    }
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.gallery) {
        setCurrentSlide((prev) => (prev === 0 ? selectedProject.gallery.length - 1 : prev - 1));
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  // --- UPDATED PROJECT DATA FOR CAROUSEL ---
  // Use the 'gallery' array to add multiple media items per project
  const projects = [
    {
      title: "Eco-Responsibility AR Experience",
      category: "AR / 3D Design",
      description: "A responsive spatial environment created using Adobe Aero to bridge the gap between technology and nature. Proved that gamified AR storytelling significantly outperforms static media in promoting ecological understanding.",
      tools: ["Adobe Aero", "Blender", "Interactive Design"],
      color: "from-green-500 to-emerald-700",
      
      // 1. EDIT THIS LINE for the main card image
      thumbnailSrc: "/3D.png", // <--- CHANGE THIS LINE (File must be in 'public' folder)
      
      // 2. EDIT THIS GALLERY for the popup media (images or videos)
      gallery: [
        // Slide 1
        { type: "image", src: "/image_1d075b.png" }, // <--- CHANGE THIS LINE
        // Slide 2
        { type: "image", src: "https://placehold.co/1920x1080/064e3b/34d399?text=Process+Shot" } 
      ]
    },
    {
      title: "Soulfest Projection Mapping",
      category: "Motion Graphics",
      description: "Animated kinetic typography in After Effects, mapped to a building façade for the 'Malaysian Slang' competition entry. Featured intricate vector designs created in Illustrator.",
      tools: ["After Effects", "Illustrator", "Projection Mapping"],
      color: "from-purple-500 to-indigo-700",
      
      // 1. EDIT THIS LINE for the main card image
      thumbnailSrc: "/MOTION DESIGN.png", // <--- CHANGE THIS LINE
      
      // 2. EDIT THIS GALLERY
      gallery: [
        { type: "video", src: "/soulfest faiz (1).mp4" }, // <--- CHANGE THIS LINE
        { type: "video", src: "Final Submission 17_1_24 (17 Jan 2024 at 15_10)" }
      ]
    },
    {
      title: "Durioo Studio Content",
      category: "Video Editing",
      description: "Managed end-to-end editing workflow for animated series viewed by thousands of subscribers. Ensured brand consistency and synchronized audio-visual elements for broadcast.",
      tools: ["Premiere Pro", "After Effects", "Audio Sync"],
      color: "from-red-500 to-orange-700",
      
      // 1. EDIT THIS LINE for the main card image
      thumbnailSrc: "/VIDEO EDITING.png", // <--- CHANGE THIS LINE
      
      // 2. EDIT THIS GALLERY
      gallery: [
        { type: "image", src: "/unnamed.png" }, // <--- CHANGE THIS LINE
        { type: "image", src: "/Screenshot 2026-01-14 131207.png" } // <--- Added your new image here
      ]
    },
    {
      title: "Creative Illustration Series",
      category: "Illustration",
      description: "A showcase of vector-based character designs and digital art. Features stylized portraits and concept art created with precision in Adobe Illustrator, demonstrating a keen eye for color and form.",
      tools: ["Adobe Illustrator", "Digital Painting", "Character Design"],
      color: "from-pink-500 to-rose-700",
      
      // 1. EDIT THIS LINE for the main card image
      thumbnailSrc: "/ILLUSTRATION.png", // <--- CHANGE THIS LINE
      
      // 2. EDIT THIS GALLERY
      gallery: [
        { type: "image", src: "IMG_1135.png" }, // <--- CHANGE THIS LINE
        { type: "image", src: "https://placehold.co/600x400/be185d/fff1f2?text=Sketches" }
      ]
    }
  ];

  const experiences = [
    {
      company: "Durioo Studio",
      role: "Video Editor (Intern)",
      period: "April 2025 - Jan 2026",
      location: "Cyberjaya, Malaysia",
      desc: [
        "Managed end-to-end editing workflow for animated series using Premiere Pro & After Effects.",
        "Coordinated with animators and sound engineers for broadcast deadlines.",
        "Established a file management system that optimized workflow efficiency."
      ]
    },
    {
      company: "Peveyhack",
      role: "Graphic Designer Intern",
      period: "Nov 2022 - Jan 2023",
      desc: [
        "Spearheaded editing for high-volume wedding photography (20+ albums).",
        "Achieved 80% client satisfaction rate through consistent visual delivery.",
        "Organized raw footage assets to reduce retrieval time."
      ]
    }
  ];

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-900 relative">
      
      {/* Animated Background */}
      <BackgroundAnimation />

      {/* Project Modal Overlay */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl shadow-cyan-900/20 flex flex-col"
            onClick={e => e.stopPropagation()} 
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-all transform hover:scale-110"
            >
              <X size={24} />
            </button>
            
            {/* Carousel Media Display */}
            <div className="w-full bg-black relative flex items-center justify-center min-h-[40vh] md:min-h-[60vh] overflow-hidden group">
               
               {/* Previous Slide Button */}
               {selectedProject.gallery.length > 1 && (
                 <button 
                   onClick={prevSlide}
                   className="absolute left-4 z-10 p-3 bg-black/40 hover:bg-cyan-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                 >
                   <ChevronLeft size={32} />
                 </button>
               )}

               {/* Current Slide Media */}
               {selectedProject.gallery[currentSlide].type === 'video' ? (
                  <video 
                    key={currentSlide} // Key forces re-render on slide change
                    src={selectedProject.gallery[currentSlide].src} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain max-h-[70vh]" 
                  />
               ) : (
                  <img 
                    key={currentSlide}
                    src={selectedProject.gallery[currentSlide].src} 
                    alt={`${selectedProject.title} slide ${currentSlide + 1}`} 
                    className="w-full h-full object-contain max-h-[70vh] animate-in fade-in duration-300" 
                  />
               )}

               {/* Next Slide Button */}
               {selectedProject.gallery.length > 1 && (
                 <button 
                   onClick={nextSlide}
                   className="absolute right-4 z-10 p-3 bg-black/40 hover:bg-cyan-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                 >
                   <ChevronRight size={32} />
                 </button>
               )}

               {/* Slide Indicators */}
               {selectedProject.gallery.length > 1 && (
                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                   {selectedProject.gallery.map((_, index) => (
                     <div 
                       key={index} 
                       className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-cyan-500 w-6' : 'bg-white/50'}`}
                     />
                   ))}
                 </div>
               )}
            </div>
            
            <div className="p-8 bg-slate-900">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <div className="text-cyan-400 text-sm font-bold tracking-wider uppercase mb-1 flex items-center gap-2">
                      <Layers size={14} /> {selectedProject.category}
                    </div>
                    <h3 className="text-3xl font-bold text-slate-100">{selectedProject.title}</h3>
                 </div>
                 {/* Page Counter */}
                 {selectedProject.gallery.length > 1 && (
                   <div className="text-slate-500 text-sm font-mono">
                     {currentSlide + 1} / {selectedProject.gallery.length}
                   </div>
                 )}
              </div>
              <p className="text-slate-300 leading-relaxed mb-6 text-lg">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                 {selectedProject.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full border border-slate-700">
                      {tool}
                    </span>
                 ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer" onClick={() => scrollTo('home')}>
            FARIZ<span className="text-slate-100">FAIZ</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${activeSection === link.id ? 'text-cyan-400' : 'text-slate-400'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button className="md:hidden text-slate-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left text-lg font-medium ${activeSection === link.id ? 'text-cyan-400' : 'text-slate-400'}`}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-sm text-cyan-400 text-sm font-semibold tracking-wider animate-fade-in-up">
            AVAILABLE FOR HIRE
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight drop-shadow-2xl">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Motion</span> <br />
            Designer
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
            I translate complex concepts into compelling visual narratives using 3D modeling, kinetic typography, and VFX.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => scrollTo('projects')} className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold rounded-full transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-cyan-500/25">
              View My Work <ChevronDown size={20} />
            </button>
            <button onClick={() => scrollTo('contact')} className="px-8 py-4 border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500 hover:text-cyan-400 text-slate-300 font-bold rounded-full transition-all flex items-center gap-2">
              Contact Me <Mail size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-700 flex items-center justify-center backdrop-blur-md group">
                   {/* Corrected Profile Image */}
                   <img 
                     src="/AUDG5UDLL5R51IN6JE2T.jpg" 
                     alt="Fariz Faiz" 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     onError={(e) => {
                       e.target.onerror = null; 
                       e.target.src = "https://placehold.co/400x400/1e293b/cbd5e1?text=Profile+Image";
                     }}
                   />
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-100">About Me</h2>
              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>
                  Hi, I'm <strong className="text-cyan-400">Fariz Faiz</strong>. Born in Pahang and currently based in Selangor, I have always possessed a deep passion for graphic arts.
                </p>
                <p>
                  I started my journey with a <span className="text-slate-100">Diploma in Computer Graphic Design</span> and am currently in my final year pursuing a <span className="text-slate-100">Bachelor's in Creative Motion Design at UiTM</span>.
                </p>
                <p>
                  My work fuses technical precision with artistic intuition. Whether it's 3D animation, video editing, or projection mapping, I aim to create immersive experiences that drive engagement and tell a story.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-1">3.26</h3>
                  <p className="text-sm text-slate-500">CGPA (Diploma)</p>
                </div>
                <div className="p-4 bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-1">Final Yr</h3>
                  <p className="text-sm text-slate-500">Undergraduate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-transparent relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">Technical <span className="text-cyan-400">Arsenal</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto bg-slate-950/60 p-2 rounded-lg backdrop-blur-sm">My proficiency across various tools and disciplines within the creative industry.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Monitor size={32} />, title: "3D Modelling", percent: "55%", color: "text-blue-400", desc: "Blender, Modeling, Texturing" },
              { icon: <Video size={32} />, title: "Video Editing", percent: "28%", color: "text-red-400", desc: "Premiere Pro, After Effects, Audio Sync" },
              { icon: <PenTool size={32} />, title: "Illustration", percent: "40%", color: "text-yellow-400", desc: "Illustrator, Photoshop, Vector Art" },
              { icon: <Layers size={32} />, title: "Motion Graphics", percent: "60%", color: "text-purple-400", desc: "Kinetic Typography, VFX, Compositing" },
            ].map((skill, idx) => (
              <div key={idx} className="group p-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
                <div className={`${skill.color} mb-4 transform group-hover:scale-110 transition-transform`}>{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{skill.desc}</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full bg-current ${skill.color} opacity-80`} style={{ width: skill.percent }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="py-24 bg-slate-950/90 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-cyan-400" size={28} />
                <h2 className="text-3xl font-bold">Experience</h2>
              </div>
              
              <div className="space-y-8 border-l-2 border-slate-800 pl-8 ml-3">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-900 bg-cyan-500"></span>
                    <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                    <div className="flex flex-wrap gap-x-4 text-sm text-cyan-400 mb-2 font-medium">
                      <span>{exp.company}</span>
                      <span>•</span>
                      <span>{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.desc.map((item, i) => (
                        <li key={i} className="text-slate-400 text-sm leading-relaxed flex items-start">
                          <span className="mr-2 mt-1.5 w-1 h-1 bg-slate-500 rounded-full flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                 <div className="relative">
                    <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-900 bg-slate-600"></span>
                    <h3 className="text-xl font-bold text-slate-100">Freelance Editor</h3>
                    <div className="text-sm text-cyan-400 mb-2 font-medium">Self-Employed</div>
                    <p className="text-slate-400 text-sm">
                      Ongoing diverse projects ranging from corporate videos to social media content.
                    </p>
                  </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-cyan-400" size={28} />
                <h2 className="text-3xl font-bold">Education</h2>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 hover:bg-slate-800/60 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100">Bachelor in Creative Motion Design</h3>
                      <p className="text-cyan-400 font-medium">Universiti Teknologi MARA (UiTM), Puncak Alam</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-slate-700 rounded text-slate-300">2023-2026</span>
                  </div>
                  <p className="text-slate-400 text-sm">Focusing on advanced 3D dynamics and narrative structures.</p>
                </div>

                <div className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 hover:bg-slate-800/60 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100">Diploma in Computer Graphic Design</h3>
                      <p className="text-cyan-400 font-medium">Kolej Poly-Tech MARA (KPTM), Batu Pahat</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-slate-700 rounded text-slate-300">2020-2022</span>
                  </div>
                  <p className="text-slate-400 text-sm">Dean's List Recipient | CGPA: 3.26</p>
                </div>
              </div>

              {/* Achievements Mini Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                   <span className="text-yellow-400">★</span> Key Achievements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50">
                      <h4 className="font-bold text-slate-200">AR Innovation</h4>
                      <p className="text-xs text-slate-400 mt-1">Proved gamified AR outperforms static media.</p>
                   </div>
                   <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50">
                      <h4 className="font-bold text-slate-200">Broadcast Reach</h4>
                      <p className="text-xs text-slate-400 mt-1">Content viewed by thousands at Durioo Studio.</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Works</span></h2>
              <p className="text-slate-400">Selected projects from academic and professional career.</p>
            </div>
            <a href="https://www.behance.net/farizfaizz" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-colors mt-4 md:mt-0">
              View Behance Portfolio <ExternalLink size={18} />
            </a>
          </div>

          {/* Changed grid layout to 2 columns on all medium+ screens for a 2x2 look */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="group relative bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-900/20 backdrop-blur-sm cursor-pointer transform hover:-translate-y-2"
                onClick={() => { setSelectedProject(project); setCurrentSlide(0); }}
              >
                <div className="h-48 w-full relative overflow-hidden">
                   {/* Thumbnail only on card */}
                   <img 
                     src={project.thumbnailSrc} 
                     alt={project.title}
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300`} />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <Maximize2 className="text-white drop-shadow-lg" size={48} />
                   </div>
                </div>
                
                <div className="p-6">
                  <div className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-950/90 backdrop-blur-lg">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's Create Something <span className="text-cyan-400">Motion-Full</span></h2>
          <p className="text-slate-400 text-lg mb-12">
            I'm currently looking for internships and freelance opportunities in Motion Design.
            If you have a project in mind or just want to say hi, feel free to reach out.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:farizfaiz7@gmail.com" className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors flex flex-col items-center gap-4 group">
              <div className="p-4 bg-slate-900 rounded-full group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Email</div>
                <div className="font-bold">farizfaiz7@gmail.com</div>
              </div>
            </a>

            <a href="https://wa.me/60197713321" target="_blank" rel="noreferrer" className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors flex flex-col items-center gap-4 group">
              <div className="p-4 bg-slate-900 rounded-full group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">WhatsApp</div>
                <div className="font-bold">+60-197713321</div>
              </div>
            </a>

            <a href="https://www.behance.net/farizfaizz" target="_blank" rel="noreferrer" className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors flex flex-col items-center gap-4 group">
              <div className="p-4 bg-slate-900 rounded-full group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                <Layers size={24} /> {/* Using Layers as Behance substitute */}
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Portfolio</div>
                <div className="font-bold">Behance</div>
              </div>
            </a>
          </div>

          <a 
            href="/RESUME_GRAPHIC_DESIGN_FARIZFAIZ.pdf" 
            download="RESUME_GRAPHIC_DESIGN_FARIZFAIZ.pdf"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-slate-600 hover:bg-slate-800/80 hover:border-slate-500 text-slate-300 rounded-full font-bold transition-all backdrop-blur-sm cursor-pointer"
          >
            <Download size={20} /> Download Resume
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950/95 border-t border-slate-900 text-center text-slate-600 text-sm backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Fariz Faiz. All Rights Reserved.</p>
          <p className="mt-2">Designed & Developed with React & Tailwind</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;



