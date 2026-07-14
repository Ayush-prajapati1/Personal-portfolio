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
    desc: "Solved 500+ coding problems across LeetCode, CodeChef, and Codeforces while strengthening algorithmic thinking and problem-solving skills.",
  },
  {
    title: "Full-Stack Projects",
    desc: "Built and deployed multiple MERN applications, focusing on clean architecture, responsive UI, authentication, and REST APIs.",
  },
  {
    title: "ACPC Coding Contest",
    desc: "Achieved 2nd Runner-Up in the college-level ACPC Coding Contest, showcasing strong skills in Data Structures, Algorithms, and competitive programming.",
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

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
          --bg-dark: #090514;
          --bg-light: #f1eff6;
          --surface-dark: rgba(139, 92, 246, 0.03);
          --surface-light: rgba(139, 92, 246, 0.015);
          --border-dark: rgba(167, 139, 250, 0.12);
          --border-strong: rgba(167, 139, 250, 0.25);
          --text-dark: #090514;
          --text-light: #f5f3ff;
          --text-muted-dark: #5d5870;
          --text-muted-light: #a39fbd;
          --text-dim: #65617a;
          --radius: 16px;
          --font-display: 'Space Grotesk', sans-serif;
          --font-body: 'Plus Jakarta Sans', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;

          --purple-primary: #8b5cf6;
          --purple-light: #c084fc;
          --purple-soft: rgba(139, 92, 246, 0.12);
          --purple-border: rgba(139, 92, 246, 0.2);
 
          background: var(--bg-dark);
          color: var(--text-light);
          font-family: var(--font-body);
          line-height: 1.6;
          min-height: 100vh;
          width: 100%;
          min-width: 100vw;
          position: relative;
          overflow-x: hidden;
        }
        .portfolio-root *{box-sizing:border-box;}
        .portfolio-root html{scroll-behavior:smooth;}
        .portfolio-root a{color:inherit; text-decoration:none;}
        .portfolio-root ul{list-style:none; margin:0; padding:0;}
        .portfolio-root :focus-visible{outline:2px solid var(--purple-light); outline-offset:3px;}
 
        .wrap{max-width:1180px; margin:0 auto; padding:0 32px;}
        @media (max-width:640px){ .wrap{padding:0 20px;} }
 
        .mesh{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(600px 500px at 12% 8%, rgba(139, 92, 246, 0.06), transparent 60%),
            radial-gradient(700px 600px at 88% 18%, rgba(192, 132, 252, 0.04), transparent 60%),
            radial-gradient(500px 500px at 50% 100%, rgba(139, 92, 246, 0.02), transparent 60%);
        }
 
        header{
          position:sticky; top:0; left:0; right:0; z-index:100;
          background:rgba(9, 5, 20, 0.85);
          backdrop-filter:blur(16px) saturate(140%);
          -webkit-backdrop-filter:blur(16px) saturate(140%);
          border-bottom:1px solid var(--border-dark);
        }
        nav{ display:flex; align-items:center; justify-content:space-between; padding:18px 0; }
        .logo{ font-family:var(--font-display); font-weight:700; font-size:18px; letter-spacing:-0.01em; display:flex; align-items:center; gap:8px; color:#ffffff; }
        .logo .dot{width:8px; height:8px; border-radius:50%; background:var(--purple-primary); box-shadow: 0 0 10px var(--purple-primary);}
        .nav-links{ display:flex; gap:36px; font-size:14px; color:var(--text-muted-light); font-weight: 500; }
        .nav-links a{transition:color .2s ease;}
        .nav-links a:hover{color:var(--purple-light);}
        .nav-cta{
          font-family:var(--font-mono); font-size:13px; font-weight:600;
          padding:10px 24px; border-radius:30px;
          background:var(--purple-primary);
          color:#ffffff;
          transition:all .2s ease;
        }
        .nav-cta:hover{
          transform:translateY(-2px); 
          background:transparent;
          color:var(--purple-light);
          box-shadow: 0 0 0 1px var(--purple-light);
        }
        .nav-toggle{display:none; background:none; border:none; color:#ffffff; font-size:22px; cursor:pointer;}
        @media (max-width:860px){
          .nav-links{
            position:fixed; top:64px; left:0; right:0; flex-direction:column; gap:0;
            background:rgba(9,5,20,0.98); backdrop-filter:blur(16px);
            border-bottom:1px solid var(--border-dark);
            max-height:0; overflow:hidden; transition:max-height .3s ease;
          }
          .nav-links.open{max-height:360px;}
          .nav-links a{padding:16px 32px; display:block; border-bottom:1px solid var(--border-dark);}
          .nav-toggle{display:block;}
        }
 
        section{padding:120px 0; position:relative; z-index:1;}
        @media (max-width:640px){ section{padding:80px 0;} }
        
        .eyebrow{
          font-family:var(--font-mono); font-size:12.5px; color:var(--purple-light);
          letter-spacing:0.14em; text-transform:uppercase; margin-bottom:14px;
          display:flex; align-items:center; gap:10px;
        }
        .eyebrow::before{content:''; width:20px; height:1px; background:var(--purple-light);}
        h1,h2,h3{font-family:var(--font-display); letter-spacing:-0.02em; margin:0;}
 
        .hero{ min-height:100vh; display:flex; align-items:center; padding-top:60px; background: linear-gradient(108deg, var(--bg-light) 52%, var(--bg-dark) 52%); }
        .hero-grid{ display:grid; grid-template-columns:1.05fr 0.95fr; gap:60px; align-items:center; }
        
        .hero-left { color: var(--text-dark); }
        .hero-eyebrow{ font-family:var(--font-mono); font-size:13px; color:#5d5870; display:flex; align-items:center; gap:10px; margin-bottom:22px; }
        .status-dot{width:7px; height:7px; border-radius:50%; background:var(--purple-primary); box-shadow:0 0 0 4px rgba(139,92,246,0.2); animation:pulse 2s infinite;}
        @keyframes pulse{0%,100%{opacity:1;} 50%{opacity:0.4;}}
 
        .hero h1{ font-size:clamp(38px, 5.4vw, 64px); font-weight:700; line-height:1.06; margin-bottom:22px; color:var(--text-dark); }
        .hero h1 .accent{ color:var(--purple-primary); }
        .hero p.lede{ font-size:17px; color:#3d3850; max-width:520px; margin-bottom:34px; margin-top:0; }
        .hero-actions{display:flex; gap:14px; flex-wrap:wrap; margin-bottom:32px; align-items:center;}
        .btn-primary{
          font-family:var(--font-body); font-weight:600; font-size:14.5px;
          padding:14px 26px; border-radius:11px;
          background:var(--purple-primary);
          color:#ffffff;
          transition:transform .2s ease, background .2s ease, box-shadow .2s ease;
          display:inline-flex; align-items:center; gap:8px;
        }
        .btn-primary:hover{transform:translateY(-2px); background:#7c3aed; box-shadow:0 8px 24px rgba(139,92,246,0.35);}
        .btn-ghost{
          font-weight:600; font-size:14.5px; padding:14px 24px; border-radius:11px;
          border:1px solid rgba(139,92,246,0.3); color:var(--purple-primary);
          transition:background .2s ease, border-color .2s ease;
        }
        .btn-ghost:hover{background:rgba(139,92,246,0.06); border-color:var(--purple-primary);}

        .hero-socials { display: flex; gap: 12px; }
        .social-btn {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #e8e5f0;
          border: 1px solid rgba(139, 92, 246, 0.15);
          color: var(--purple-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }
        .social-btn:hover {
          background: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(139,92,246,0.15);
          border-color: var(--purple-primary);
        }
        .social-btn svg { display: block; }
        .social-btn .icon { font-family: var(--font-mono); font-weight: 700; font-size: 14px; }
 
        .hero-stats{display:flex; gap:34px;}
        .hero-stats div{border-left:2px solid rgba(139,92,246,0.2); padding-left:14px;}
        .hero-stats .num{font-family:var(--font-mono); font-size:22px; font-weight:600; color:var(--text-dark);}
        .hero-stats .lbl{font-size:12.5px; color:#5d5870; margin-top:2px;}
 
        .terminal{
          background:linear-gradient(180deg, rgba(139, 92, 246, 0.05), rgba(139, 92, 246, 0.01));
          border:1px solid rgba(167, 139, 250, 0.15);
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 30px 70px rgba(0,0,0,0.6);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
        }
        .term-bar{ display:flex; align-items:center; gap:8px; padding:16px 20px; background:rgba(139, 92, 246, 0.03); border-bottom:1px solid rgba(167, 139, 250, 0.1); }
        .term-bar span{width:11px; height:11px; border-radius:50%;}
        .term-bar span:nth-child(1){background:#ff5f56;}
        .term-bar span:nth-child(2){background:#ffbd2e;}
        .term-bar span:nth-child(3){background:#27c93f;}
        .term-title{ margin-left:8px; font-family:var(--font-mono); font-size:12px; color:var(--text-dim); }
        .term-body{ padding:24px 22px; font-family:var(--font-mono); font-size:13.5px; min-height:300px; }
        .term-body .ln{margin-bottom:11px; opacity:1;}
        .term-prompt{color:var(--purple-light);}
        .term-out{color:var(--text-muted-light); padding-left:18px;}
        .term-key{color:#ffffff; font-weight:600;}
        .cursor{display:inline-block; width:7px; height:15px; background:var(--purple-light); vertical-align:middle; animation:blink 1s step-end infinite; margin-left:2px;}
        @keyframes blink{50%{opacity:0;}}
 
        .reveal{opacity:0; transform:translateY(24px); transition:opacity .7s ease, transform .7s ease;}
        .reveal.in{opacity:1; transform:translateY(0);}
 
        .section-head{max-width:640px; margin-bottom:72px;}
        .section-head h2{font-size:clamp(32px,4vw,48px); font-weight:700; margin-bottom:16px; letter-spacing:-0.02em;}
        .section-head p{color:var(--text-muted-light); font-size:16px; margin:0;}
 
        .about-grid{display:grid; grid-template-columns:0.9fr 1.1fr; gap:72px; align-items:center;}
        @media (max-width:860px){ .about-grid{grid-template-columns:1fr; gap:48px;} }

        .avatar-container {
          position: relative;
          border-radius: 24px;
          background: #0f0924;
          border: 1px solid var(--border-strong);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          aspect-ratio: 0.85;
          max-width: 380px;
          margin: 0 auto;
          transition: all 0.4s ease;
        }
        .avatar-container:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 60px rgba(139, 92, 246, 0.05);
          border-color: var(--purple-light);
        }
        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) contrast(1.15) brightness(0.9);
          transition: filter 0.4s ease;
        }
        .avatar-container:hover .avatar-image {
          filter: grayscale(0.1) contrast(1.05) brightness(1);
        }

        .about-text p{color:var(--text-muted-light); font-size:16px; margin:0 0 20px 0; line-height:1.7;}
        .about-text p strong{color:#ffffff; font-weight:600;}
        .about-tags{display:flex; flex-wrap:wrap; gap:10px; margin-top:26px;}
        .tag{ font-family:var(--font-mono); font-size:12.5px; padding:8px 14px; border-radius:8px; background:var(--purple-soft); border:1px solid var(--border-dark); color:var(--purple-light); }

        .about-coding-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 24px;
          margin-bottom: 24px;
        }
        @media (max-width: 640px) {
          .about-coding-links {
            grid-template-columns: 1fr;
          }
        }
        
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 32px;
        }
        .about-stat-card {
          background: var(--surface-dark);
          border: 1px solid var(--border-dark);
          border-radius: 12px;
          padding: 18px 20px;
          text-align: left;
          transition: border-color 0.25s;
        }
        .about-stat-card:hover {
          border-color: var(--purple-primary);
        }
        .about-stat-card .num {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          color: var(--purple-light);
        }
        .about-stat-card .lbl {
          font-size: 12px;
          color: var(--text-muted-light);
          margin-top: 4px;
          line-height: 1.3;
        }
 
        .skills-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:24px;}
        @media (max-width:860px){ .skills-grid{grid-template-columns:repeat(2,1fr);} }
        @media (max-width:560px){ .skills-grid{grid-template-columns:1fr;} }
        .skill-card{ background:rgba(139, 92, 246, 0.015); border:1px solid rgba(167, 139, 250, 0.08); border-radius:20px; padding:32px; transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .skill-card:hover{border-color:var(--purple-primary); transform:translateY(-4px); background:rgba(139, 92, 246, 0.035);}
        .skill-card .icon{
          width:fit-content; height:auto; border-radius:8px; margin-bottom:24px;
          padding: 6px 12px; border: 1px solid rgba(167, 139, 250, 0.15);
          display:flex; align-items:center; justify-content:center;
          background:var(--purple-soft); color:var(--purple-light); font-family:var(--font-mono); font-weight:600; font-size:13px;
        }
        .skill-card h3{font-size:18px; font-weight:600; margin-bottom:16px; font-family:var(--font-display);}
        .skill-card .chips{display:flex; flex-wrap:wrap; gap:8px;}
        .skill-card .chips span{ font-size:12px; font-family:var(--font-mono); color:var(--text-muted-light); padding:6px 12px; border-radius:8px; background:rgba(139, 92, 246, 0.01); border:1px solid rgba(167, 139, 250, 0.08); transition: all 0.2s; }
        .skill-card .chips span:hover { background: var(--purple-primary); color: #ffffff; border-color: var(--purple-primary); }
 
        .projects-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:32px;}
        @media (max-width:860px){ .projects-grid{grid-template-columns:1fr;} }
        .project-card{ background:rgba(139, 92, 246, 0.015); border:1px solid rgba(167, 139, 250, 0.08); border-radius:24px; padding:40px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1); min-height:380px; }
        .project-card:hover{transform:translateY(-6px); border-color:rgba(167, 139, 250, 0.3); background:rgba(139, 92, 246, 0.035);}
        .project-index{font-family:var(--font-mono); font-size:13px; color:var(--text-dim); margin-bottom:24px; letter-spacing:0.05em;}
        .project-card h3{font-size:26px; font-weight:600; margin-bottom:16px; font-family:var(--font-display);}
        .project-card p{color:var(--text-muted-light); font-size:15px; margin:0 0 28px 0; line-height:1.6;}
        .project-stack{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px;}
        .project-stack span{ font-family:var(--font-mono); font-size:12px; padding:6px 12px; border-radius:8px; background:var(--purple-soft); color:var(--purple-light); border:1px solid rgba(167, 139, 250, 0.15); }
        .project-links{display:flex; gap:24px; font-size:14px; font-weight:600;}
        .project-links a{display:inline-flex; align-items:center; gap:6px; color:#ffffff; position:relative; padding-bottom:2px;}
        .project-links a::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: var(--purple-light);
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }
        .project-links a:hover{color:var(--purple-light);}
        .project-links a:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
 
        .timeline { position: relative; padding-left: 40px; max-width: 800px; }
        .timeline::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: rgba(139, 92, 246, 0.15);
        }
        .timeline-item{position:relative; padding-bottom:48px;}
        .timeline-item:last-child{padding-bottom:0;}
        .timeline-item::before{
          content:''; position:absolute; left:-40px; top:6px; width:16px; height:16px; border-radius:50%;
          background:#090514; border:2px solid var(--purple-primary); box-shadow:0 0 0 6px rgba(139,92,246,0.15); z-index:2;
        }
        .timeline-item .yr{font-family:var(--font-mono); color:var(--purple-light); font-size:13px; margin-bottom:12px; letter-spacing:0.05em;}
        .timeline-item h3{font-size:22px; font-weight:600; margin-bottom:8px; font-family:var(--font-display); letter-spacing:-0.01em;}
        .timeline-item .school{color:#ffffff; font-size:15px; font-weight:500; margin-bottom:12px;}
        .timeline-item .desc{color:var(--text-muted-light); font-size:14.5px; max-width:600px;}
 
        .ach-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:24px;}
        @media (max-width:860px){ .ach-grid{grid-template-columns:1fr; gap:20px;} }
        .ach-card{ background:rgba(139, 92, 246, 0.015); border:1px solid rgba(167, 139, 250, 0.08); border-radius:20px; padding:32px; transition: all 0.3s; }
        .ach-card:hover{border-color:var(--purple-primary); transform:translateY(-4px); background:rgba(139, 92, 246, 0.035);}
        .ach-card .mark{font-family:var(--font-mono); color:var(--purple-light); font-size:14px; margin-bottom:20px;}
        .ach-card h3{font-size:18px; font-weight:600; margin-bottom:12px; font-family:var(--font-display); letter-spacing:-0.01em;}
        .ach-card p{color:var(--text-muted-light); font-size:14.5px; line-height:1.6;}
 
        .contact-grid{display:grid; grid-template-columns:0.9fr 1.1fr; gap:72px;}
        @media (max-width:860px){ .contact-grid{grid-template-columns:1fr; gap:48px;} }
        .contact-links{display:flex; flex-direction:column; gap:16px;}
        .contact-link{
          display:flex; align-items:center; justify-content:space-between;
          padding:24px; border-radius:16px; background:rgba(139, 92, 246, 0.015); border:1px solid rgba(167, 139, 250, 0.08);
          transition:all 0.3s ease;
        }
        .contact-link:hover{border-color:var(--purple-primary); transform:translateX(6px); background:rgba(139, 92, 246, 0.035);}
        .contact-link .l-name{font-weight:600; font-size:15px;}
        .contact-link .l-val{font-family:var(--font-mono); font-size:13px; color:var(--text-muted-light); margin-top:4px;}
        .contact-link .arrow{color:var(--purple-light); font-family:var(--font-mono); font-size:16px; transition:transform 0.25s;}
        .contact-link:hover .arrow{transform:translateX(4px);}
 
        .form-card{ background:rgba(139, 92, 246, 0.015); border:1px solid rgba(167, 139, 250, 0.08); border-radius:24px; padding:40px; }
        .field{margin-bottom:24px;}
        .field label{display:block; font-size:12px; font-weight:600; color:var(--text-muted-light); margin-bottom:10px; font-family:var(--font-mono); letter-spacing:0.05em;}
        .field input, .field textarea{
          width:100%; background:rgba(9, 5, 20, 0.3); border:1px solid rgba(167, 139, 250, 0.15);
          border-radius:12px; padding:16px 20px; color:#ffffff; font-family:var(--font-body); font-size:14.5px;
          transition:all 0.25s ease;
        }
        .field input:focus, .field textarea:focus{border-color:var(--purple-primary); background:rgba(9, 5, 20, 0.5); outline:none; box-shadow:0 0 0 1px var(--purple-primary);}
        .field textarea{resize:vertical; min-height:120px;}
        .submit-btn{
          width:100%; font-weight:600; font-size:15px; padding:16px; border-radius:12px;
          background:var(--purple-primary); color:#ffffff;
          transition:all 0.25s ease; cursor:pointer; border:none;
        }
        .submit-btn:hover{transform:translateY(-2px); background:#7c3aed; box-shadow:0 10px 30px rgba(139,92,246,0.3);}
        .form-note{font-size:12.5px; color:var(--text-dim); margin-top:12px; text-align:center; display:none;}
        .form-note.show{display:block;}
 
        footer{ border-top:1px solid rgba(167, 139, 250, 0.08); padding:48px 0; text-align:center; color:var(--text-dim); font-size:13px; font-family:var(--font-mono); position:relative; z-index:1; }
        footer .dot{color:var(--purple-primary);}

        /* Media queries for splits and layout responsiveness */
        @media (max-width:900px){
          .hero-grid{grid-template-columns:1fr; gap:48px;}
          .hero {
            background: #090514;
            color: #ffffff;
            padding-top: 100px;
          }
          .hero-left {
            color: #ffffff;
          }
          .hero h1 {
            color: #ffffff !important;
          }
          .hero h1 .accent {
            color: var(--purple-light) !important;
          }
          .hero p.lede {
            color: var(--text-muted-light) !important;
          }
          .hero-eyebrow {
            color: #ffffff !important;
          }
          .status-dot {
            background: var(--purple-light) !important;
            box-shadow: 0 0 0 4px rgba(192, 132, 252, 0.2) !important;
          }
          .btn-primary {
            background: var(--purple-primary) !important;
            color: #ffffff !important;
          }
          .btn-ghost {
            border-color: rgba(192, 132, 252, 0.4) !important;
            color: var(--purple-light) !important;
          }
          .social-btn {
            background: rgba(139,92,246,0.08) !important;
            border-color: rgba(167,139,250,0.2) !important;
            color: var(--purple-light) !important;
          }
          .social-btn:hover {
            background: var(--purple-primary) !important;
            color: #ffffff !important;
            border-color: var(--purple-primary) !important;
          }
          .hero-stats div {
            border-left-color: rgba(167, 139, 250, 0.2) !important;
          }
          .hero-stats .num {
            color: #ffffff !important;
          }
          .hero-stats .lbl {
            color: var(--text-muted-light) !important;
          }
        }
        @media (max-width: 640px) {
          .skills-grid, .projects-grid, .ach-grid {
            grid-template-columns: 1fr;
          }
          section {
            padding: 80px 0;
          }
          .about-stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .project-card {
            padding: 28px;
          }
          .form-card {
            padding: 28px;
          }
        }
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
            <div className="hero-left">
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
                
                <div className="hero-socials">
                  <a href="mailto:kumarayush68192@gmail.com" className="social-btn" title="Email">
                    <span className="icon">@</span>
                  </a>
                  <a href="https://github.com/Ayush-prajapati1" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                    <span className="icon">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                      </svg>
                    </span>
                  </a>
                  <a href="https://www.linkedin.com/in/ayush-kumar-46447a309" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
                    <span className="icon">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </span>
                  </a>
                </div>
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
            <div className="avatar-container">
              <img
                src={profilePic}
                alt="Ayush"
                className="avatar-image"
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

              <div className="about-coding-links">
                <a className="contact-link" href="https://leetcode.com/u/1912ayush/" target="_blank" rel="noopener noreferrer">
                  <div>
                    <div className="l-name">Leetcode</div>
                    <div className="l-val">leetcode.com/u/1912ayush/</div>
                  </div>
                  <span className="arrow">→</span>
                </a>
                
                <a className="contact-link" href="https://www.codechef.com/users/ayush1197" target="_blank" rel="noopener noreferrer">
                  <div>
                    <div className="l-name">Codechef</div>
                    <div className="l-val">codechef.com/users/ayush1197</div>
                  </div>
                  <span className="arrow">→</span>
                </a>
              </div>

              <div className="about-tags">
                <span className="tag">Full-Stack Development</span>
                <span className="tag">REST APIs</span>
                <span className="tag">DSA &amp; Problem Solving</span>
                <span className="tag">Responsive Design</span>
              </div>

              <div className="about-stats-grid">
                <div className="about-stat-card">
                  <div className="num">500+</div>
                  <div className="lbl">DSA Problems Solved</div>
                </div>
                <div className="about-stat-card">
                  <div className="num">2nd R-Up</div>
                  <div className="lbl">ACPC Coding Contest</div>
                </div>
                <div className="about-stat-card">
                  <div className="num">MERN</div>
                  <div className="lbl">Full-Stack Stack</div>
                </div>
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
                <div>
                  <div className="project-index">{project.index}</div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
                <div>
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
            <h2>Academic Journey</h2>
            <p>
              My educational background that shaped my problem-solving and software
              development skills.
            </p>
          </div>

          <div className="timeline reveal">
            <div className="timeline-item">
              <div className="yr">2023 — Present</div>
              <h3>B.Tech in Computer Science</h3>
              <div className="school">
                ABES Engineering College, Ghaziabad
              </div>
              <div className="desc">
                Pursuing Bachelor of Technology in Computer Science with a focus on
                Full-Stack Development, Data Structures & Algorithms, Operating
                Systems and DBMS.
              </div>
            </div>

            <div className="timeline-item">
              <div className="yr">2023</div>
              <h3>Senior Secondary (Class XII)</h3>
              <div className="school">
                CH Charan Singh Memorial Public School, Ghaziabad
              </div>
              <div className="desc">
                Completed Higher Secondary Education in the <strong>PCM (Physics, Chemistry & Mathematics)</strong> stream, building a strong foundation in analytical thinking and mathematics.
              </div>
            </div>

            <div className="timeline-item">
              <div className="yr">2021</div>
              <h3>Secondary (Class X)</h3>
              <div className="school">
                CH Charan Singh Memorial Public School, Ghaziabad
              </div>
              <div className="desc">
                Completed primary education with strong academic focus on mathematics and science.
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
