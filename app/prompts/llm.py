resume_json = {
    "Resume": {
        "fullName": "Lochan Kumar",
        "contact": {
            "phone": "+91 70173 08109",
            "email": "lochansaroy47@gmail.com",
            "linkedIn": "LinkedIn",
            "portfolio": "Portfolio",
            "leetCode": "Leetcode",
            "github": "Github",
        },
        "professionalSummary": "Full‑stack MERN developer skilled in React.js, Next.js, Node.js, Express.js, and TypeScript, building REST APIs and responsive UI with Tailwind CSS across SQL and NoSQL databases. Collaborates via Git/GitHub and has shipped multiple live production apps.",
        "workExperience": [
            {
                "company": "House of UD",
                "role": "Full‑Stack Developer",
                "startDate": "Jan 2026",
                "endDate": "Present",
                "responsibilities": [
                    "Designed, developed, and maintained multiple responsive, reusable UI components and landing pages for brand clients including the Barber Syndicate e‑commerce platform using Next.js and React.",
                    "Built and deployed a cross‑platform e‑commerce mobile application for Barber Syndicate using React Native (Expo), integrating product listings, cart, and order management.",
                    "Managed web hosting infrastructure via cPanel and VPS, handling server configuration, deployments, and uptime reliability.",
                    "Worked with PostgreSQL, MySQL, and Prisma ORM for data modeling and backend REST API development; collaborated with the team via Git and GitHub including code reviews.",
                    "Received a Pre‑Placement Offer (PPO) after the first month of internship based on performance.",
                ],
            },
            {
                "company": "Spycore Systems",
                "role": "Full‑Stack Developer (Freelancer)",
                "startDate": "Jun 2025",
                "endDate": "Dec 2025",
                "responsibilities": [
                    "Designed and developed a secure Digital Malkhana System using Next.js, PostgreSQL and Prisma.",
                    "Implemented JWT‑based authentication and role‑based access control for secure access across departments.",
                    "Built and deployed Dockerized PostgreSQL and backend services on VPS, improving reliability and scalability for multi‑district usage.",
                    "Enabled digital tracking of seized property across 15+ districts, reducing manual record handling and improving audit readiness.",
                ],
            },
        ],
        "skills": {
            "frontend": [
                "React.js",
                "Next.js",
                "React Native (Expo)",
                "TypeScript",
                "JavaScript (ES6+)",
                "Tailwind CSS",
            ],
            "backend": [
                "Node.js",
                "Express.js",
                "REST API Design",
                "JWT Authentication",
            ],
            "databasesAndORM": ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM"],
            "devOpsAndTools": [
                "Git",
                "GitHub",
                "Docker",
                "Linux CLI",
                "VPS Deployment",
                "cPanel",
                "Firebase",
                "Supabase",
            ],
            "programmingLanguages": [
                "JavaScript",
                "TypeScript",
                "Java",
                "Python",
                "SQL",
            ],
        },
        "projects": [
            {
                "name": "DevTools",
                "duration": "Feb 2026 – Present",
                "technologies": [
                    "Next.js",
                    "TypeScript",
                    "ShadCN",
                    "Framer Motion",
                    "Tailwind CSS",
                ],
                "description": "Multi‑utility web platform offering 15+ developer tools including JWT decoders, hashing utilities, and financial calculators. Architected a reusable, type‑safe component library with ShadCN and Tailwind CSS, ensuring a consistent design system across all tools. Engineered smooth, accessible UI interactions with Framer Motion, improving usability and user engagement.",
            },
            {
                "name": "Solar CRM",
                "duration": None,
                "technologies": [
                    "Next.js",
                    "TypeScript",
                    "Prisma",
                    "PostgreSQL",
                    "Zod",
                ],
                "description": "Production‑grade multi‑tenant CRM for a solar panel agency to manage customers, franchise partners, and admin operations. Implemented role‑based multi‑tenancy and access control, ensuring strict tenant‑level data isolation. Developed secure authentication and transactional data processing using custom JWT authentication, Zod validation, and Prisma transactions.",
            },
        ],
        "education": [
            {
                "institution": "Maulana Abul Kalam Azad University of Technology, Kolkata, West Bengal",
                "degree": "Bachelor of Technology in Computer Science",
                "cgpa": "7.9",
                "graduationYear": "2027",
            },
            {
                "institution": "Ram Krishna Inter College, Saharanpur, UP",
                "degree": "High School Diploma, Science",
                "year": "2017",
            },
        ],
        "certifications": [
            {
                "title": "Data Structures and Algorithms in JavaScript",
                "issuer": "freeCodeCamp",
            }
        ],
    }
}

system_prompt = f"""
I have this reusme and your task is to tell the user inforamation about me 
by accepting the  prompt 
NOTE: 
- dont over share give answer related to the question 
- answer should  be in text form 
- answer only techical , and hr related question reject rest questions
here is resueme json file 
{resume_json}


"""
