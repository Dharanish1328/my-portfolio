import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

// Import images for both themes
import profileImageLight from './image/dharanish-2.png'; // Image for light mode
import profileImageDark from './image/dharanish-1.png';   // Image for dark mode

// Theme Toggle Component
const ThemeToggle = ({ onThemeChange }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
    // Call the callback when theme changes
    if (onThemeChange) {
      onThemeChange(isDark);
    }
  }, [isDark, onThemeChange]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </div>
  );
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    // Initial loading animation
    setTimeout(() => setIsLoading(false), 2000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "services", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle theme change from toggle
  const handleThemeChange = (isDark) => {
    setIsDarkTheme(isDark);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Select image based on current theme
  const currentProfileImage = isDarkTheme ? profileImageDark : profileImageLight;

  // Resume data from PDF
  const personalInfo = {
    name: "A. DHARANISH",
    title: "COMPUTER SCIENCE ENGINEERING STUDENT",
    creative: "FULL STACK DEVELOPER",
    summary: "Computer Science Engineering student with hands-on experience in full stack web development. Skilled in designing and developing responsive user interfaces and building backend services with secure APIs and database integration. Passionate about learning new technologies, problem-solving, and developing real-world applications."
  };

  const techSkills = {
    Languages: ["HTML", "CSS", "JavaScript", "Python"],
    Frameworks: ["React.js", "Node.js", "Express.js"],
    Databases: ["MongoDB", "MySQL"],
    Tools: ["Git", "GitHub", "VS Code", "Figma", "Power BI", "Tableau", "Excel"],
    RPA: ["UiPath Studio"]
  };

  const education = [
    {
      degree: "B.E. Computer Science",
      institution: "Suguna College of Engineering, Coimbatore, Tamil Nadu",
      duration: "2022 - 2026",
      score: "CGPA: 8.0/10.0"
    },
    {
      degree: "Higher Secondary Education",
      institution: "Rasi Matriculation Higher Secondary School, Coimbatore",
      duration: "2021 - 2022",
      score: "Percentage: 72%"
    }
  ];

  const certifications = [
    "Python Web Development - ICT Academy (by Infosys)",
    "Full Stack Development - NOVITECH",
    "Full Stack Java Development - Simplilearn",
    "MERN Stack Development - Naan Mudhalvan",
    "Digital Productivity with AI - CSC Academy & UNICEF (95%)"
  ];

  const projects = [
    {
      title: "Paysprint Web Page",
      role: "Backend Developer",
      tech: ["Node.js", "Express.js", "MongoDB"],
      points: [
        "Engineered secure and modular REST APIs for authentication, user validation, and service processing",
        "Developed optimized MongoDB operations and integrated multiple third-party services for real-time dynamic content"
      ],
      icon: "⚡",
      color: "#667eea"
    },
    {
      title: "E-Commerce Website",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      points: [
        "Implemented product management, cart functions, authentication, and checkout workflows with proper validation",
        "Built responsive React UI integrated with backend APIs for seamless online shopping experience"
      ],
      icon: "🛍️",
      color: "#f093fb"
    },
    {
      title: "Smart Farming Recommendation System",
      tech: ["HTML", "CSS", "JavaScript", "Python (ML)"],
      points: [
        "Implemented ML models using Soil Health Card (SHC), Leaf Colour Chart (LCC), and weather datasets",
        "Developed interactive web interface for real-time AI-driven crop recommendations"
      ],
      icon: "🌱",
      color: "#4facfe"
    },
    {
      title: "AI Content Generator",
      tech: ["React.js", "Python", "OpenAI API", "FastAPI"],
      points: [
        "Built AI-powered content generation tool with multiple templates",
        "Implemented real-time streaming responses and user authentication"
      ],
      icon: "🤖",
      color: "#ff6b6b"
    }
  ];

  // Loading Screen with enhanced animation
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo-container">
            <svg className="loading-svg" width="140" height="140" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea">
                    <animate attributeName="stop-color" values="#667eea;#764ba2;#667eea" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#764ba2">
                    <animate attributeName="stop-color" values="#764ba2;#667eea;#764ba2" dur="3s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
              </defs>
              <circle className="loading-circle-bg" cx="70" cy="70" r="55" />
              <circle className="loading-circle-fill" cx="70" cy="70" r="55" 
                stroke="url(#loadingGradient)" strokeWidth="4" fill="none" />
              <text x="70" y="80" textAnchor="middle" className="loading-text-svg" fill="white" fontSize="32">AD</text>
            </svg>
            <div className="loading-pulse"></div>
          </div>
          <div className="loading-bar-container">
            <div className="loading-bar">
              <div className="loading-progress">
                <div className="loading-progress-glow"></div>
              </div>
            </div>
            <div className="loading-percentage">
              <span className="percentage-number">0</span>%
            </div>
          </div>
          <div className="loading-message">
            <span className="message-char">D</span>
            <span className="message-char">H</span>
            <span className="message-char">A</span>
            <span className="message-char">R</span>
            <span className="message-char">A</span>
            <span className="message-char">N</span>
            <span className="message-char">I</span>
            <span className="message-char">S</span>
            <span className="message-char">H</span>
          </div>
          <div className="loading-sub">
            <span className="sub-text">Full Stack Developer</span>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-portfolio" style={{
      '--mouse-x': `${mousePosition.x}%`,
      '--mouse-y': `${mousePosition.y}%`
    }}>
     {/* Navigation */}
<nav className={`premium-navbar navbar navbar-expand-lg ${scrolled ? "scrolled" : ""}`}>
  <div className="container-fluid nav-container">
    <a href="#home" className="nav-logo">
      <div className="logo-wrapper">
        <span className="logo-text">Dharanish</span>
      </div>
    </a>
    
    {/* Mobile Toggler Button */}
    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav" 
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    
    {/* Collapsible Menu */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <div className="nav-menu mx-auto">
        {["home", "about", "services", "projects", "contact"].map((item, index) => (
          <a 
            key={item} 
            href={`#${item}`} 
            className={`nav-item ${activeSection === item ? "active" : ""}`}
            onClick={() => {
              // Close mobile menu after clicking
              const navbarCollapse = document.getElementById('navbarNav');
              if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
              }
            }}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="nav-label">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            <span className="nav-indicator"></span>
          </a>
        ))}
      </div>
    </div>

    {/* Desktop CTA Button */}
    <div className="nav-cta d-none d-lg-block">
      <a href="#contact" className="nav-cta-button">
        <span>Let's Talk</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </a>
    </div>
  </div>
</nav>
      {/* Hero Section - Mobile Optimized with Photo First */}
      <section id="home" className="premium-hero">
        <div className="container hero-container">
          <div className="row">
            <div className="col-12">
              <div className="hero-badge">
                <span className="badge-line"></span>
                <span className="badge-text">AVAILABLE FOR WORK</span>
                <span className="badge-dot"></span>
              </div>
            </div>
          </div>

          {/* Mobile: Photo first (order-1), Text second (order-2) */}
          <div className="row align-items-center">
            {/* Photo Column - Shows first on mobile */}
            <div className="col-lg-5 order-1 order-lg-2">
              <div className="hero-image-wrapper">
                <div className="hero-image-container">
                  <img 
                    src={currentProfileImage} 
                    alt="A. Dharanish" 
                    className="hero-profile-image"
                  />
                </div>
              </div>
            </div>

            {/* Text Column - Shows second on mobile */}
            <div className="col-lg-7 order-2 order-lg-1">
              <div className="hero-title-wrapper">
                <h1 className="hero-title-large">
                  <span className="title-line">
                    <span className="title-reveal">FULL STACK</span>
                  </span>
                  <span className="title-line">
                    <span className="title-reveal">DEVELOPER</span>
                  </span>
                </h1>
                
                <div className="hero-name-container">
                  <span className="hero-greeting">I'm</span>
                  <h2 className="hero-name-premium">
                    {personalInfo.name.split('').map((char, i) => (
                      <span key={i} className="name-char" style={{ animationDelay: `${i * 0.03}s` }}>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </h2>
                </div>
              </div>

              <div className="hero-description-wrapper">
                <p className="hero-description-premium">
                  {personalInfo.summary}
                </p>
                
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">4+</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Certifications</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">2026</span>
                    <span className="stat-label">Graduation</span>
                  </div>
                </div>
              </div>

              <div className="hero-cta-wrapper">
                <a href="/cv.pdf" download className="premium-button primary">
                  <span>Download CV</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12H12M8 4V10M8 10L10 8M8 10L6 8" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </a>
                
                <a href="#projects" className="premium-button secondary">
                  <span>View Work</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8H12M12 8L9 5M12 8L9 11" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="premium-section">
        <div className="container section-container">
          <div className="row">
            <div className="col-12">
              <div className="section-header-premium">
                <span className="section-tag">01 — ABOUT</span>
                <h2 className="section-title-premium">
                  <span className="title-reveal-wrapper">Education &</span>
                  <span className="title-reveal-wrapper">Certifications</span>
                </h2>
                <div className="section-divider">
                  <div className="divider-line"></div>
                  <div className="divider-dot"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-lg-6">
              <div className="education-premium">
                <h3 className="subsection-title-premium">
                  <span className="title-icon">🎓</span>
                  Academic Background
                </h3>
                <div className="timeline">
                  {education.map((edu, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-dot">
                        <div className="dot-pulse"></div>
                      </div>
                      <div className="timeline-line"></div>
                      <div className="timeline-content">
                        <span className="timeline-date">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                          {edu.duration}
                        </span>
                        <h4 className="timeline-title">{edu.degree}</h4>
                        <p className="timeline-institution">{edu.institution}</p>
                        <span className="timeline-score">{edu.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="certifications-premium">
                <h3 className="subsection-title-premium">
                  <span className="title-icon">🏅</span>
                  Certifications
                </h3>
                <div className="cert-grid">
                  {certifications.map((cert, index) => (
                    <div key={index} className="cert-card-premium">
                      <div className="cert-icon-wrapper">
                        <div className="cert-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </div>
                      </div>
                      <div className="cert-content">
                        <p className="cert-name">{cert}</p>
                        <div className="cert-badge"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="premium-section">
        <div className="container section-container">
          <div className="row">
            <div className="col-12">
              <div className="section-header-premium">
                <span className="section-tag">02 — SERVICES</span>
                <h2 className="section-title-premium">
                  <span className="title-reveal-wrapper">Technical</span>
                  <span className="title-reveal-wrapper">Expertise</span>
                </h2>
                <div className="section-divider">
                  <div className="divider-line"></div>
                  <div className="divider-dot"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {Object.entries(techSkills).map(([category, items]) => (
              <div key={category} className="col-md-6 col-lg-4">
                <div className="skill-category-premium h-100">
                  <div className="category-header">
                    <h3 className="category-title">{category}</h3>
                    <span className="category-count">{items.length}</span>
                  </div>
                  <div className="skill-cloud">
                    {items.map((skill) => (
                      <div key={skill} className="skill-item-premium">
                        <span className="skill-name">{skill}</span>
                        <span className="skill-icon">•</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="premium-section">
        <div className="container section-container">
          <div className="row">
            <div className="col-12">
              <div className="section-header-premium">
                <span className="section-tag">03 — PROJECTS</span>
                <h2 className="section-title-premium">
                  <span className="title-reveal-wrapper">Featured</span>
                  <span className="title-reveal-wrapper">Work</span>
                </h2>
                <div className="section-divider">
                  <div className="divider-line"></div>
                  <div className="divider-dot"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {projects.map((project, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="project-card-premium">
                  <div className="project-card-inner">
                    <div className="project-card-front" style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)` }}>
                      <div className="project-icon">{project.icon}</div>
                      <div className="project-number">0{index + 1}</div>
                      <h3 className="project-title-premium">{project.title}</h3>
                      <div className="project-tech-stack">
                        {project.tech.slice(0, 2).map((t) => (
                          <span key={t} className="project-tech-badge">{t}</span>
                        ))}
                        {project.tech.length > 2 && (
                          <span className="project-tech-badge">+{project.tech.length - 2}</span>
                        )}
                      </div>
                      {project.role && (
                        <span className="project-role-badge">{project.role}</span>
                      )}
                    </div>
                    <div className="project-card-back">
                      <ul className="project-features">
                        {project.points.map((point, i) => (
                          <li key={i}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2"/>
                            </svg>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - With Form */}
      <section id="contact" className="premium-section">
        <div className="container section-container">
          <div className="row">
            <div className="col-12">
              <div className="contact-premium">
                <div className="contact-header">
                  <span className="section-tag">04 — CONTACT</span>
                  <h2 className="contact-title">Let's work together</h2>
                  <p className="contact-subtitle">Have a project in mind? Let's create something amazing.</p>
                </div>

                <div className="row g-5">
                  <div className="col-lg-5">
                    <div className="contact-info">
                      <div className="contact-info-item">
                        <span className="info-label">Email</span>
                        <a href="mailto:dharanish@example.com" className="info-value">
                          dharanish@example.com
                          <span className="info-glow"></span>
                        </a>
                      </div>
                      <div className="contact-info-item">
                        <span className="info-label">Location</span>
                        <span className="info-value">Coimbatore, India</span>
                      </div>
                      <div className="contact-info-item">
                        <span className="info-label">Phone</span>
                        <a href="tel:+919876543210" className="info-value">
                          +91 98765 43210
                          <span className="info-glow"></span>
                        </a>
                      </div>
                      
                      <div className="contact-social">
                        <a href="#" className="social-link">
                          <div className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M8 9.5V14.5M16 9.5V14.5M12 9.5V14.5M8 12H16" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                          </div>
                          <span>GitHub</span>
                        </a>
                        <a href="#" className="social-link">
                          <div className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="1.5"/>
                              <circle cx="4" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                          </div>
                          <span>LinkedIn</span>
                        </a>
                        <a href="#" className="social-link">
                          <div className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M22 4C20.9 4.6 19.7 5 18.4 5.1C19.8 3.9 20.9 2.3 21.4 0.5C20.2 1.6 18.8 2.4 17.3 2.9C16.1 1.7 14.5 1 12.8 1C9.5 1 6.7 3.5 6.7 6.8C6.7 7.4 6.8 8 6.9 8.6C4.4 8.4 2.1 7.4 0.4 5.8C-0.2 6.8 -0.5 7.9 -0.5 9.1C-0.5 11.4 1.1 13.4 3.3 14.1C2.5 14.3 1.6 14.4 0.8 14.4C0.3 14.4 -0.1 14.4 -0.5 14.3C0.3 16.3 2.2 17.7 4.5 17.7C2.9 18.9 0.9 19.6 -1.2 19.6C-1.8 19.6 -2.4 19.6 -3 19.5C1 20.9 5.8 20.9 8.4 19.5C12.7 17.7 15.3 13.1 15.3 8.9C15.3 8.7 15.3 8.5 15.3 8.3C16.5 7.5 17.5 6.5 18.4 5.4L22 4Z" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                          </div>
                          <span>Twitter</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <form className="contact-form" onSubmit={handleSubmit}>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="name" className="form-label">Your Name</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              id="name" 
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input 
                              type="email" 
                              className="form-control" 
                              id="email" 
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              id="subject" 
                              placeholder="Project Inquiry"
                              value={formData.subject}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="message" className="form-label">Your Message</label>
                            <textarea 
                              className="form-control" 
                              id="message" 
                              rows="5" 
                              placeholder="Tell me about your project..."
                              value={formData.message}
                              onChange={handleInputChange}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-12">
                          <button 
                            type="submit" 
                            className="premium-button primary submit-btn"
                            disabled={formStatus === 'sending'}
                          >
                            {formStatus === 'sending' ? (
                              <>Sending<span className="loading-dots"><span></span><span></span><span></span></span></>
                            ) : formStatus === 'success' ? (
                              <>Message Sent! <span>✓</span></>
                            ) : (
                              <>
                                <span>Send Message</span>
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                  <path d="M2 10H18M18 10L14 6M18 10L14 14" stroke="currentColor" strokeWidth="1.5"/>
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced Design */}
      {/* Footer - Simplified Design */}
<footer className="simple-footer">
  <div className="container">
    <div className="simple-footer-content">
      <div className="simple-footer-brand">
        <span className="simple-footer-logo">Dharanish</span>
        <p className="simple-footer-tagline">Creating digital experiences that matter.</p>
      </div>
      
      <div className="simple-footer-social">
        <a href="#" className="simple-social-link" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </a>
        <a href="#" className="simple-social-link" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
        <a href="#" className="simple-social-link" aria-label="Twitter">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
          </svg>
        </a>
      </div>
    </div>
    
    <div className="simple-footer-divider"></div>
    
    <div className="simple-footer-bottom">
      <p className="simple-copyright">
        © 2024 A. Dharanish. All rights reserved.
      </p>
      <div className="simple-footer-links">
        <a href="#">Privacy</a>
        <span className="simple-link-separator">•</span>
        <a href="#">Terms</a>
        <span className="simple-link-separator">•</span>
        <a href="#">Cookies</a>
      </div>
    </div>
  </div>
</footer>
      {/* Back to Top Button */}
      <div className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M10 4L6 8M10 4L14 8" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Theme Toggle Button */}
      <ThemeToggle onThemeChange={handleThemeChange} />
    </div>
  );
};

export default App;