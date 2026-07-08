import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './portfolioData';
import { 
  Cloud, Terminal, Box, Layers, Cpu, Award, GraduationCap, 
  Github, Linkedin, ExternalLink, Eye, Download, Phone, 
  Mail, MapPin, CheckCircle, FolderGit2, Star, Users, 
  BarChart2, Sun, Moon, Send, X, ChevronRight,
  GitCommit, Search, Play, BookOpen, FileText, User, MessageSquare,
  Layout, ChevronDown
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
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(true);
  const [centerpieceActive, setCenterpieceActive] = useState(false);

  // Terminal typing loader states
  const [loadingLines, setLoadingLines] = useState([]);
  const [currentLoadingText, setCurrentLoadingText] = useState('');
  const [loadingLogIndex, setLoadingLogIndex] = useState(0);

  const loadingLogs = [
    "Initializing Cloud Infrastructure...",
    "Loading AWS DevOps Services...",
    "Starting CI/CD Deployment Pipeline...",
    "Provisioning Terraform Landing Zone...",
    "Deploying Portfolio Assets...",
    "Ready."
  ];

  useEffect(() => {
    if (!loadingPhase) return;
    let charIndex = 0;
    let timer;

    const typeLogLine = () => {
      if (loadingLogIndex < loadingLogs.length) {
        const currentLineText = loadingLogs[loadingLogIndex];
        if (charIndex < currentLineText.length) {
          setCurrentLoadingText(prev => prev + currentLineText.charAt(charIndex));
          charIndex++;
          timer = setTimeout(typeLogLine, 35);
        } else {
          setLoadingLines(prev => [...prev, currentLineText]);
          setCurrentLoadingText('');
          setLoadingLogIndex(prev => prev + 1);
        }
      } else {
        timer = setTimeout(() => {
          setLoadingPhase(false);
        }, 800);
      }
    };

    timer = setTimeout(typeLogLine, 400);
    return () => clearTimeout(timer);
  }, [loadingLogIndex, loadingPhase]);

  // Landing page role cycling typewriter
  const landingRoles = [
    "AWS DevOps Engineer",
    "Cloud Engineer",
    "DevOps Automation Enthusiast",
    "CI/CD Pipeline Builder",
    "Docker & Kubernetes Learner"
  ];
  const [roleText, setRoleText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleCharIdx, setRoleCharIdx] = useState(0);
  const [roleIsDeleting, setRoleIsDeleting] = useState(false);

  useEffect(() => {
    if (loadingPhase) return;
    let timer;
    const currentRole = landingRoles[roleIdx];
    
    const tick = () => {
      if (roleIsDeleting) {
        setRoleText(currentRole.substring(0, roleCharIdx - 1));
        setRoleCharIdx(prev => prev - 1);
      } else {
        setRoleText(currentRole.substring(0, roleCharIdx + 1));
        setRoleCharIdx(prev => prev + 1);
      }

      let speed = roleIsDeleting ? 40 : 80;

      if (!roleIsDeleting && roleCharIdx === currentRole.length) {
        speed = 2200;
        setRoleIsDeleting(true);
      } else if (roleIsDeleting && roleCharIdx === 0) {
        setRoleIsDeleting(false);
        setRoleIdx(prev => (prev + 1) % landingRoles.length);
        speed = 400;
      }

      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [roleCharIdx, roleIsDeleting, roleIdx, loadingPhase]);

  // Mouse coordinate tracking on preloader
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handlePreloaderMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  
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

  // Academic Hub State
  const [hubSearch, setHubSearch] = useState('');
  const [hubFilter, setHubFilter] = useState('all');

  // Filtered resources based on search and category tab
  const filteredResources = (portfolioData.resources || []).filter(res => {
    const matchesFilter = hubFilter === 'all' || res.category === hubFilter;
    const matchesSearch = !hubSearch.trim() ||
      res.title?.toLowerCase().includes(hubSearch.toLowerCase()) ||
      res.desc?.toLowerCase().includes(hubSearch.toLowerCase()) ||
      res.tags?.toLowerCase().includes(hubSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Typewriter Effect for the Hero Subtitle
  const [heroSubtitleText, setHeroSubtitleText] = useState('');
  useEffect(() => {
    const roles = portfolioData.personal.subRoles || [
      "AWS DevOps Engineer",
      "GitOps & CI/CD Specialist",
      "Infrastructure Automation Engineer"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer;

    const typeRole = () => {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        setHeroSubtitleText(currentRole.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setHeroSubtitleText(currentRole.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentRole.length) {
        speed = 2000; // pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 500; // pause before typing next
      }

      timer = setTimeout(typeRole, speed);
    };

    timer = setTimeout(typeRole, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Contact Form pipeline terminal simulator state
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [validationLine, setValidationLine] = useState('');
  const [successLine, setSuccessLine] = useState('');

  // GitHub contributions mockup cells
  const [activityCells, setActivityCells] = useState([]);

  // References
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // GitHub API Fetcher
  const fetchGitData = async (username) => {
    if (!username.trim()) return;
    setLoadingGit(true);
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('GitHub profile not found');
      const userData = await userRes.json();
      
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      let starCount = 0;
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        starCount = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      }
      
      setGitStats({
        repos: userData.public_repos,
        stars: starCount,
        commits: 145,
        status: 'STABLE',
        statusClass: 'widget-value text-green'
      });
    } catch (error) {
      console.warn(`Failed to fetch GitHub profile for '${username}'. Using cached/mock statistics.`);
      setGitStats({
        repos: 12,
        stars: 3,
        commits: 145,
        status: 'CACHED',
        statusClass: 'widget-value text-orange'
      });
    } finally {
      setLoadingGit(false);
    }
  };

  // Fetch GitHub data on load
  useEffect(() => {
    fetchGitData(gitUsername);
  }, []);

  // Generate GitHub mock activity cells
  useEffect(() => {
    const cells = [];
    const totalCells = 24 * 7;
    const today = new Date();
    for (let i = 0; i < totalCells; i++) {
      const rnd = Math.random();
      let level = 0;
      if (rnd > 0.85) level = 4;
      else if (rnd > 0.70) level = 3;
      else if (rnd > 0.50) level = 2;
      else if (rnd > 0.20) level = 1;
      
      const cellDate = new Date();
      cellDate.setDate(today.getDate() - (totalCells - i));
      const formattedDate = cellDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const count = level === 0 ? 'No' : level * 2 + Math.floor(Math.random() * 2);
      cells.push({ level, date: formattedDate, count });
    }
    setActivityCells(cells);
  }, [gitStats]);

  // Handle Academic Hub card click
  const handlePlaceholderClick = (e) => {
    e.preventDefault();
    alert("This is an academic resource hub placeholder. In production, this launches a PDF reader, a GitHub repository link, or reference materials.");
  };

  // Handle Contact Form submission terminal simulation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject');
    const message = data.get('message');
    
    if (!name || !email || !subject || !message) return;
    
    setFormSubmitting(true);
    setShowConsole(true);
    setValidationLine('');
    setSuccessLine('');
    
    setTimeout(() => {
      const timeStr = new Date().toLocaleTimeString();
      setValidationLine(`[${timeStr}] SUCCESS: Payload validation passed (Sender: "${name}", Email: "${email}").`);
    }, 1000);
    
    setTimeout(() => {
      const timeStr = new Date().toLocaleTimeString();
      setSuccessLine(`[${timeStr}] SUCCESS: Message deployed successfully via SES API tunnel! Response code: 200.`);
      alert("Deployment successful! Your message has been sent to Bhanu Prasad Amarapu.");
      e.target.reset();
      setFormSubmitting(false);
    }, 3200);
  };

  // Preloader configs

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
      case 'git-commit': return <GitCommit className={className} />;
      case 'search': return <Search className={className} />;
      case 'play': return <Play className={className} />;
      case 'book-open': return <BookOpen className={className} />;
      case 'file-text': return <FileText className={className} />;
      case 'user': return <User className={className} />;
      case 'message-square': return <MessageSquare className={className} />;
      default: return <Cloud className={className} />;
    }
  };

  // 1. Theme Configuration
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  // Enter Portfolio Trigger
  const handleEnterPortfolio = () => {
    setPreloaderFaded(true);
    document.body.style.overflow = '';
    setTimeout(() => {
      setPreloaderActive(false);
    }, 1000);
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

      // AWS DevOps Nodes
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


  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="scroll-progress-bar"></div>

      {/* Custom Cursor Ring & Dot */}
      <div ref={ringRef} id="custom-cursor-ring"></div>
      <div ref={dotRef} id="custom-cursor-dot"></div>

      {/* Cinematic Typewriter Preloader & Landing Screen */}
      {preloaderActive && (
        <div 
          id="preloader" 
          className={preloaderFaded ? "preloader-fade-out" : ""}
          onMouseMove={handlePreloaderMouseMove}
          style={{ 
            '--mouse-x': `${mousePos.x}px`, 
            '--mouse-y': `${mousePos.y}px` 
          }}
        >
          {loadingPhase ? (
            /* Phase 1: Interactive Terminal Loading */
            <div className="terminal-loader-box">
              <div className="terminal-loader-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginLeft: '10px', fontFamily: 'monospace' }}>aws_devops_init.sh</span>
              </div>
              <div className="terminal-loader-body">
                {loadingLines.map((line, idx) => (
                  <div key={idx} className="terminal-log-line">
                    <span style={{ color: 'var(--aws-orange)' }}>&gt;</span> {line}
                  </div>
                ))}
                {loadingLogIndex < loadingLogs.length && (
                  <div className="terminal-log-line active">
                    <span style={{ color: 'var(--aws-orange)' }}>&gt;</span> {currentLoadingText}
                    <span className="typing-cursor">|</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Phase 2: Cinematic Landing Screen Card */
            <div className="landing-card glass-card">
              <span className="landing-tag">WELCOME RECRUITER</span>
              <h1 className="landing-title">
                Hello Recruiter 👋<br />
                I'm <span className="highlight-orange">Amarapu Bhanu Prasad</span>
              </h1>
              <div className="landing-role-container">
                <span className="landing-role">{roleText}</span>
                <span className="role-cursor">|</span>
              </div>
              <p className="landing-description">
                Thank you for visiting my portfolio. I am passionate about building scalable cloud infrastructure, automating deployments, and designing reliable DevOps solutions using AWS, Docker, Jenkins, Kubernetes, Terraform, and modern CI/CD practices. I enjoy solving real-world infrastructure challenges and continuously improving deployment automation.
              </p>
              <div className="landing-actions">
                <button className="btn btn-primary enter-portfolio-btn" onClick={handleEnterPortfolio}>
                  🚀 Enter Portfolio
                </button>
                <a 
                  href={portfolioData.personal.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary download-resume-btn"
                >
                  📄 Download Resume
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Container */}
      <div className={`app-wrapper ${preloaderFaded ? 'fade-in-content' : ''}`}>
        
        {/* Background canvas */}
        <canvas ref={canvasRef} id="particle-canvas"></canvas>

        {/* Header / Navigation */}
        <header className={`navbar-header ${preloaderFaded ? 'nav-visible' : ''}`} id="navbar">
          <div className="nav-container">
            <a href="#home" className="nav-logo" id="nav-logo-link">
              <span className="logo-terminal">&gt;_</span>
              <span className="logo-text">ABP<span className="logo-accent"> devops</span></span>
            </a>
            
            <nav className="nav-links-wrapper" id="nav-menu">
              <a href="#home" className="nav-link active" id="nav-link-home">Home</a>
              <a href="#about" className="nav-link" id="nav-link-about">About</a>
              <a href="#skills" className="nav-link" id="nav-link-skills">Skills</a>
              <a href="#projects" className="nav-link" id="nav-link-projects">Projects</a>
              <a href="#future-projects" className="nav-link" id="nav-link-future">Future Projects</a>
              <a href="#academic-hub" className="nav-link" id="nav-link-hub">Resource Hub</a>
              <a href="#resume" className="nav-link" id="nav-link-resume">Resume</a>
              <a href="#experience" className="nav-link" id="nav-link-experience">Experience</a>
              <a href="#github-stats" className="nav-link" id="nav-link-github">GitHub</a>
              <a href="#contact" className="nav-link" id="nav-link-contact">Contact</a>
            </nav>

            <div className="nav-controls">
              <button 
                className="theme-toggle-btn" 
                id="theme-toggle" 
                onClick={toggleTheme} 
                aria-label="Toggle Dark/Light Mode" 
                title="Toggle Mode"
              >
                {theme === 'dark' ? <Sun size={18} className="sun-icon" /> : <Moon size={18} className="moon-icon" />}
              </button>
              <button className="mobile-menu-btn" id="nav-menu-toggle" aria-label="Toggle Navigation Menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </button>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section id="home" className={`hero-section ${preloaderFaded ? 'hero-visible' : ''}`}>
          <div className="section-container hero-grid">
            <div className={`hero-content ${preloaderFaded ? 'hero-animate-entrance' : ''}`}>
              <div className="console-badge" id="hero-badge">
                <span className="badge-dot"></span>
                <span className="badge-text">SYSTEM STATUS: ONLINE</span>
              </div>
              <h1 className="hero-title">
                <span className="greeting">Hello Recruiter 👋</span><br />
                <span className="highlight-name">I'm {portfolioData.personal.name}</span>
              </h1>
              <h2 className="hero-subtitle">
                <span id="typing-text">{heroSubtitleText}</span>
                <span className="typing-cursor">|</span>
              </h2>
              <p className="hero-tagline">
                Passionate cloud specialist focused on constructing highly available, secure, and fully automated cloud infrastructures. Leveraging modern GitOps strategies and programmatic scripting architectures to accelerate development loops.
              </p>
              
              <div className="hero-actions">
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
              
              <div className="hero-socials">
                <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="social-icon" id="hero-github-btn" aria-label="GitHub">
                  <Github size={16} />
                </a>
                <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" id="hero-linkedin-btn" aria-label="LinkedIn">
                  <Linkedin size={16} />
                </a>
                <a href="#contact" className="social-icon" id="hero-contact-btn" aria-label="Contact Email">
                  <Mail size={16} />
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div 
                className={`hero-avatar-centerpiece ${centerpieceActive ? 'active-reveal' : ''}`}
                onClick={() => setCenterpieceActive(prev => !prev)}
                style={{ cursor: 'pointer' }}
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
                <div className="hud-tech-label label-aws">Platform: AWS DevOps</div>
                <div className="hud-tech-label label-gitops">GitOps</div>

                {/* Avatar Ambient Glow */}
                <div className="avatar-ambient-glow"></div>
                
                {/* Pulsing Outer Rings */}
                <div className="avatar-pulsing-bangle"></div>
                
                {/* Real Profile Image circle */}
                <div className="avatar-image-container">
                  <img 
                    src="profile.jpg" 
                    alt={portfolioData.personal.name} 
                    className="centerpiece-avatar"
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
                    <span className="impress-card-title">AWS DevOps Infrastructure</span>
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
          
          <a href="#about" className="scroll-down-indicator" aria-label="Scroll to About Section">
            <ChevronDown size={20} />
          </a>
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
                  <span className="bullet-num">AWS DevOps</span>
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

            <div className="skills-dashboard-panels" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {portfolioData.skillsCategories.map(cat => (
                <div key={cat.id} className="skills-category-panel glass-card" style={{ padding: '20px' }}>
                  <h3 className="category-panel-title" style={{ borderBottom: '1px solid rgba(255, 153, 0, 0.25)', paddingBottom: '10px', marginBottom: '15px', color: 'var(--aws-orange)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: '600' }}>
                    <span className="category-emoji">{cat.emoji}</span> {cat.title}
                  </h3>
                  <div className="skills-list-vertical" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {cat.skills.map(skill => (
                      <div 
                        key={skill.id} 
                        className="skill-item-simple"
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          padding: '8px 12px', 
                          background: 'rgba(255, 255, 255, 0.03)', 
                          border: '1px solid rgba(255, 255, 255, 0.05)', 
                          borderRadius: '6px' 
                        }}
                      >
                        <span style={{ color: '#ffffff', fontWeight: '500', fontSize: '0.95rem' }}>{skill.name}</span>
                        <span style={{ color: 'var(--aws-orange)', fontWeight: '600', fontSize: '0.95rem' }}>{skill.percentage}%</span>
                      </div>
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

        {/* ACADEMIC RESOURCE HUB */}
        <section id="academic-hub" className="academic-hub-section scroll-offset">
          <div className="section-container">
            <div className="section-header">
              <span className="section-subtitle">/ Learning Center</span>
              <h2 className="section-title">Academic Resource Hub</h2>
              <div className="section-line"></div>
            </div>

            <div className="hub-intro glass-card">
              <div className="hub-intro-content">
                {renderIcon('graduation-cap', 'hub-main-icon')}
                <div>
                  <h3>Knowledge Repository</h3>
                  <p>A centralized learning platform for cloud, DevOps, programming, and interview preparation resources. Search and filter through high-quality notes, cheat sheets, and blueprints compiled during my cloud journey.</p>
                </div>
              </div>
              
              {/* Search Bar and Filters */}
              <div className="hub-controls">
                <div className="search-bar-wrapper">
                  {renderIcon('search', 'search-icon')}
                  <input 
                    type="text" 
                    value={hubSearch} 
                    onChange={(e) => setHubSearch(e.target.value)}
                    placeholder="Search resources (e.g. AWS DevOps, Linux, Python...)" 
                    aria-label="Search resources"
                  />
                  {hubSearch && (
                    <button 
                      className="search-clear-btn" 
                      onClick={() => setHubSearch('')}
                      aria-label="Clear search input"
                    >
                      {renderIcon('x')}
                    </button>
                  )}
                </div>
                <div className="hub-filter-tabs">
                  {['all', 'cloud', 'devops', 'programming', 'career'].map(tab => (
                    <button 
                      key={tab} 
                      className={`filter-tab ${hubFilter === tab ? 'active' : ''}`}
                      onClick={() => setHubFilter(tab)}
                    >
                      {tab === 'programming' ? 'Code' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="resources-grid" id="resources-container">
              {filteredResources.map(res => {
                let catClass = 'orange';
                let catIcon = 'cloud';
                let catLabel = 'Cloud Notes';
                if (res.category === 'devops') {
                  if (res.title.includes('Linux') || res.title.includes('Command')) {
                    catClass = 'green';
                    catIcon = 'terminal';
                    catLabel = 'Systems Admin';
                  } else if (res.title.includes('Docker')) {
                    catClass = 'blue';
                    catIcon = 'box';
                    catLabel = 'Containerization';
                  } else if (res.title.includes('Jenkins')) {
                    catClass = 'red';
                    catIcon = 'cpu';
                    catLabel = 'CI/CD Pipeline';
                  } else {
                    catClass = 'purple';
                    catIcon = 'layers';
                    catLabel = 'DevOps Roadmap';
                  }
                } else if (res.category === 'programming') {
                  if (res.title.includes('Labs') || res.title.includes('Projects')) {
                    catClass = 'blue';
                    catIcon = 'layers';
                    catLabel = 'Hands-on Labs';
                  } else {
                    catClass = 'cyan';
                    catIcon = 'terminal';
                    catLabel = 'Coding Notes';
                  }
                } else if (res.category === 'career') {
                  catClass = 'orange';
                  catIcon = 'award';
                  catLabel = 'Placement Prep';
                }
                
                return (
                  <div key={res.id} className="resource-card glass-card">
                    <div className={`resource-type ${catClass}`}>
                      {renderIcon(catIcon)} {catLabel}
                    </div>
                    <h4 className="resource-title">{res.title}</h4>
                    <p className="resource-desc">{res.desc}</p>
                    <div className="resource-actions">
                      <a href="#" className="btn btn-sm btn-primary placeholder-link" onClick={handlePlaceholderClick}>
                        {renderIcon('book-open')} Open Resource
                      </a>
                      <a href="https://github.com" className="btn btn-sm btn-secondary placeholder-link" onClick={handlePlaceholderClick}>
                        {renderIcon('github')} Code
                      </a>
                      <a href="#" className="btn btn-sm btn-secondary placeholder-link" onClick={handlePlaceholderClick}>
                        {renderIcon('file-text')} Docs
                      </a>
                    </div>
                  </div>
                );
              })}
              {filteredResources.length === 0 && (
                <div className="no-resources" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.4)' }}>
                  No resources match your search or filter criteria.
                </div>
              )}
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
                  <CheckCircle className={`widget-icon ${gitStats.status === 'STABLE' ? 'green' : gitStats.status === 'CACHED' ? 'orange' : 'red'}`} />
                </div>
              </div>

              {/* Languages and Activity */}
              <div className="github-visualizer-row">
                {/* Top Languages */}
                <div className="visualizer-card">
                  <h4>Top Languages</h4>
                  <div className="language-bar-chart">
                    <div className="lang-item">
                      <div className="lang-meta">
                        <span>Python</span>
                        <span>45%</span>
                      </div>
                      <div className="lang-bar-track">
                        <div className="lang-bar-fill progress-python" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div className="lang-item">
                      <div className="lang-meta">
                        <span>Shell Scripting</span>
                        <span>25%</span>
                      </div>
                      <div className="lang-bar-track">
                        <div className="lang-bar-fill progress-shell" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div className="lang-item">
                      <div className="lang-meta">
                        <span>React / Javascript</span>
                        <span>18%</span>
                      </div>
                      <div className="lang-bar-track">
                        <div className="lang-bar-fill progress-js" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    <div className="lang-item">
                      <div className="lang-meta">
                        <span>Java</span>
                        <span>12%</span>
                      </div>
                      <div className="lang-bar-track">
                        <div className="lang-bar-fill progress-java" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contributions Graph Mockup */}
                <div className="visualizer-card">
                  <h4>Activity Matrix (Last 12 Months)</h4>
                  <div className="activity-matrix-wrapper">
                    <div className="activity-matrix" id="github-activity-matrix">
                      {activityCells.map((cell, idx) => (
                        <div 
                          key={idx} 
                          className={`matrix-cell level-${cell.level}`}
                          title={`${cell.count} contributions on ${cell.date}`}
                        ></div>
                      ))}
                    </div>
                    <div className="matrix-legend">
                      <span>Less</span>
                      <div className="legend-cell level-0"></div>
                      <div className="legend-cell level-1"></div>
                      <div className="legend-cell level-2"></div>
                      <div className="legend-cell level-3"></div>
                      <div className="legend-cell level-4"></div>
                      <span>More</span>
                    </div>
                  </div>
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
                    <label htmlFor="contact-name">sender_name:</label>
                    <div className="input-wrapper">
                      {renderIcon('user', 'field-icon')}
                      <input type="text" id="contact-name" name="name" required placeholder="John Doe" disabled={formSubmitting} />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="contact-email">sender_email:</label>
                    <div className="input-wrapper">
                      {renderIcon('mail', 'field-icon')}
                      <input type="email" id="contact-email" name="email" required placeholder="john.doe@company.com" disabled={formSubmitting} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject">subject_payload:</label>
                    <div className="input-wrapper">
                      {renderIcon('file-text', 'field-icon')}
                      <input type="text" id="contact-subject" name="subject" required placeholder="Cloud Engineer Position" disabled={formSubmitting} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">message_body:</label>
                    <div className="input-wrapper">
                      {renderIcon('message-square', 'field-icon')}
                      <textarea id="contact-message" name="message" required rows="5" placeholder="Write your message details here..." disabled={formSubmitting}></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-submit-pipeline btn-block" disabled={formSubmitting}>
                    {formSubmitting ? (
                      <>
                        <span className="spinner"></span> Deploying...
                      </>
                    ) : (
                      <>
                        {renderIcon('play')} Trigger Pipeline Deploy
                      </>
                    )}
                  </button>
                </form>

                {/* Pipeline Status Output Interface */}
                {showConsole && (
                  <div className="pipeline-console-output" id="pipeline-console" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="console-line">
                      <span className="c-time">[12:00:00]</span> <span className="c-info">INFO:</span> Initializing contact deployment pipeline...
                    </div>
                    <div className="console-line">
                      <span className="c-time">[12:00:01]</span> <span className="c-info">INFO:</span> Validating sender payload parameters...
                    </div>
                    {validationLine && (
                      <div className="console-line" id="console-validation-step">
                        <span className="c-success">{validationLine}</span>
                      </div>
                    )}
                    {validationLine && (
                      <div className="console-line">
                        <span className="c-time">[12:00:02]</span> <span className="c-info">INFO:</span> Establishing secure endpoint tunnel...
                      </div>
                    )}
                    {validationLine && (
                      <div className="console-line">
                        <span className="c-time">[12:00:03]</span> <span className="c-info">INFO:</span> Deploying message packet to AWS DevOps Simple Email Service (SES) API...
                      </div>
                    )}
                    {successLine && (
                      <div className="console-line success-final" id="console-success-step">
                        <span className="c-success">{successLine}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="portfolio-footer">
          <div className="footer-container">
            <p>Made with <span className="heart-icon">❤️</span> by Bhanu Prasad Amarapu</p>
            <p className="footer-meta">AWS DevOps Platform | &copy; <span>2026</span> All rights reserved.</p>
          </div>
        </footer>

      </div>

      {/* PORTFOLIO PROJECT DETAIL DIALOG (MODAL) */}
      {selectedProject && (
        <div id="project-detail-modal" className="modal-overlay active">
          <div className="modal-wrapper">
            <button 
              className="modal-close-btn" 
              id="modal-close-btn" 
              onClick={() => setSelectedProject(null)} 
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
            <div className="modal-header-visual">
              <div className="modal-visual-gradient"></div>
              <div className="modal-icon-container">
                {renderIcon(selectedProject.icon || 'database')}
              </div>
            </div>
            <div className="modal-content-container">
              <div className="modal-meta-row">
                <span id="modal-badge" className="project-badge">{selectedProject.badge}</span>
                <div className="modal-stats">
                  <div className="stat-item">
                    <span className="stat-label">Commits</span>
                    <span id="stat-commits" className="stat-value">{selectedProject.commits || 142}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Stars</span>
                    <span id="stat-stars" className="stat-value">{selectedProject.stars || 34}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">PRs</span>
                    <span id="stat-prs" className="stat-value">{selectedProject.prs || 18}</span>
                  </div>
                </div>
              </div>
              
              <h3 id="modal-title" className="modal-title">{selectedProject.title}</h3>
              <p className="modal-subtitle" style={{ fontSize: '0.95rem', color: 'var(--aws-orange)', marginBottom: '15px', fontWeight: '500' }}>
                {selectedProject.subtitle}
              </p>
              
              <p id="modal-description" className="modal-description">{selectedProject.desc}</p>
              
              <h4 className="modal-section-title">Deployment Stack & Technologies</h4>
              <div id="modal-tech-stack" className="modal-tech-stack">
                {selectedProject.tech.map((t, idx) => (
                  <span key={idx} className="badge" style={{ animationDelay: `${idx * 50}ms` }}>{t}</span>
                ))}
              </div>
              
              <div className="modal-actions">
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn modal-action-btn github-action-btn" 
                  id="modal-repo-link"
                >
                  <Github size={16} /> Repository Code
                </a>
                <a 
                  href={selectedProject.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn modal-action-btn demo-action-btn" 
                  id="modal-demo-link"
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
