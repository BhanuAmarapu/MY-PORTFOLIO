import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './portfolioData';
import { 
  Cloud, Terminal, Box, Layers, Cpu, Award, GraduationCap, 
  Github, Linkedin, ExternalLink, Eye, Download, Phone, 
  Mail, MapPin, CheckCircle, FolderGit2, Star, Users, 
  BarChart2, Sun, Moon, Send, X, ChevronRight
} from 'lucide-react';

// Reusable SkillCard Component with 3D Tilt & Localized Spotlight Glow
const SkillCard = ({ name, tooltip, experience, percentage, iconClass }) => {
  const [animate, setAnimate] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimate(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const r = 40;
  const perimeter = 2 * Math.PI * r;
  const offset = animate ? (perimeter - (perimeter * percentage) / 100) : perimeter;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scaleZ(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scaleZ(1)';
  };

  return (
    <div 
      ref={cardRef}
      className="skill-card glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="skill-card-glow-bg"></div>
      <div className="skill-progress-circle-wrap">
        <svg className="skill-circle-svg" viewBox="0 0 100 100">
          <circle className="skill-circle-bg" cx="50" cy="50" r={r}></circle>
          <circle 
            className="skill-circle-fill" 
            cx="50" cy="50" 
            r={r} 
            style={{ 
              strokeDasharray: perimeter,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.1, 0.8, 0.2, 1)'
            }}
          ></circle>
        </svg>
        <div className="skill-icon-container">
          {iconClass.startsWith('devicon') ? (
            <i className={`${iconClass} skill-icon`}></i>
          ) : (
            <i className="devicon-amazonwebservices-original skill-icon"></i>
          )}
        </div>
      </div>
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{percentage}%</span>
      </div>
      <div className="skill-tooltip">
        <div className="tooltip-title">{tooltip}</div>
        <div className="tooltip-exp">{experience}</div>
      </div>
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [preloaderFaded, setPreloaderFaded] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [currentLineClass, setCurrentLineClass] = useState('intro-line greeting');
  const [centerpieceActive, setCenterpieceActive] = useState(false);
  
  // Project detail modal state
  const [selectedProject, setSelectedProject] = useState(null);

  // GitHub integration state
  const [gitUsername, setGitUsername] = useState('BhanuPrasad-Amarapu');
  const [gitStats, setGitStats] = useState({
    repos: 12,
    stars: 3,
    commits: 145,
    status: 'STABLE',
    statusClass: 'widget-value text-green'
  });
  const [loadingGit, setLoadingGit] = useState(false);

  // References
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  // Typewriter Greeting Lines
  const typewriterLines = [
    { text: "Hello Recruiter 👋", className: "intro-line greeting" },
    { text: "I'm", className: "intro-line im" },
    { text: "AMARAPU BHANU PRASAD", className: "intro-line name" },
    { text: "AWS DevOps Engineer", className: "intro-line role" },
    { text: "GitOps & CI/CD Specialist", className: "intro-line role" },
    { text: "Infrastructure Automation Specialist", className: "intro-line role" },
    { text: "Turning Ideas into Scalable Cloud Solutions.", className: "intro-line tagline" },
    { text: "Ready to Build. Ready to Deploy. Ready to Innovate.", className: "intro-line status" }
  ];

  // Lucide helper mapper
  const renderIcon = (name, className = "") => {
    switch (name) {
      case 'cloud': return <Cloud className={className} />;
      case 'terminal': return <Terminal className={className} />;
      case 'box': return <Box className={className} />;
      case 'layers': return <Layers className={className} />;
      case 'cpu': return <Cpu className={className} />;
      case 'award': return <Award className={className} />;
      case 'graduation-cap': return <GraduationCap className={className} />;
      case 'github': return <Github className={className} />;
      case 'linkedin': return <Linkedin className={className} />;
      case 'external-link': return <ExternalLink className={className} />;
      case 'eye': return <Eye className={className} />;
      case 'download': return <Download className={className} />;
      case 'phone': return <Phone className={className} />;
      case 'mail': return <Mail className={className} />;
      case 'map-pin': return <MapPin className={className} />;
      case 'check-circle': return <CheckCircle className={className} />;
      case 'folder-git-2': return <FolderGit2 className={className} />;
      case 'star': return <Star className={className} />;
      case 'users': return <Users className={className} />;
      case 'bar-chart-2': return <BarChart2 className={className} />;
      case 'sun': return <Sun className={className} />;
      case 'moon': return <Moon className={className} />;
      case 'send': return <Send className={className} />;
      case 'x': return <X className={className} />;
      default: return <Cloud className={className} />;
    }
  };

  // 1. Theme Configuration
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  // 2. Typewriter Effect Logic
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let textAccumulator = '';
    let timer;

    const type = () => {
      if (lineIndex < typewriterLines.length) {
        const line = typewriterLines[lineIndex];
        setCurrentLineClass(line.className);

        if (charIndex < line.text.length) {
          textAccumulator += line.text.charAt(charIndex);
          setCurrentText(textAccumulator);
          charIndex++;
          timer = setTimeout(type, Math.random() * 20 + 15);
        } else {
          setTypedLines(prev => [...prev, line]);
          setCurrentText('');
          textAccumulator = '';
          charIndex = 0;
          lineIndex++;

          let pause = 350;
          if (lineIndex > 0) {
            const prevLine = typewriterLines[lineIndex - 1];
            if (prevLine.className.includes("name")) {
              pause = 700;
            } else if (prevLine.className.includes("status")) {
              pause = 500;
            }
          }
          timer = setTimeout(type, pause);
        }
      } else {
        setShowEnterButton(true);
      }
    };

    timer = setTimeout(type, 800);
    return () => clearTimeout(timer);
  }, []);

  // 3. Enter Portfolio Trigger
  const handleEnterPortfolio = () => {
    setPreloaderFaded(true);
    document.body.style.overflow = '';
  };

  // 4. Custom Cursor Ring tick
  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .skill-card, .project-card, .hero-avatar-centerpiece, .social-circle-link')) {
        ring.classList.add('hover');
        dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      } else {
        ring.classList.remove('hover');
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    const animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 5. Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const bar = document.getElementById('scroll-progress-bar');
      if (!bar) return;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollVal = window.scrollY;
      const pct = (scrollVal / (docHeight - winHeight)) * 100;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 6. Scroll Reveal Observer for Cards
  useEffect(() => {
    if (preloaderFaded) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

      const els = document.querySelectorAll('.project-card, .timeline-point-row, .future-project-card, .github-stats-card');
      els.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, [preloaderFaded]);

  // 7. Three.js Canvas Backdrop loop (runs only when preloader enters)
  useEffect(() => {
    if (!preloaderFaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let scene, camera, renderer;
    let dockerCubes = [];
    let k8sPods = [];
    let terraformGroup;
    let awsNodes = [];
    let dataPackets = [];
    let starParticles;
    let animationFrameId;

    let targetMouseX = 0, targetMouseY = 0;
    let mouseX = 0, mouseY = 0;

    const init = () => {
      // Scene
      scene = new window.THREE.Scene();

      // Camera
      camera = new window.THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 180;

      // Renderer
      renderer = new window.THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Light
      const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const dirLight = new window.THREE.DirectionalLight(0x38bdf8, 1.2);
      dirLight.position.set(100, 100, 50);
      scene.add(dirLight);

      const orangeLight = new window.THREE.PointLight(0xff9900, 1.5, 300);
      orangeLight.position.set(0, 0, 50);
      scene.add(orangeLight);

      // Torus Infinity Loop
      const knotGeom = new window.THREE.TorusKnotGeometry(32, 5, 120, 16, 2, 3);
      const knotMat = new window.THREE.MeshPhongMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.08
      });
      devopsLoop = new window.THREE.Mesh(knotGeom, knotMat);
      devopsLoop.position.set(0, 0, -40);
      scene.add(devopsLoop);

      // Helper symbols extruders
      const createCloudGeometry = () => {
        const shape = new window.THREE.Shape();
        shape.moveTo(-5, -2);
        shape.quadraticCurveTo(-9, -2, -9, 2);
        shape.quadraticCurveTo(-9, 5, -5, 5);
        shape.quadraticCurveTo(-5, 8, -2, 8);
        shape.quadraticCurveTo(2, 8, 3, 5);
        shape.quadraticCurveTo(7, 5, 7, 2);
        shape.quadraticCurveTo(7, -2, 3, -2);
        shape.closePath();
        return new window.THREE.ExtrudeGeometry(shape, { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.4, bevelThickness: 0.4 });
      };

      const createHeptagonGeometry = () => {
        const shape = new window.THREE.Shape();
        const sides = 7;
        const radius = 5;
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2;
          shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        shape.closePath();
        return new window.THREE.ExtrudeGeometry(shape, { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.4, bevelThickness: 0.4 });
      };

      const createInfinityGeometry = () => {
        const shape = new window.THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(-3.5, 4.5, -7, 4.5, -7, 0);
        shape.bezierCurveTo(-7, -4.5, -3.5, -4.5, 0, 0);
        shape.bezierCurveTo(3.5, 4.5, 7, 4.5, 7, 0);
        shape.bezierCurveTo(7, -4.5, 3.5, -4.5, 0, 0);
        shape.closePath();
        return new window.THREE.ExtrudeGeometry(shape, { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.4, bevelThickness: 0.4 });
      };

      const geometries = [createCloudGeometry(), createHeptagonGeometry(), createInfinityGeometry()];
      const colors = [0xff9900, 0x38bdf8, 0xa855f7];

      // Docker Containers
      for (let i = 0; i < 6; i++) {
        const idx = i % geometries.length;
        const mat = new window.THREE.MeshPhongMaterial({ color: colors[idx], wireframe: true, transparent: true, opacity: 0.35 });
        const mesh = new window.THREE.Mesh(geometries[idx], mat);
        mesh.position.set((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 100 - 30);
        scene.add(mesh);
        dockerCubes.push({ mesh, rotSpeed: new window.THREE.Vector3(Math.random() * 0.01 + 0.005, Math.random() * 0.01 + 0.005, Math.random() * 0.01), floatSpeed: Math.random() * 0.002 + 0.001, floatOffset: Math.random() * Math.PI * 2 });
      }

      // K8s hexagonal cylinder pods
      const podGeom = new window.THREE.CylinderGeometry(8, 8, 16, 6);
      const edges = new window.THREE.EdgesGeometry(podGeom);
      const lineMat = new window.THREE.LineBasicMaterial({ color: 0x326ce5, linewidth: 2 });
      for (let i = 0; i < 4; i++) {
        const pod = new window.THREE.LineSegments(edges, lineMat);
        pod.position.set((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 100 - 30);
        scene.add(pod);
        k8sPods.push({ mesh: pod, scaleSpeed: Math.random() * 0.003 + 0.002, scaleOffset: Math.random() * Math.PI, rotSpeed: Math.random() * 0.008 + 0.002 });
      }

      // Terraform blocks
      terraformGroup = new window.THREE.Group();
      const tfGeom = new window.THREE.BoxGeometry(8, 8, 8);
      const tfMat = new window.THREE.MeshPhongMaterial({ color: 0x7b42bc, wireframe: true, transparent: true, opacity: 0.5 });
      for (let i = 0; i < 3; i++) {
        const block = new window.THREE.Mesh(tfGeom, tfMat);
        block.position.y = (i - 1) * 9;
        terraformGroup.add(block);
      }
      terraformGroup.position.set(50, -40, -20);
      scene.add(terraformGroup);

      // AWS Nodes
      const nodeGeom = new window.THREE.SphereGeometry(4, 16, 16);
      const nodeMat = new window.THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.8 });
      for (let i = 0; i < 5; i++) {
        const node = new window.THREE.Mesh(nodeGeom, nodeMat);
        node.position.set((Math.random() - 0.5) * 180, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 80 - 10);
        scene.add(node);
        awsNodes.push({ mesh: node, pulseSpeed: Math.random() * 0.005 + 0.002, pulseOffset: Math.random() * Math.PI * 2 });
      }

      // Paths and Packets
      for (let i = 0; i < awsNodes.length - 1; i++) {
        const start = awsNodes[i].mesh.position;
        const end = awsNodes[i+1].mesh.position;
        const midX = (start.x + end.x) / 2 + (Math.random() - 0.5) * 30;
        const midY = (start.y + end.y) / 2 + (Math.random() - 0.5) * 30;
        const midZ = (start.z + end.z) / 2 + (Math.random() - 0.5) * 30;
        const curve = new window.THREE.QuadraticBezierCurve3(start, new window.THREE.Vector3(midX, midY, midZ), end);

        const pts = curve.getPoints(50);
        const lineG = new window.THREE.BufferGeometry().setFromPoints(pts);
        const lineM = new window.THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.12 });
        const line = new window.THREE.Line(lineG, lineM);
        scene.add(line);

        const packetG = new window.THREE.SphereGeometry(1.2, 8, 8);
        const packetM = new window.THREE.MeshBasicMaterial({ color: 0xff9900 });
        const packet = new window.THREE.Mesh(packetG, packetM);
        scene.add(packet);
        dataPackets.push({ mesh: packet, curve, progress: Math.random(), speed: Math.random() * 0.003 + 0.002 });
      }

      // Particles
      const pCount = 180;
      const pGeom = new window.THREE.BufferGeometry();
      const pPositions = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i += 3) {
        pPositions[i] = (Math.random() - 0.5) * 300;
        pPositions[i+1] = (Math.random() - 0.5) * 200;
        pPositions[i+2] = (Math.random() - 0.5) * 200;
      }
      pGeom.setAttribute('position', new window.THREE.BufferAttribute(pPositions, 3));
      const pMat = new window.THREE.PointsMaterial({ color: 0x38bdf8, size: 1.5, transparent: true, opacity: 0.25 });
      starParticles = new window.THREE.Points(pGeom, pMat);
      scene.add(starParticles);
    };

    let devopsLoop;
    init();

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    const handleScroll = () => {
      if (!camera) return;
      camera.position.z = 180 - window.scrollY * 0.06;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      if (devopsLoop) {
        devopsLoop.rotation.y = time * 0.04;
        devopsLoop.rotation.x = time * 0.02;
      }

      dockerCubes.forEach(c => {
        c.mesh.rotation.x += c.rotSpeed.x;
        c.mesh.rotation.y += c.rotSpeed.y;
        c.mesh.position.y += Math.sin(time + c.floatOffset) * 0.0008;
      });

      k8sPods.forEach(p => {
        p.mesh.rotation.y += p.rotSpeed;
        const scaleVal = 1 + Math.sin(time * 3 + p.scaleOffset) * 0.15;
        p.mesh.scale.set(scaleVal, scaleVal, scaleVal);
      });

      if (terraformGroup) {
        terraformGroup.rotation.y += 0.008;
        const stackOffset = Math.sin(time * 1.5) * 3;
        terraformGroup.children[0].position.y = 9 + stackOffset;
        terraformGroup.children[2].position.y = -9 - stackOffset;
      }

      awsNodes.forEach(n => {
        const pulse = 1 + Math.sin(time * 2 + n.pulseOffset) * 0.12;
        n.mesh.scale.set(pulse, pulse, pulse);
      });

      dataPackets.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1.0) p.progress = 0;
        const pt = p.curve.getPointAt(p.progress);
        p.mesh.position.copy(pt);
      });

      if (starParticles) {
        const pos = starParticles.geometry.attributes.position.array;
        for (let i = 1; i < pos.length; i += 3) {
          pos[i] -= 0.15;
          if (pos[i] < -100) pos[i] = 100;
        }
        starParticles.geometry.attributes.position.needsUpdate = true;
      }

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.15;
      camera.position.y = -mouseY * 0.15;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [preloaderFaded]);

  // Form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Connection Protocol Completed! Your message has been simulated through the DevOps contact pipeline successfully.");
    e.target.reset();
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="scroll-progress-bar"></div>

      {/* Custom Cursor Ring & Dot */}
      <div ref={ringRef} id="custom-cursor-ring"></div>
      <div ref={dotRef} id="custom-cursor-dot"></div>

      {/* Cinematic Typewriter Preloader */}
      {!preloaderFaded && (
        <div id="preloader">
          <div className="preloader-intro-container">
            <div id="intro-text-flow">
              {typedLines.map((line, idx) => (
                <div key={idx} className={line.className}>
                  {line.text}
                </div>
              ))}
            </div>
            {!showEnterButton && (
              <div id="intro-typing-container">
                <span className={currentLineClass}>{currentText}</span>
                <span className="typing-cursor">|</span>
              </div>
            )}
            {showEnterButton && (
              <button 
                id="enter-portfolio-btn" 
                className="cinematic-enter-btn"
                onClick={handleEnterPortfolio}
              >
                [ ENTER PORTFOLIO ]
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className={`app-wrapper ${preloaderFaded ? 'fade-in-content' : ''}`}>
        
        {/* Background canvas */}
        <canvas ref={canvasRef} id="particle-canvas"></canvas>

        {/* Navigation Bar */}
        <nav id="navbar" className={preloaderFaded ? 'nav-visible' : ''}>
          <div className="nav-container">
            <a href="#home" className="nav-logo">
              <span>&gt;_ </span>{portfolioData.personal.name.split(" ")[0]}.<span className="orange-accent">Cloud</span>
            </a>
            
            <div className="nav-links">
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#future-projects" className="nav-link">Future Projects</a>
              <a href="#resume" className="nav-link">Resume</a>
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>

            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section id="home" className={`hero-section scroll-offset ${preloaderFaded ? 'hero-visible' : ''}`}>
          <div className="section-container">
            <div className="hero-grid">
              
              {/* Left Column Biography */}
              <div className="hero-bio-column">
                <span className="hero-greeting">Hello Recruiter 👋</span>
                
                <h1 className="hero-main-title">
                  I'm <span className="highlight-orange">{portfolioData.personal.name}</span>
                </h1>
                
                <div className="hero-role-carousel">
                  <span className="role-tagline">{portfolioData.personal.role}</span>
                </div>

                <p className="hero-abstract">
                  Passionate cloud specialist focused on constructing highly available, secure, and fully automated cloud infrastructures. Leveraging modern GitOps strategies and programmatic scripting architectures to accelerate development loops.
                </p>

                <div className="hero-call-actions">
                  <a href="#contact" className="btn btn-primary">
                    <Mail size={16} /> Get In Touch
                  </a>
                  <a 
                    href={portfolioData.personal.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary"
                  >
                    <Eye size={16} /> View Resume
                  </a>
                </div>
              </div>

              {/* Right Column Interactive Avatar Centerpiece */}
              <div className="hero-visual-column">
                <div 
                  className={`hero-avatar-centerpiece ${centerpieceActive ? 'active-reveal' : ''}`}
                  onClick={() => setCenterpieceActive(prev => !prev)}
                >
                  
                  {/* Concentric HUD Orbits */}
                  <div className="hud-ring ring-large"></div>
                  <div className="hud-ring ring-medium"></div>
                  <div className="hud-ring ring-small"></div>

                  {/* Tech Floating Orbit Badges */}
                  <div className="hud-tech-label label-terraform">IaC: Terraform</div>
                  <div className="hud-tech-label label-kubernetes">Orchestration: K8s</div>
                  <div className="hud-tech-label label-docker">Containers: Docker</div>
                  <div className="hud-tech-label label-jenkins">CI/CD: Jenkins</div>
                  <div className="hud-tech-label label-aws">Platform: AWS</div>
                  <div className="hud-tech-label label-gitops">GitOps</div>

                  {/* Avatar Ambient Glow */}
                  <div className="avatar-ambient-glow"></div>
                  
                  {/* Pulsing Outer Rings */}
                  <div className="avatar-pulsing-bangle"></div>
                  
                  {/* Real Profile Image circle */}
                  <div className="avatar-frame">
                    <img 
                      src="profile.jpg" 
                      alt={portfolioData.personal.name} 
                      className="avatar-photo"
                      onError={(e) => {
                        e.target.src = "profile.png"; // Fallback
                      }}
                    />
                  </div>

                  {/* Floating Name Badge */}
                  <div className="avatar-name-floating">{portfolioData.personal.name}</div>

                  {/* Recruiter Telemetry Cards (Hover Reveal) */}
                  <div className="impress-card pipeline-card">
                    <div className="impress-card-header">
                      <i className="pulsing-dot green"></i>
                      <span className="impress-card-title">CI/CD Pipeline</span>
                    </div>
                    <div className="impress-card-body text-green">Status: Success</div>
                  </div>

                  <div className="impress-card deploy-card">
                    <div className="impress-card-header">
                      {renderIcon('cloud', 'impress-icon')}
                      <span className="impress-card-title">AWS Infrastructure</span>
                    </div>
                    <div className="impress-card-body text-orange">Uptime: 99.99%</div>
                  </div>

                  <div className="impress-card infrastructure-card">
                    <div className="impress-card-header">
                      {renderIcon('terminal', 'impress-icon')}
                      <span className="impress-card-title">IaC (Terraform)</span>
                    </div>
                    <div className="impress-card-body">Automation: 100%</div>
                  </div>

                  {/* Interactive Strengths Card (Fills left space) */}
                  <div className="impress-card strengths-card">
                    <div className="impress-card-header">
                      {renderIcon('bar-chart-2', 'impress-icon')}
                      <span className="impress-card-title">Core Strengths</span>
                    </div>
                    <div className="strengths-list">
                      <div className="strength-item">
                        <span className="strength-name">Cloud Automation</span>
                        <div className="strength-bar">
                          <div className="strength-fill strength-fill-automation" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      <div className="strength-item">
                        <span className="strength-name">CI/CD & GitOps</span>
                        <div className="strength-bar">
                          <div className="strength-fill strength-fill-gitops" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      <div className="strength-item">
                        <span className="strength-name">SRE & Monitoring</span>
                        <div className="strength-bar">
                          <div className="strength-fill strength-fill-sre" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="about-section scroll-offset">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">/ Who I Am</span>
              <h2 class="section-title">About Me</h2>
              <div className="section-line"></div>
            </div>

            <div className="about-grid">
              <div className="about-context glass-card">
                <h3>GitOps & Devops Specialist</h3>
                <p>
                  As an AWS DevOps Engineer, I specialize in automating deployment pipelines, managing containerized cluster workloads, and engineering secure Cloud environments. I bridge development logic and cloud runtime operations to accelerate shipping speeds safely.
                </p>
                <p>
                  My work is centered around declarative code structures—using Terraform to provision landing zones, Docker and Kubernetes to package container apps, and Jenkins to orchestrate CI/CD loops.
                </p>
              </div>
              
              <div className="about-key-stats glass-card">
                <div className="stat-bullet">
                  <span className="bullet-num">AWS</span>
                  <span className="bullet-label">Infrastructure provisioning, IAM, VPC, EC2, S3, ECS, EKS</span>
                </div>
                <div className="stat-bullet">
                  <span className="bullet-num">CI/CD</span>
                  <span className="bullet-label">Jenkins, GitHub Actions pipelines automation</span>
                </div>
                <div className="stat-bullet">
                  <span className="bullet-num">IaC</span>
                  <span className="bullet-label">Modular Terraform templates, Ansible automation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="skills-section scroll-offset">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">/ Tech Stack Console</span>
              <h2 className="section-title">Technical Expertise</h2>
              <div className="section-line"></div>
            </div>

            <div className="skills-dashboard-panels">
              {portfolioData.skillsCategories.map(cat => (
                <div key={cat.id} className="skills-category-panel glass-card">
                  <h3 className="category-panel-title">
                    <span className="category-emoji">{cat.emoji}</span> {cat.title}
                  </h3>
                  <div className="skills-category-grid">
                    {cat.skills.map(skill => (
                      <SkillCard 
                        key={skill.id}
                        name={skill.name}
                        tooltip={skill.tooltip}
                        experience={skill.experience}
                        percentage={skill.percentage}
                        iconClass={skill.iconClass}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="projects-section scroll-offset">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">/ Engineering Repositories</span>
              <h2 className="section-title">Core Projects</h2>
              <div className="section-line"></div>
            </div>

            <div className="projects-grid">
              {portfolioData.projects.map(proj => (
                <div 
                  key={proj.id} 
                  className="project-card glass-card"
                  onClick={() => setSelectedProject(proj)}
                >
                  <div className="project-header">
                    <span className="project-badge">Active Deployment</span>
                    <h3 className="project-card-title">{proj.title}</h3>
                  </div>
                  <p className="project-card-desc">{proj.desc}</p>
                  <div className="project-tech-list">
                    {proj.tech.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="tech-badge">{t}</span>
                    ))}
                    {proj.tech.length > 4 && <span className="tech-badge">+{proj.tech.length - 4} more</span>}
                  </div>
                  <div className="project-read-more">
                    Explore Repository Detail <ChevronRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FUTURE PROJECTS SECTION */}
        <section id="future-projects" className="future-projects-section scroll-offset">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">/ Planned Deployments</span>
              <h2 className="section-title">Future Sandbox Projects</h2>
              <div className="section-line"></div>
            </div>

            <div className="future-projects-grid">
              {portfolioData.futureProjects.map(proj => (
                <div key={proj.id} className="future-project-card glass-card">
                  <div className="future-card-header">
                    <span className="future-difficulty-badge">{proj.difficulty}</span>
                    <h4>{proj.title}</h4>
                  </div>
                  <p className="future-desc">{proj.desc}</p>
                  <div className="future-tech-row">
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="future-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESUME & CERTIFICATIONS */}
        <section id="resume" className="resume-section scroll-offset">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">/ Qualifications</span>
              <h2 className="section-title">Resume & Academic Background</h2>
              <div className="section-line"></div>
            </div>

            <div className="resume-content-grid">
              
              {/* Left Column: Education */}
              <div className="resume-column">
                <h3 className="resume-column-title">
                  {renderIcon('graduation-cap')} Education
                </h3>
                <div className="resume-timeline-wrapper">
                  {portfolioData.education.map(edu => (
                    <div key={edu.id} className="timeline-item-card glass-card">
                      <span className="timeline-date">{edu.date}</span>
                      <h4 className="timeline-degree">{edu.degree}</h4>
                      <p className="timeline-org">{edu.org}</p>
                      <p className="timeline-desc">
                        {edu.desc} <br/>
                        <strong>{edu.statusLabel}:</strong> {edu.statusValue}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Certifications */}
              <div className="resume-column">
                <h3 className="resume-column-title">
                  {renderIcon('award')} Certifications
                </h3>
                <div className="resume-timeline-wrapper">
                  {portfolioData.certifications.map(cert => (
                    <div key={cert.id} className="timeline-item-card glass-card">
                      <span className="timeline-date">{cert.date}</span>
                      <h4 className="timeline-degree">{cert.title}</h4>
                      <p className="timeline-org">{cert.org}</p>
                      <p className="timeline-desc">{cert.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Print Resume Action buttons */}
            <div className="resume-download-section" style={{ textAlign: 'center', marginTop: '30px' }}>
              <p style={{ marginBottom: '20px' }}>Want to review my complete professional credentials? Access my print-ready PDF resume.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <a 
                  href={portfolioData.personal.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  <Eye size={16} /> View Resume
                </a>
                <a 
                  href={portfolioData.personal.resumeUrl} 
                  download={portfolioData.personal.resumeUrl} 
                  className="btn btn-secondary"
                >
                  <Download size={16} /> Download PDF
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="experience-section scroll-offset">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">/ Technical Milestones</span>
              <h2 className="section-title">Experience Timeline</h2>
              <div className="section-line"></div>
            </div>

            <div className="vertical-timeline">
              <div className="timeline-connector-line">
                <div className="timeline-connector-progress"></div>
              </div>

              {portfolioData.milestones.map((ms, index) => (
                <div 
                  key={ms.id} 
                  className={`timeline-point-row completed ${index % 2 !== 0 ? 'reverse' : ''}`}
                >
                  <div className="timeline-icon-box">
                    {renderIcon(ms.icon)}
                  </div>
                  <div className="timeline-details glass-card">
                    <span className="milestone-tag">{ms.tag}</span>
                    <h4>{ms.title}</h4>
                    <p className="milestone-desc">{ms.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GITHUB STATISTICS */}
        <section id="github-stats" className="github-section scroll-offset">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">/ Open Source Contributions</span>
              <h2 className="section-title">GitHub Statistics</h2>
              <div className="section-line"></div>
            </div>

            <div className="github-dashboard glass-card">
              <div className="github-dashboard-header">
                <div className="github-info">
                  <i className="devicon-github-original github-logo"></i>
                  <div>
                    <h3>GitOps Activity Monitor</h3>
                    <p>Live statistics fetched directly from GitHub API.</p>
                  </div>
                </div>
                
                <div className="github-search-control">
                  <input 
                    type="text" 
                    value={gitUsername} 
                    onChange={(e) => setGitUsername(e.target.value)}
                    placeholder="GitHub Username..." 
                    aria-label="Enter GitHub Username"
                  />
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => fetchGitData(gitUsername)}
                    disabled={loadingGit}
                  >
                    {loadingGit ? 'Fetching...' : 'Fetch Stats'}
                  </button>
                </div>
              </div>

              <div className="github-stats-grid">
                <div className="github-stat-widget">
                  <span className="widget-label">Repositories</span>
                  <span className="widget-value" id="git-repos-val">{gitStats.repos}</span>
                  {renderIcon('folder-git-2', 'widget-icon')}
                </div>
                <div className="github-stat-widget">
                  <span className="widget-label">Total Stars</span>
                  <span className="widget-value" id="git-stars-val">{gitStats.stars}</span>
                  {renderIcon('star', 'widget-icon')}
                </div>
                <div className="github-stat-widget">
                  <span className="widget-label">Git Commits</span>
                  <span className="widget-value" id="git-commits-val">{gitStats.commits}</span>
                  {renderIcon('git-commit', 'widget-icon')}
                </div>
                <div className="github-stat-widget">
                  <span className="widget-label">Build System</span>
                  <span className={gitStats.statusClass}>{gitStats.status}</span>
                  <CheckCircle className={`widget-icon ${gitStats.status === 'STABLE' ? 'green' : 'red'}`} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="contact-section scroll-offset">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">/ Let's Collaborate</span>
              <h2 className="section-title">Contact</h2>
              <div className="section-line"></div>
            </div>

            <div className="contact-grid">
              
              {/* Left Column Contacts */}
              <div className="contact-info-column">
                <div className="contact-info-card glass-card">
                  {renderIcon('mail', 'contact-icon orange')}
                  <div>
                    <h5>Email Me</h5>
                    <a href={`mailto:${portfolioData.personal.email}`} id="contact-email-link">
                      {portfolioData.personal.email}
                    </a>
                    <p className="card-hint">Open for career opportunities & technical chats.</p>
                  </div>
                </div>

                <div className="contact-info-card glass-card">
                  {renderIcon('phone', 'contact-icon green')}
                  <div>
                    <h5>Call Me</h5>
                    <a href={`tel:${portfolioData.personal.phone}`} id="contact-phone-link">
                      {portfolioData.personal.phone}
                    </a>
                    <p className="card-hint">Available for phone / virtual coffee interviews.</p>
                  </div>
                </div>

                <div className="contact-info-card glass-card">
                  {renderIcon('map-pin', 'contact-icon blue')}
                  <div>
                    <h5>Location</h5>
                    <p className="location-text">{portfolioData.personal.location}</p>
                    <p className="card-hint">Willing to relocate / hybrid / remote setups.</p>
                  </div>
                </div>

                {/* Professional Links */}
                <div className="contact-social-card glass-card">
                  <h5>Professional Networks</h5>
                  <div className="social-row">
                    <a 
                      href={portfolioData.personal.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-circle-link" 
                      aria-label="GitHub Page"
                    >
                      {renderIcon('github')}
                    </a>
                    <a 
                      href={portfolioData.personal.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-circle-link" 
                      aria-label="LinkedIn Profile"
                    >
                      {renderIcon('linkedin')}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column Contact Form */}
              <div className="contact-form-card glass-card">
                <div className="form-header-terminal">
                  <div className="terminal-status-light blinking-green"></div>
                  <span>devops_contact_pipeline.yaml</span>
                </div>
                
                <form id="contact-form" className="pipeline-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Name</label>
                    <input type="text" id="contact-name" name="name" required placeholder="John Doe" />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input type="email" id="contact-email" name="email" required placeholder="john.doe@company.com" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Message Payload</label>
                    <textarea id="contact-message" name="message" required rows="5" placeholder="pipeline:&#10;  message: 'Hello Bhanu, let\'s collaborate!'"></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    <Send size={14} /> Execute Deployment
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* PORTFOLIO PROJECT DETAIL DIALOG (MODAL) */}
      {selectedProject && (
        <div id="project-modal" className="modal-overlay modal-active">
          <div className="modal-wrapper">
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal dialog"
            >
              <X size={18} />
            </button>
            
            <div className="modal-content">
              <h3 className="modal-title">{selectedProject.title}</h3>
              <p className="modal-subtitle" style={{ fontSize: '0.9rem', color: 'var(--aws-orange)', marginBottom: '15px' }}>
                {selectedProject.subtitle}
              </p>
              
              <p className="modal-description">{selectedProject.desc}</p>
              
              <h4 className="modal-section-title">Deployment Stack & Technologies</h4>
              <div className="modal-tech-stack">
                {selectedProject.tech.map((t, idx) => (
                  <span key={idx} className="tech-badge">{t}</span>
                ))}
              </div>
              
              <div className="modal-actions">
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn modal-action-btn github-action-btn"
                >
                  <Github size={16} /> Repository Code
                </a>
                <a 
                  href={selectedProject.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn modal-action-btn demo-action-btn"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
