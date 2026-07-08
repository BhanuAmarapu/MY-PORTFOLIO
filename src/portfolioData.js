export const portfolioData = {
  personal: {
    name: "AMARAPU BHANU PRASAD",
    role: "AWS DevOps Engineer",
    subRoles: [
      "AWS DevOps Engineer",
      "GitOps & CI/CD Specialist",
      "Infrastructure Automation Engineer"
    ],
    email: "amarapubhanu7@gmail.com",
    phone: "+91 8919065413",
    location: "Parvathipuram, Andhra Pradesh, India",
    github: "https://github.com/BhanuPrasad-Amarapu",
    linkedin: "https://linkedin.com",
    resumeUrl: "Bhanu_Resume_102.pdf"
  },
  
  milestones: [
    {
      id: 1,
      tag: "Milestone 1",
      title: "AWS Infrastructure Design & Management",
      desc: "Architected and deployed highly resilient AWS network topologies using VPC, subnet zoning, routes, and security groups. Deployed scalable virtual servers (EC2) and secure object stores (S3) controlled by granular IAM access policies.",
      icon: "cloud"
    },
    {
      id: 2,
      tag: "Milestone 2",
      title: "Linux Systems & OS-Level Scripting",
      desc: "Mastered system administration inside Linux environments. Wrote clean Bash/Shell scripting patterns to automate routine platform checkups, compute metric telemetry logs, and directory backups.",
      icon: "terminal"
    },
    {
      id: 3,
      tag: "Milestone 3",
      title: "Docker Containerization & Image Engineering",
      desc: "Containerized complex microservices structures. Specialized in writing secure, highly optimized Dockerfiles utilizing multi-stage build patterns, volume mounts, and composing container networks with Docker Compose.",
      icon: "box"
    },
    {
      id: 4,
      tag: "Milestone 4",
      title: "AWS Project Engineering & Applications",
      desc: "Synthesized cloud architecture and programming. Developed Study Stream and architected the Hybrid Cloud Deduplication storage platform utilizing AWS SDK, automated S3 storage API layers, and multi-tier database instances.",
      icon: "layers"
    },
    {
      id: 5,
      tag: "Milestone 5",
      title: "AWS Automated CI/CD & GitOps Pipelines",
      desc: "Engineered robust continuous integration and delivery loops. Authoring modular declarative Jenkinsfiles, configuring automated webhook triggers, security scanning integration, and artifact repository pushes.",
      icon: "cpu"
    },
    {
      id: 6,
      tag: "Milestone 6",
      title: "Preparing AWS Solutions Architect Certification",
      desc: "Consolidating practical engineering by training for the AWS Certified Solutions Architect - Associate. Simulating disaster recovery strategies, dynamic autoscaling, and cost optimization best practices.",
      icon: "award"
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
      title: "Getting Started with AWS",
      org: "AWS Certification",
      desc: "Verified foundational competence in AWS core services, global infrastructure parameters, billing concepts, and basic cloud security mechanisms."
    },
    {
      id: 2,
      date: "Jan 2026",
      title: "AWS Solutions Architecture Job Simulation",
      org: "Forage",
      desc: "Simulated architectural evaluations, high-availability setups, computing sizing, security configurations, and AWS service selection scenarios."
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
          name: "AWS",
          tooltip: "AWS (Amazon Web Services)",
          experience: "Advanced Level • 2+ Years Experience • Certified Cloud Practitioner",
          percentage: 90,
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
          percentage: 90,
          iconClass: "devicon-git-plain colored"
        },
        {
          id: "github",
          name: "GitHub",
          tooltip: "GitHub Platform",
          experience: "Advanced Level • 3+ Years Experience • Organizations",
          percentage: 90,
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
      tech: ["Python", "Flask", "React.js", "MySQL", "JWT", "Docker", "AWS S3", "REST API", "Docker Compose"],
      githubUrl: "https://github.com/BhanuPrasad-Amarapu/StudyStream",
      demoUrl: "https://github.com"
    },
    {
      id: 2,
      title: "Hybrid Cloud Deduplication System with ML-Based Similarity Detection",
      subtitle: "Cloud Security & ML Project",
      desc: "Designed an intelligent hybrid cloud storage system implementing ML-assisted secure deduplication using Decision Tree prediction, SHA-256 hashing, and TF-IDF similarity detection. Integrated Convergent Narrowing Storage (CNS) with AES-256 convergent encryption to ensure unique ciphertext storage and enhanced data security. Extended content intelligence using OCR for image text extraction and Whisper-based speech-to-text processing for multi-format similarity analysis. Deployed hybrid architecture with AWS S3 integration, RBAC security, integrity auditing, and real-time monitoring dashboards for scalable enterprise-grade storage optimization.",
      tech: ["Python", "Flask", "Machine Learning (TF-IDF, Decision Trees)", "AWS S3", "Boto3", "Cryptography", "OCR", "Whisper", "SQLAlchemy"],
      githubUrl: "https://github.com/BhanuPrasad-Amarapu/Cloud-Deduplication",
      demoUrl: "https://github.com"
    }
  ],

  futureProjects: [
    {
      id: 1,
      title: "AWS Serverless Analytics Pipeline",
      desc: "Real-time log analytics processor running on AWS Kinesis, AWS Lambda, Amazon Athena, and visualized via Amazon QuickSight dashboards.",
      tech: ["Lambda", "Kinesis", "Athena", "S3", "QuickSight"],
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "Kubernetes GitOps Multi-Cluster Setup",
      desc: "Multi-cluster sync pipeline utilizing ArgoCD, Helm, and AWS EKS. Synchronises Kubernetes cluster states with Git source code repositories.",
      tech: ["ArgoCD", "Kubernetes", "EKS", "Helm", "GitOps"],
      difficulty: "Hard"
    },
    {
      id: 3,
      title: "Terraform Enterprise Modular Scaffold",
      desc: "Fully audited, reusable multi-environment (Dev/Stg/Prod) AWS landing zone template complying with AWS Well-Architected Framework guidelines.",
      tech: ["Terraform", "AWS", "IAM Organizations", "Transit Gateway"],
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
  ]
};
