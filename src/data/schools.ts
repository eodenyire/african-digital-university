import { Code, Brain, Landmark, Globe, Shield, Cpu, Layers, Server, Sparkles, Monitor, Database, LucideIcon } from "lucide-react";

export interface Course {
  code: string;
  title: string;
  credits: number;
  description: string;
}

export interface Semester {
  name: string;
  courses: Course[];
}

export interface Year {
  year: number;
  label: string;
  semesters: Semester[];
}

export interface SchoolData {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  color: string;
  colorClass: string;
  tagline: string;
  description: string;
  highlights: string[];
  careerPaths: string[];
  tools: string[];
  curriculum: Year[];
}

export const schoolsData: SchoolData[] = [
  {
    slug: "software-engineering",
    icon: Code,
    title: "School of Software Engineering",
    shortTitle: "Software Engineering",
    color: "hsl(145, 55%, 22%)",
    colorClass: "bg-primary",
    tagline: "Build systems that serve a billion Africans",
    description: "Our flagship program produces full-stack engineers capable of architecting, building, and deploying production-grade software. Students work on real products within the African Digital Technologies ecosystem — from AfriTube to AfriCloud — gaining experience that rivals top tech companies worldwide.",
    highlights: [
      "Project-based learning with real ecosystem products",
      "Full-stack mastery: frontend, backend, mobile & systems",
      "Industry mentorship from senior African tech leaders",
      "Earn-while-learning through bug bounties & feature dev",
    ],
    careerPaths: ["Full-Stack Developer", "Backend Engineer", "Mobile Developer", "DevOps Engineer", "Systems Architect", "Engineering Manager"],
    tools: ["React", "TypeScript", "Python", "Go", "Java", "Flutter", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Git", "Linux"],
    curriculum: [
      {
        year: 1, label: "Foundation Year",
        semesters: [
          {
            name: "Semester 1", courses: [
              { code: "SE101", title: "Introduction to Programming (Python)", credits: 4, description: "Core programming concepts, algorithms, and problem-solving using Python." },
              { code: "SE102", title: "Web Fundamentals (HTML/CSS/JS)", credits: 3, description: "Modern web development foundations including responsive design." },
              { code: "SE103", title: "Mathematics for Computing", credits: 3, description: "Discrete mathematics, logic, and foundational algebra for CS." },
              { code: "SE104", title: "Digital Literacy & Tools", credits: 2, description: "Git, terminal, IDE mastery, and collaborative development." },
              { code: "SE105", title: "Introduction to Linux & OS", credits: 3, description: "Linux command line, file systems, processes, and shell scripting." },
            ],
          },
          {
            name: "Semester 2", courses: [
              { code: "SE106", title: "Data Structures & Algorithms", credits: 4, description: "Arrays, linked lists, trees, graphs, sorting, searching, and complexity analysis." },
              { code: "SE107", title: "Object-Oriented Programming (Java)", credits: 4, description: "OOP principles, design patterns, and Java ecosystem." },
              { code: "SE108", title: "Database Fundamentals", credits: 3, description: "Relational databases, SQL, normalization, and ER modeling." },
              { code: "SE109", title: "Technical Communication", credits: 2, description: "Documentation, technical writing, and presentation skills." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Intermediate Year",
        semesters: [
          {
            name: "Semester 3", courses: [
              { code: "SE201", title: "Frontend Engineering (React/TypeScript)", credits: 4, description: "Component-based architecture, state management, and modern frontend tooling." },
              { code: "SE202", title: "Backend Development (Node.js/Python)", credits: 4, description: "RESTful APIs, authentication, middleware, and server-side patterns." },
              { code: "SE203", title: "Software Engineering Principles", credits: 3, description: "SDLC, agile methodologies, testing strategies, and code quality." },
              { code: "SE204", title: "Networking & Protocols", credits: 3, description: "TCP/IP, HTTP, DNS, and network security fundamentals." },
            ],
          },
          {
            name: "Semester 4", courses: [
              { code: "SE205", title: "Mobile Development (Flutter)", credits: 4, description: "Cross-platform mobile app development for Android and iOS." },
              { code: "SE206", title: "Advanced Databases", credits: 3, description: "NoSQL, query optimization, replication, and distributed data." },
              { code: "SE207", title: "Ecosystem Project I (AfriTube)", credits: 4, description: "Contribute features to AfriTube — Africa's video platform." },
              { code: "SE208", title: "UI/UX Design for Engineers", credits: 2, description: "Design thinking, wireframing, and user-centered design." },
            ],
          },
        ],
      },
      {
        year: 3, label: "Advanced Year",
        semesters: [
          {
            name: "Semester 5", courses: [
              { code: "SE301", title: "Systems Programming (Go/Rust)", credits: 4, description: "Low-level programming, concurrency, and high-performance systems." },
              { code: "SE302", title: "DevOps & Cloud Engineering", credits: 4, description: "CI/CD, containerization, orchestration, and AfriCloud deployment." },
              { code: "SE303", title: "Microservices Architecture", credits: 3, description: "Service design, API gateways, event-driven systems, and observability." },
              { code: "SE304", title: "Security Engineering", credits: 3, description: "Application security, OWASP, encryption, and secure coding." },
            ],
          },
          {
            name: "Semester 6", courses: [
              { code: "SE305", title: "Distributed Systems", credits: 4, description: "Consensus algorithms, CAP theorem, and large-scale system design." },
              { code: "SE306", title: "Ecosystem Capstone Project", credits: 6, description: "Design, build, and deploy a production system for the ADT ecosystem." },
              { code: "SE307", title: "Tech Leadership & Entrepreneurship", credits: 2, description: "Team leadership, product management, and African tech startups." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "ai-data-science",
    icon: Brain,
    title: "School of AI & Data Science",
    shortTitle: "AI & Data Science",
    color: "hsl(5, 70%, 45%)",
    colorClass: "bg-accent",
    tagline: "Model Africa's future with intelligent systems",
    description: "Train to build AI systems that understand African contexts — from agriculture prediction models to healthcare diagnostics. Our program emphasizes African datasets, ethical AI, and deploying ML at scale across the continent's unique infrastructure.",
    highlights: [
      "African-first datasets: agriculture, finance, health, languages",
      "Hands-on ML pipeline development & deployment",
      "Research partnerships with continental institutions",
      "NLP for 2,000+ African languages",
    ],
    careerPaths: ["ML Engineer", "Data Scientist", "AI Researcher", "Data Engineer", "NLP Specialist", "Computer Vision Engineer"],
    tools: ["Python", "TensorFlow", "PyTorch", "Pandas", "Spark", "Airflow", "Jupyter", "SQL", "Hugging Face", "MLflow", "dbt", "Kafka"],
    curriculum: [
      {
        year: 1, label: "Foundation Year",
        semesters: [
          {
            name: "Semester 1", courses: [
              { code: "AI101", title: "Python for Data Science", credits: 4, description: "Python programming with focus on data manipulation and scientific computing." },
              { code: "AI102", title: "Statistics & Probability", credits: 4, description: "Descriptive/inferential statistics, distributions, and hypothesis testing." },
              { code: "AI103", title: "Linear Algebra for AI", credits: 3, description: "Vectors, matrices, eigenvalues, and their applications in ML." },
              { code: "AI104", title: "Data Wrangling & Visualization", credits: 3, description: "Pandas, NumPy, Matplotlib, and exploratory data analysis." },
            ],
          },
          {
            name: "Semester 2", courses: [
              { code: "AI105", title: "Introduction to Machine Learning", credits: 4, description: "Supervised/unsupervised learning, model evaluation, and scikit-learn." },
              { code: "AI106", title: "Database Systems & SQL", credits: 3, description: "Relational databases, complex queries, and data modeling." },
              { code: "AI107", title: "Calculus for Machine Learning", credits: 3, description: "Multivariable calculus, optimization, and gradient descent." },
              { code: "AI108", title: "African Data Landscapes", credits: 2, description: "Understanding data availability, quality, and challenges across Africa." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Intermediate Year",
        semesters: [
          {
            name: "Semester 3", courses: [
              { code: "AI201", title: "Deep Learning Fundamentals", credits: 4, description: "Neural networks, CNNs, RNNs, and training techniques using PyTorch." },
              { code: "AI202", title: "Data Engineering", credits: 4, description: "ETL pipelines, data warehousing, Spark, and stream processing." },
              { code: "AI203", title: "Natural Language Processing", credits: 3, description: "Text processing, word embeddings, transformers, and African language models." },
              { code: "AI204", title: "Ethics in AI", credits: 2, description: "Bias, fairness, transparency, and responsible AI for African contexts." },
            ],
          },
          {
            name: "Semester 4", courses: [
              { code: "AI205", title: "Computer Vision", credits: 4, description: "Image classification, object detection, and video analysis." },
              { code: "AI206", title: "ML Operations (MLOps)", credits: 3, description: "Model deployment, monitoring, versioning, and CI/CD for ML." },
              { code: "AI207", title: "Ecosystem Project: AfriSearch AI", credits: 4, description: "Build search ranking and recommendation models for AfriSearch." },
              { code: "AI208", title: "Time Series & Forecasting", credits: 3, description: "ARIMA, Prophet, and deep learning for temporal data." },
            ],
          },
        ],
      },
      {
        year: 3, label: "Advanced Year",
        semesters: [
          {
            name: "Semester 5", courses: [
              { code: "AI301", title: "Advanced Deep Learning", credits: 4, description: "GANs, reinforcement learning, attention mechanisms, and LLMs." },
              { code: "AI302", title: "Big Data Systems", credits: 4, description: "Distributed computing, Hadoop, Spark, and real-time analytics." },
              { code: "AI303", title: "AI for Agriculture & Health", credits: 3, description: "Applied AI solutions for African agriculture and healthcare." },
              { code: "AI304", title: "Research Methods in AI", credits: 2, description: "Paper reading, experiment design, and academic writing." },
            ],
          },
          {
            name: "Semester 6", courses: [
              { code: "AI305", title: "AI Capstone Project", credits: 6, description: "End-to-end AI system solving a real African challenge." },
              { code: "AI306", title: "AI Product & Business Strategy", credits: 3, description: "Commercializing AI, product thinking, and the African AI market." },
              { code: "AI307", title: "Advanced NLP & African Languages", credits: 3, description: "Building language models for low-resource African languages." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "fintech-digital-banking",
    icon: Landmark,
    title: "School of FinTech & Digital Banking",
    shortTitle: "FinTech & Digital Banking",
    color: "hsl(40, 90%, 52%)",
    colorClass: "bg-secondary",
    tagline: "Power Africa's financial revolution",
    description: "Africa leads the world in mobile money innovation. This school trains engineers and architects to build payment systems, core banking platforms, risk models, and regulatory compliance tools that will bank the unbanked across 54 nations.",
    highlights: [
      "Build M-Pesa-scale payment systems from scratch",
      "Core banking architecture & ledger systems",
      "Risk modeling, fraud detection & GRC frameworks",
      "Regulatory technology for African financial markets",
    ],
    careerPaths: ["FinTech Engineer", "Payment Systems Architect", "Risk Analyst", "Core Banking Developer", "Blockchain Engineer", "RegTech Specialist"],
    tools: ["Java", "Python", "Kotlin", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Solidity", "ISO 8583", "SWIFT", "PCI DSS", "Kubernetes"],
    curriculum: [
      {
        year: 1, label: "Foundation Year",
        semesters: [
          {
            name: "Semester 1", courses: [
              { code: "FT101", title: "Programming for FinTech (Java)", credits: 4, description: "Java programming with emphasis on financial applications." },
              { code: "FT102", title: "Financial Mathematics", credits: 3, description: "Interest calculations, time value of money, and financial modeling." },
              { code: "FT103", title: "Introduction to Banking Systems", credits: 3, description: "Banking fundamentals, ledgers, account structures, and transaction processing." },
              { code: "FT104", title: "Database Design for Finance", credits: 3, description: "ACID transactions, audit trails, and financial data modeling." },
              { code: "FT105", title: "African Financial Landscapes", credits: 2, description: "Mobile money, microfinance, and financial inclusion across Africa." },
            ],
          },
          {
            name: "Semester 2", courses: [
              { code: "FT106", title: "Payment Systems Architecture", credits: 4, description: "Card networks, mobile money protocols, and payment processing." },
              { code: "FT107", title: "API Design for Financial Services", credits: 3, description: "RESTful APIs, webhooks, and integration patterns for banking." },
              { code: "FT108", title: "Statistics for Risk Analysis", credits: 3, description: "Probability models, distributions, and statistical inference for finance." },
              { code: "FT109", title: "Regulatory Compliance Basics", credits: 2, description: "KYC, AML, PCI DSS, and African financial regulations." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Intermediate Year",
        semesters: [
          {
            name: "Semester 3", courses: [
              { code: "FT201", title: "Core Banking Systems", credits: 4, description: "Building core banking engines: accounts, transactions, and reconciliation." },
              { code: "FT202", title: "Mobile Money Engineering", credits: 4, description: "USSD, STK push, agent networks, and mobile wallet architecture." },
              { code: "FT203", title: "Fraud Detection & Prevention", credits: 3, description: "Rule engines, ML-based fraud detection, and real-time monitoring." },
              { code: "FT204", title: "Cryptography & Security", credits: 3, description: "Encryption, digital signatures, HSMs, and secure financial communications." },
            ],
          },
          {
            name: "Semester 4", courses: [
              { code: "FT205", title: "Risk Modeling & Credit Scoring", credits: 4, description: "Credit risk models, alternative data scoring, and portfolio risk." },
              { code: "FT206", title: "Blockchain & DeFi", credits: 3, description: "Distributed ledgers, smart contracts, and decentralized finance." },
              { code: "FT207", title: "Ecosystem Project: AfriPay", credits: 4, description: "Build payment processing modules for the ADT ecosystem." },
              { code: "FT208", title: "High-Performance Transaction Systems", credits: 3, description: "Event sourcing, CQRS, and processing millions of transactions." },
            ],
          },
        ],
      },
      {
        year: 3, label: "Advanced Year",
        semesters: [
          {
            name: "Semester 5", courses: [
              { code: "FT301", title: "Enterprise Integration Patterns", credits: 4, description: "Message brokers, ESBs, and integrating diverse financial systems." },
              { code: "FT302", title: "RegTech & GRC Systems", credits: 4, description: "Governance, risk, compliance platforms, and automated reporting." },
              { code: "FT303", title: "Insurance & Lending Tech", credits: 3, description: "InsurTech, digital lending, and micro-insurance platforms." },
              { code: "FT304", title: "Financial Data Analytics", credits: 3, description: "Business intelligence, dashboards, and financial data pipelines." },
            ],
          },
          {
            name: "Semester 6", courses: [
              { code: "FT305", title: "FinTech Capstone Project", credits: 6, description: "Build a production-grade financial system for the African market." },
              { code: "FT306", title: "FinTech Business & Regulation", credits: 3, description: "Licensing, partnerships, and scaling FinTech in Africa." },
              { code: "FT307", title: "Cross-Border Payments", credits: 3, description: "FX, remittances, correspondent banking, and Pan-African payments." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "internet-systems",
    icon: Globe,
    title: "School of Internet Systems",
    shortTitle: "Internet Systems",
    color: "hsl(145, 55%, 22%)",
    colorClass: "bg-primary",
    tagline: "Build the internet Africa deserves",
    description: "Learn to build search engines, video platforms, social networks, and content delivery systems at continental scale. Students work directly on AfriTube, AfriSearch, and other ecosystem products, mastering distributed systems and internet-scale engineering.",
    highlights: [
      "Build search engines and recommendation systems",
      "Video streaming and content delivery at scale",
      "Distributed systems for 1.4 billion users",
      "Real-world contributions to AfriTube & AfriSearch",
    ],
    careerPaths: ["Platform Engineer", "Search Engineer", "Video Systems Engineer", "Infrastructure Engineer", "Site Reliability Engineer", "Performance Engineer"],
    tools: ["Go", "Rust", "Elasticsearch", "FFmpeg", "CDN", "gRPC", "Prometheus", "Grafana", "Nginx", "WebRTC", "Redis", "Cassandra"],
    curriculum: [
      {
        year: 1, label: "Foundation Year",
        semesters: [
          {
            name: "Semester 1", courses: [
              { code: "IS101", title: "Programming Fundamentals (Python & Go)", credits: 4, description: "Core programming with emphasis on performance and concurrency." },
              { code: "IS102", title: "Computer Networks", credits: 4, description: "OSI model, routing, switching, and internet protocols." },
              { code: "IS103", title: "Web Architecture", credits: 3, description: "HTTP, browsers, servers, and how the web works." },
              { code: "IS104", title: "Data Structures for Scale", credits: 3, description: "Hash tables, B-trees, bloom filters, and probabilistic structures." },
            ],
          },
          {
            name: "Semester 2", courses: [
              { code: "IS105", title: "Operating Systems", credits: 4, description: "Processes, memory, file systems, and kernel concepts." },
              { code: "IS106", title: "Database Internals", credits: 3, description: "Storage engines, indexing, query execution, and transactions." },
              { code: "IS107", title: "Frontend at Scale (React)", credits: 3, description: "Component architecture, performance optimization, and SSR." },
              { code: "IS108", title: "Internet History & African Connectivity", credits: 2, description: "Africa's internet infrastructure, submarine cables, and digital divide." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Intermediate Year",
        semesters: [
          {
            name: "Semester 3", courses: [
              { code: "IS201", title: "Search Engine Architecture", credits: 4, description: "Crawling, indexing, ranking algorithms, and query processing." },
              { code: "IS202", title: "Video Systems Engineering", credits: 4, description: "Encoding, transcoding, adaptive bitrate, and video delivery." },
              { code: "IS203", title: "Distributed Systems I", credits: 4, description: "Replication, partitioning, consistency, and consensus protocols." },
              { code: "IS204", title: "Content Delivery Networks", credits: 2, description: "Caching, edge computing, and CDN design for Africa." },
            ],
          },
          {
            name: "Semester 4", courses: [
              { code: "IS205", title: "Recommendation Systems", credits: 4, description: "Collaborative filtering, content-based, and hybrid approaches." },
              { code: "IS206", title: "Real-Time Systems (WebSocket/WebRTC)", credits: 3, description: "Live streaming, chat systems, and real-time communication." },
              { code: "IS207", title: "Ecosystem Project: AfriTube/AfriSearch", credits: 4, description: "Build features for Africa's video or search platform." },
              { code: "IS208", title: "Performance Engineering", credits: 3, description: "Profiling, benchmarking, and optimizing for low-bandwidth." },
            ],
          },
        ],
      },
      {
        year: 3, label: "Advanced Year",
        semesters: [
          {
            name: "Semester 5", courses: [
              { code: "IS301", title: "Distributed Systems II", credits: 4, description: "Advanced consensus, CRDTs, and globally distributed systems." },
              { code: "IS302", title: "Site Reliability Engineering", credits: 4, description: "SLOs, incident management, chaos engineering, and observability." },
              { code: "IS303", title: "Machine Learning for Internet Systems", credits: 3, description: "Applied ML for ranking, spam detection, and content moderation." },
              { code: "IS304", title: "API Design & Platform Engineering", credits: 3, description: "GraphQL, REST, developer experience, and platform thinking." },
            ],
          },
          {
            name: "Semester 6", courses: [
              { code: "IS305", title: "Internet Systems Capstone", credits: 6, description: "Design and build an internet-scale system for Africa." },
              { code: "IS306", title: "Platform Strategy & Growth", credits: 3, description: "Network effects, marketplace dynamics, and scaling platforms." },
              { code: "IS307", title: "Privacy & Content Policy", credits: 2, description: "Data protection, content moderation, and African digital rights." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "govtech-public-systems",
    icon: Shield,
    title: "School of GovTech & Public Systems",
    shortTitle: "GovTech & Public Systems",
    color: "hsl(5, 70%, 45%)",
    colorClass: "bg-accent",
    tagline: "Digitize governance for a billion citizens",
    description: "Africa's governments need digital transformation. This school trains engineers to build digital identity systems, tax platforms, land registries, health information systems, and smart city infrastructure that can serve entire nations.",
    highlights: [
      "Digital identity systems for national scale",
      "E-government platforms and citizen portals",
      "Health information systems and disease surveillance",
      "Smart city infrastructure and IoT integration",
    ],
    careerPaths: ["GovTech Engineer", "Systems Architect", "Digital ID Specialist", "Public Policy Technologist", "Smart City Engineer", "Health Informatics Engineer"],
    tools: ["Java", "Python", "Kotlin", "PostgreSQL", "Keycloak", "OpenID Connect", "FHIR", "GIS", "Docker", "Terraform", "Angular", "Spring Boot"],
    curriculum: [
      {
        year: 1, label: "Foundation Year",
        semesters: [
          {
            name: "Semester 1", courses: [
              { code: "GT101", title: "Programming for Public Systems (Java)", credits: 4, description: "Enterprise Java development for government-grade applications." },
              { code: "GT102", title: "Introduction to Public Administration", credits: 3, description: "Government structures, policy-making, and digital transformation." },
              { code: "GT103", title: "Database Design & Management", credits: 3, description: "Large-scale databases, data integrity, and audit systems." },
              { code: "GT104", title: "Networking & Security Fundamentals", credits: 3, description: "Network infrastructure, firewalls, and security for government systems." },
              { code: "GT105", title: "African Governance Landscape", credits: 2, description: "E-government maturity across Africa and digital readiness assessment." },
            ],
          },
          {
            name: "Semester 2", courses: [
              { code: "GT106", title: "Identity & Access Management", credits: 4, description: "Authentication, authorization, digital identity, and biometrics." },
              { code: "GT107", title: "Web Application Development", credits: 3, description: "Building citizen-facing portals and government web applications." },
              { code: "GT108", title: "Data Privacy & Protection", credits: 3, description: "GDPR, AU data protection frameworks, and privacy engineering." },
              { code: "GT109", title: "Project Management for Public Sector", credits: 2, description: "Agile in government, procurement, and stakeholder management." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Intermediate Year",
        semesters: [
          {
            name: "Semester 3", courses: [
              { code: "GT201", title: "Digital Identity Systems", credits: 4, description: "National ID systems, civil registration, and verifiable credentials." },
              { code: "GT202", title: "Tax & Revenue Systems", credits: 4, description: "Tax administration platforms, e-filing, and revenue collection." },
              { code: "GT203", title: "Health Information Systems", credits: 3, description: "FHIR, DHIS2, electronic health records, and disease surveillance." },
              { code: "GT204", title: "GIS & Spatial Systems", credits: 3, description: "Geographic information systems, land registries, and spatial data." },
            ],
          },
          {
            name: "Semester 4", courses: [
              { code: "GT205", title: "E-Procurement & Supply Chain", credits: 3, description: "Digital procurement platforms and government supply chain management." },
              { code: "GT206", title: "Smart City & IoT", credits: 4, description: "Sensors, IoT platforms, traffic management, and urban computing." },
              { code: "GT207", title: "Ecosystem Project: GovTech Module", credits: 4, description: "Build a government technology module for the ADT ecosystem." },
              { code: "GT208", title: "Interoperability Standards", credits: 3, description: "System integration, data exchange, and government API standards." },
            ],
          },
        ],
      },
      {
        year: 3, label: "Advanced Year",
        semesters: [
          {
            name: "Semester 5", courses: [
              { code: "GT301", title: "Enterprise Architecture", credits: 4, description: "TOGAF, whole-of-government architecture, and technology roadmaps." },
              { code: "GT302", title: "Cybersecurity for Government", credits: 4, description: "National cybersecurity, CERT operations, and critical infrastructure protection." },
              { code: "GT303", title: "AI in Government", credits: 3, description: "Predictive analytics, chatbots, and automated decision-making in public sector." },
              { code: "GT304", title: "Open Data & Transparency", credits: 2, description: "Open government data, transparency portals, and civic tech." },
            ],
          },
          {
            name: "Semester 6", courses: [
              { code: "GT305", title: "GovTech Capstone Project", credits: 6, description: "Design and implement a national-scale government technology system." },
              { code: "GT306", title: "Digital Policy & Strategy", credits: 3, description: "National digital strategies, ICT policy, and technology governance." },
              { code: "GT307", title: "Change Management & Adoption", credits: 2, description: "Driving technology adoption in government and public institutions." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "cloud-infrastructure",
    icon: Cpu,
    title: "School of Cloud & Infrastructure",
    shortTitle: "Cloud & Infrastructure",
    color: "hsl(40, 90%, 52%)",
    colorClass: "bg-secondary",
    tagline: "Build Africa's digital backbone",
    description: "AfriCloud is Africa's sovereign cloud platform. This school trains infrastructure engineers who understand compute, storage, networking, and security at data center scale — with a focus on building cloud infrastructure that keeps African data in Africa.",
    highlights: [
      "Data center design and operations",
      "AfriCloud platform engineering",
      "Container orchestration at continental scale",
      "Digital sovereignty and data residency",
    ],
    careerPaths: ["Cloud Engineer", "Infrastructure Architect", "Platform Engineer", "Security Engineer", "Network Engineer", "Data Center Manager"],
    tools: ["Linux", "Kubernetes", "Docker", "Terraform", "Ansible", "AWS/GCP (comparison)", "Prometheus", "Grafana", "Ceph", "OpenStack", "Nginx", "HAProxy"],
    curriculum: [
      {
        year: 1, label: "Foundation Year",
        semesters: [
          {
            name: "Semester 1", courses: [
              { code: "CI101", title: "Linux Systems Administration", credits: 4, description: "Advanced Linux, systemd, package management, and server administration." },
              { code: "CI102", title: "Networking Fundamentals", credits: 4, description: "TCP/IP, routing, switching, VLANs, and network design." },
              { code: "CI103", title: "Scripting & Automation (Bash/Python)", credits: 3, description: "Automating system tasks, configuration management, and scripting." },
              { code: "CI104", title: "Hardware & Data Center Basics", credits: 3, description: "Server hardware, storage systems, cooling, and power management." },
            ],
          },
          {
            name: "Semester 2", courses: [
              { code: "CI105", title: "Virtualization Technologies", credits: 4, description: "Hypervisors, VMs, and virtualization platforms." },
              { code: "CI106", title: "Storage Systems", credits: 3, description: "Block, file, and object storage; RAID, SAN, NAS, and Ceph." },
              { code: "CI107", title: "Security Fundamentals", credits: 3, description: "Firewalls, IDS/IPS, encryption, and security hardening." },
              { code: "CI108", title: "African Internet Infrastructure", credits: 2, description: "Submarine cables, IXPs, and internet connectivity across Africa." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Intermediate Year",
        semesters: [
          {
            name: "Semester 3", courses: [
              { code: "CI201", title: "Container Technologies (Docker)", credits: 4, description: "Containerization, image building, registries, and container networking." },
              { code: "CI202", title: "Cloud Platform Architecture", credits: 4, description: "IaaS, PaaS, SaaS design patterns, and multi-tenancy." },
              { code: "CI203", title: "Configuration Management (Ansible/Terraform)", credits: 3, description: "Infrastructure as code, provisioning, and state management." },
              { code: "CI204", title: "Monitoring & Observability", credits: 3, description: "Metrics, logs, traces, and alerting with Prometheus & Grafana." },
            ],
          },
          {
            name: "Semester 4", courses: [
              { code: "CI205", title: "Kubernetes & Orchestration", credits: 4, description: "Pod management, services, networking, and Kubernetes operations." },
              { code: "CI206", title: "CI/CD Pipeline Engineering", credits: 3, description: "Build pipelines, automated testing, and deployment strategies." },
              { code: "CI207", title: "Ecosystem Project: AfriCloud", credits: 4, description: "Build and deploy infrastructure components for AfriCloud." },
              { code: "CI208", title: "Database Administration", credits: 3, description: "PostgreSQL, MySQL administration, replication, and high availability." },
            ],
          },
        ],
      },
      {
        year: 3, label: "Advanced Year",
        semesters: [
          {
            name: "Semester 5", courses: [
              { code: "CI301", title: "Advanced Kubernetes & Service Mesh", credits: 4, description: "Operators, custom controllers, Istio, and multi-cluster management." },
              { code: "CI302", title: "Cloud Security & Compliance", credits: 4, description: "Zero trust, compliance frameworks, and cloud-native security." },
              { code: "CI303", title: "Edge Computing & CDN", credits: 3, description: "Edge infrastructure, content delivery, and low-latency computing." },
              { code: "CI304", title: "Data Center Design", credits: 3, description: "Facility design, redundancy, disaster recovery, and green computing." },
            ],
          },
          {
            name: "Semester 6", courses: [
              { code: "CI305", title: "Infrastructure Capstone Project", credits: 6, description: "Design and build a cloud infrastructure service for AfriCloud." },
              { code: "CI306", title: "Digital Sovereignty & Policy", credits: 3, description: "Data residency, sovereignty, and African cloud policy." },
              { code: "CI307", title: "Cost Optimization & FinOps", credits: 2, description: "Cloud economics, capacity planning, and financial operations." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "fullstack-development",
    icon: Layers,
    title: "School of Full Stack Development",
    shortTitle: "Full Stack Development",
    color: "hsl(220, 70%, 45%)",
    colorClass: "bg-[hsl(220,70%,45%)]",
    tagline: "Build complete products from browser to server to cloud",
    description: "A comprehensive three-year bootcamp that takes absolute beginners to production-ready full-stack engineers. Following the industry-proven roadmap from HTML and CSS through React and Node.js to DevOps on AWS, students learn to build, deploy, and operate complete web applications — exactly how modern tech companies do it.",
    highlights: [
      "Learn by building checkpoints: static sites → interactive apps → CRUD apps → complete full-stack platforms",
      "Master the complete JavaScript ecosystem: browser, server, and tooling",
      "Gain real DevOps skills: Linux, AWS, Docker, CI/CD, Terraform, and Ansible",
      "Graduate with a portfolio of deployed, production-grade applications",
    ],
    careerPaths: ["Full Stack Developer", "Frontend Engineer", "Backend Engineer", "Node.js Developer", "React Developer", "DevOps Engineer", "Cloud Engineer", "Software Engineer"],
    tools: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Redis", "Git", "GitHub", "npm", "Docker", "AWS", "Terraform", "Ansible", "GitHub Actions", "Nginx"],
    curriculum: [
      {
        year: 1, label: "Web Fundamentals & Frontend Engineering",
        semesters: [
          {
            name: "Semester 1 — Web Foundations", courses: [
              { code: "FS101", title: "HTML & the Semantic Web", credits: 4, description: "Document structure, semantic elements, forms, tables, accessibility, and the role of HTML in the browser rendering pipeline. Checkpoint: build three well-structured static webpages." },
              { code: "FS102", title: "CSS & Responsive Design", credits: 4, description: "Selectors, the box model, Flexbox, CSS Grid, media queries, animations, and CSS variables. Learn to craft pixel-perfect, mobile-first layouts." },
              { code: "FS103", title: "JavaScript Fundamentals", credits: 4, description: "Variables, data types, functions, control flow, arrays, objects, the DOM, and browser events. Write your first interactive scripts. Checkpoint: add interactivity to your static pages." },
              { code: "FS104", title: "Git, GitHub & Developer Tooling", credits: 3, description: "Version control with Git (branches, commits, merges, rebasing), remote collaboration on GitHub (pull requests, code review, issues), and VS Code productivity. Checkpoint: collaborative work on a shared repository." },
              { code: "FS105", title: "Computer Fundamentals & Problem Solving", credits: 2, description: "How computers work, binary, the internet, HTTP, and algorithmic thinking — the foundation every web developer needs." },
            ],
          },
          {
            name: "Semester 2 — Interactive Frontend & React", courses: [
              { code: "FS106", title: "Advanced JavaScript & ES6+", credits: 4, description: "Closures, prototypes, classes, Promises, async/await, the Fetch API, modules, and error handling. Deepen your understanding of the language that powers the web." },
              { code: "FS107", title: "npm & the Package Ecosystem", credits: 3, description: "npm CLI, package.json, semantic versioning, bundlers (Vite), linting (ESLint), formatting (Prettier), and managing third-party libraries. Checkpoint: integrate and configure external packages in a project." },
              { code: "FS108", title: "React Fundamentals", credits: 4, description: "Component-based architecture, JSX, props, state with hooks (useState, useEffect, useContext), React Router, and fetching data from APIs. Build reusable UI components." },
              { code: "FS109", title: "Tailwind CSS & Modern UI Design", credits: 3, description: "Utility-first CSS with Tailwind, responsive design systems, dark mode, component libraries, and design tokens. Build beautiful, consistent user interfaces rapidly." },
              { code: "FS110", title: "Checkpoint Project: Frontend Applications", credits: 3, description: "Integrate all frontend skills to build two complete, deployed single-page applications: a portfolio site and a data-driven dashboard consuming a public API." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Backend Engineering & Full-Stack Integration",
        semesters: [
          {
            name: "Semester 3 — Node.js, Databases & APIs", courses: [
              { code: "FS201", title: "Node.js & Server-Side JavaScript", credits: 4, description: "The Node.js runtime, the event loop, CommonJS and ES modules, the built-in HTTP module, file system operations, streams, and building CLI applications. Checkpoint: build command-line tools." },
              { code: "FS202", title: "PostgreSQL & Relational Databases", credits: 4, description: "Database design, SQL (SELECT, INSERT, UPDATE, DELETE, JOINs, aggregates), indexing, transactions, and using PostgreSQL from Node.js with an ORM. Checkpoint: build simple CRUD applications backed by a real database." },
              { code: "FS203", title: "Express.js & RESTful API Design", credits: 4, description: "Routing, middleware, request/response lifecycle, error handling, input validation, CORS, and REST principles. Design and implement a multi-resource JSON API following best practices." },
              { code: "FS204", title: "TypeScript for Full-Stack Developers", credits: 2, description: "Static typing, interfaces, generics, type narrowing, and how TypeScript improves code quality and developer experience on both client and server." },
              { code: "FS205", title: "Checkpoint Project: Simple CRUD Apps", credits: 3, description: "Build and deploy three backend services: a task manager API, a blog API, and a contacts API — each with full CRUD operations and a PostgreSQL database." },
            ],
          },
          {
            name: "Semester 4 — Auth, Caching & Full-Stack Applications", courses: [
              { code: "FS206", title: "JWT Authentication & Security", credits: 4, description: "Password hashing (bcrypt), JSON Web Tokens, refresh tokens, role-based access control, OAuth 2.0, session management, and the OWASP Top 10. Secure every layer of your application." },
              { code: "FS207", title: "Redis & Caching Strategies", credits: 3, description: "Redis data structures (strings, hashes, lists, sets, sorted sets), caching patterns (cache-aside, write-through), session storage, rate limiting, and background job queues." },
              { code: "FS208", title: "RESTful API Patterns & Testing", credits: 3, description: "API versioning, pagination, filtering, sorting, documentation (OpenAPI/Swagger), integration testing with Jest and Supertest, and test-driven development habits." },
              { code: "FS209", title: "Full-Stack React + Node.js Integration", credits: 4, description: "Connect a React frontend to a Node.js/Express backend: authentication flows, protected routes, state management with React Query, file uploads, and real-time updates with WebSockets." },
              { code: "FS210", title: "Checkpoint Project: Complete Full-Stack App", credits: 3, description: "Build and deploy a production-quality full-stack application (e.g., a job board, e-commerce store, or social platform) with authentication, a database, a REST API, and a React frontend." },
            ],
          },
        ],
      },
      {
        year: 3, label: "DevOps, Cloud & Production Engineering",
        semesters: [
          {
            name: "Semester 5 — Linux, AWS & Cloud Deployment", courses: [
              { code: "FS301", title: "Linux Fundamentals for Developers", credits: 4, description: "The Linux filesystem, shell scripting (Bash), process management, permissions, SSH, cron jobs, package management, and server administration. Master the environment where your code runs." },
              { code: "FS302", title: "AWS Core Services", credits: 4, description: "In-depth coverage of the AWS services every full-stack developer uses: EC2 (compute), VPC (networking & security groups), S3 (object storage & static hosting), Route 53 (DNS), and SES (email). Configure and manage a complete AWS environment." },
              { code: "FS303", title: "Docker & Containerisation", credits: 3, description: "Writing Dockerfiles, building and tagging images, Docker Compose for multi-container applications, private registries, and container networking — package your applications for consistent deployment anywhere." },
              { code: "FS304", title: "Web Servers, HTTPS & Deployment Patterns", credits: 3, description: "Nginx as a reverse proxy, SSL/TLS certificate management (Let's Encrypt), load balancing, blue-green and rolling deployments, environment variable management, and production hardening." },
              { code: "FS305", title: "Checkpoint Project: Deploy a Full-Stack App to AWS", credits: 3, description: "End-to-end deployment of your Year 2 full-stack application to AWS: Dockerised services on EC2, a managed PostgreSQL database, S3 for assets, Route 53 for DNS, HTTPS via Let's Encrypt, and Nginx as a reverse proxy." },
            ],
          },
          {
            name: "Semester 6 — CI/CD, Automation, Monitoring & Capstone", courses: [
              { code: "FS306", title: "GitHub Actions & CI/CD Pipelines", credits: 4, description: "Workflows, triggers, runners, automated testing pipelines, Docker image builds, deployments to AWS on every push, environment secrets management, and rollback strategies. Checkpoint: fully automated CI/CD pipeline." },
              { code: "FS307", title: "Ansible & Configuration Management", credits: 3, description: "Inventory management, playbooks, roles, variables, handlers, Ansible Vault for secrets, and idempotent server configuration — automate everything from OS setup to application deployment." },
              { code: "FS308", title: "Terraform & Infrastructure as Code", credits: 3, description: "HCL syntax, providers (AWS), resources, state management, modules, workspaces, and provisioning a complete cloud environment from code. Checkpoint: infrastructure as code." },
              { code: "FS309", title: "Monitoring, Alerting & Observability", credits: 3, description: "Application-level monitoring with Monit, structured logging, uptime monitoring, alerting on failures, and an introduction to Prometheus and Grafana for metrics dashboards." },
              { code: "FS310", title: "Full-Stack Development Capstone", credits: 6, description: "Design, build, deploy, and operate a production-grade full-stack platform that solves a real African problem. The capstone must include: a React frontend, a Node.js API, PostgreSQL + Redis, full authentication, automated CI/CD via GitHub Actions, infrastructure provisioned with Terraform, and live monitoring. Presented to an industry panel." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "backend-development",
    icon: Server,
    title: "School of Backend Development",
    shortTitle: "Backend Development",
    color: "hsl(260, 60%, 45%)",
    colorClass: "bg-[hsl(260,60%,45%)]",
    tagline: "Power the logic, data, and scale behind every great product",
    description: "A rigorous three-year bootcamp following the roadmap.sh backend developer roadmap. Students master the complete backend stack — from internet fundamentals and server-side languages through APIs, security, databases, and containers — all the way to distributed systems, message brokers, and production-scale architecture. Graduate ready to build and operate any backend system in the world.",
    highlights: [
      "Internet & protocol foundations before writing a single server",
      "Language-agnostic principles taught through Node.js, Go, and Python",
      "Full database mastery: relational, NoSQL, caching, and scaling strategies",
      "Production-grade security, observability, and architecture patterns",
    ],
    careerPaths: ["Backend Engineer", "API Engineer", "Database Engineer", "Node.js Developer", "Go Developer", "Platform Engineer", "Site Reliability Engineer", "Software Architect"],
    tools: ["Node.js", "Go", "Python", "PostgreSQL", "MySQL", "Redis", "MongoDB", "Docker", "Kubernetes", "Nginx", "Kafka", "RabbitMQ", "Elasticsearch", "Git", "GitHub Actions", "GraphQL", "gRPC"],
    curriculum: [
      {
        year: 1, label: "Backend Foundations",
        semesters: [
          {
            name: "Semester 1 — Internet, Languages & Version Control", courses: [
              { code: "BD101", title: "How the Internet Works", credits: 3, description: "How the internet works end-to-end: HTTP/HTTPS request-response lifecycle, DNS resolution, domain names, hosting, browsers, IP addressing, TCP/IP, and SSL/TLS. Build a mental model of every layer your code touches." },
              { code: "BD102", title: "Pick a Language: Node.js (JavaScript)", credits: 4, description: "The Node.js runtime as a primary backend language: event loop, modules, the built-in HTTP module, streams, buffers, async/await, and the ecosystem. Students also survey Go and Python so they can pick any language confidently." },
              { code: "BD103", title: "Git & Version Control Systems", credits: 3, description: "Git internals, branching strategies, rebasing, merging, conflict resolution, tagging, and stash. Repo hosting services: GitHub, GitLab, and Bitbucket — pull requests, code reviews, and team workflows." },
              { code: "BD104", title: "Relational Databases & SQL", credits: 4, description: "Relational model, database design, and SQL mastery: SELECT, JOINs, aggregates, subqueries, window functions, transactions, and constraints. Primary databases: PostgreSQL and MySQL; awareness of MariaDB, MS SQL, Oracle, and SQLite." },
              { code: "BD105", title: "Operating Systems & Terminal Basics", credits: 2, description: "Linux command line, file permissions, processes, signals, environment variables, package managers, and shell scripting — the daily environment of every backend engineer." },
            ],
          },
          {
            name: "Semester 2 — APIs, Authentication & Caching", courses: [
              { code: "BD106", title: "Designing & Building RESTful APIs", credits: 4, description: "REST principles, resource design, HTTP verbs, status codes, pagination, filtering, versioning, HATEOAS, Open API Specification (Swagger), and JSON APIs. Build a fully documented, standards-compliant REST API from scratch." },
              { code: "BD107", title: "API Authentication & Authorization", credits: 4, description: "Every mainstream auth approach: JWT (JSON Web Tokens), OAuth 2.0 flows, Basic Authentication, Token Authentication, Cookie-Based Auth, OpenID Connect, and SAML. Implement each pattern and understand when to choose one over another." },
              { code: "BD108", title: "Caching Strategies", credits: 3, description: "Why caching exists and how to use it: Redis and Memcached as key-value stores, server-side caching with in-memory stores and databases, CDN caching, client-side caching, cache invalidation strategies, and TTL management." },
              { code: "BD109", title: "Web Security Fundamentals", credits: 3, description: "Hashing algorithms (MD5, SHA, scrypt, bcrypt) and when to use each. HTTPS, SSL/TLS certificates, CORS, CSP, server security hardening, OWASP Top 10 risks, and API security best practices." },
              { code: "BD110", title: "Checkpoint Project: Secure REST API", credits: 3, description: "Build and deploy a fully authenticated REST API with JWT, bcrypt password hashing, HTTPS, rate limiting, input validation, and OpenAPI documentation — a production-ready backend service." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Intermediate Backend & Systems Thinking",
        semesters: [
          {
            name: "Semester 3 — Testing, CI/CD & Advanced Databases", courses: [
              { code: "BD201", title: "Testing Backend Systems", credits: 3, description: "Unit testing, integration testing, and functional testing for backend services. Test frameworks (Jest, Vitest, pytest, Go test), test doubles (mocks, stubs, spies), test coverage, and writing tests that actually catch bugs." },
              { code: "BD202", title: "CI/CD for Backend Engineers", credits: 3, description: "Continuous integration and deployment pipelines: GitHub Actions workflows, automated test runs, build artefacts, containerised builds, deployment to cloud environments, environment management, and rollback strategies." },
              { code: "BD203", title: "ORMs & Advanced Database Patterns", credits: 4, description: "ORMs (Prisma, TypeORM, SQLAlchemy, GORM): model definitions, migrations, relationships, and query building. ACID properties, transaction isolation levels, the N+1 query problem, database normalization, and failure modes." },
              { code: "BD204", title: "Scaling Relational Databases", credits: 4, description: "Database indexes (B-tree, hash, partial, composite), query optimization and EXPLAIN ANALYZE, read replicas and data replication, horizontal sharding strategies, the CAP theorem, and profiling performance bottlenecks." },
              { code: "BD205", title: "gRPC & GraphQL APIs", credits: 3, description: "Beyond REST: gRPC (Protocol Buffers, service definitions, streaming), SOAP basics, and GraphQL (schema-first design, resolvers, mutations, subscriptions, DataLoader for N+1 prevention). Choose the right API style for the job." },
            ],
          },
          {
            name: "Semester 4 — Containers, Architecture & Design Principles", courses: [
              { code: "BD206", title: "Containerisation & Virtualisation", credits: 4, description: "Docker in depth: Dockerfiles, multi-stage builds, Docker Compose, container networking, volumes, and registries. LXC containers and the difference between containerisation and virtualisation. Deploy a multi-service application with Docker Compose." },
              { code: "BD207", title: "Kubernetes & Container Orchestration", credits: 3, description: "Kubernetes architecture, Pods, Deployments, Services, ConfigMaps, Secrets, Ingress, Persistent Volumes, Helm charts, rolling updates, and health checks. Operate production workloads on a Kubernetes cluster." },
              { code: "BD208", title: "Software Design & Architectural Patterns", credits: 4, description: "Architectural patterns in depth: Monolithic Apps, Microservices, SOA, Serverless, Service Mesh, and the Twelve-Factor App methodology. Choose the right architecture for a given problem and understand trade-offs." },
              { code: "BD209", title: "Design & Development Principles", credits: 3, description: "GOF Design Patterns (creational, structural, behavioural), Domain-Driven Design (bounded contexts, aggregates, ubiquitous language), Test-Driven Development, CQRS, and Event Sourcing." },
              { code: "BD210", title: "Checkpoint Project: Microservices Platform", credits: 4, description: "Decompose a monolith into independently deployable microservices: separate services communicate via REST and gRPC, containerised with Docker, orchestrated with Kubernetes, with a CI/CD pipeline and comprehensive test suite." },
            ],
          },
        ],
      },
      {
        year: 3, label: "Advanced Backend, Scale & Production Systems",
        semesters: [
          {
            name: "Semester 5 — NoSQL, Real-Time Data & Messaging", courses: [
              { code: "BD301", title: "NoSQL Databases", credits: 4, description: "The full NoSQL landscape: Document databases (MongoDB, CouchDB), Key-Value stores (Redis, DynamoDB), Realtime databases (Firebase, RethinkDB), Time-Series databases (InfluxDB, TimescaleDB), Column-family databases (Cassandra, HBase), and Graph databases (Neo4j, AWS Neptune). Choose the right database for each workload." },
              { code: "BD302", title: "Message Brokers & Event-Driven Architecture", credits: 4, description: "Asynchronous messaging with RabbitMQ (exchanges, queues, routing) and Apache Kafka (topics, partitions, consumer groups, exactly-once delivery). Event-driven architecture patterns, outbox pattern, and saga orchestration for distributed transactions." },
              { code: "BD303", title: "Real-Time Data & Web Communication", credits: 3, description: "WebSockets (full-duplex communication), Server-Sent Events (SSE), Long Polling, Short Polling, and GraphQL subscriptions. Build real-time features: live dashboards, chat, notifications, and collaborative editing." },
              { code: "BD304", title: "Search Engines & Full-Text Search", credits: 3, description: "Elasticsearch: indexing, mappings, full-text search, relevance scoring, aggregations, and Kibana for visualisation. Apache Solr as an alternative. Integrate production-quality search into a backend service." },
              { code: "BD305", title: "Web Servers & Reverse Proxies", credits: 2, description: "Nginx, Apache, Caddy, and MS IIS: static file serving, reverse proxying, load balancing, SSL termination, HTTP/2, rate limiting, and caching headers. Configure a production-hardened Nginx setup." },
            ],
          },
          {
            name: "Semester 6 — Building for Scale, Observability & Capstone", courses: [
              { code: "BD306", title: "Building for Scale", credits: 4, description: "Mitigation strategies (Graceful Degradation, Throttling, Backpressure, Loadshifting, Circuit Breaker), horizontal vs vertical scaling, database migration strategies, blue-green and canary deployments, and capacity planning for continental-scale traffic." },
              { code: "BD307", title: "Observability, Monitoring & Telemetry", credits: 3, description: "The three pillars of observability: metrics, logs, and traces. Instrumentation with OpenTelemetry, Prometheus for metrics collection, Grafana for dashboards, structured logging, distributed tracing (Jaeger), and building alerts that reduce toil." },
              { code: "BD308", title: "Basic Infrastructure Knowledge & DevOps", credits: 3, description: "Core infrastructure concepts every backend engineer needs: servers, networking (VPC, subnets, security groups), object storage (S3), managed databases, IAM, and an introduction to Terraform for infrastructure-as-code. Cross-references the DevOps roadmap." },
              { code: "BD309", title: "Backend Security & Performance Hardening", credits: 2, description: "Profiling and performance optimisation: CPU and memory profiling, query analysis, connection pooling, caching audit, and database migrations with zero downtime. Penetration testing basics and dependency vulnerability management." },
              { code: "BD310", title: "Backend Development Capstone", credits: 6, description: "Design, build, deploy, and operate a production-grade backend platform that solves a real African challenge. Requirements: polyglot persistence (relational + NoSQL + cache), asynchronous processing via Kafka or RabbitMQ, real-time capability via WebSockets, Kubernetes deployment, full observability (metrics + logs + traces), automated CI/CD, and infrastructure as code. Defended before an industry panel." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "ai-engineering",
    icon: Sparkles,
    title: "School of AI Engineering",
    shortTitle: "AI Engineering",
    color: "hsl(280, 65%, 50%)",
    colorClass: "bg-[hsl(280,65%,50%)]",
    tagline: "Build the systems that think, reason, and act at scale",
    description: "A comprehensive three-year bootcamp following the roadmap.sh AI Engineer roadmap. Students move from programming prerequisites and mathematics through Python, working with data, machine learning, and deep learning, into the modern AI stack: large language models, prompt engineering, RAG pipelines, vector databases, AI agents, the Model Context Protocol, multimodal AI, and responsible AI safety. Graduate ready to design and ship production AI systems that solve real African problems.",
    highlights: [
      "Mathematics and Python fundamentals before touching any model",
      "Full ML stack: supervised, unsupervised, reinforcement, and deep learning",
      "Modern LLM stack: embeddings, vector search, RAG, LangChain, LlamaIndex",
      "AI Agents, MCP servers, multimodal AI, and production safety practices",
    ],
    careerPaths: ["AI Engineer", "ML Engineer", "LLM Engineer", "AI Researcher", "Data Scientist", "Prompt Engineer", "AI Safety Engineer", "AI Product Engineer"],
    tools: ["Python", "NumPy", "Pandas", "scikit-learn", "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LlamaIndex", "OpenAI API", "Pinecone", "Weaviate", "PostgreSQL (pgvector)", "Docker", "FastAPI", "Jupyter", "MLflow", "Weights & Biases"],
    curriculum: [
      {
        year: 1, label: "AI Foundations",
        semesters: [
          {
            name: "Semester 1 — Prerequisites: Programming, Mathematics & Python", courses: [
              { code: "AI101", title: "Programming Fundamentals for AI", credits: 3, description: "Core programming concepts every AI engineer needs: variables, data types, control flow, functions, recursion, data structures (lists, dicts, sets, queues), object-oriented programming, and complexity analysis — implemented in Python." },
              { code: "AI102", title: "Mathematics for AI — Linear Algebra & Calculus", credits: 4, description: "Linear algebra at the pace of an engineer: vectors, matrices, matrix multiplication, eigenvalues, eigenvectors, SVD, and geometric intuition. Calculus: derivatives, gradients, the chain rule, and partial derivatives — the engine behind backpropagation." },
              { code: "AI103", title: "Mathematics for AI — Probability & Statistics", credits: 4, description: "Probability theory: events, Bayes' theorem, conditional probability, distributions (normal, Bernoulli, Poisson, softmax), expectations, and variance. Statistics: hypothesis testing, confidence intervals, MLE/MAP estimation, and information theory (entropy, KL divergence)." },
              { code: "AI104", title: "Python for AI Engineering", credits: 3, description: "Python as the primary language of AI: NumPy for numerical computing, Pandas for tabular data manipulation, Matplotlib and Seaborn for visualisation, Jupyter notebooks for exploration, and virtual environments with pip/conda for reproducible AI projects." },
              { code: "AI105", title: "Working with Data", credits: 3, description: "The complete data pipeline: data collection strategies, web scraping, API data ingestion, data cleaning and imputation, feature engineering (encoding, scaling, binning), handling class imbalance, train/val/test splits, and building reproducible data pipelines with Python." },
            ],
          },
          {
            name: "Semester 2 — Classical Machine Learning", courses: [
              { code: "AI106", title: "Supervised Learning Algorithms", credits: 4, description: "The core supervised learning toolkit: linear and logistic regression, decision trees, random forests, gradient boosting (XGBoost, LightGBM), SVMs, k-Nearest Neighbours, naïve Bayes, and ensemble methods. Evaluation: accuracy, precision, recall, F1, ROC-AUC, and confusion matrices." },
              { code: "AI107", title: "Unsupervised Learning & Dimensionality Reduction", credits: 3, description: "Clustering algorithms (K-Means, DBSCAN, hierarchical), dimensionality reduction (PCA, t-SNE, UMAP), anomaly detection, and association rule mining. Apply to African agricultural, health, and financial datasets." },
              { code: "AI108", title: "Model Training, Evaluation & MLOps Basics", credits: 3, description: "The ML project lifecycle: cross-validation, hyperparameter tuning (grid search, Bayesian optimisation), regularisation, bias-variance trade-off, model versioning with MLflow, and packaging models for deployment with FastAPI." },
              { code: "AI109", title: "Reinforcement Learning Fundamentals", credits: 3, description: "Markov Decision Processes, the Bellman equation, Q-learning, deep Q-networks (DQN), policy gradient methods (REINFORCE, PPO), and multi-armed bandits. Apply RL to optimisation problems relevant to logistics and resource allocation in Africa." },
              { code: "AI110", title: "Checkpoint Project: ML Pipeline for an African Dataset", credits: 3, description: "Build an end-to-end machine learning pipeline: data ingestion → feature engineering → model training → evaluation → serving via a REST API. Use a real African dataset (crop yield prediction, credit scoring, or disease detection)." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Deep Learning & the Modern LLM Stack",
        semesters: [
          {
            name: "Semester 3 — Neural Networks & Deep Learning", courses: [
              { code: "AI201", title: "Neural Networks & Backpropagation", credits: 4, description: "How neural networks work from first principles: perceptrons, activation functions (ReLU, sigmoid, tanh, GELU), forward pass, loss functions (cross-entropy, MSE), backpropagation, and stochastic gradient descent variants (Adam, RMSProp, AdaGrad). Implement a network from scratch in NumPy." },
              { code: "AI202", title: "Convolutional Neural Networks (CNNs)", credits: 3, description: "Convolutional layers, pooling, batch normalisation, dropout, and residual connections. Architectures: LeNet, AlexNet, VGG, ResNet, and EfficientNet. Transfer learning with pre-trained vision models for African-context image classification tasks." },
              { code: "AI203", title: "Recurrent Networks, Attention & Transformers", credits: 4, description: "Sequential modelling: RNNs, LSTMs, GRUs, and their vanishing-gradient problem. Attention mechanisms, self-attention, multi-head attention, and positional encoding. The Transformer architecture in full — the foundation of every modern LLM." },
              { code: "AI204", title: "PyTorch & Deep Learning Frameworks", credits: 3, description: "PyTorch in depth: tensors, autograd, nn.Module, DataLoader, custom training loops, learning rate schedulers, mixed-precision training, GPU utilisation, and the Hugging Face ecosystem (transformers, datasets, tokenizers)." },
              { code: "AI205", title: "Generative Models", credits: 3, description: "Generative AI beyond transformers: Variational Autoencoders (VAEs), Generative Adversarial Networks (GANs), diffusion models (DDPM, Stable Diffusion), and normalising flows. Understand how image generation, style transfer, and data augmentation work under the hood." },
            ],
          },
          {
            name: "Semester 4 — Large Language Models, RAG & Vector Search", courses: [
              { code: "AI206", title: "Working with Large Language Models", credits: 4, description: "The modern LLM landscape: GPT-4 / GPT-4o, Claude, Gemini, Llama, Mistral, Falcon, and open-source models. The OpenAI API, Anthropic API, and Hugging Face Inference: text generation, structured output, function calling, streaming, and token management. Cost optimisation strategies." },
              { code: "AI207", title: "Prompt Engineering", credits: 3, description: "The craft of prompting: zero-shot and few-shot prompting, chain-of-thought, tree-of-thought, self-consistency, ReAct, structured output prompting, prompt chaining, and system prompt design. Evaluate prompt quality systematically with LLM-as-a-judge frameworks." },
              { code: "AI208", title: "Embeddings & Vector Databases", credits: 3, description: "Text, image, and multimodal embeddings: how they work, dimensionality, and similarity metrics (cosine, dot product, Euclidean). Vector databases in depth: Pinecone, Weaviate, Qdrant, Chroma, and pgvector. Indexing strategies (HNSW, IVF) and approximate nearest-neighbour search." },
              { code: "AI209", title: "Retrieval-Augmented Generation (RAG)", credits: 4, description: "The complete RAG stack: document ingestion, chunking strategies, embedding generation, retrieval pipelines, context stuffing, and answer synthesis. Frameworks: LangChain, LlamaIndex, Haystack, and RAGFlow. Advanced RAG: hybrid search, re-ranking, query rewriting, and agentic RAG evaluation with RAGAS." },
              { code: "AI210", title: "Fine-Tuning & Alignment", credits: 3, description: "Fine-tuning LLMs on domain-specific African data: supervised fine-tuning (SFT), parameter-efficient methods (LoRA, QLoRA, adapters), RLHF, and direct preference optimisation (DPO). Use Hugging Face TRL and Axolotl. Deployment on Ollama and vLLM." },
            ],
          },
        ],
      },
      {
        year: 3, label: "AI Agents, Safety, Multimodal & Production Systems",
        semesters: [
          {
            name: "Semester 5 — AI Agents, MCP & Multimodal AI", courses: [
              { code: "AI301", title: "Building AI Agents", credits: 4, description: "AI agent architectures from first principles: the ReAct loop (reasoning + acting), tool use, memory (in-context, external, episodic), planning, and reflection. Manual implementation, then with frameworks: OpenAI AgentKit & Agent SDK, Claude Agent SDK, Vertex AI Agent Builder, and Google ADK. Multi-agent systems: orchestrators, subagents, critic agents, and swarms." },
              { code: "AI302", title: "Model Context Protocol (MCP)", credits: 3, description: "MCP in depth: the MCP architecture (Host, Client, Server, Data Layer, Transport Layer), building an MCP Server that exposes tools and resources, building an MCP Client, connecting to local and remote MCP servers, and integrating MCP into AI applications to give agents structured access to data and APIs." },
              { code: "AI303", title: "Multimodal AI", credits: 4, description: "Vision-language models (VLMs): image understanding and generation (OpenAI Vision API, DALL-E, Stable Diffusion), video understanding, audio processing, text-to-speech (TTS), speech-to-text (STT / Whisper API), Hugging Face multimodal pipelines, LangChain and LlamaIndex for multimodal apps, and implementing multimodal AI products end-to-end." },
              { code: "AI304", title: "AI Safety and Ethics", credits: 3, description: "Responsible AI from an engineering perspective: prompt injection attacks and defences, jailbreaking, security and privacy concerns, bias and fairness auditing, content moderation APIs, adding end-user IDs in prompts, adversarial testing, robust prompt engineering, output and input constraining, and AI safety best practices for products serving African communities." },
              { code: "AI305", title: "AI Development Tools & Vibe Coding", credits: 2, description: "The modern AI-assisted engineering workflow: Claude Code, Gemini, Codex, Cursor, Windsurf, and Replit. Agentic coding workflows (vibe coding), AI-assisted code review, test generation, and documentation. Balance productivity gains with engineering rigour and code quality." },
            ],
          },
          {
            name: "Semester 6 — Production AI, MLOps & Capstone", courses: [
              { code: "AI306", title: "Serving & Deploying AI Systems", credits: 3, description: "Production LLM serving: vLLM, Ollama, TGI (Text Generation Inference), and Triton Inference Server. API design for AI services with FastAPI and LangServe, containerisation with Docker, orchestration with Kubernetes, scaling GPU workloads, and latency/cost optimisation strategies." },
              { code: "AI307", title: "MLOps & AI Observability", credits: 3, description: "The full MLOps lifecycle: experiment tracking (MLflow, Weights & Biases), model registries, CI/CD for ML (GitHub Actions), data versioning (DVC), A/B testing models in production, monitoring model drift, structured logging for AI systems, and LLM observability with LangSmith and Phoenix Arize." },
              { code: "AI308", title: "AI for African Applications", credits: 3, description: "Applied AI for African-context problems: agricultural yield prediction, credit scoring for the unbanked, disease diagnosis in low-resource settings, multilingual NLP for African languages (Swahili, Amharic, Yoruba, Zulu), geospatial AI, and building AI-powered mobile-first applications for low-bandwidth environments." },
              { code: "AI309", title: "AI System Security & Governance", credits: 2, description: "End-to-end security for AI systems: model extraction attacks, data poisoning, membership inference, differential privacy, federated learning, AI governance frameworks, regulatory landscape in Africa, and building AI products that are explainable and auditable." },
              { code: "AI310", title: "AI Engineering Capstone", credits: 6, description: "Design, build, deploy, and operate a production-grade AI system that solves a real and measurable African problem. Requirements: an LLM-powered backend (RAG or fine-tuned model), at least one AI agent with tool use, multimodal capability, vector search, full MLOps pipeline, AI safety measures, containerised deployment, and an observability dashboard. Presented and defended before an industry panel including African AI researchers and practitioners." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "frontend-development",
    icon: Monitor,
    title: "School of Frontend Development",
    shortTitle: "Frontend Development",
    color: "hsl(200, 70%, 45%)",
    colorClass: "bg-[hsl(200,70%,45%)]",
    tagline: "Build the interfaces that a billion Africans will use every day",
    description: "A comprehensive three-year bootcamp following the roadmap.sh Frontend Developer roadmap. Students progress from how the internet works and web fundamentals through HTML, CSS, and JavaScript, into version control, modern frameworks (React, Vue, Angular, Svelte), TypeScript, module bundlers, linters, testing, web security, SSR/SSG, performance optimisation, GraphQL, Web Components, accessibility, PWAs, desktop apps, and mobile apps with React Native and Flutter. AI-assisted coding tools and agents are woven throughout so graduates are ready to work in modern AI-augmented engineering teams.",
    highlights: [
      "Internet, HTTP, DNS, and browser internals before writing a single line of UI code",
      "Full HTML/CSS/JavaScript foundation then React, Vue.js, Angular, Svelte, and Solid JS",
      "TypeScript, module bundlers (Vite, SWC, esbuild), linters (ESLint, Biome, Prettier), and testing (Vitest, Playwright, Cypress)",
      "SSR, SSG, PWAs, performance, accessibility, GraphQL, Web Components, desktop (Electron/Tauri) & mobile (React Native/Flutter)",
    ],
    careerPaths: ["Frontend Engineer", "React Developer", "Vue Developer", "UI Engineer", "Web Performance Engineer", "Accessibility Engineer", "Mobile Developer (React Native)", "Desktop App Developer"],
    tools: ["HTML5", "CSS3", "JavaScript (ES2024)", "TypeScript", "React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte", "Solid JS", "Tailwind CSS", "Vite", "SWC", "esbuild", "ESLint", "Biome", "Prettier", "Vitest", "Playwright", "Cypress", "Jest", "GraphQL", "Apollo", "Electron", "Tauri", "React Native", "Flutter", "Git", "GitHub", "Vercel", "Netlify", "Cloudflare Pages"],
    curriculum: [
      {
        year: 1, label: "Web Foundations",
        semesters: [
          {
            name: "Semester 1 — Internet, HTML, CSS & JavaScript", courses: [
              { code: "FE101", title: "How the Internet Works", credits: 3, description: "The complete network layer every frontend developer must understand: how the internet works, HTTP/HTTPS and the request-response cycle, DNS and domain names, what is hosting, how browsers parse and render pages, and an introduction to web security fundamentals (CORS, CSP, OWASP). Applied to understanding African internet infrastructure." },
              { code: "FE102", title: "HTML — Structure & Semantics", credits: 3, description: "HTML from first principles: semantic elements (header, nav, main, article, section, aside, footer), forms and input types, tables, media (img, video, audio, picture), accessibility attributes (ARIA roles, alt text, lang), meta tags, SEO fundamentals, and the Document Object Model (DOM). Build at least five fully accessible HTML-only pages." },
              { code: "FE103", title: "CSS — Styling, Layout & Responsive Design", credits: 4, description: "The complete CSS toolkit: the cascade, specificity, inheritance, box model, Flexbox, CSS Grid, responsive design with media queries, custom properties (CSS variables), animations and transitions, pseudo-classes and pseudo-elements, and CSS nesting. Introduction to Tailwind CSS for utility-first styling. Students build a fully responsive multi-page site." },
              { code: "FE104", title: "JavaScript — Fundamentals", credits: 4, description: "JavaScript from the ground up: variables (let/const/var), data types, operators, control flow, functions (declarations, expressions, arrow), arrays, objects, destructuring, spread/rest, template literals, error handling (try/catch), and the event loop. DOM manipulation: querySelector, addEventListener, creating and removing elements, form validation, and local storage." },
              { code: "FE105", title: "Version Control with Git & GitHub", credits: 3, description: "Git for frontend developers: initialising repos, staging, committing, branching, merging, rebasing, resolving conflicts, .gitignore, and writing clear commit messages. GitHub: forks, pull requests, code reviews, GitHub Actions basics, and deploying a static site to GitHub Pages. GitLab as an alternative. Collaborative workflow on a team project." },
            ],
          },
          {
            name: "Semester 2 — JavaScript Depth, Package Managers & CSS Frameworks", courses: [
              { code: "FE106", title: "JavaScript — Advanced & Modern ES2024", credits: 4, description: "Advanced JavaScript: closures, prototypes, the prototype chain, classes, modules (import/export), async programming (callbacks → Promises → async/await), fetch API, the Event Loop in depth, iterators and generators, Proxy and Reflect, WeakMap/WeakSet, optional chaining, nullish coalescing, and logical assignment operators. Introduction to TypeScript basic types." },
              { code: "FE107", title: "Package Managers & the Node.js Ecosystem", credits: 3, description: "The JavaScript packaging ecosystem: npm, yarn, pnpm, and Bun — their differences, trade-offs, and workflows. package.json anatomy, semver, lock files, monorepo management with workspaces, publishing packages, running scripts, and npx. Using Node.js as a development tool (not a server) for running build scripts and formatters." },
              { code: "FE108", title: "Tailwind CSS & CSS Frameworks In-depth", credits: 3, description: "CSS frameworks for modern frontend: Tailwind CSS in depth (configuration, custom themes, component extraction with @apply, JIT mode, dark mode, responsive variants), comparison with Bootstrap and DaisyUI. Building a complete design system in Tailwind. Introduction to CSS Modules and styled-components as alternative approaches." },
              { code: "FE109", title: "AI-Assisted Coding for Frontend", credits: 3, description: "The modern AI-augmented frontend workflow: Claude Code, Cursor, GitHub Copilot, and Antigravity. How LLMs work at a conceptual level, AI vs traditional coding trade-offs, practical applications (code generation, code review, refactoring, documentation generation, test generation). Prompt engineering basics for coding tasks. Vibe coding workflows — when to trust AI and when to verify." },
              { code: "FE110", title: "Checkpoint Project: Responsive Web Application", credits: 3, description: "Build a complete responsive web application using vanilla HTML, CSS (Tailwind), and JavaScript. Requirements: semantic HTML, full mobile responsiveness, accessible (WCAG 2.1 AA), form validation, local storage persistence, dark mode toggle, and deployment to Vercel or Netlify. Reviewed by peers and instructors." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Modern Frameworks, TypeScript & Advanced Patterns",
        semesters: [
          {
            name: "Semester 3 — React & the Component Model", courses: [
              { code: "FE201", title: "React — Core Concepts", credits: 4, description: "React from first principles: JSX, function components, props, state with useState, effects with useEffect, conditional rendering, list rendering with keys, event handling, controlled vs uncontrolled forms, and lifting state up. Component composition, children, and render props. React Developer Tools. Introduction to the React ecosystem (Create React App vs Vite)." },
              { code: "FE202", title: "React — Hooks, Context & State Management", credits: 4, description: "The full React Hooks API: useCallback, useMemo, useRef, useReducer, useContext, useId, useTransition, useDeferredValue, and custom hooks. Context API for global state. External state management: Zustand, Jotai, and Redux Toolkit. Data fetching patterns: TanStack Query (React Query) for server state management." },
              { code: "FE203", title: "Next.js — Full-Stack React", credits: 4, description: "Next.js App Router in depth: file-based routing, layouts, loading/error boundaries, server components vs client components, server actions, metadata API, image optimisation, font optimisation, internationalization, and middleware. API routes. Deployment to Vercel. Introduction to React Router and TanStack Start as alternatives." },
              { code: "FE204", title: "TypeScript for Frontend Engineers", credits: 3, description: "TypeScript from the ground up: primitive types, arrays, tuples, enums, interfaces, type aliases, union and intersection types, generics, utility types (Partial, Required, Pick, Omit, Record), type narrowing, discriminated unions, mapped types, template literal types, and declaration files. TypeScript in React: typing props, events, hooks, and context." },
              { code: "FE205", title: "Vue.js & Nuxt.js", credits: 3, description: "Vue.js 3 Composition API: reactivity (ref, reactive, computed, watch, watchEffect), components, props, emits, slots, provide/inject, Pinia for state management, Vue Router, and the Vue ecosystem. Nuxt.js for SSR and SSG with Vue. Comparison with React to understand framework trade-offs." },
            ],
          },
          {
            name: "Semester 4 — Module Bundlers, Testing, Web Security & Auth", courses: [
              { code: "FE206", title: "Module Bundlers & Build Tools", credits: 3, description: "The modern JavaScript build pipeline: Vite (config, plugins, HMR, build optimisation), SWC (Rust-based transpiler), esbuild (Go-based bundler), Rollup, Rolldown, and Parcel. Concepts: code splitting, tree shaking, lazy loading, chunk optimisation, source maps, and environment variables. Configuring build tools for production React and Vue apps." },
              { code: "FE207", title: "Linters, Formatters & Code Quality", credits: 2, description: "Automated code quality for frontend: ESLint (rules, plugins, shareable configs, custom rules), Biome (the Rust-based all-in-one linter + formatter), and Prettier. Editor integration (VS Code), pre-commit hooks with Husky and lint-staged, enforcing conventions in CI/CD pipelines, and TypeScript-aware linting with typescript-eslint." },
              { code: "FE208", title: "Frontend Testing", credits: 4, description: "The complete frontend testing pyramid: unit tests with Vitest (fast, Vite-native), component testing with React Testing Library, integration testing, end-to-end testing with Playwright (the modern standard) and Cypress, and snapshot testing with Jest. Test-driven development (TDD) for frontend, code coverage, mocking API calls with MSW (Mock Service Worker), and visual regression testing." },
              { code: "FE209", title: "Web Security & Authentication", credits: 3, description: "Security every frontend engineer must know: CORS configuration, HTTPS and TLS certificates, Content Security Policy (CSP), OWASP Top 10 risks for frontend (XSS, CSRF, clickjacking, insecure direct object references), input sanitisation, and secure cookie handling. Authentication strategies: session-based auth, JWT, OAuth 2.0, OpenID Connect, and social login integration. Auth libraries: Auth.js (NextAuth), Clerk, and Supabase Auth." },
              { code: "FE210", title: "Angular & Svelte", credits: 3, description: "Angular fundamentals: modules, components, templates, directives, pipes, services, dependency injection, routing, RxJS observables, and Angular CLI. Svelte and SvelteKit: reactive declarations, stores, server-side rendering with SvelteKit, and why Svelte's compiler approach differs from React and Vue. Solid JS for completeness. Framework selection criteria for African projects." },
            ],
          },
        ],
      },
      {
        year: 3, label: "Performance, Advanced APIs, PWAs, Desktop & Mobile",
        semesters: [
          {
            name: "Semester 5 — SSR/SSG, Performance, Accessibility & GraphQL", courses: [
              { code: "FE301", title: "Server-Side Rendering (SSR) & Static Site Generation (SSG)", credits: 3, description: "Rendering strategies in depth: CSR vs SSR vs SSG vs ISR and when to use each. SSR with Next.js, TanStack Start, and Astro. SSG with Astro, Next.js, VuePress, Eleventy (11ty), and Nuxt.js. Hydration, partial hydration, and islands architecture. Deploy SSG sites to Cloudflare Pages, Netlify, and Vercel. SEO implications of each strategy." },
              { code: "FE302", title: "Performance Engineering", credits: 4, description: "Web performance from first principles: Core Web Vitals (LCP, FID/INP, CLS), Lighthouse auditing, Chrome DevTools Performance panel, Service Workers for offline-first and caching strategies (Cache-Control headers, cache busting), streaming responses, code splitting, lazy loading images and components, font optimisation, resource hints (preload, prefetch, preconnect), and performance budgets. Optimise a real application from poor to excellent Lighthouse scores." },
              { code: "FE303", title: "Accessibility (a11y)", credits: 3, description: "Building the web for everyone: WCAG 2.1 AA compliance, the four principles (Perceivable, Operable, Understandable, Robust), semantic HTML for accessibility, ARIA roles and attributes (when to use and when not to), keyboard navigation, focus management, screen reader testing (NVDA, VoiceOver), colour contrast, accessible forms and error messages, and automated a11y testing with axe-core and Playwright. Design for low-literacy and low-bandwidth African users." },
              { code: "FE304", title: "GraphQL for Frontend Engineers", credits: 3, description: "GraphQL as a frontend engineer: queries, mutations, subscriptions, fragments, variables, and directives. Apollo Client for React (cache management, optimistic updates, pagination, error handling). Relay Modern for large-scale data requirements. Comparing REST vs GraphQL trade-offs. Code generation with GraphQL Code Generator. Using GraphQL with Next.js and Supabase." },
              { code: "FE305", title: "Web Components, Design Systems & PWAs", credits: 3, description: "Web Components: HTML Templates, Custom Elements, and Shadow DOM — building framework-agnostic UI components. Progressive Web Apps (PWAs): the Web App Manifest, service workers for offline support, push notifications, installation (Add to Home Screen), and background sync. Building and publishing a design system as a Storybook + npm package. Accessibility integration in design systems." },
            ],
          },
          {
            name: "Semester 6 — Desktop, Mobile, AI Integration & Capstone", courses: [
              { code: "FE306", title: "Desktop Applications (Electron & Tauri)", credits: 3, description: "Building cross-platform desktop applications: Electron (the web-tech-first approach — main process, renderer process, IPC, native menus, system tray, auto-updates, packaging), Tauri (the lightweight Rust-based alternative — commands, events, security model, smaller bundle size), and Flutter for desktop. Packaging and distributing desktop apps for Windows, macOS, and Linux. Distribution on the web vs native." },
              { code: "FE307", title: "Mobile Development (React Native & Flutter)", credits: 4, description: "Cross-platform mobile from the frontend perspective: React Native (components, StyleSheet, navigation with React Navigation, Expo workflow, accessing native APIs, push notifications, performance, and deploying to Google Play and App Store). Flutter (Dart basics, widgets, state management with Riverpod/Bloc, animations, and deployment). Ionic as a web-first alternative. Building for low-end Android devices common across Africa." },
              { code: "FE308", title: "Deployment, CI/CD & Observability", credits: 2, description: "Production frontend deployment: GitHub Actions CI/CD pipelines for lint → test → build → deploy, deploying to Vercel, Netlify, Cloudflare Pages, Railway, and Render. Environment variables and secrets management, preview deployments, rollback strategies, feature flags, and frontend observability with Sentry (error tracking), Posthog (analytics), and real-user monitoring (RUM)." },
              { code: "FE309", title: "AI Integration for Frontend Engineers", credits: 3, description: "Implementing AI features in frontend applications: using the OpenAI API, Anthropic Claude API, and Google Gemini API from a React or Next.js app. Streaming AI responses to the UI with Server-Sent Events. Building an AI chat interface. Integrating AI agents and MCP into web apps. Using the Vercel AI SDK. NanoBanana API (local AI). Prompt engineering from a product perspective. Responsible AI in consumer-facing African applications." },
              { code: "FE310", title: "Frontend Engineering Capstone", credits: 6, description: "Design, build, deploy, and operate a production-quality frontend application that solves a real African problem. Requirements: React or Vue with TypeScript, Next.js or Nuxt.js with SSR/SSG, Tailwind CSS with an accessible design system, full test suite (unit + E2E with Playwright), WCAG 2.1 AA accessibility compliance, Lighthouse Performance score ≥ 90, AI feature integration (at least one), PWA capability, CI/CD pipeline, deployed to a public domain, and real users. Defended before a panel of industry engineers and UX designers." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "data-engineering",
    icon: Database,
    title: "School of Data Engineering",
    shortTitle: "Data Engineering",
    color: "hsl(270, 60%, 45%)",
    colorClass: "bg-[hsl(270,60%,45%)]",
    tagline: "Build the data infrastructure that powers African insight at continental scale",
    description: "A comprehensive three-year bootcamp following the roadmap.sh Data Engineer roadmap. Students start with programming prerequisites (Python, SQL, Linux, Git, networking, distributed systems basics), move through the full data engineering lifecycle — data generation, storage, ingestion, and serving — covering relational and NoSQL databases, data warehousing architectures (Snowflake, BigQuery, Redshift), cloud computing (AWS, Azure, GCP), data pipelines and orchestration (Airflow, dbt, Prefect), big data tools (Spark, Hadoop), containers and Kubernetes, CI/CD, testing, messaging systems (Kafka, RabbitMQ), Infrastructure-as-Code (Terraform), data governance, privacy regulations (GDPR, ECPA), security, Reverse ETL, BI tools (Power BI, Looker, Tableau), and MLOps integration. African data sovereignty, continental data infrastructure, and responsible data stewardship are woven throughout.",
    highlights: [
      "Full data engineering lifecycle: generation → storage → ingestion → serving",
      "Relational (PostgreSQL, MySQL, Aurora) and NoSQL (MongoDB, Cassandra, Redis, BigTable, Neo4j) databases",
      "Data warehousing (Snowflake, BigQuery, Redshift), Data Lakes, Data Mesh, and Data Fabric architectures",
      "Big Data tools (Spark, Hadoop, HDFS), orchestration (Airflow, dbt, Prefect), Kafka, Terraform, and MLOps",
    ],
    careerPaths: ["Data Engineer", "Analytics Engineer", "Platform Data Engineer", "Data Architect", "MLOps Engineer", "Data Infrastructure Engineer", "BI Engineer"],
    tools: ["Python", "SQL", "Java", "Scala", "Go", "PostgreSQL", "MySQL", "MongoDB", "Cassandra", "Redis", "BigTable", "Neo4j", "DynamoDB", "Google BigQuery", "Snowflake", "Amazon Redshift", "Databricks Delta Lake", "Apache Airflow", "dbt", "Prefect", "Luigi", "Apache Spark", "Apache Kafka", "RabbitMQ", "AWS SQS", "Docker", "Kubernetes", "Terraform", "AWS CDK", "OpenTofu", "GitHub Actions", "GitLab CI", "ArgoCD", "Prometheus", "Datadog", "Sentry", "Power BI", "Tableau", "Looker", "Streamlit", "Hightouch", "Census", "Segment", "MLflow", "Git"],
    curriculum: [
      {
        year: 1, label: "Foundations — Programming, Databases & the Data Lifecycle",
        semesters: [
          {
            name: "Semester 1 — Introduction, Programming & Linux Fundamentals", courses: [
              { code: "DE101", title: "Introduction to Data Engineering", credits: 3, description: "What is Data Engineering and how does it differ from Data Science and Data Analytics? The Data Engineering Lifecycle: data generation, data storage, data ingestion, and data serving. Key skills and responsibilities of a data engineer in 2026. Choosing the right technologies for African data problems. Overview of the roadmap.sh Data Engineer roadmap as the programme framework." },
              { code: "DE102", title: "Programming for Data Engineers — Python & SQL", credits: 4, description: "Python as the primary data engineering language: data types, control flow, functions, comprehensions, generators, file I/O, error handling, and the standard library. Object-oriented Python for writing reusable pipeline code. SQL fundamentals: SELECT, WHERE, JOIN, GROUP BY, subqueries, window functions, CTEs, and stored procedures. Hands-on with PostgreSQL and SQLite. The roadmap.sh Python Roadmap and SQL Roadmap as complementary paths." },
              { code: "DE103", title: "Data Structures, Algorithms & Linux Basics", credits: 4, description: "Data structures every data engineer uses: arrays, hash maps, sets, stacks, queues, trees, and graphs. Algorithm complexity (Big-O), sorting, searching, and recursion applied to data transformation tasks. Linux command line for data engineers: file system navigation, permissions, shell scripting (bash), process management, cron jobs, SSH, and working with large files. Git and GitHub: version control workflows for data pipelines and notebooks." },
              { code: "DE104", title: "Networking Fundamentals & Distributed Systems Basics", credits: 3, description: "Networking for data engineers: TCP/IP, HTTP/HTTPS, DNS, VPCs, firewalls, and load balancers. Understanding latency, bandwidth, and throughput in data pipelines. Distributed systems concepts that every data engineer must understand: CAP theorem, eventual consistency, ACID vs BASE, replication, partitioning, sharding, and fault tolerance. How these principles govern the design of every database and data platform studied throughout the programme." },
              { code: "DE105", title: "Sources of Data & Data Collection", credits: 3, description: "Where data comes from: relational databases, APIs (REST and GraphQL), log files (application logs, server logs, audit logs), mobile applications, and IoT device streams. Data collection considerations: schema design vs schema-on-read, data formats (JSON, CSV, Parquet, Avro, ORC), data encoding, compression, and serialisation. African data sources: mobile money transaction logs, USSD session data, telemedicine records, agricultural sensor streams, and government open data portals." },
            ],
          },
          {
            name: "Semester 2 — Relational Databases, NoSQL & Database Fundamentals", courses: [
              { code: "DE106", title: "Database Fundamentals", credits: 4, description: "Deep database theory for data engineers: data normalisation (1NF–3NF–BCNF), data modelling techniques (ER diagrams, dimensional modelling), OLTP vs OLAP systems, slowly changing dimensions (SCD Types 1–6), horizontal vs vertical scaling, star schema vs snowflake schema, and indexing strategies (B-tree, hash, bitmap, partial). CAP theorem applied to real database choices. Understanding when to use each database type." },
              { code: "DE107", title: "Relational Databases in Depth", credits: 4, description: "Relational databases for production data engineering: PostgreSQL (the data engineer's default — window functions, CTEs, JSONB, full-text search, partitioning, logical replication), MySQL, MariaDB, Amazon Aurora DB, Oracle, and MS SQL Server. Advanced SQL: indexing and query plan analysis (EXPLAIN ANALYZE), transactions and isolation levels, connection pooling (PgBouncer), database migrations (Flyway, Liquibase, Alembic), and PostgreSQL extensions (pg_vector, TimescaleDB). African telecoms and banking database schemas as case studies." },
              { code: "DE108", title: "NoSQL Databases", credits: 4, description: "The NoSQL landscape for data engineers: Document databases (MongoDB for flexible schemas, ElasticSearch for full-text search and log analytics, CosmosDB, CouchDB); Column-family databases (Apache Cassandra for time-series and wide-column workloads, Google BigTable, Apache HBase for Hadoop); Graph databases (Neo4j and Cypher query language, Amazon Neptune for knowledge graphs); Key-value stores (Redis for caching/pub-sub/sorted sets, Memcached, DynamoDB for serverless key-value). Use-case decision framework: which NoSQL database for which problem? African reference architectures." },
              { code: "DE109", title: "Cloud Computing for Data Engineers", credits: 3, description: "The three major cloud platforms as used by data engineers: AWS (EC2 compute, S3 object storage, Amazon RDS for managed relational databases, AWS Glue for serverless ETL, Redshift for data warehousing); Azure (Virtual Machines, Azure Blob Storage, Azure SQL Database, Azure Data Factory for ETL pipelines, Azure Synapse Analytics); Google Cloud (Compute Engine, Cloud Storage, Cloud SQL, Google Dataflow for streaming and batch pipelines, BigQuery). Understanding cloud pricing, regions, availability zones, IAM, and data egress costs — critical for African organisations building on cloud infrastructure. AfriCloud fundamentals." },
              { code: "DE110", title: "Checkpoint Project: End-to-End Data Pipeline", credits: 3, description: "Build a complete end-to-end data pipeline on a cloud platform of your choice. Requirements: ingest data from at least two sources (a REST API and a relational database), store raw data in object storage (S3/GCS/Azure Blob), transform it with Python and SQL, load to a target database (PostgreSQL or BigQuery), schedule with a simple cron job, and document the pipeline in a README. Deployed and reviewed by peers and instructors. Focus area: an African dataset (mobile money, health records, weather/agriculture, or transport)." },
            ],
          },
        ],
      },
      {
        year: 2, label: "Data Warehousing, Pipelines, Big Data & Orchestration",
        semesters: [
          {
            name: "Semester 3 — Data Warehousing, Data Lakes & Data Architectures", courses: [
              { code: "DE201", title: "Data Warehousing Architectures", credits: 4, description: "Modern data warehousing in depth: What is a data warehouse and why does it matter? Data Warehouse architectures: Inmon (EDW) vs Kimball (dimensional). Cloud data warehouses: Google BigQuery (columnar, serverless, federated queries, partitioning, clustering, BI Engine), Snowflake (virtual warehouses, zero-copy cloning, time travel, data sharing, Snowpark), Amazon Redshift (distribution styles, sort keys, Spectrum, RA3 nodes). Data Mart design for departmental analytical workloads. Data Mesh principles: domain ownership, data as a product, self-serve data platform, and federated computational governance." },
              { code: "DE202", title: "Data Lakes & Modern Lakehouse Architectures", credits: 3, description: "Data Lakes vs Data Warehouses vs Lakehouses. Open table formats: Databricks Delta Lake (ACID transactions, time travel, schema enforcement, change data feed), Apache Iceberg (hidden partitioning, time travel, row-level updates), Apache Hudi (incremental processing, upserts). Managed Lakehouse platforms: Onehouse (Universal Data Lakehouse), Snowflake Unistore. Data Lake on cloud storage: S3/GCS/ADLS with partitioned Parquet files. Other modern data architectures: Data Fabric (unified metadata and governance layer), Data Hub (centralised metadata discovery), Metadata-first Architecture, and Serverless data processing options." },
              { code: "DE203", title: "Data Ingestion Patterns", credits: 3, description: "The three types of data ingestion: Batch (scheduled extracts, full loads vs incremental loads, watermarking), Realtime/Streaming (event-driven, low-latency, CDC — Change Data Capture), and Hybrid (micro-batch, Lambda architecture, Kappa architecture). When to use each pattern. Tools survey: AWS Glue, Apache NiFi, Fivetran, Airbyte, Stitch, and Debezium for CDC. Ingestion from heterogeneous African data sources: USSD APIs, M-Pesa transaction webhooks, health system HL7/FHIR feeds, and satellite imagery APIs." },
              { code: "DE204", title: "Data Pipeline Engineering with Airflow & dbt", credits: 4, description: "Apache Airflow in depth: DAGs, operators (BashOperator, PythonOperator, SQL operators, sensor operators), XComs, task dependencies, scheduling (cron expressions), connections and hooks, pools and queues, dynamic DAGs, TaskFlow API, Airflow 2.x features, and deploying Airflow on Kubernetes (KubernetesExecutor). dbt (data build tool): models, sources, tests (generic + singular), documentation, snapshots, seeds, macros, Jinja templating, dbt packages, dbt Cloud vs dbt Core, incremental models, and the Medallion Architecture (Bronze → Silver → Gold). Luigi and Prefect as alternatives. Building production-grade pipelines for an African data platform." },
              { code: "DE205", title: "Cluster Computing & Big Data Tools", credits: 3, description: "Cluster computing fundamentals: What is cluster computing, distributed file systems (HDFS — the Hadoop Distributed File System), job scheduling on clusters, cluster management tools (Kubernetes, Apache Hadoop YARN). The Hadoop ecosystem: MapReduce programming model, HDFS architecture, YARN resource management. Apache Spark in depth: RDDs, DataFrames, Spark SQL, PySpark, Spark Streaming, MLlib, GraphX, Delta Lake integration, and deploying Spark on Kubernetes and EMR. When to use Spark vs BigQuery vs dbt. Processing large African datasets (population census data, telecom CDRs, satellite land-use datasets)." },
            ],
          },
          {
            name: "Semester 4 — Containers, CI/CD, Testing, Messaging & IaC", courses: [
              { code: "DE206", title: "Containers & Orchestration for Data Engineers", credits: 3, description: "Docker for data engineers: building images for Python data pipelines, multi-stage builds, Docker Compose for local development (Airflow + PostgreSQL + Redis stack), Dockerfile best practices, and image security scanning. Kubernetes for data workloads: Pods, Deployments, Services, ConfigMaps, Secrets, PersistentVolumes, Helm charts, and the KubernetesExecutor for Airflow. Managed Kubernetes: Google Cloud GKE, Amazon EKS, Azure AKS. Spark on Kubernetes. Running Kafka on Kubernetes with Strimzi. Data engineering infrastructure as immutable, reproducible containers." },
              { code: "DE207", title: "CI/CD & Monitoring for Data Pipelines", credits: 3, description: "CI/CD for data pipelines: GitHub Actions (workflows, jobs, steps, matrix builds, secrets, environments, composite actions, reusable workflows), CircleCI, GitLab CI, and ArgoCD for GitOps-based pipeline deployments. Testing pipelines in CI: linting SQL with sqlfluff, linting Python with Ruff, unit testing pipeline code with pytest, and integration testing with live database connections. Monitoring data infrastructure: Prometheus (metrics collection, PromQL, alerting), Datadog (APM, log management, infrastructure monitoring, synthetic monitoring), Sentry (error tracking for Python pipeline workers), and New Relic. Building SLOs and SLAs for data products." },
              { code: "DE208", title: "Testing Data Pipelines", credits: 3, description: "The full testing spectrum for data engineering: Unit Testing (testing individual Python functions and SQL transformations in isolation), Integration Testing (testing that pipeline components connect and exchange data correctly), End-to-End Testing (full pipeline runs in a staging environment), Functional Testing (testing that business logic transformations are correct), A/B Testing (testing new pipeline versions with shadow traffic), Load Testing (testing pipeline throughput and latency under realistic data volumes), and Smoke Testing (basic health checks after deployment). dbt tests, Great Expectations, Soda Core, and Monte Carlo for data quality testing. Building a test suite for an African data pipeline." },
              { code: "DE209", title: "Messaging Systems & Event Streaming", credits: 4, description: "Messaging systems for data engineering: What are they, when and why to use them, async vs sync communication, messages vs streams, and best practices. Apache Kafka in depth: topics, partitions, consumer groups, producers, brokers, ZooKeeper vs KRaft mode, Kafka Connect (source and sink connectors), Kafka Streams for stateful stream processing, ksqlDB for streaming SQL, and Schema Registry with Avro/Protobuf schemas. RabbitMQ for task queues. AWS SQS and AWS SNS for cloud-native messaging. Real-time data pipelines: streaming from M-Pesa transactions, Safaricom network events, and real-time agricultural sensor data across Africa." },
              { code: "DE210", title: "Infrastructure as Code (IaC)", credits: 3, description: "Infrastructure-as-Code for data platform teams: Declarative vs Imperative IaC, idempotency, reusability, and environmental management (dev/staging/prod). Terraform in depth: HCL syntax, providers (AWS, GCP, Azure), resources, data sources, variables, outputs, modules, remote state (S3 + DynamoDB locking), workspaces, and Terraform Cloud. OpenTofu as the open-source Terraform fork. AWS CDK (Cloud Development Kit) for Python: constructs, stacks, and deploying data infrastructure with TypeScript or Python. Google Cloud Deployment Manager. Provisioning a complete data platform (VPC + managed Kubernetes + S3 + RDS + Airflow) with Terraform." },
            ],
          },
        ],
      },
      {
        year: 3, label: "Data Governance, Security, Analytics, MLOps & Capstone",
        semesters: [
          {
            name: "Semester 5 — Data Governance, Security, Analytics & Reverse ETL", courses: [
              { code: "DE301", title: "Data Governance & Data Quality", credits: 3, description: "Data governance frameworks for African organisations: Data Quality (completeness, accuracy, consistency, timeliness, validity, uniqueness — measuring and enforcing with Great Expectations, Soda Core, and Monte Carlo), Data Lineage (column-level lineage with OpenLineage, Marquez, and DataHub), Metadata Management (Apache Atlas, DataHub, Amundsen — data catalogues, business glossaries, and data dictionaries), Data Interoperability (standards for cross-system data exchange), and the data governance operating model (data owners, data stewards, data custodians). Building a data governance programme for an African public-sector organisation." },
              { code: "DE302", title: "Data Security & Privacy", credits: 3, description: "Security for data platforms: Authentication vs Authorisation (RBAC, ABAC, column-level and row-level security in BigQuery, Snowflake, and PostgreSQL), Encryption at rest and in transit (TLS, KMS key management, transparent data encryption), Tokenisation (replacing sensitive values with non-sensitive tokens), Data Masking (static and dynamic masking for test environments), and Data Obfuscation. Privacy regulations and their implications for African data engineers: GDPR (EU General Data Protection Regulation), ECPA (Electronic Communications Privacy Act), EU AI Act, Kenya Data Protection Act 2019, Nigeria Data Protection Regulation (NDPR), and other African national data laws. Data and AI Regulations as a data engineering design constraint." },
              { code: "DE303", title: "Data Analytics, Business Intelligence & Reverse ETL", credits: 4, description: "Data serving for analytics: Data Analytics lifecycle (descriptive → diagnostic → predictive → prescriptive). Business Intelligence tools: Microsoft Power BI (data model, DAX, Power Query, reports and dashboards, workspaces, Power BI Gateway, embedding), Streamlit (building interactive Python data apps for internal analytics), Tableau (calculated fields, LOD expressions, dashboards, Tableau Server/Cloud), and Looker (LookML, explores, dashboards, embedded analytics). Reverse ETL: what it is, ETL vs Reverse ETL, and use cases (syncing warehouse data back to CRM, email marketing, and customer success tools). Reverse ETL tools: Hightouch, Census, and Segment. Building an analytics dashboard for an African agri-data or fintech use case." },
              { code: "DE304", title: "Machine Learning Integration & MLOps", credits: 3, description: "How data engineering feeds machine learning systems and how MLOps closes the loop back to data engineering. ML pipelines from a data engineering perspective: feature engineering, feature stores (Feast, Tecton, Hopsworks), training data pipelines, model serving infrastructure, and feedback loops. MLOps: MLflow (experiment tracking, model registry, model serving), Weights & Biases (experiment tracking, sweeps, artefacts), Kubeflow Pipelines, and Vertex AI Pipelines. Deploying models to production: real-time inference (FastAPI + Docker), batch inference (Spark MLlib, Airflow DAG), and A/B testing ML models. African ML use cases: credit scoring, crop disease detection, patient triage, language model fine-tuning for African languages." },
              { code: "DE305", title: "Advanced Data Platform Architecture", credits: 3, description: "Designing and operating large-scale data platforms for African contexts: Event-driven architectures with Kafka and Flink. Real-time OLAP with Apache Druid and ClickHouse. The Modern Data Stack and its African applicability. Data platform cost optimisation strategies for bandwidth-constrained and cost-sensitive environments. Multi-cloud and hybrid-cloud data architectures. Data platform SRE: on-call runbooks, incident response, post-mortem culture, SLI/SLO/SLA definitions for data products. Building for low-bandwidth, intermittent connectivity, and data sovereignty requirements across 54 African nations." },
            ],
          },
          {
            name: "Semester 6 — Streaming, Advanced Topics & Capstone", courses: [
              { code: "DE306", title: "Real-Time Streaming & Event-Driven Data Engineering", credits: 3, description: "Advanced streaming data engineering: Apache Flink (stateful stream processing, event time vs processing time, watermarks, windows — tumbling/sliding/session, exactly-once semantics, Flink SQL, and deploying Flink on Kubernetes), Apache Kafka Streams vs Flink trade-offs. ksqlDB for streaming SQL queries. Change Data Capture (CDC) at scale with Debezium, Maxwell, and AWS DMS. Streaming architectures: Lambda vs Kappa. Real-time dashboards with Apache Superset and Grafana. Case study: real-time mobile money fraud detection pipeline for an African fintech platform." },
              { code: "DE307", title: "dbt Advanced & Analytics Engineering", credits: 3, description: "Analytics Engineering as a discipline: the role of the analytics engineer between data engineering and data analysis. Advanced dbt: packages (dbt-utils, dbt-expectations, dbt-audit-helper), custom generic tests, macros and Jinja templating in depth, dbt snapshots for SCD Type 2, dbt exposures for documenting downstream usage, the dbt Semantic Layer and MetricFlow, dbt + Airflow integration patterns, dbt Mesh (cross-project dependencies), and dbt Cloud CI. Medallion architecture implementation: Bronze (raw), Silver (cleansed), Gold (aggregated business entities). Building a complete analytics engineering project for an African e-commerce or fintech data warehouse." },
              { code: "DE308", title: "Data Engineering for African Contexts", credits: 2, description: "Data engineering challenges specific to African organisations: building data infrastructure in low-bandwidth environments (data compression, efficient serialisation formats, edge computing with Apache Kafka MirrorMaker 2 for cross-region replication), offline-first data collection (ODK Collect, KoBoToolbox, CommCare), working with M-Pesa Daraja API data, HL7 FHIR for healthcare data integration, African national ID APIs (Ndovu, NIMC, Ghana Card), agricultural data standards (CGIAR, FAO AgroVoc), and data sovereignty — keeping African data on African infrastructure. Pan-African data initiatives: Smart Africa Digital Economy Index, AU Data Policy Framework." },
              { code: "DE309", title: "AI-Assisted Data Engineering", credits: 2, description: "The AI-augmented data engineer workflow: using Claude Code, GitHub Copilot, and Cursor for writing pipeline code, SQL queries, dbt models, and Terraform configurations. LLM-assisted data quality rule generation. Natural language to SQL (Text-to-SQL) with GPT-4o and Claude for analyst self-service. AI agents for autonomous pipeline debugging and remediation. Generative AI for synthetic test data generation. Vector databases (pgvector, Pinecone, Weaviate) as a data engineering concern — building RAG pipelines for African language document search. MCP (Model Context Protocol) for connecting LLM agents to data infrastructure." },
              { code: "DE310", title: "Data Engineering Capstone", credits: 6, description: "Design, build, deploy, and operate a production-grade data platform that solves a real African data problem. Requirements: ingest from ≥3 heterogeneous sources (API + relational DB + event stream), land raw data in an object-storage data lake, transform with dbt (≥20 models, ≥10 tests), orchestrate with Apache Airflow (≥5 DAGs with SLA monitoring), load analytical data to BigQuery or Snowflake, expose a BI dashboard in Looker Studio or Power BI, implement CI/CD with GitHub Actions (lint + test + deploy), deploy all infrastructure with Terraform, implement data quality checks with Great Expectations or Soda Core, include column-level data lineage with OpenLineage, and meet GDPR-equivalent privacy requirements. Defended before a panel of industry data engineers from African tech companies." },
            ],
          },
        ],
      },
    ],
  },
];

export const getSchoolBySlug = (slug: string): SchoolData | undefined => {
  return schoolsData.find((s) => s.slug === slug);
};
