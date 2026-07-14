
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import profilePic from "./assets/profile.jpeg";
const NAV_ITEMS = ["Home", "About", "Skills", "Projects", "Education", "Achievements", "Contact"];

const SKILLS = [
  { icon: "</>", title: "Languages", chips: ["C++", "JavaScript"] },
  { icon: "UI", title: "Frontend", chips: ["HTML", "CSS", "React.js", "Tailwind CSS"] },
  { icon: "API", title: "Backend", chips: ["Node.js", "Express.js"] },
  { icon: "DB", title: "Database", chips: ["MongoDB"] },
  { icon: "⚙", title: "Tools", chips: ["Git", "GitHub", "VS Code", "Postman"] },
  { icon: "★", title: "Areas of Expertise", chips: ["Full-Stack Dev", "REST API Dev", "Responsive Design", "DSA"] },
];

const PROJECTS = [
  {
    index: "01 / Finance Tracker",
    title: "Finance Tracker",
    desc: "A full-stack finance management application featuring JWT authentication, dashboard analytics, income and expense tracking, and secure transaction management.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/Ayush-prajapati1/flowfinance-finance-tracker",
    demo: "https://financetrackflow.netlify.app/",
  },

  {
    index: "02 / Modern AI Website Agency Clone",
    title: "Modern AI Website Agency Clone",
    desc: "Developed a premium AI agency landing page clone featuring responsive layouts, reusable components, smooth animations, modern UI/UX, and high-performance design inspired by leading AI companies.",
    stack: ["Next.js", "React.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Ayush-prajapati1/Agency-AI-clone",
    demo: "https://your-ai-agency-demo.com",
  },
];


const ACHIEVEMENTS = [
  {
    title: "DSA & Competitive Programming",
    desc: " Solved 500+ coding problems across LeetCode, CodeChef, and Codeforces while strengthening algorithmic thinking and  problem-solving skills.",
  },
  {
    title: "Full-Stack Projects",
    desc: "Built and deployed multiple MERN applications, focusing on clean architecture, responsive UI, authentication, and REST APIs.",
  },
  {
    title: "ACPC Coding Contest",
    desc: " Achieved 2nd Runner-Up in the college-level ACPC Coding Contest, showcasing strong skills in Data Structures, Algorithms, and competitive programming.",
  },
];

const TERMINAL_LINES = [
  { type: "prompt", text: "whoami" },
  { type: "out", text: "Ayush — Full-Stack Developer" },
  { type: "prompt", text: "cat focus.txt" },
  { type: "out", text: "MERN Stack · DSA · System Design" },
  { type: "prompt", text: "cat education.txt" },
  { type: "out", text: "B.Tech CSE, ABES Engineering College" },
  { type: "prompt", text: "./status" },
  { type: "out", text: "Open to SDE Internships & Full-time roles" },
];


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Terminal() {
  const [shown, setShown] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timer;
    const step = () => {
      if (i >= TERMINAL_LINES.length) {
        setDone(true);
        return;
      }
      const line = TERMINAL_LINES[i];
      setShown((prev) => [...prev, line]);
      i += 1;
      timer = setTimeout(step, line.type === "prompt" ? 450 : 650);
    };
    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="terminal">
      <div className="term-bar">
        <span></span>
        <span></span>
        <span></span>
        <span className="term-title">ayush@devbox: ~</span>
      </div>
      <div className="term-body">
        {shown.map((l, idx) =>
          l.type === "prompt" ? (
            <div className="ln" key={idx}>
              <span className="term-prompt">$</span> <span className="term-key">{l.text}</span>
            </div>
          ) : (
            <div className="ln" key={idx}>
              <span className="term-out">&gt; {l.text}</span>
            </div>
          )
        )}
        {done && (
          <div className="ln" style={{ opacity: 1 }}>
            <span className="term-prompt">$</span> <span className="cursor"></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formNote, setFormNote] = useState("");
  const formRef = useRef(null);

  useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      user_name: name,
      user_email: email,
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setFormNote("✅ Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error(error);
        setFormNote("❌ Failed to send message.");
      });
  };
  return (
    <div className="portfolio-root">
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }
        body {
          background: var(--bg);
        }
        .portfolio-root{
          --bg:#0a0a0f;
          --surface: rgba(255,255,255,0.035);
          --surface-hover: rgba(255,255,255,0.06);
          --border: rgba(255,255,255,0.09);
          --border-strong: rgba(255,255,255,0.16);
          --emerald:#10b981;
          --emerald-soft: rgba(16,185,129,0.14);
          --cyan:#22d3ee;
          --text:#e7e9ea;
          --text-muted:#8b92a0;
          --text-dim:#565e6b;
          --radius:16px;
          --font-display:'Space Grotesk', sans-serif;
          --font-body:'Inter', sans-serif;
          --font-mono:'JetBrains Mono', monospace;
 
          background:var(--bg);
          color:var(--text);
          font-family:var(--font-body);
          line-height:1.6;
          min-height:100vh;
          width:100%;
          min-width:100vw;
          position:relative;
          overflow-x:hidden;
        }
        .portfolio-root *{box-sizing:border-box;}
        .portfolio-root html{scroll-behavior:smooth;}
        .portfolio-root a{color:inherit; text-decoration:none;}
        .portfolio-root ul{list-style:none; margin:0; padding:0;}
        .portfolio-root :focus-visible{outline:2px solid var(--emerald); outline-offset:3px;}
 
        .wrap{max-width:1180px; margin:0 auto; padding:0 32px;}
        @media (max-width:640px){ .wrap{padding:0 20px;} }
 
        .mesh{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(600px 500px at 12% 8%, rgba(16,185,129,0.14), transparent 60%),
            radial-gradient(700px 600px at 88% 18%, rgba(34,211,238,0.10), transparent 60%),
            radial-gradient(500px 500px at 50% 100%, rgba(16,185,129,0.06), transparent 60%);
        }
 
        header{
          position:sticky; top:0; left:0; right:0; z-index:100;
          background:rgba(10,10,15,0.6);
          backdrop-filter:blur(16px) saturate(140%);
          -webkit-backdrop-filter:blur(16px) saturate(140%);
          border-bottom:1px solid var(--border);
        }
        nav{ display:flex; align-items:center; justify-content:space-between; padding:18px 0; }
        .logo{ font-family:var(--font-mono); font-weight:600; font-size:15px; letter-spacing:0.02em; display:flex; align-items:center; gap:8px; }
        .logo .dot{width:8px; height:8px; border-radius:50%; background:var(--emerald); box-shadow:0 0 12px var(--emerald);}
        .nav-links{ display:flex; gap:36px; font-size:14px; color:var(--text-muted); }
        .nav-links a{transition:color .2s ease;}
        .nav-links a:hover{color:var(--text);}
        .nav-cta{
          font-family:var(--font-mono); font-size:13px; font-weight:500;
          padding:9px 18px; border-radius:10px;
          background:linear-gradient(135deg, var(--emerald), var(--cyan));
          color:#031312; font-weight:600;
          transition:transform .2s ease, box-shadow .2s ease;
        }
        .nav-cta:hover{transform:translateY(-2px); box-shadow:0 8px 24px rgba(16,185,129,0.35);}
        .nav-toggle{display:none; background:none; border:none; color:var(--text); font-size:22px; cursor:pointer;}
        @media (max-width:860px){
          .nav-links{
            position:fixed; top:64px; left:0; right:0; flex-direction:column; gap:0;
            background:rgba(10,10,15,0.97); backdrop-filter:blur(16px);
            border-bottom:1px solid var(--border);
            max-height:0; overflow:hidden; transition:max-height .3s ease;
          }
          .nav-links.open{max-height:360px;}
          .nav-links a{padding:16px 32px; display:block; border-bottom:1px solid var(--border);}
          .nav-toggle{display:block;}
        }
 
        section{padding:120px 0; position:relative; z-index:1;}
        @media (max-width:640px){ section{padding:80px 0;} }
        .eyebrow{
          font-family:var(--font-mono); font-size:12.5px; color:var(--emerald);
          letter-spacing:0.14em; text-transform:uppercase; margin-bottom:14px;
          display:flex; align-items:center; gap:10px;
        }
        .eyebrow::before{content:''; width:20px; height:1px; background:var(--emerald);}
        h1,h2,h3{font-family:var(--font-display); letter-spacing:-0.02em; margin:0;}
 
        .hero{ min-height:100vh; display:flex; align-items:center; padding-top:60px; }
        .hero-grid{ display:grid; grid-template-columns:1.05fr 0.95fr; gap:60px; align-items:center; }
        @media (max-width:900px){ .hero-grid{grid-template-columns:1fr; gap:48px;} }
 
        .hero-eyebrow{ font-family:var(--font-mono); font-size:13px; color:var(--cyan); display:flex; align-items:center; gap:10px; margin-bottom:22px; }
        .status-dot{width:7px; height:7px; border-radius:50%; background:var(--emerald); box-shadow:0 0 0 4px var(--emerald-soft); animation:pulse 2s infinite;}
        @keyframes pulse{0%,100%{opacity:1;} 50%{opacity:0.4;}}
 
        .hero h1{ font-size:clamp(38px, 5.4vw, 64px); font-weight:700; line-height:1.06; margin-bottom:22px; }
        .hero h1 .accent{
          background:linear-gradient(135deg, var(--emerald), var(--cyan));
          -webkit-background-clip:text; background-clip:text; color:transparent;
        }
        .hero p.lede{ font-size:17px; color:var(--text-muted); max-width:520px; margin-bottom:34px; margin-top:0; }
        .hero-actions{display:flex; gap:14px; flex-wrap:wrap; margin-bottom:44px;}
        .btn-primary{
          font-family:var(--font-body); font-weight:600; font-size:14.5px;
          padding:14px 26px; border-radius:11px;
          background:linear-gradient(135deg, var(--emerald), var(--cyan));
          color:#04150f;
          transition:transform .2s ease, box-shadow .2s ease;
          display:inline-flex; align-items:center; gap:8px;
        }
        .btn-primary:hover{transform:translateY(-2px); box-shadow:0 10px 28px rgba(16,185,129,0.35);}
        .btn-ghost{
          font-weight:600; font-size:14.5px; padding:14px 24px; border-radius:11px;
          border:1px solid var(--border-strong); color:var(--text);
          transition:background .2s ease, border-color .2s ease;
        }
        .btn-ghost:hover{background:var(--surface-hover); border-color:var(--emerald);}
 
        .hero-stats{display:flex; gap:34px;}
        .hero-stats div{border-left:2px solid var(--border-strong); padding-left:14px;}
        .hero-stats .num{font-family:var(--font-mono); font-size:22px; font-weight:600; color:var(--text);}
        .hero-stats .lbl{font-size:12.5px; color:var(--text-dim); margin-top:2px;}
 
        .terminal{
          background:linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border:1px solid var(--border-strong);
          border-radius:14px;
          overflow:hidden;
          box-shadow:0 24px 60px -20px rgba(0,0,0,0.6);
          backdrop-filter:blur(10px);
        }
        .term-bar{ display:flex; align-items:center; gap:8px; padding:13px 16px; background:rgba(255,255,255,0.03); border-bottom:1px solid var(--border); }
        .term-bar span{width:11px; height:11px; border-radius:50%;}
        .term-bar span:nth-child(1){background:#ff5f56;}
        .term-bar span:nth-child(2){background:#ffbd2e;}
        .term-bar span:nth-child(3){background:#27c93f;}
        .term-title{ margin-left:8px; font-family:var(--font-mono); font-size:12px; color:var(--text-dim); }
        .term-body{ padding:24px 22px; font-family:var(--font-mono); font-size:13.5px; min-height:300px; }
        .term-body .ln{margin-bottom:11px; opacity:1;}
        .term-prompt{color:var(--cyan);}
        .term-out{color:var(--text-muted); padding-left:18px;}
        .term-key{color:var(--emerald);}
        .cursor{display:inline-block; width:7px; height:15px; background:var(--emerald); vertical-align:middle; animation:blink 1s step-end infinite; margin-left:2px;}
        @keyframes blink{50%{opacity:0;}}
 
        .reveal{opacity:0; transform:translateY(24px); transition:opacity .7s ease, transform .7s ease;}
        .reveal.in{opacity:1; transform:translateY(0);}
 
        .section-head{max-width:640px; margin-bottom:56px;}
        .section-head h2{font-size:clamp(28px,3.4vw,40px); font-weight:600; margin-bottom:14px;}
        .section-head p{color:var(--text-muted); font-size:15.5px; margin:0;}
 
        .about-grid{display:grid; grid-template-columns:0.85fr 1.15fr; gap:56px; align-items:start;}
        @media (max-width:860px){ .about-grid{grid-template-columns:1fr;} }
       /* Avatar Card */
.avatar-card {
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1 / 1.1;

  margin: 0 auto;

  border-radius: 24px;
  overflow: hidden;
  position: relative;

  background: linear-gradient(
    160deg,
    rgba(16, 185, 129, 0.16),
    rgba(34, 211, 238, 0.08)
  );

  border: 1px solid var(--border-strong);
  box-shadow: 0 15px 35px rgba(16, 185, 129, 0.15);

  transition: all 0.35s ease;

  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 45px rgba(16, 185, 129, 0.25);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* ===========================
   Large Desktop (1440px+)
=========================== */
@media (min-width: 1440px) {
  .avatar-card {
    max-width: 380px;
  }
}

/* ===========================
   Laptop
=========================== */
@media (max-width: 1200px) {
  .avatar-card {
    max-width: 320px;
  }
}

/* ===========================
   Tablet
=========================== */
@media (max-width: 992px) {
  .avatar-card {
    max-width: 280px;
    border-radius: 20px;
  }
}

/* ===========================
   Mobile
=========================== */
@media (max-width: 768px) {
  .avatar-card {
    max-width: 240px;
    border-radius: 18px;
  }
}

/* ===========================
   Small Mobile
=========================== */
@media (max-width: 480px) {
  .avatar-card {
    max-width: 200px;
    border-radius: 16px;
  }
}
        .about-text p{color:var(--text-muted); font-size:15.5px; margin:0 0 18px 0;}
        .about-text p strong{color:var(--text); font-weight:600;}
        .about-tags{display:flex; flex-wrap:wrap; gap:10px; margin-top:26px;}
        .tag{ font-family:var(--font-mono); font-size:12.5px; padding:7px 13px; border-radius:8px; background:var(--surface); border:1px solid var(--border); color:var(--text-muted); }
 
        .skills-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:20px;}
        @media (max-width:860px){ .skills-grid{grid-template-columns:repeat(2,1fr);} }
        @media (max-width:560px){ .skills-grid{grid-template-columns:1fr;} }
        .skill-card{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:26px; transition:border-color .25s ease, transform .25s ease, background .25s ease; }
        .skill-card:hover{border-color:var(--emerald); transform:translateY(-4px); background:var(--surface-hover);}
        .skill-card .icon{
          width:40px; height:40px; border-radius:10px; margin-bottom:16px;
          display:flex; align-items:center; justify-content:center;
          background:var(--emerald-soft); color:var(--emerald); font-family:var(--font-mono); font-weight:600;
        }
        .skill-card h3{font-size:16px; font-weight:600; margin-bottom:10px;}
        .skill-card .chips{display:flex; flex-wrap:wrap; gap:8px;}
        .skill-card .chips span{ font-size:12px; font-family:var(--font-mono); color:var(--text-muted); padding:5px 10px; border-radius:6px; background:rgba(255,255,255,0.03); border:1px solid var(--border); }
 
        .projects-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:26px;}
        @media (max-width:860px){ .projects-grid{grid-template-columns:1fr;} }
        .project-card{ background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:32px; position:relative; overflow:hidden; transition:transform .3s ease, border-color .3s ease; }
        .project-card:hover{transform:translateY(-6px); border-color:var(--border-strong);}
        .project-index{font-family:var(--font-mono); font-size:12px; color:var(--text-dim); margin-bottom:16px;}
        .project-card h3{font-size:21px; font-weight:600; margin-bottom:12px;}
        .project-card p{color:var(--text-muted); font-size:14.5px; margin:0 0 20px 0;}
        .project-stack{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:22px;}
        .project-stack span{ font-family:var(--font-mono); font-size:11.5px; padding:5px 10px; border-radius:6px; background:rgba(34,211,238,0.08); color:var(--cyan); border:1px solid rgba(34,211,238,0.18); }
        .project-links{display:flex; gap:18px; font-size:13.5px; font-weight:600;}
        .project-links a{display:flex; align-items:center; gap:6px; color:var(--text); transition:color .2s ease;}
        .project-links a:hover{color:var(--emerald);}
 
        .timeline{position:relative; padding-left:32px; border-left:1px solid var(--border-strong); max-width:720px;}
        .timeline-item{position:relative; padding-bottom:8px;}
        .timeline-item::before{
          content:''; position:absolute; left:-38px; top:4px; width:14px; height:14px; border-radius:50%;
          background:var(--bg); border:2px solid var(--emerald); box-shadow:0 0 0 4px var(--emerald-soft);
        }
        .timeline-item .yr{font-family:var(--font-mono); color:var(--cyan); font-size:13px; margin-bottom:8px;}
        .timeline-item h3{font-size:20px; font-weight:600; margin-bottom:6px;}
        .timeline-item .school{color:var(--text-muted); font-size:14.5px; margin-bottom:10px;}
        .timeline-item .desc{color:var(--text-dim); font-size:14px; max-width:560px;}
 
        .ach-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:20px;}
        @media (max-width:860px){ .ach-grid{grid-template-columns:1fr;} }
        .ach-card{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:26px; }
        .ach-card .mark{font-family:var(--font-mono); color:var(--emerald); font-size:13px; margin-bottom:12px;}
        .ach-card h3{font-size:16.5px; font-weight:600; margin-bottom:8px;}
        .ach-card p{color:var(--text-muted); font-size:14px; margin:0;}
 
        .contact-grid{display:grid; grid-template-columns:0.9fr 1.1fr; gap:56px;}
        @media (max-width:860px){ .contact-grid{grid-template-columns:1fr;} }
        .contact-links{display:flex; flex-direction:column; gap:14px;}
        .contact-link{
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 22px; border-radius:14px; background:var(--surface); border:1px solid var(--border);
          transition:border-color .25s ease, transform .25s ease;
        }
        .contact-link:hover{border-color:var(--emerald); transform:translateX(4px);}
        .contact-link .l-name{font-weight:600; font-size:15px;}
        .contact-link .l-val{font-family:var(--font-mono); font-size:13px; color:var(--text-muted);}
        .contact-link .arrow{color:var(--emerald); font-family:var(--font-mono);}
 
        .form-card{ background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:32px; }
        .field{margin-bottom:18px;}
        .field label{display:block; font-size:13px; color:var(--text-muted); margin-bottom:8px; font-family:var(--font-mono);}
        .field input, .field textarea{
          width:100%; background:rgba(255,255,255,0.03); border:1px solid var(--border);
          border-radius:10px; padding:13px 15px; color:var(--text); font-family:var(--font-body); font-size:14px;
          transition:border-color .2s ease;
        }
        .field input:focus, .field textarea:focus{border-color:var(--emerald); outline:none;}
        .field textarea{resize:vertical; min-height:100px;}
        .submit-btn{
          width:100%; font-weight:600; font-size:14.5px; padding:14px; border-radius:11px;
          background:linear-gradient(135deg, var(--emerald), var(--cyan)); color:#04150f;
          transition:transform .2s ease, box-shadow .2s ease; cursor:pointer; border:none;
        }
        .submit-btn:hover{transform:translateY(-2px); box-shadow:0 10px 28px rgba(16,185,129,0.3);}
        .form-note{font-size:12.5px; color:var(--text-dim); margin-top:12px; text-align:center; display:none;}
        .form-note.show{display:block;}
 
        footer{ border-top:1px solid var(--border); padding:32px 0; text-align:center; color:var(--text-dim); font-size:13px; font-family:var(--font-mono); position:relative; z-index:1; }
        footer .dot{color:var(--emerald);}
      `}</style>

      <div className="mesh"></div>

      <header>
        <div className="wrap">
          <nav>
            <a href="#home" className="logo">
              <span className="dot"></span>Ayush
            </a>
            <ul className={`nav-links${navOpen ? " open" : ""}`}>
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} onClick={() => setNavOpen(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="nav-cta">
              Let's talk
            </a>
            <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setNavOpen((v) => !v)}>
              ☰
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">
                <span className="status-dot"></span> AVAILABLE FOR SDE INTERNSHIPS
              </div>
              <h1>
                Hi, I'm Ayush.
                <br />
                I build <span className="accent">full-stack</span>
                <br />
                software that works.
              </h1>
              <p className="lede">
                Fourth-year Computer Science undergraduate at ABES Engineering College, focused on the MERN stack, REST
                APIs, and Data Structures &amp; Algorithms — turning problems into shipped products.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn-primary">
                  View Projects →
                </a>
                <a href="#contact" className="btn-ghost">
                  Get in touch
                </a>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="num">4th Yr</div>
                  <div className="lbl">B.Tech CSE</div>
                </div>
                <div>
                  <div className="num">MERN</div>
                  <div className="lbl">Primary stack</div>
                </div>
                <div>
                  <div className="num">DSA</div>
                  <div className="lbl">Daily practice</div>
                </div>
              </div>
            </div>
            <Terminal />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">About</div>
            <h2>Designing solutions, not just visuals</h2>
          </div>
          <div className="about-grid reveal">
            <div className="avatar-card">
              <img
                src={profilePic}
                alt="Ayush"
                className="profile-image"
              />
            </div>
            <div className="about-text">
              <p>
                <strong>I'm Ayush</strong>, a fourth-year Computer Science undergraduate at ABES Engineering College
                with a genuine passion for full-stack web development, Data Structures &amp; Algorithms, and software
                engineering.
              </p>
              <p>
                I enjoy building real-world applications, solving programming problems, and continuously learning
                modern technologies. My goal is to become a <strong>Software Development Engineer</strong> and
                contribute to products that matter.
              </p>
              <p>
                Right now I'm sharpening my problem-solving skills, shipping personal full-stack projects, and
                actively looking for <strong>SDE internship and full-time opportunities</strong> where I can learn
                fast and build things people use.
              </p>
              <div className="about-tags">
                <span className="tag">Full-Stack Development</span>
                <span className="tag">REST APIs</span>
                <span className="tag">DSA &amp; Problem Solving</span>
                <span className="tag">Responsive Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Skills</div>
            <h2>Expertise &amp; toolkit</h2>
            <p>The languages, frameworks, and tools I use to design, build, and ship full-stack applications.</p>
          </div>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div className="skill-card reveal" key={s.title}>
                <div className="icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <div className="chips">
                  {s.chips.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Projects</div>
            <h2>Things I've Built</h2>
            <p>
              Full-stack applications and modern web experiences built from
              concept to deployment.
            </p>
          </div>

          <div className="projects-grid">
            {PROJECTS.map((project) => (
              <div className="project-card reveal" key={project.title}>
                <div className="project-index">{project.index}</div>

                <h3>{project.title}</h3>

                <p>{project.desc}</p>

                <div className="project-stack">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub ↗
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Education</div>
            <h2>Academic background</h2>
          </div>
          <div className="timeline reveal">
            <div className="timeline-item">
              <div className="yr">2023 — Present</div>
              <h3>Bachelor of Technology (B.Tech), Computer Science</h3>
              <div className="school">ABES Engineering College, Ghaziabad</div>
              <div className="desc">
                Currently in my fourth year, focusing on full-stack web development, Data Structures &amp; Algorithms,
                and software engineering fundamentals alongside coursework.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Achievements</div>
            <h2>Highlights along the way</h2>
          </div>
          <div className="ach-grid">
            {ACHIEVEMENTS.map((a) => (
              <div className="ach-card reveal" key={a.title}>
                <div className="mark">◆</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">Contact</div>
            <h2>Let's build something together</h2>
            <p>Open to SDE internships, full-time roles, and interesting full-stack projects. Reach out through any of the channels below.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-links reveal">
              <a className="contact-link" href="mailto:kumarayush68192@gmail.com">
                <div>
                  <div className="l-name">Email</div>
                  <div className="l-val">kumarayush68192@gmail.com</div>
                </div>
                <span className="arrow">→</span>
              </a>
              <a className="contact-link" href="https://github.com/Ayush-prajapati1" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="l-name">GitHub</div>
                  <div className="l-val">github.com/Ayush-prajapati1</div>
                </div>
                <span className="arrow">→</span>
              </a>
              <a className="contact-link" href="https://www.linkedin.com/in/ayush-kumar-46447a309" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="l-name">LinkedIn</div>
                  <div className="l-val">linkedin.com/in/ayush-kumar-46447a309</div>
                </div>
                <span className="arrow">→</span>
              </a>
            </div>
            <form className="form-card reveal" onSubmit={handleSubmit}>
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="field">
                <label>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the opportunity or project..."
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>

              {formNote && (
                <div className="form-note show">
                  {formNote}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          Built by Ayush <span className="dot">•</span> © 2026
        </div>
      </footer>
    </div>
  );
}

