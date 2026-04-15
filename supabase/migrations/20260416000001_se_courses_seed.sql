-- ============================================================
-- Software Engineering School: 24 Courses Seed
-- 3 Years, 6 Semesters, SE101-SE307
-- ============================================================

INSERT INTO public.courses (id, school_slug, course_code, title, description, year, semester, credits, order_index, is_published)
VALUES
-- Year 1, Semester 1
('se101-0000-0000-0000-000000000001','software-engineering','SE101','Introduction to Programming (Python)','Core programming concepts, algorithms, and problem-solving using Python.',1,1,4,1,true),
('se102-0000-0000-0000-000000000002','software-engineering','SE102','Web Fundamentals (HTML/CSS/JS)','Modern web development foundations including responsive design.',1,1,3,2,true),
('se103-0000-0000-0000-000000000003','software-engineering','SE103','Mathematics for Computing','Discrete mathematics, logic, and foundational algebra for CS.',1,1,3,3,true),
('se104-0000-0000-0000-000000000004','software-engineering','SE104','Digital Literacy & Tools','Git, terminal, IDE mastery, and collaborative development.',1,1,2,4,true),
('se105-0000-0000-0000-000000000005','software-engineering','SE105','Introduction to Linux & OS','Linux command line, file systems, processes, and shell scripting.',1,1,3,5,true),
-- Year 1, Semester 2
('se106-0000-0000-0000-000000000006','software-engineering','SE106','Data Structures & Algorithms','Arrays, linked lists, trees, graphs, sorting, searching, and complexity analysis.',1,2,4,1,true),
('se107-0000-0000-0000-000000000007','software-engineering','SE107','Object-Oriented Programming (Java)','OOP principles, design patterns, and Java ecosystem.',1,2,4,2,true),
('se108-0000-0000-0000-000000000008','software-engineering','SE108','Database Fundamentals','Relational databases, SQL, normalization, and ER modeling.',1,2,3,3,true),
('se109-0000-0000-0000-000000000009','software-engineering','SE109','Technical Communication','Documentation, technical writing, and presentation skills.',1,2,2,4,true),
-- Year 2, Semester 3
('se201-0000-0000-0000-000000000010','software-engineering','SE201','Frontend Engineering (React/TypeScript)','Component-based architecture, state management, and modern frontend tooling.',2,3,4,1,true),
('se202-0000-0000-0000-000000000011','software-engineering','SE202','Backend Development (Node.js/Python)','RESTful APIs, authentication, middleware, and server-side patterns.',2,3,4,2,true),
('se203-0000-0000-0000-000000000012','software-engineering','SE203','Software Engineering Principles','SDLC, agile methodologies, testing strategies, and code quality.',2,3,3,3,true),
('se204-0000-0000-0000-000000000013','software-engineering','SE204','Networking & Protocols','TCP/IP, HTTP, DNS, and network security fundamentals.',2,3,3,4,true),
-- Year 2, Semester 4
('se205-0000-0000-0000-000000000014','software-engineering','SE205','Mobile Development (Flutter)','Cross-platform mobile app development for Android and iOS.',2,4,4,1,true),
('se206-0000-0000-0000-000000000015','software-engineering','SE206','Advanced Databases','NoSQL, query optimization, replication, and distributed data.',2,4,3,2,true),
('se207-0000-0000-0000-000000000016','software-engineering','SE207','Ecosystem Project I (AfriTube)','Contribute features to AfriTube - Africa''s video platform.',2,4,4,3,true),
('se208-0000-0000-0000-000000000017','software-engineering','SE208','UI/UX Design for Engineers','Design thinking, wireframing, and user-centered design.',2,4,2,4,true),
-- Year 3, Semester 5
('se301-0000-0000-0000-000000000018','software-engineering','SE301','Systems Programming (Go/Rust)','Low-level programming, concurrency, and high-performance systems.',3,5,4,1,true),
('se302-0000-0000-0000-000000000019','software-engineering','SE302','DevOps & Cloud Engineering','CI/CD, containerization, orchestration, and AfriCloud deployment.',3,5,4,2,true),
('se303-0000-0000-0000-000000000020','software-engineering','SE303','Microservices Architecture','Service design, API gateways, event-driven systems, and observability.',3,5,3,3,true),
('se304-0000-0000-0000-000000000021','software-engineering','SE304','Security Engineering','Application security, OWASP, encryption, and secure coding.',3,5,3,4,true),
-- Year 3, Semester 6
('se305-0000-0000-0000-000000000022','software-engineering','SE305','Distributed Systems','Consensus algorithms, CAP theorem, and large-scale system design.',3,6,4,1,true),
('se306-0000-0000-0000-000000000023','software-engineering','SE306','Ecosystem Capstone Project','Design, build, and deploy a production system for the ADT ecosystem.',3,6,6,2,true),
('se307-0000-0000-0000-000000000024','software-engineering','SE307','Tech Leadership & Entrepreneurship','Team leadership, product management, and African tech startups.',3,6,2,3,true)
ON CONFLICT (course_code) DO NOTHING;
