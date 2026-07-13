export const portfolioData = {
  personal: {
    name: "AMARAPU BHANU PRASAD",
    role: "AWS DevOps & Cloud Automation Engineer",
    subRoles: [
      "AWS DevOps Engineer",
      "GitOps & CI/CD Specialist",
      "Cloud Cloud Infrastructure Automation Engineer"
    ],
    email: "amarapubhanu7@gmail.com",
    phone: "+91 8919065413",
    location: "Parvathipuram, Andhra Pradesh, India",
    github: "https://github.com/BhanuAmarapu?tab=repositories",
    linkedin: "https://www.linkedin.com/in/amarapu-bhanu-prasad-a43254335",
    resumeUrl: "Bhanu_Resume_102.pdf"
  },
  
  milestones: [
    {
      id: 1,
      tag: "Milestone 1",
      title: "Advanced Cloud & Linux Infrastructure Design",
      desc: "Built solid system administration foundations inside Linux environments. Designed secure, high-availability AWS DevOps network zones (VPC, zones, routing, EC2 instances, S3 storage buckets) with granular IAM security rules.",
      icon: "cloud"
    },
    {
      id: 2,
      tag: "Milestone 2",
      title: "Docker Containerization & Kubernetes Orchestration",
      desc: "Containerized application architectures utilizing multi-stage builds to optimize image size. Managed, mapped, and orchestrated container networks using Docker Compose and Kubernetes pods.",
      icon: "box"
    },
    {
      id: 3,
      tag: "Milestone 3",
      title: "Automated CI/CD Loops & Declarative IaC",
      desc: "Engineered robust continuous integration pipelines using modular Jenkinsfiles and webhooks. Configured modular Terraform templates to automate resource provisioning complying with best practices.",
      icon: "cpu"
    }
  ],

  education: [
    {
      id: 1,
      date: "Oct 2024 - Jun 2026",
      degree: "Master of Computer Applications (MCA)",
      org: "JNTU-GV College of Engineering, Vizianagaram",
      desc: "Postgraduate program. Focus on advanced computing, enterprise architectures, database systems, web technologies, and cloud deployments.",
      statusLabel: "Status",
      statusValue: "Pursuing"
    },
    {
      id: 2,
      date: "Sep 2021 - Apr 2024",
      degree: "Bachelor's Degree",
      org: "Shri Shirdi Sai Srinivasa Degree College, Vizianagaram",
      desc: "Undergraduate program. Acquired a solid grounding in programming languages, object-oriented paradigms, database designs, and networking foundations.",
      statusLabel: "Score",
      statusValue: "CGPA 8.6/10.0"
    }
  ],

  certifications: [
    {
      id: 1,
      date: "2024",
      title: "Getting Started with AWS DevOps",
      org: "AWS DevOps Certification",
      desc: "Verified foundational competence in AWS DevOps core services, global infrastructure parameters, billing concepts, and basic cloud security mechanisms."
    },
    {
      id: 2,
      date: "Jan 2026",
      title: "AWS DevOps Solutions Architecture Job Simulation",
      org: "Forage",
      desc: "Simulated architectural evaluations, high-availability setups, computing sizing, security configurations, and AWS DevOps service selection scenarios."
    },
    {
      id: 3,
      date: "Dec 2025",
      title: "Certificate of Participation - GenAI Hackathon 2025",
      org: "JNTU-GV College of Engineering",
      desc: "Developed prototypes integrating generative AI models with cloud hosting solutions, showcasing fast API iterations and frontend interfaces."
    }
  ],

  skillsCategories: [
    {
      id: "cloud-platforms",
      title: "Cloud Platforms",
      emoji: "☁️",
      skills: [
        {
          id: "aws",
          name: "AWS DevOps",
          tooltip: "AWS DevOps (Amazon Web Services)",
          experience: "Advanced Level • 2+ Years Experience • Certified Cloud Practitioner",
          percentage: 85,
          iconClass: "devicon-amazonwebservices-wordmark colored"
        }
      ]
    },
    {
      id: "containers-orchestration",
      title: "Containers & Orchestration",
      emoji: "🐳",
      skills: [
        {
          id: "docker",
          name: "Docker",
          tooltip: "Docker Containerization",
          experience: "Advanced Level • 2+ Years Experience",
          percentage: 85,
          iconClass: "devicon-docker-plain colored"
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          tooltip: "Kubernetes Orchestration",
          experience: "Advanced Level • 1.5+ Years Experience",
          percentage: 80,
          iconClass: "devicon-kubernetes-plain colored"
        },
        {
          id: "ecs",
          name: "Amazon ECS",
          tooltip: "Amazon ECS (Elastic Container Service)",
          experience: "Intermediate Level • 1.5+ Years Experience",
          percentage: 75,
          iconClass: "devicon-amazonwebservices-original"
        },
        {
          id: "eks",
          name: "Amazon EKS",
          tooltip: "Amazon EKS (Elastic Kubernetes Service)",
          experience: "Intermediate Level • 1.5+ Years Experience",
          percentage: 75,
          iconClass: "devicon-amazonwebservices-original"
        }
      ]
    },
    {
      id: "cicd",
      title: "CI/CD Platforms",
      emoji: "🚀",
      skills: [
        {
          id: "jenkins",
          name: "Jenkins",
          tooltip: "Jenkins Automation Server",
          experience: "Advanced Level • 2+ Years Experience",
          percentage: 80,
          iconClass: "devicon-jenkins-line colored"
        },
        {
          id: "github-actions",
          name: "GitHub Actions",
          tooltip: "GitHub Actions",
          experience: "Advanced Level • 2+ Years Experience • Custom Workflows",
          percentage: 85,
          iconClass: "devicon-github-original"
        },
        {
          id: "gitlab",
          name: "GitLab CI",
          tooltip: "GitLab CI",
          experience: "Intermediate Level • 1+ Year Experience • Runner Configs",
          percentage: 70,
          iconClass: "devicon-gitlab-plain colored"
        }
      ]
    },
    {
      id: "iac",
      title: "Infrastructure as Code",
      emoji: "🏗",
      skills: [
        {
          id: "terraform",
          name: "Terraform",
          tooltip: "Terraform",
          experience: "Advanced Level • 2+ Years Experience • Modular Architectures",
          percentage: 85,
          iconClass: "devicon-terraform-plain colored"
        },
        {
          id: "cloudformation",
          name: "CloudFormation",
          tooltip: "CloudFormation Templates",
          experience: "Intermediate Level • 1.5+ Years Experience • YAML/JSON",
          percentage: 75,
          iconClass: "devicon-amazonwebservices-original"
        },
        {
          id: "ansible",
          name: "Ansible",
          tooltip: "Ansible Config Management",
          experience: "Intermediate Level • 1+ Year Experience • Playbooks",
          percentage: 70,
          iconClass: "devicon-ansible-plain colored"
        }
      ]
    },
    {
      id: "monitoring-logging",
      title: "Monitoring & Logging",
      emoji: "📊",
      skills: [
        {
          id: "cloudwatch",
          name: "CloudWatch",
          tooltip: "Amazon CloudWatch",
          experience: "Advanced Level • 2+ Years Experience • Logs & Metrics",
          percentage: 80,
          iconClass: "devicon-amazonwebservices-original"
        },
        {
          id: "prometheus",
          name: "Prometheus",
          tooltip: "Prometheus Metrics Collection",
          experience: "Advanced Level • 1.5+ Years Experience",
          percentage: 80,
          iconClass: "devicon-prometheus-original colored"
        },
        {
          id: "grafana",
          name: "Grafana",
          tooltip: "Grafana Dashboards",
          experience: "Advanced Level • 2+ Years Experience",
          percentage: 85,
          iconClass: "devicon-grafana-original colored"
        },
        {
          id: "elk",
          name: "ELK Stack",
          tooltip: "ELK (Elasticsearch, Logstash, Kibana)",
          experience: "Intermediate Level • 1.5+ Years Experience",
          percentage: 75,
          iconClass: "devicon-elasticsearch-original colored"
        }
      ]
    },
    {
      id: "programming",
      title: "Programming",
      emoji: "💻",
      skills: [
        {
          id: "python",
          name: "Python",
          tooltip: "Python Automation Scripting",
          experience: "Advanced Level • 2.5+ Years Experience",
          percentage: 85,
          iconClass: "devicon-python-plain colored"
        },
        {
          id: "shell",
          name: "Shell Scripting",
          tooltip: "Shell & Bash Scripting",
          experience: "Advanced Level • 2+ Years Experience",
          percentage: 80,
          iconClass: "devicon-bash-plain"
        },
        {
          id: "java",
          name: "Java",
          tooltip: "Java",
          experience: "Intermediate Level • 1.5+ Years Experience",
          percentage: 75,
          iconClass: "devicon-java-plain colored"
        },
        {
          id: "javascript",
          name: "JavaScript",
          tooltip: "JavaScript",
          experience: "Advanced Level • 2+ Years Experience",
          percentage: 80,
          iconClass: "devicon-javascript-plain colored"
        }
      ]
    },
    {
      id: "version-control",
      title: "Version Control",
      emoji: "🔧",
      skills: [
        {
          id: "git",
          name: "Git",
          tooltip: "Git",
          experience: "Advanced Level • 3+ Years Experience • Hooks & Flows",
          percentage: 85,
          iconClass: "devicon-git-plain colored"
        },
        {
          id: "github",
          name: "GitHub",
          tooltip: "GitHub Platform",
          experience: "Advanced Level • 3+ Years Experience • Organizations",
          percentage: 85,
          iconClass: "devicon-github-original colored"
        },
        {
          id: "bitbucket",
          name: "Bitbucket",
          tooltip: "Atlassian Bitbucket",
          experience: "Intermediate Level • 1.5+ Years Experience",
          percentage: 75,
          iconClass: "devicon-bitbucket-original colored"
        }
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Study Stream / Academic Hub",
      subtitle: "MCA Mini-Project — JNTU-GV",
      desc: "An integrated academic resource management platform developed to centralize scattered learning materials. Built with React.js frontend, Flask backend, and MySQL database. Implemented JWT-based authentication, role-based access control, advanced search with full-text indexing, and secure file upload system. Containerized application using Docker for consistent development and deployment environments. Successfully reduced student search time by 95% and faculty workload by 40%.",
      tech: ["Python", "Flask", "React.js", "MySQL", "JWT", "Docker", "AWS DevOps S3", "REST API", "Docker Compose"],
      githubUrl: "https://github.com/BhanuAmarapu/StudyStream",
      demoUrl: "https://github.com",
      badge: "Academic Management",
      icon: "book-open",
      commits: 98,
      stars: 21,
      prs: 12
    },
    {
      id: 2,
      title: "Hybrid Cloud Deduplication System with ML-Based Similarity Detection",
      subtitle: "Cloud Security & ML Project",
      desc: "Designed an intelligent hybrid cloud storage system implementing ML-assisted secure deduplication using Decision Tree prediction, SHA-256 hashing, and TF-IDF similarity detection. Integrated Convergent Narrowing Storage (CNS) with AES-256 convergent encryption to ensure unique ciphertext storage and enhanced data security. Extended content intelligence using OCR for image text extraction and Whisper-based speech-to-text processing for multi-format similarity analysis. Deployed hybrid architecture with AWS DevOps S3 integration, RBAC security, integrity auditing, and real-time monitoring dashboards for scalable enterprise-grade storage optimization.",
      tech: ["Python", "Flask", "Machine Learning (TF-IDF, Decision Trees)", "AWS DevOps S3", "Boto3", "Cryptography", "OCR", "Whisper", "SQLAlchemy"],
      githubUrl: "https://github.com/BhanuAmarapu/Cloud-Deduplication",
      demoUrl: "https://github.com",
      badge: "Enterprise Cloud Storage",
      icon: "database",
      commits: 142,
      stars: 34,
      prs: 18
    },
    {
  id: 3,
  title: "Personal Portfolio Website with Automated CI/CD Pipeline",
  subtitle: "AWS DevOps Deployment Project",
  desc: "Designed and developed a modern, responsive personal portfolio website using React.js and Vite to showcase technical skills, certifications, academic projects, and professional achievements. Containerized the application using Docker and implemented an automated Jenkins Continuous Integration pipeline triggered by GitHub Webhooks for source code checkout, dependency installation, and production builds. Deployed the application on AWS EC2 with Nginx configured as a reverse proxy to route client requests to the Docker container. Applied DevOps best practices including Git version control, containerization, automated build workflows, cloud deployment, and production server configuration to deliver a scalable and reliable web application.",
  tech: [
    "React.js",
    "Vite",
    "JavaScript (ES6+)",
    "Docker",
    "Jenkins",
    "Git",
    "GitHub",
    "GitHub Webhooks",
    "AWS EC2",
    "Nginx",
    "Linux",
    "CI/CD"
  ],
  githubUrl: "https://github.com/BhanuAmarapu/MY-PORTFOLIO",
  demoUrl: "http://54.147.24.38",
  badge: "AWS DevOps Project",
  icon: "cloud",
  commits: 85,
  stars: 12,
  prs: 6
}

  ],

  futureProjects: [
    {
      id: 1,
      title: "AWS DevOps Serverless Analytics Pipeline",
      desc: "Real-time log analytics processor running on AWS DevOps Kinesis, AWS DevOps Lambda, Amazon Athena, and visualized via Amazon QuickSight dashboards.",
      tech: ["Lambda", "Kinesis", "Athena", "S3", "QuickSight"],
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "Kubernetes GitOps Multi-Cluster Setup",
      desc: "Multi-cluster sync pipeline utilizing ArgoCD, Helm, and AWS DevOps EKS. Synchronises Kubernetes cluster states with Git source code repositories.",
      tech: ["ArgoCD", "Kubernetes", "EKS", "Helm", "GitOps"],
      difficulty: "Hard"
    },
    {
      id: 3,
      title: "Terraform Enterprise Modular Scaffold",
      desc: "Fully audited, reusable multi-environment (Dev/Stg/Prod) AWS DevOps landing zone template complying with AWS DevOps Well-Architected Framework guidelines.",
      tech: ["Terraform", "AWS DevOps", "IAM Organizations", "Transit Gateway"],
      difficulty: "Medium"
    },
    {
      id: 4,
      title: "Prometheus & Grafana SRE Observability Matrix",
      desc: "Standard telemetry monitoring stack. Employs Blackbox Exporter and Alertmanager alerts to notify SREs of EC2/EKS resource failures.",
      tech: ["Prometheus", "Grafana", "Alertmanager", "Slack Webhooks"],
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Jenkins Declarative Security DevSecOps Loop",
      desc: "CI/CD build pipeline carrying integrated automated SonarQube SAST, Trivy container image scanning, and OWASP dependency checks.",
      tech: ["Jenkins", "SonarQube", "Trivy", "OWASP", "Docker"],
      difficulty: "Hard"
    }
  ],
  resources: [
    {
      id: 1,
      category: "cloud",
      tags: "aws cloud network storage compute security s3 ec2 iam lambdas",
      title: "AWS DevOps Core Services Study Notes",
      desc: "Comprehensive reference guide covering S3 design configurations, VPC networking, security group setups, EC2 autoscaling architectures, IAM policies, and Lambda deployment guidelines."
    },
    {
      id: 2,
      category: "devops",
      tags: "linux bash command systems admin process network configuration terminal",
      title: "Linux Command & Bash Scripting Cheat Sheet",
      desc: "Practical guide detailing bash scripting techniques, permissions administration, system resource monitoring Commands, process tracking, SSH setups, and logs analysis."
    },
    {
      id: 3,
      category: "devops",
      tags: "docker containers images networking volumes orchestrations registry volumes compose",
      title: "Docker Deep Dive & Container Optimization",
      desc: "Actionable tips for crafting minimal Docker images, managing Docker volumes, setting up internal container networks, Docker Compose configurations, and security audits."
    },
    {
      id: 4,
      category: "devops",
      tags: "jenkins pipelines gitops deploy tests build automated continuous integrations",
      title: "Jenkins Declarative Pipelines Architecture",
      desc: "Blueprints for writing Jenkinsfiles, utilizing shared libraries, configuring webhooks, environment parameters, testing steps, and automated Slack/Email alerts integration."
    },
    {
      id: 5,
      category: "devops",
      tags: "devops git config systems release deploy logs metrics prometheus terraform",
      title: "Modern DevOps Best Practices & Patterns",
      desc: "Reference compilation of configuration management concepts, disaster recovery targets, continuous monitoring, and infrastructure provisioning patterns."
    },
    {
      id: 6,
      category: "programming",
      tags: "python programming algorithms Flask scripts api backend data databases",
      title: "Python for Cloud Automation & API Development",
      desc: "Guide to scripting automation scripts with boto3, constructing RESTful microservices using Flask/FastAPI, handling file inputs, and database ORM integrations."
    },
    {
      id: 7,
      category: "career",
      tags: "interview career jobs prep aws devops linux questions answers scenarios",
      title: "AWS DevOps Interview Question Bank",
      desc: "Curated catalog of scenario-based technical questions. Covers troubleshooting server issues, solving cloud downtime, scaling pipelines, and system design exercises."
    },
    {
      id: 8,
      category: "programming",
      tags: "projects practice lab server scripting local docker test mock",
      title: "Cloud-Native Mini Projects Blueprints",
      desc: "A selection of mini-labs and build tutorials designed to test cloud architectures, local Docker configuration environments, web applications, and database synchronization."
    }
  ]
};

