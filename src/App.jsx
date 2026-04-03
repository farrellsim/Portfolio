import { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";

/* ─── DATA ────────────────────────────────────────── */
const data = {
  name: "Xaviero Kenjiro Farrell",
  lastName: "Simangasing",
  titles: [
    "Software Engineer",
    "Human, but AI Optimised",
    "Part-time Gamer",
    "Tech Enthusiast",
  ],
  email: "farrellsim09@gmail.com",
  phone: "(+60) 1126213417",
  linkedin: "linkedin.com/in/xavierokenjirofarrell",
  github: "github.com/farrellsim",
  instagram: "instagram.com/farrell.sim",
  bio: "Final-year Software Engineering student at Taylor's University with hands-on experience across software development, web technologies, AI automation, quality assurance, and project management. I'm passionate about building reliable, scalable solutions while ensuring both functionality and user experience are well thought out.\n\nA tech enthusiast by nature, I enjoy continuously learning and improving — whether it's refining code, optimising processes, or exploring new tools. Outside of tech, I stay active through sports, unwind with games, and am currently working on improving my golf game, one swing at a time.",
  stats: [
    { value: 472, suffix: "+", label: "☕ Cups of Coffee" },
    {
      value: 99,
      suffix: "%",
      label: "🐛 Bugs Fixed*",
      footnote: "*created new ones",
    },
    { value: 3, suffix: "am", label: "🌙 Avg. Bedtime" },
    { value: 47, suffix: " tabs", label: "😅 Always Open" },
  ],
  experience: [
    {
      role: "Software Engineer Intern",
      company: "Hostelent",
      location: "Surabaya, Indonesia",
      period: "Jan 2024 — Jun 2024",
      type: "Internship",
      points: [
        "Assisted in UI/UX redesign of web interfaces, improving consistency across multiple pages and enhancing overall usability.",
        "Performed website testing across 20+ features, identifying bugs and usability issues before production deployment.",
        "Collaborated with developers and designers to refine workflows and maintain design accuracy during implementation.",
      ],
    },
  ],
  projects: [
    {
      name: "DigiSahabat",
      subtitle: "Final Year Project — Digital Literacy App",
      stack: ["React Native", "TailwindCSS", "Node.js", "MongoDB", "Gemini AI"],
      points: [
        "Developed a culturally adaptive digital literacy mobile app for Orang Asli communities.",
        "Built accessible UI with AI-powered voice assistance and chat guidance for low-literacy users.",
        "Conducted user research and iterative testing across connectivity and language challenges.",
      ],
      accent: "#00d4aa",
      video: "https://www.youtube.com/embed/CXhs7iIb_ho",
    },
    {
      name: "Smart CV Analyzer",
      subtitle: "University Project — AI Resume Tool",
      stack: ["JavaScript", "HTML/CSS", "MySQL", "Gemini AI"],
      points: [
        "Developed a web-based CV evaluation system allowing users to submit resumes for automated analysis.",
        "Integrated Gemini AI API to generate feedback on CV clarity, structure, and job relevance.",
        "Designed a responsive interface with database storage for user submissions and results.",
      ],
      accent: "#6366f1",
    },
    {
      name: "DoomParade",
      subtitle: "University Project — Tower Defense Game",
      stack: ["Java", "JavaFX"],
      points: [
        "Developed a tower defence game using Java and JavaFX with full gameplay mechanics.",
        "Implemented enemy movement, tower placement, and attack systems.",
        "Applied OOP principles to structure modular game logic and interactions.",
      ],
      accent: "#f59e0b",
    },
  ],
  skills: [
    { name: "JavaScript", level: 85 },
    { name: "React.js / Next.js", level: 80 },
    { name: "React Native", level: 75 },
    { name: "Python", level: 72 },
    { name: "Java", level: 70 },
    { name: "Node.js", level: 68 },
    { name: "MySQL / MongoDB", level: 72 },
    { name: "HTML / CSS", level: 90 },
    { name: "C++", level: 55 },
    { name: "Figma / UI Design", level: 80 },
  ],
  tools: ["Figma", "Canva", "CapCut", "Excel", "n8n", "Git", "VS Code"],
  education: {
    school: "Taylor's University",
    degree: "B.S. in Software Engineering (Honors)",
    location: "Subang Jaya, Selangor",
    period: "Sep 2023 — Aug 2026",
    gpa: "3.44",
  },
  leadership: {
    role: "Head of Visual Marketing",
    org: "Taylor's University Agents of Tech Club",
    period: "Oct 2023 — Jul 2025",
    points: [
      "Led visual marketing campaigns growing the club's following by 1,000+ users.",
      "Organised ImagineHack 2024, ImagineHack 2025, and the NexTech Conference.",
      "Coordinated with Hilti, PayNet, Deriv, Accenture, and Deloitte for sponsorships.",
    ],
  },
};

/* ─── PARTICLES CANVAS ────────────────────────────── */
function ParticleCanvas({ theme }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        )
          this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        const a = themeRef.current === 'light' ? this.alpha * 0.5 : this.alpha;
        ctx.fillStyle = `rgba(0,212,170,${a})`;
        ctx.fill();
      }
    }

    resize();
    for (let i = 0; i < 80; i++) particles.push(new Particle());
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineA = themeRef.current === 'light' ? 0.04 : 0.08;
            ctx.strokeStyle = `rgba(0,212,170,${lineA * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ─── TYPING EFFECT ───────────────────────────────── */
function TypeWriter({ items }) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = items[idx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIdx < current.length) {
            setText(current.slice(0, charIdx + 1));
            setCharIdx((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          if (charIdx > 0) {
            setText(current.slice(0, charIdx - 1));
            setCharIdx((c) => c - 1);
          } else {
            setDeleting(false);
            setIdx((i) => (i + 1) % items.length);
          }
        }
      },
      deleting ? 50 : 90,
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, items]);

  return (
    <span className="typewriter">
      {text}
      <span className="cursor">|</span>
    </span>
  );
}

/* ─── SCROLL REVEAL ───────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ─── COUNTER ─────────────────────────────────────── */
function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const timerRef = useRef(null);

  const runCycle = useCallback(() => {
    setCount(0);
    const dur = 1800,
      steps = 60;
    let step = 0;
    timerRef.current = setInterval(() => {
      step++;
      setCount(Math.round(value * (step / steps)));
      if (step >= steps) {
        clearInterval(timerRef.current);
        // pause then loop again
        timerRef.current = setTimeout(runCycle, 3000);
      }
    }, dur / steps);
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          runCycle();
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearInterval(timerRef.current);
      clearTimeout(timerRef.current);
    };
  }, [runCycle]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── SCROLL PROGRESS ─────────────────────────────── */
function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      setW((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return <div className="scroll-progress" style={{ width: `${w}%` }} />;
}

/* ─── NAVBAR ──────────────────────────────────────── */
function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    if (open) {
      const y = window.scrollY;
      document.body.dataset.scrollY = y;
      document.body.style.cssText = `position:fixed;top:-${y}px;left:0;right:0;`;
    } else {
      const y = parseInt(document.body.dataset.scrollY || "0");
      document.body.style.cssText = "";
      window.scrollTo(0, y);
    }
    return () => {
      document.body.style.cssText = "";
    };
  }, [open]);
  const links = ["about", "experience", "projects", "skills", "contact"];
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#hero" className="nav__logo">
        <span className="nav__logo-bracket">&lt;</span>
        XKF
        <span className="nav__logo-bracket">/&gt;</span>
      </a>
      <button className="nav__burger" onClick={() => setOpen(!open)}>
        <span className={open ? "open" : ""} />
        <span className={open ? "open" : ""} />
      </button>
      <ul className={`nav__links ${open ? "nav__links--open" : ""}`}>
        {links.map((l, i) => (
          <li key={l} style={{ animationDelay: `${i * 0.05}s` }}>
            <a href={`#${l}`} onClick={() => setOpen(false)}>
              <span className="nav__link-num">0{i + 1}.</span>
              {l}
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:${data.email}`} className="nav__cta">
            Hire Me
          </a>
        </li>
        <li>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </li>
      </ul>
    </nav>
  );
}

/* ─── HERO ────────────────────────────────────────── */
function Hero({ theme }) {
  return (
    <section id="hero" className="hero">
      <ParticleCanvas theme={theme} />
      <div className="hero__inner">
        <div className="hero__left">
          <Reveal>
            <p className="hero__eyebrow">
              <span className="accent-dot" />
              Hello World, I'm
            </p>
            <h1 className="hero__name">
              {data.name}
              <br />
              <span className="hero__surname">{data.lastName}</span>
            </h1>
            <p className="hero__typed">
              <TypeWriter items={data.titles} />
            </p>
            <div className="hero__location">
              <span>🇮🇩 Indonesian</span>
              <span className="hero__location-dot">·</span>
              <span>🇧🇳 Based in Brunei</span>
            </div>
            <p className="hero__bio">{data.bio.split("\n\n")[0]}</p>
            <div className="hero__cta">
              <a href="#projects" className="btn btn--glow">
                View My Work
              </a>
              <a href="#contact" className="btn btn--outline">
                Get in Touch
              </a>
            </div>
            <div className="hero__socials">
              <a
                href={`https://${data.github}`}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <GithubIcon /> GitHub
              </a>
              <a
                href={`https://${data.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href={`https://${data.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <InstagramIcon /> Instagram
              </a>
            </div>
          </Reveal>
        </div>
        <div className="hero__right">
          <Reveal delay={0.2}>
            <div className="avatar-wrap">
              <div className="avatar-ring" />
              <div className="avatar-ring avatar-ring--2" />
              <img
                src="/avatar.jpg"
                alt="Xaviero Kenjiro Farrell"
                className="avatar-img"
              />
              <div className="avatar-badge">
                <span className="avatar-badge-dot" />
                Available for hire
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="hero__scroll-hint">
        <div className="mouse">
          <div className="mouse-dot" />
        </div>
        <span>scroll</span>
      </div>
    </section>
  );
}

/* ─── STATS ───────────────────────────────────────── */
function Stats() {
  return (
    <div className="stats-bar">
      {data.stats.map((s, i) => (
        <Reveal key={i} delay={i * 0.1} className="stat-item">
          <p className="stat-value">
            <Counter value={s.value} suffix={s.suffix} />
          </p>
          <p className="stat-label">{s.label}</p>
          {s.footnote && <p className="stat-footnote">{s.footnote}</p>}
        </Reveal>
      ))}
    </div>
  );
}

/* ─── ABOUT ───────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="section section--orbs">
      <div className="orb orb--1" />
      <div className="orb orb--2" />
      <div className="orb orb--3" />
      <div className="section__inner">
        <Reveal>
          <p className="section__label">
            <span className="accent">//</span> About Me
          </p>
          <h2 className="section__title">Who I Am</h2>
        </Reveal>
        <div className="about__grid">
          <Reveal delay={0.1}>
            <div className="about__text">
              {data.bio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="edu-card-v2">
              <div className="edu-card-v2__top">
                <div className="edu-card-v2__icon">
                  <GradCapIcon />
                </div>
                <span className="edu-card-v2__badge">Current</span>
              </div>
              <p className="edu-card-v2__school">{data.education.school}</p>
              <p className="edu-card-v2__degree">{data.education.degree}</p>
              <div className="edu-card-v2__meta">
                <span>📍 {data.education.location}</span>
                <span>🗓 {data.education.period}</span>
              </div>
              <div className="edu-card-v2__gpa">
                <span className="edu-card-v2__gpa-label">GPA</span>
                <span className="edu-card-v2__gpa-value">
                  {data.education.gpa}
                </span>
                <span className="edu-card-v2__gpa-max">/ 4.00</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ──────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" className="section section--alt">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">
            <span className="accent">//</span> Experience
          </p>
          <h2 className="section__title">Where I've Worked</h2>
        </Reveal>
        <div className="timeline">
          {data.experience.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="timeline__item">
                <div className="timeline__dot" />
                <div className="timeline__line" />
                <div className="timeline__card">
                  <div className="tcard__header">
                    <div>
                      <span className="tcard__type">{e.type}</span>
                      <h3 className="tcard__role">{e.role}</h3>
                      <p className="tcard__company">
                        <span className="accent">@</span> {e.company}
                        <span className="tcard__location"> · {e.location}</span>
                      </p>
                    </div>
                    <span className="tcard__period">{e.period}</span>
                  </div>
                  <ul className="tcard__points">
                    {e.points.map((pt, j) => (
                      <li key={j}>
                        <span className="accent">▹</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="timeline__item">
              <div className="timeline__dot timeline__dot--leadership" />
              <div className="timeline__line" />
              <div className="timeline__card">
                <div className="tcard__header">
                  <div>
                    <span className="tcard__type tcard__type--leadership">
                      Leadership
                    </span>
                    <h3 className="tcard__role">{data.leadership.role}</h3>
                    <p className="tcard__company">
                      <span className="accent">@</span> {data.leadership.org}
                    </p>
                  </div>
                  <span className="tcard__period">
                    {data.leadership.period}
                  </span>
                </div>
                <ul className="tcard__points">
                  {data.leadership.points.map((pt, j) => (
                    <li key={j}>
                      <span className="accent">▹</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ────────────────────────────────────── */
function ProjectCard({ p, i }) {
  return (
    <div className="project-card" style={{ "--accent-color": p.accent }}>
      <div className="project-card__glow" />
      <div className="project-card__top">
        <span className="project-card__num">0{i + 1}</span>
        <FolderIcon />
      </div>
      <h3 className="project-card__name">{p.name}</h3>
      <p className="project-card__sub">{p.subtitle}</p>
      <ul className="project-card__points">
        {p.points.map((pt, j) => (
          <li key={j}>
            <span style={{ color: p.accent }}>▹</span> {pt}
          </li>
        ))}
      </ul>
      <div className="project-card__stack">
        {p.stack.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
      {p.video && (
        <div className="project-card__video">
          <iframe
            src={p.video}
            title={`${p.name} demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  const total = data.projects.length;
  return (
    <section id="projects" className="section section--orbs">
      <div className="orb orb--1" />
      <div className="orb orb--2" />
      <div className="section__inner">
        <Reveal>
          <p className="section__label">
            <span className="accent">//</span> Projects
          </p>
          <h2 className="section__title">Things I've Built</h2>
        </Reveal>

        {/* Desktop grid */}
        <div className="projects__grid projects__grid--desktop">
          {data.projects.map((p, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div
                className="project-card"
                style={{ "--accent-color": p.accent }}
              >
                <div className="project-card__glow" />
                <div className="project-card__top">
                  <span className="project-card__num">0{i + 1}</span>
                  <FolderIcon />
                </div>
                <h3 className="project-card__name">{p.name}</h3>
                <p className="project-card__sub">{p.subtitle}</p>
                <ul className="project-card__points">
                  {p.points.map((pt, j) => (
                    <li key={j}>
                      <span style={{ color: p.accent }}>▹</span> {pt}
                    </li>
                  ))}
                </ul>
                <div className="project-card__stack">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
                {p.video && (
                  <div className="project-card__video">
                    <iframe
                      src={p.video}
                      title={`${p.name} demo`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="projects__carousel--mobile">
          <ProjectCard p={data.projects[active]} i={active} />
          <div className="carousel__controls">
            <button
              className="carousel__btn"
              onClick={() => setActive((a) => (a - 1 + total) % total)}
              aria-label="Previous"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="carousel__dots">
              {data.projects.map((_, i) => (
                <button
                  key={i}
                  className={`carousel__dot ${i === active ? "carousel__dot--active" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Project ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="carousel__btn"
              onClick={() => setActive((a) => (a + 1) % total)}
              aria-label="Next"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ──────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">
            <span className="accent">//</span> Skills
          </p>
          <h2 className="section__title">What I Work With</h2>
        </Reveal>
        <div className="skills__layout">
          <div className="skills__bars">
            {data.skills.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <SkillBar name={s.name} level={s.level} />
              </Reveal>
            ))}
          </div>
          <div className="skills__tools">
            <Reveal delay={0.1}>
              <p className="skills__tools-label">
                <span className="accent">//</span> Tools & Extras
              </p>
              <div className="tools__grid">
                {data.tools.map((t) => (
                  <div key={t} className="tool-chip">
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="code-block">
                <p className="code-block__title">stack.config.js</p>
                <pre>{`const stack = {
  frontend: ['React', 'Next.js',
             'React Native'],
  backend:  ['Node.js', 'Python'],
  database: ['MySQL', 'MongoDB'],
  design:   ['Figma', 'Canva'],
  ai:       ['Gemini AI', 'n8n']
}`}</pre>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setW(level), 100);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [level]);
  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar__header">
        <span>{name}</span>
        <span className="skill-bar__pct">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div className="skill-bar__fill" style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

/* ─── CONTACT ─────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section__inner section__inner--center">
        <Reveal>
          <p className="section__label">
            <span className="accent">//</span> Contact
          </p>
          <h2 className="section__title">Let's Build Something</h2>
          <p className="contact__sub">
            Open to internships, collaborations, and interesting conversations.
            My inbox is always open.
          </p>
          <a
            href={`mailto:${data.email}`}
            className="btn btn--glow contact__btn"
          >
            Say Hello
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              style={{ marginLeft: "6px" }}
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
          </a>
          <div className="contact__links">
            <a
              href={`https://${data.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="contact__link"
            >
              <LinkedInIcon /> LinkedIn
            </a>
            <a
              href={`https://${data.github}`}
              target="_blank"
              rel="noreferrer"
              className="contact__link"
            >
              <GithubIcon /> GitHub
            </a>
            <a
              href={`https://${data.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="contact__link"
            >
              <InstagramIcon /> Instagram
            </a>
            <a href={`tel:${data.phone}`} className="contact__link">
              <PhoneIcon /> {data.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <p>
        <span className="accent">&lt;</span>
        Designed &amp; built by Xaviero Kenjiro Farrell ·{" "}
        {new Date().getFullYear()}
        <span className="accent"> /&gt;</span>
      </p>
    </footer>
  );
}

/* ─── ICONS ───────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 5.1 18 5.4 18 5.4c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      style={{ color: "var(--accent-color, #00d4aa)", opacity: 0.7 }}
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function GradCapIcon() {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

/* ─── THEME ICONS ─────────────────────────────────── */
function SunIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ─── APP ─────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme] = useState(() => {
    const s = localStorage.getItem('theme');
    if (s === 'light' || s === 'dark') return s;
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <>
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
