/* ==========================================================================
   GLOBAL APP STATE & INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Custom Cursor & Trails
    initCustomCursor();

    // 2. Initialize Preloader typing & load sequence
    initPreloader();

    // 3. Initialize Sticky Navbar, Scroll Progress & Highlights
    initStickyHeader();
    initScrollProgressBar();
    initScrollObserver();

    // 4. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 5. Initialize Technical Skills Circular Progress Indicators
    initSkillsObserver();

    // 6. Initialize Project Detail Popup Modal
    initProjectModal();

    // 7. Initialize Other Legacy Components
    initResourceHub();
    initGitHubStats();
    initContactPipeline();
});

/* ==========================================================================
   PRELOADER TERMINAL SEQUENCE
   ========================================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const typingSpan = document.getElementById('preloader-typing');
    if (!preloader || !typingSpan) return;

    const logs = [
        "Initializing DevOps Portfolio Environment...",
        "Launching Docker Containers...",
        "Orchestrating Kubernetes Pods...",
        "Provisioning AWS Cloud Infrastructure...",
        "Deploying Terraform Modules...",
        "Pipeline Status: SUCCESS. Loading Portfolio..."
    ];

    let logIndex = 0;
    let charIndex = 0;
    let currentText = "";

    function typeLog() {
        if (logIndex < logs.length) {
            const targetText = "> " + logs[logIndex];
            
            if (charIndex < targetText.length) {
                currentText += targetText.charAt(charIndex);
                typingSpan.textContent = currentText;
                charIndex++;
                setTimeout(typeLog, 25);
            } else {
                // Pause at the end of each log line
                setTimeout(() => {
                    logIndex++;
                    charIndex = 0;
                    currentText = "";
                    typeLog();
                }, 500);
            }
        } else {
            // End of preloader sequence
            fadeOutPreloader();
        }
    }

    // Start typing logs
    setTimeout(typeLog, 300);

    function fadeOutPreloader() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = ''; // Restore scrolling

        // Trigger entrance animations for Hero Content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('hero-animate-entrance');
        }

        // Initialize Three.js scene once visible
        initThreeJS();
    }
}

/* ==========================================================================
   CUSTOM CURSOR & TRAILS
   ========================================================================== */
function initCustomCursor() {
    const cursorRing = document.getElementById('custom-cursor-ring');
    const cursorDot = document.getElementById('custom-cursor-dot');
    if (!cursorRing || !cursorDot) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Linear interpolation for smooth cursor ring lag
    function animateCursor() {
        const easing = 0.15;
        ringX += (mouseX - ringX) * easing;
        ringY += (mouseY - ringY) * easing;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverables = document.querySelectorAll('a, button, .project-card, .skill-item, .resource-card, input, textarea, .nav-logo');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('cursor-hover');
        });
    });

    // Cursor Trail creation on mousemove
    let trailTimeout = 0;
    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - trailTimeout > 60) {
            createTrail(e.clientX, e.clientY);
            trailTimeout = now;
        }
    });

    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0.3)';
            setTimeout(() => {
                trail.remove();
            }, 400);
        }, 100);
    }

    // Ripple click animation on buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn, button, .project-card, .resource-card');
        if (btn) {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            btn.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
}

/* ==========================================================================
   SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgressBar() {
    const progressBar = document.getElementById('scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

/* ==========================================================================
   THREE.JS 3D WEBGL DEVOPS BACKGROUND
   ========================================================================== */
let scene, camera, renderer;
let dockerCubes = [];
let k8sPods = [];
let terraformGroup;
let awsNodes = [];
let dataPackets = [];
let binaryRain;
let devopsLoop;
let starParticles;

let targetMouseX = 0, targetMouseY = 0;
let mouseX = 0, mouseY = 0;

function initThreeJS() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    // Create Scene
    scene = new THREE.Scene();

    // Create Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 180;

    // Create Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Directional Lighting
    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight.position.set(100, 100, 50);
    scene.add(dirLight);

    // Point Light (AWS Glowing Orange)
    const orangeLight = new THREE.PointLight(0xff9900, 1.5, 300);
    orangeLight.position.set(0, 0, 50);
    scene.add(orangeLight);

    // 1. Build DevOps Torus Knot Infinity Loop
    createDevopsInfinityLoop();

    // 2. Build Docker Container Cubes (floating 3D wireframe boxes)
    createDockerCubes();

    // 3. Build Kubernetes Pods (hexagonal cylinders)
    createKubernetesPods();

    // 4. Build Terraform Stack Blocks
    createTerraformBlocks();

    // 5. Build AWS Network Nodes (glowing orange spheres)
    createAwsNodes();

    // 6. Build Flowing Data Packet Paths
    createDataPacketPaths();

    // 7. Build Binary Code Rain / Starfield
    createParticleField();

    // Event Listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onWindowScroll);

    // Start Rendering Loop
    animateThree();
}

function createDevopsInfinityLoop() {
    const geom = new THREE.TorusKnotGeometry(32, 5, 120, 16, 2, 3);
    const mat = new THREE.MeshPhongMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    devopsLoop = new THREE.Mesh(geom, mat);
    devopsLoop.position.set(0, 0, -40);
    scene.add(devopsLoop);
}

function createCloudGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-5, -2);
    shape.quadraticCurveTo(-9, -2, -9, 2);
    shape.quadraticCurveTo(-9, 5, -5, 5);
    shape.quadraticCurveTo(-5, 8, -2, 8);
    shape.quadraticCurveTo(2, 8, 3, 5);
    shape.quadraticCurveTo(7, 5, 7, 2);
    shape.quadraticCurveTo(7, -2, 3, -2);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
        depth: 2,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.4,
        bevelThickness: 0.4
    });
}

function createHeptagonGeometry() {
    const shape = new THREE.Shape();
    const sides = 7;
    const radius = 5;
    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
        depth: 2,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.4,
        bevelThickness: 0.4
    });
}

function createInfinityGeometry() {
    const shape = new THREE.Shape();
    // Figure 8 infinity loop path
    shape.moveTo(0, 0);
    shape.bezierCurveTo(-3.5, 4.5, -7, 4.5, -7, 0);
    shape.bezierCurveTo(-7, -4.5, -3.5, -4.5, 0, 0);
    shape.bezierCurveTo(3.5, 4.5, 7, 4.5, 7, 0);
    shape.bezierCurveTo(7, -4.5, 3.5, -4.5, 0, 0);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
        depth: 2,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.4,
        bevelThickness: 0.4
    });
}

function createDockerCubes() {
    const geometries = [
        createCloudGeometry(),
        createHeptagonGeometry(),
        createInfinityGeometry()
    ];
    
    const colors = [
        0xff9900, // AWS Orange
        0x38bdf8, // Sky Blue
        0xa855f7  // Purple
    ];
    
    // Create 6 floating DevOps symbols
    for (let i = 0; i < 6; i++) {
        const idx = i % geometries.length;
        const geom = geometries[idx];
        const mat = new THREE.MeshPhongMaterial({
            color: colors[idx],
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        
        const mesh = new THREE.Mesh(geom, mat);
        
        // Random placement
        mesh.position.set(
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 100 - 30
        );
        scene.add(mesh);
        dockerCubes.push({
            mesh: mesh,
            rotSpeed: new THREE.Vector3(
                Math.random() * 0.01 + 0.005,
                Math.random() * 0.01 + 0.005,
                Math.random() * 0.01
            ),
            floatSpeed: Math.random() * 0.002 + 0.001,
            floatOffset: Math.random() * Math.PI * 2
        });
    }
}

function createKubernetesPods() {
    // Hexagonal cylinder pods: radius 8, segments 6
    const geom = new THREE.CylinderGeometry(8, 8, 16, 6);
    const edges = new THREE.EdgesGeometry(geom);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x326ce5, linewidth: 2 });

    for (let i = 0; i < 4; i++) {
        const pod = new THREE.LineSegments(edges, lineMat);
        pod.position.set(
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 100 - 30
        );
        scene.add(pod);
        k8sPods.push({
            mesh: pod,
            scaleSpeed: Math.random() * 0.003 + 0.002,
            scaleOffset: Math.random() * Math.PI,
            rotSpeed: Math.random() * 0.008 + 0.002
        });
    }
}

function createTerraformBlocks() {
    terraformGroup = new THREE.Group();
    const geom = new THREE.BoxGeometry(8, 8, 8);
    const mat = new THREE.MeshPhongMaterial({
        color: 0x7b42bc,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });

    // Create 3 stacked block wireframes
    for (let i = 0; i < 3; i++) {
        const block = new THREE.Mesh(geom, mat);
        block.position.y = (i - 1) * 9;
        terraformGroup.add(block);
    }
    
    terraformGroup.position.set(50, -40, -20);
    scene.add(terraformGroup);
}

function createAwsNodes() {
    const geom = new THREE.SphereGeometry(4, 16, 16);
    const mat = new THREE.MeshBasicMaterial({
        color: 0xff9900,
        transparent: true,
        opacity: 0.8
    });

    // Create AWS service nodes
    const nodeCount = 5;
    for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(geom, mat);
        node.position.set(
            (Math.random() - 0.5) * 180,
            (Math.random() - 0.5) * 120,
            (Math.random() - 0.5) * 80 - 10
        );
        scene.add(node);
        awsNodes.push({
            mesh: node,
            pulseSpeed: Math.random() * 0.005 + 0.002,
            pulseOffset: Math.random() * Math.PI * 2
        });
    }
}

function createDataPacketPaths() {
    // Generate curved paths between AWS Nodes
    for (let i = 0; i < awsNodes.length - 1; i++) {
        const start = awsNodes[i].mesh.position;
        const end = awsNodes[i+1].mesh.position;

        // Draw connecting curve
        const midX = (start.x + end.x) / 2 + (Math.random() - 0.5) * 30;
        const midY = (start.y + end.y) / 2 + (Math.random() - 0.5) * 30;
        const midZ = (start.z + end.z) / 2 + (Math.random() - 0.5) * 30;
        const curve = new THREE.QuadraticBezierCurve3(
            start,
            new THREE.Vector3(midX, midY, midZ),
            end
        );

        // Render curve line
        const points = curve.getPoints(50);
        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.12
        });
        const line = new THREE.Line(lineGeom, lineMat);
        scene.add(line);

        // Add 1-2 flowing packets along path
        createDataPacket(curve);
    }
}

function createDataPacket(curve) {
    const packetGeom = new THREE.SphereGeometry(1.2, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xff9900 });
    const packet = new THREE.Mesh(packetGeom, packetMat);
    scene.add(packet);

    dataPackets.push({
        mesh: packet,
        curve: curve,
        progress: Math.random(),
        speed: Math.random() * 0.003 + 0.002
    });
}

function createParticleField() {
    const count = 180;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 300;
        positions[i+1] = (Math.random() - 0.5) * 200;
        positions[i+2] = (Math.random() - 0.5) * 200;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 1.5,
        transparent: true,
        opacity: 0.25
    });

    starParticles = new THREE.Points(geom, mat);
    scene.add(starParticles);
}

function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    targetMouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    targetMouseY = (event.clientY - window.innerHeight / 2) * 0.05;
}

function onWindowScroll() {
    // Parallax scroll fly-through camera effect
    if (!camera) return;
    const scrollPos = window.scrollY;
    camera.position.z = 180 - scrollPos * 0.06;
}

function animateThree() {
    requestAnimationFrame(animateThree);

    const time = Date.now() * 0.001;

    // 1. DevOps Loop Rotation
    if (devopsLoop) {
        devopsLoop.rotation.y = time * 0.04;
        devopsLoop.rotation.x = time * 0.02;
    }

    // 2. Docker Cubes hover & rotate
    dockerCubes.forEach(cube => {
        cube.mesh.rotation.x += cube.rotSpeed.x;
        cube.mesh.rotation.y += cube.rotSpeed.y;
        cube.mesh.position.y += Math.sin(time + cube.floatOffset) * 0.08;
    });

    // 3. Kubernetes Pods auto-scale and rotate
    k8sPods.forEach(pod => {
        pod.mesh.rotation.y += pod.rotSpeed;
        const scaleVal = 1 + Math.sin(time * 3 + pod.scaleOffset) * 0.15;
        pod.mesh.scale.set(scaleVal, scaleVal, scaleVal);
    });

    // 4. Terraform assembly assembly animation
    if (terraformGroup) {
        terraformGroup.rotation.y += 0.008;
        const stackOffset = Math.sin(time * 1.5) * 3;
        terraformGroup.children[0].position.y = 9 + stackOffset; // top
        terraformGroup.children[2].position.y = -9 - stackOffset; // bottom
    }

    // 5. AWS Nodes pulse animation
    awsNodes.forEach(node => {
        const pulse = 1 + Math.sin(time * 2 + node.pulseOffset) * 0.12;
        node.mesh.scale.set(pulse, pulse, pulse);
    });

    // 6. Flowing Data Packets
    dataPackets.forEach(packet => {
        packet.progress += packet.speed;
        if (packet.progress >= 1.0) {
            packet.progress = 0;
        }
        const point = packet.curve.getPointAt(packet.progress);
        packet.mesh.position.copy(point);
    });

    // 7. Binary Code rain drifting downwards
    if (starParticles) {
        const positions = starParticles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= 0.15; // move down y
            if (positions[i] < -100) {
                positions[i] = 100; // reset to top
            }
        }
        starParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Smooth Mouse Parallax
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    camera.position.x = mouseX * 0.15;
    camera.position.y = -mouseY * 0.15;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollObserver() {
    const revealElements = document.querySelectorAll('.project-card, .skills-group-card, .timeline-point-row, .github-stats-card, .future-project-card');
    
    // Add scroll reveal class initially
    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Timeline Connector progress bar calculation
    const experienceSection = document.getElementById('experience');
    const timelineProgress = document.querySelector('.timeline-connector-progress');
    
    if (experienceSection && timelineProgress) {
        window.addEventListener('scroll', () => {
            const rect = experienceSection.getBoundingClientRect();
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Calculate active timeline scroll ratio
            let progressRatio = 0;
            if (rect.top <= viewportHeight / 2) {
                const scrolled = (viewportHeight / 2) - rect.top;
                progressRatio = Math.min(1, scrolled / (sectionHeight - viewportHeight / 4));
            }
            timelineProgress.style.height = `${progressRatio * 100}%`;
        });
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -50% 0px' });

    sections.forEach(s => highlightObserver.observe(s));
}

/* ==========================================================================
   TECHNICAL SKILLS CIRCULAR RINGS OBSERVER
   ========================================================================== */
function initSkillsObserver() {
    const skillItems = document.querySelectorAll('.skill-item');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const percentage = parseInt(item.getAttribute('data-percentage'), 10);
                const progressFill = item.querySelector('.progress-ring-fill');

                if (progressFill) {
                    const perimeter = 204; // Hexagon perimeter
                    const offset = perimeter - (perimeter * percentage / 100);
                    
                    progressFill.style.strokeDasharray = perimeter;
                    progressFill.style.strokeDashoffset = perimeter;

                    // Trigger reflow
                    progressFill.getBoundingClientRect();

                    progressFill.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.1, 0.8, 0.2, 1)';
                    progressFill.style.strokeDashoffset = offset;
                }

                item.classList.add('animated-in');
                skillsObserver.unobserve(item);
            }
        });
    }, { threshold: 0.1 });

    skillItems.forEach((item, idx) => {
        item.style.transitionDelay = `${idx * 40}ms`;
        skillsObserver.observe(item);
    });
}

/* ==========================================================================
   PROJECT DETAILS POPUP MODAL
   ========================================================================== */
const projectData = {
    "1": {
        title: "Hybrid Cloud Deduplication System with ML-Based Similarity Detection",
        badge: "Enterprise Cloud Storage",
        description: "An enterprise-grade hybrid cloud storage optimization platform implementing secure deduplication. The system uses dual-layered cryptographic verification (SHA-256 & AES-256) combined with Convergent Narrowing Storage (CNS) for maximum storage efficiency. Integrating ML algorithms, SBERT, and DINOv2 for content similarity checks and safety moderation before storing files in AWS S3. Features full RBAC, data integrity auditing, real-time monitoring console, and an end-to-end containerized backend.",
        tech: ["SHA-256", "AES-256", "CNS", "SBERT", "DINOv2", "AWS S3", "Docker", "MySQL", "RBAC", "Integrity Auditing", "Real-Time Monitoring"],
        commits: 142,
        stars: 34,
        prs: 18,
        repo: "https://github.com",
        demo: "https://github.com",
        icon: "database"
    },
    "2": {
        title: "Study Stream (Academic Resource Hub)",
        badge: "Academic Management",
        description: "A comprehensive academic resource management platform built using a modern React frontend and a Flask RESTful API. The application enables students and educators to organize, upload, search, and secure academic documents. Integrating AWS S3 for scalable document storage and MySQL for relational tracking. Features secure authentication via JWT, Role-Based Access Control, fuzzy search, and fully automated deployment configurations using Docker.",
        tech: ["React", "Flask", "MySQL", "Docker", "AWS S3", "JWT", "REST APIs", "RBAC", "Fuzzy Search", "Docker Compose"],
        commits: 98,
        stars: 21,
        prs: 12,
        repo: "https://github.com",
        demo: "https://github.com",
        icon: "book-open"
    }
};

function initProjectModal() {
    const modal = document.getElementById('project-detail-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    
    if (!modal || !closeBtn) return;

    // Open Modal listeners
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-project-id');
            const data = projectData[id];
            if (data) {
                populateModal(data);
                openModal();
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);
    
    // Close on outer overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scrolling
    }

    function populateModal(data) {
        document.getElementById('modal-icon').setAttribute('data-lucide', data.icon);
        document.getElementById('modal-badge').textContent = data.badge;
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-description').textContent = data.description;
        
        // Setup Action Links
        document.getElementById('modal-repo-link').setAttribute('href', data.repo);
        document.getElementById('modal-demo-link').setAttribute('href', data.demo);

        // Tech stack chips staggered load
        const techContainer = document.getElementById('modal-tech-stack');
        techContainer.innerHTML = '';
        data.tech.forEach((t, index) => {
            const span = document.createElement('span');
            span.className = 'badge';
            span.textContent = t;
            span.style.animationDelay = `${index * 50}ms`;
            techContainer.appendChild(span);
        });

        // Recreate Lucide Icons inside modal
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Animate counter stats
        animateCounter(document.getElementById('stat-commits'), 0, data.commits, 1200);
        animateCounter(document.getElementById('stat-stars'), 0, data.stars, 1200);
        animateCounter(document.getElementById('stat-prs'), 0, data.prs, 1200);
    }
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
}

/* ==========================================================================
   ACADEMIC RESOURCE HUB SEARCH & FILTERS
   ========================================================================== */
function initResourceHub() {
    const searchInput = document.getElementById('hub-search-input');
    const searchClear = document.getElementById('hub-search-clear');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    if (!searchInput || !resourceCards) return;
    
    function filterResources() {
        const query = searchInput.value.toLowerCase().trim();
        const activeTab = document.querySelector('.filter-tab.active');
        const filterVal = activeTab ? activeTab.getAttribute('data-filter') : 'all';
        
        resourceCards.forEach(card => {
            const title = card.querySelector('.resource-title').textContent.toLowerCase();
            const desc = card.querySelector('.resource-desc').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            const tags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').toLowerCase() : '';
            
            const matchesSearch = title.includes(query) || desc.includes(query) || tags.includes(query);
            const matchesCategory = filterVal === 'all' || category === filterVal;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide search clear button
        if (query.length > 0) {
            searchClear.style.display = 'block';
        } else {
            searchClear.style.display = 'none';
        }
    }
    
    searchInput.addEventListener('input', filterResources);
    
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        filterResources();
        searchInput.focus();
    });
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterResources();
        });
    });
    
    const placeholderLinks = document.querySelectorAll('.placeholder-link');
    placeholderLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert("This is an academic resource hub placeholder. In production, this launches a PDF reader, a GitHub repository link, or reference materials.");
        });
    });
}

/* ==========================================================================
   GITHUB STATISTICS API INTEGRATION & MOCK ACTIVITY MATRIX
   ========================================================================== */
function initGitHubStats() {
    const fetchBtn = document.getElementById('github-fetch-btn');
    const usernameInput = document.getElementById('github-username-input');
    
    generateMockMatrix();
    
    if (!fetchBtn || !usernameInput) return;
    
    fetchBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetchGitHubAPI(username);
        }
    });
    
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchBtn.click();
        }
    });
}

async function fetchGitHubAPI(username) {
    const reposVal = document.getElementById('git-repos-val');
    const starsVal = document.getElementById('git-stars-val');
    const followersVal = document.getElementById('git-followers-val');
    const statusVal = document.getElementById('git-status-val');
    
    reposVal.textContent = '...';
    starsVal.textContent = '...';
    followersVal.textContent = '...';
    
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
        
        reposVal.textContent = userData.public_repos;
        starsVal.textContent = starCount;
        followersVal.textContent = userData.followers;
        statusVal.textContent = 'STABLE';
        statusVal.className = 'widget-value text-green';
        
        generateMockMatrix();
    } catch (error) {
        console.error(error);
        alert(`Failed to fetch GitHub profile for '${username}'. Displaying mock statistics instead.`);
        
        reposVal.textContent = '12';
        starsVal.textContent = '3';
        followersVal.textContent = '4';
        statusVal.textContent = 'OFFLINE';
        statusVal.className = 'widget-value';
    }
}

function generateMockMatrix() {
    const matrix = document.getElementById('github-activity-matrix');
    if (!matrix) return;
    
    matrix.innerHTML = '';
    const cols = 24;
    const rows = 7;
    const totalCells = cols * rows;
    const today = new Date();
    
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'matrix-cell';
        
        const rnd = Math.random();
        let level = 0;
        if (rnd > 0.85) level = 4;
        else if (rnd > 0.70) level = 3;
        else if (rnd > 0.50) level = 2;
        else if (rnd > 0.20) level = 1;
        
        cell.classList.add(`level-${level}`);
        
        const cellDate = new Date();
        cellDate.setDate(today.getDate() - (totalCells - i));
        const formattedDate = cellDate.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        const count = level === 0 ? 'No' : level * 2 + Math.floor(Math.random() * 2);
        cell.setAttribute('title', `${count} contributions on ${formattedDate}`);
        matrix.appendChild(cell);
    }
}

/* ==========================================================================
   CONTACT FORM DEVOPS PIPELINE SIMULATOR
   ========================================================================== */
function initContactPipeline() {
    const form = document.getElementById('contact-form');
    const consoleBox = document.getElementById('pipeline-console');
    const validationStep = document.getElementById('console-validation-step');
    const successStep = document.getElementById('console-success-step');
    
    if (!form || !consoleBox) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;
        
        if (!name || !email || !subject || !message) return;
        
        const elements = form.querySelectorAll('input, textarea, button');
        elements.forEach(el => el.disabled = true);
        
        consoleBox.style.display = 'flex';
        successStep.style.display = 'none';
        
        setTimeout(() => {
            const timeStr = new Date().toLocaleTimeString();
            validationStep.innerHTML = `<span class="c-time">[${timeStr}]</span> <span class="c-success">SUCCESS:</span> Payload validation passed (Sender: "${name}", Email: "${email}").`;
        }, 1000);
        
        setTimeout(() => {
            const timeStr = new Date().toLocaleTimeString();
            successStep.style.display = 'block';
            successStep.innerHTML = `<span class="c-time">[${timeStr}]</span> <span class="c-success">SUCCESS:</span> Message deployed successfully via SES API tunnel! Response code: 200.`;
            
            alert("Deployment successful! Your message has been sent to Bhanu Prasad Amarapu.");
            
            setTimeout(() => {
                form.reset();
                elements.forEach(el => el.disabled = false);
            }, 1000);
        }, 3200);
    });
}

/* ==========================================================================
   STICKY NAVBAR INITIALIZATION
   ========================================================================== */
function initStickyHeader() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });
}
