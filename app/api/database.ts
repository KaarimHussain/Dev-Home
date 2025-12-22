import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "profile.db");
export const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the profile database.");
        initDb();
    }
);

const initDb = () => {
    db.serialize(() => {
        // Create tech_stack table
        db.run(`CREATE TABLE IF NOT EXISTS tech_stack (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            icon TEXT,
            color TEXT,
            category TEXT NOT NULL
        )`);

        // Create projects table
        db.run(`CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category TEXT,
            type TEXT,
            tags TEXT, -- JSON array
            tech TEXT, -- JSON array
            favourite INTEGER DEFAULT 0,
            images TEXT -- JSON array
        )`);

        // Create contact_details table
        db.run(`CREATE TABLE IF NOT EXISTS contact_details (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            icon TEXT NOT NULL,
            label TEXT NOT NULL,
            value TEXT NOT NULL
        )`);

        // Create resume table
        db.run(`CREATE TABLE IF NOT EXISTS resume (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            label TEXT DEFAULT 'Resume'
        )`);

        // Create admins table
        db.run(`CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`);

        // Seed data if empty
        seedData();
    });
};

const seedData = () => {
    // Check if tech_stack is empty
    db.get("SELECT count(*) as count FROM tech_stack", (err, row: any) => {
        if (err) console.error(err);
        if (row && row.count === 0) {
            console.log("Seeding tech_stack...");
            const techStack = [
                // Languages
                { name: "JavaScript", icon: "JavaScript", color: "#F7DF1E", category: "languages" },
                { name: "TypeScript", icon: "TypeScript", color: "#3178C6", category: "languages" },
                { name: "C#", icon: "Csharp", color: "#239120", category: "languages" },
                { name: "Dart", icon: "Dart", color: "#0175C2", category: "languages" },
                { name: "PHP", icon: "PHP", color: "#777BB4", category: "languages" },
                { name: "SQL Server", icon: "SqlServer", color: "#336791", category: "languages" },
                { name: "MySQL", icon: "MySQL", color: "#336791", category: "languages" },
                { name: "PostgreSQL", icon: "PostgreSQL", color: "#336791", category: "languages" },
                { name: "MongoDB", icon: "MongoDb", color: "#47A248", category: "languages" },
                { name: "Firebase", icon: "Firebase", color: "#FFCA28", category: "languages" },
                // Frameworks
                { name: "React", icon: "React", color: "#61DAFB", category: "frameworks" },
                { name: "Next.js", icon: "NextJs", color: "#000000", category: "frameworks" },
                { name: "Node.js", icon: "NodeJs", color: "#339933", category: "frameworks" },
                { name: "Express", icon: "Express", color: "#000000", category: "frameworks" },
                { name: ".NET Core", icon: "DotNet", color: "#512BD4", category: "frameworks" },
                { name: "Angular", icon: "Angular", color: "#DD0031", category: "frameworks" },
                { name: "Flutter", icon: "Flutter", color: "#02569B", category: "frameworks" },
                { name: "JQuery", icon: "Jquery", color: "#3178C6", category: "frameworks" },
                { name: "JWT", icon: "JWT", color: "#3178C6", category: "frameworks" },
                { name: "Wordpress", icon: "Wordpress", color: "#3178C6", category: "frameworks" },
                { name: "Elementor", icon: "Elementor", color: "#3178C6", category: "frameworks" },
                { name: "Bootstrap", icon: "Bootstrap", color: "#336791", category: "frameworks" },
                { name: "TailwindCss", icon: "TailwindCss", color: "#336791", category: "frameworks" },
                { name: "Shadcn/ui", icon: "Shadncn", color: "#336791", category: "frameworks" },
                { name: "Motion", icon: "Motion", color: "#336791", category: "frameworks" },
                // AI Tools
                { name: "OpenAI", icon: "OpenAI", color: "#10A37F", category: "ai" },
                { name: "Claude", icon: "Claude", color: "#8B5CF6", category: "ai" },
                { name: "Gemini", icon: "Gemini", color: "#4285F4", category: "ai" },
                { name: "Ollama", icon: "Ollama", color: "#111827", category: "ai" },
                { name: "GitHub Copilot", icon: "GitHubCopilot", color: "#3B82F6", category: "ai" },
                { name: "Github", icon: "Github", color: "#3B82F6", category: "ai" },
                { name: "Git", icon: "Git", color: "#3B82F6", category: "ai" },
                { name: "Qwen", icon: "Qwen", color: "#3B82F6", category: "ai" },
                { name: "Perplexity", icon: "Perplexity", color: "#3B82F6", category: "ai" },
                { name: "Kimi", icon: "Kimi", color: "#3B82F6", category: "ai" },
                { name: "Grok", icon: "Grok", color: "#3B82F6", category: "ai" },
                { name: "Windsurf", icon: "Windsurf", color: "#3B82F6", category: "ai" },
                // Design Tools
                { name: "Figma", icon: "Figma", color: "#F24E1E", category: "design" },
                { name: "Canva", icon: "Canva", color: "#00C4CC", category: "design" },
                { name: "PowerPoint", icon: "Powerpoint", color: "#3B82F6", category: "design" },
                { name: "Word", icon: "Word", color: "#3B82F6", category: "design" },
                { name: "Excel", icon: "Excel", color: "#3B82F6", category: "design" },
                { name: "Discord", icon: "Discord", color: "#3178C6", category: "design" },
                { name: "Cursor", icon: "Cursor", color: "#336791", category: "design" },
                { name: "Visual Studio", icon: "VisualStudio", color: "#336791", category: "design" },
                { name: "Visual Studio Code", icon: "VisualStudioCode", color: "#336791", category: "design" },
                { name: "Notion", icon: "Notion", color: "#336791", category: "design" }
            ];

            const stmt = db.prepare("INSERT INTO tech_stack (name, icon, color, category) VALUES (?, ?, ?, ?)");
            techStack.forEach(item => {
                stmt.run(item.name, item.icon, item.color, item.category);
            });
            stmt.finalize();
        }
    });

    // Check if projects is empty
    db.get("SELECT count(*) as count FROM projects", (err, row: any) => {
        if (err) console.error(err);
        if (row && row.count === 0) {
            console.log("Seeding projects...");
            const projects = [
                {
                    title: "Skill-Ustad",
                    description: "Skillistan is an AI-driven learning platform built with ASP.NET Core, FastAPI, and a modern frontend stack, offering personalized skill mastery through models like Gemini and Ollama. More than an LMS, it's an adaptive, interactive experience tailored to each learner.",
                    category: "Fullstack",
                    type: "desktop",
                    tags: JSON.stringify(["AI/ML", "Education", "Real-time"]),
                    tech: JSON.stringify([".NET Core API", "FastAPI", "React", "Tailwind CSS", "Ollama", "Gemini", "PostgreSQL", "Firebase", "Shadcn/ui"]),
                    favourite: 1,
                    images: JSON.stringify([
                        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
                        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
                    ])
                },
                {
                    title: "Jobistan",
                    description: "Jobistan: A modern PHP/MySQL job platform connecting seekers and employers. Features secure authentication, advanced search, encrypted messaging, and AI-powered security. Responsive design with analytics for all users. Join us to streamline your job search or recruitment process!",
                    category: "Fullstack",
                    type: "desktop",
                    tags: JSON.stringify(["Job Marketplace", "Security", "Real-time"]),
                    tech: JSON.stringify(["PHP", "MySQL", "HTML/CSS", "Bootstrap", "AJAX", "jQuery", "JavaScript"]),
                    favourite: 0,
                    images: JSON.stringify([
                        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                    ])
                },
                {
                    title: "Watch Hub",
                    description: "WatchHub is a premium watch shopping app built with Flutter. It lets users browse, filter, and purchase watches with ease. Features include secure login, cart, wishlist, reviews, and an admin panel. Designed for speed, usability, and real-world eCommerce experience on mobile.",
                    category: "E-Commerce",
                    type: "mobile",
                    tags: JSON.stringify(["Mobile", "Shopping", "Payment"]),
                    tech: JSON.stringify(["Flutter", "Firebase", "Dart", "Material UI"]),
                    favourite: 0,
                    images: JSON.stringify([
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                    ])
                },
                {
                    title: "Artify",
                    description: "Artify, a full-stack Art Selling Website designed to connect talented artists with passionate buyers. This platform supports artwork discovery, secure purchases, artist commissions, and more — all wrapped in a modern, mobile-responsive UI with a powerful backend.",
                    category: "E-Commerce",
                    type: "desktop",
                    tags: JSON.stringify(["Marketplace", "Creative", "Social"]),
                    tech: JSON.stringify(["Angular", ".NET Core API", "SQL Server", "Tailwind CSS"]),
                    favourite: 0,
                    images: JSON.stringify([
                        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
                        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80"
                    ])
                }
            ];

            const stmt = db.prepare("INSERT INTO projects (title, description, category, type, tags, tech, favourite, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            projects.forEach(project => {
                stmt.run(project.title, project.description, project.category, project.type, project.tags, project.tech, project.favourite, project.images);
            });
            stmt.finalize();
        }
    });

    // Check if contact_details is empty
    db.get("SELECT count(*) as count FROM contact_details", (err, row: any) => {
        if (err) console.error(err);
        if (row && row.count === 0) {
            console.log("Seeding contact_details...");
            const contacts = [
                { icon: "MailIcon", label: "Email", value: "kaariminnocent@gmail.com" },
                { icon: "PhoneIcon", label: "Phone", value: "+92 317 3009130" },
                { icon: "MapPinIcon", label: "Address", value: "Karachi, Pakistan" }
            ];

            const stmt = db.prepare("INSERT INTO contact_details (icon, label, value) VALUES (?, ?, ?)");
            contacts.forEach(contact => {
                stmt.run(contact.icon, contact.label, contact.value);
            });
            stmt.finalize();
        }
    });

    // Check if resume is empty
    db.get("SELECT count(*) as count FROM resume", (err, row: any) => {
        if (err) console.error(err);
        if (row && row.count === 0) {
            console.log("Seeding resume...");
            // Placeholder resume
            db.run("INSERT INTO resume (url, label) VALUES (?, ?)", ["/resume.pdf", "Resume"]);
        }
    });

    // Check if admins is empty
    db.get("SELECT count(*) as count FROM admins", (err, row: any) => {
        if (err) console.error(err);
        if (row && row.count === 0) {
            console.log("Seeding admin...");
            const insert = db.prepare("INSERT INTO admins (username, password) VALUES (?, ?)");
            insert.run("admin", "admin123");
            insert.finalize();
        }
    });
};