import { Code, Brain, Landmark, Globe, Shield, Cpu, LucideIcon } from "lucide-react";

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
];

export const getSchoolBySlug = (slug: string): SchoolData | undefined => {
  return schoolsData.find((s) => s.slug === slug);
};
