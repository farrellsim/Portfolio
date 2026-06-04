import { useEffect, useRef, useState } from "react";
import "./App.css";

/* ─── DATA ────────────────────────────────────────── */
const data = {
  name: "Xaviero Kenjiro Farrell Simangasing",
  nickname: "Farrell",
  email: "farrellsim09@gmail.com",
  phone: "(+62) 851 21540990",
  linkedin: "linkedin.com/in/xavierokenjirofarrell",
  github: "github.com/farrellsim",
  instagram: "instagram.com/farrell.sim",
  about: [
    "Final-year Software Engineering student at Taylor's University — dual award with UWE Bristol. Currently in Jakarta on my third internship at Avenew Group, running QA across five platforms and helping build things that actually ship.",
    "Three internships across Indonesia, Brunei, and Malaysia. I've done the range — front-end dev, UI/UX, software testing, project delivery. The throughline is that I actually care about how systems behave and whether they work properly, not just whether they look right in Figma.",
    "Looking for grad roles starting September 2026. Open to QA, testing, front-end, or tech consulting — somewhere with real problems and people who take the craft seriously.",
    "Off-keyboard: golf when the sun cooperates, games when it doesn't, coffee regardless.",
  ],
  experience: [
    {
      role: "UI/UX & Information Systems Intern",
      company: "Avenew Group",
      location: "Jakarta, Indonesia · On-site",
      period: "Apr 2026 – Present",
      points: [
        "Conducted QA & testing across 5 internal and client-facing platforms, identifying 10+ bugs with structured reports for the dev team.",
        "Contributed to front-end development on 3 platforms and supported UI/UX design across 2 projects.",
        "Delivered a comprehensive website audit covering navigation, content, design, and mobile responsiveness gaps.",
      ],
    },
    {
      role: "Web Developer",
      company: "Confer Sdn. Bhd.",
      location: "Bandar Seri Begawan, Brunei · Remote",
      period: "Feb 2026 – Mar 2026",
      points: [
        "Owned end-to-end redesign and rebuild of the company website — launched in production with improved content accuracy, brand consistency, and mobile responsiveness.",
        "Coordinated project tasks and timelines across team members to support on-time delivery.",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Hostelent",
      location: "Surabaya, Indonesia · Remote",
      period: "Jan 2024 – Jun 2024",
      points: [
        "Performed manual testing across 20+ web features, surfacing a high volume of usability and functional bugs resolved before production deployment.",
        "Contributed to UI/UX redesign of multiple web interfaces, improving design consistency and overall user experience.",
      ],
    },
    {
      role: "Head of Visual Marketing",
      company: "Taylor's University Agents of Tech Club",
      location: "Subang Jaya, Malaysia · Leadership",
      period: "Oct 2023 – Jul 2025",
      points: [
        "Led visual marketing across Instagram, Facebook, and LinkedIn — grew following by 1,000+ users and pioneered the club's first focused social media strategy.",
        "Promoted flagship events including ImagineHack 2024 & 2025 and the NexTech Conference. Served as Marketing/PR Lead and Event Emcee.",
        "Coordinated with corporate partners — Hilti, PayNet, Deriv, Accenture, Deloitte — on sponsorship and outreach.",
      ],
    },
  ],
  projects: [
    {
      name: "DigiSahabat",
      subtitle: "Final Year Capstone",
      desc: "Culturally adaptive digital literacy mobile app for Orang Asli communities in Malaysia. Led a 5-person team as PM and AI Engineer — owned roadmap, sprint planning, and stakeholder comms. AI-powered voice and chat guidance for low-literacy users.",
      stack: [
        "React Native",
        "Node.js",
        "MongoDB",
        "Tailwind CSS",
        "Gemini AI",
      ],
    },
    {
      name: "Smart CV Analyzer",
      subtitle: "University Project",
      desc: "Web-based CV evaluation system using Gemini AI to generate feedback on resume clarity, structure, and job relevance. Database-backed submission storage and history.",
      stack: ["JavaScript", "PHP", "HTML/CSS", "MySQL", "Gemini AI"],
    },
    {
      name: "DoomParade",
      subtitle: "University Project",
      desc: "Tower defence game built with Java and JavaFX. Implements enemy pathfinding, tower placement, and attack systems with modular OOP-structured game logic.",
      stack: ["Java", "JavaFX"],
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
    frameworks: [
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "RESTful APIs",
      "HTML",
      "CSS",
      "MongoDB",
    ],
    tools: [
      "Postman",
      "Playwright",
      "Selenium",
      "Manual Testing",
      "Git",
      "JIRA",
      "Agile (Scrum)",
      "SDLC",
    ],
    languages_spoken: [
      "English (Fluent)",
      "Indonesian (Native)",
      "Malay (Conversational)",
    ],
  },
  education: {
    school: "Taylor's University, Malaysia",
    school2: "University of the West England (UWE Bristol), UK",
    degree: "B.S. in Software Engineering (Honors) – Dual Award Programme",
    location: "Subang Jaya, Selangor",
    period: "Sep 2023 – Aug 2026",
    gpa: "3.44",
    coursework: [
      "Software Quality & Testing",
      "Software Project Management",
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Database Systems",
    ],
  },
};

const PAGES = ["home", "about", "experience", "projects", "skills", "contact"];

/* ─── REVEAL ──────────────────────────────────────── */
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
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );
    obs.observe(el);
    // If already in view on mount, trigger immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => setVisible(true), delay * 1000);
      obs.disconnect();
    }
    return () => obs.disconnect();
  }, [delay]);
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

/* ─── NAVBAR ──────────────────────────────────────── */
function Navbar({ theme, toggleTheme, page, navigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (open) {
      const y = window.scrollY;
      document.body.dataset.scrollY = y;
      document.body.style.cssText = `position:fixed;top:-${y}px;left:0;right:0;width:100%;`;
    } else {
      const y = parseInt(document.body.dataset.scrollY || "0");
      document.body.style.cssText = "";
      window.scrollTo(0, y);
    }
    return () => {
      document.body.style.cssText = "";
    };
  }, [open]);

  const links = [
    "home",
    "about",
    "experience",
    "projects",
    "skills",
    "contact",
  ];

  const go = (p) => {
    navigate(p);
    setOpen(false);
  };

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <button className="nav__logo" onClick={() => go("home")}>
        <span className="nav__logo-bracket">&lt;</span>
        XKF
        <span className="nav__logo-bracket">/&gt;</span>
      </button>

      <button
        className="nav__burger"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span className={open ? "open" : ""} />
        <span className={open ? "open" : ""} />
      </button>

      <div className="nav__right">
        <ul className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {links.map((l) => (
            <li key={l}>
              <button
                className={`nav__link-btn ${page === l ? "nav__link-btn--active" : ""}`}
                onClick={() => go(l)}
              >
                {l}
              </button>
            </li>
          ))}
          <li>
            <button className="nav__cta" onClick={() => go("contact")}>
              hire me
            </button>
          </li>
        </ul>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}

/* ─── HERO (HOME PAGE) ────────────────────────────── */
function Hero({ navigate }) {
  return (
    <div className="page-wrap">
      <div className="container">
        <Reveal className="hero__simple">
          <div className="hero__simple-top">
            <div className="hero__avatar-sm">
              <img src="/avatar.png" alt="Farrell" />
            </div>
            <h1 className="hero__greeting">
              Hi <span className="hero__wave">👋</span>
            </h1>
          </div>

          <p className="hero__intro">
            I'm <strong>{data.nickname}</strong>{" "}
            <span className="hero__intro-fullname">({data.name})</span>.{" "}
            Final-year Software Engineering student at{" "}
            <span className="hero__hl">Taylor's University & UWE Bristol</span>,
            currently in <span className="hero__hl">Jakarta</span> as an
            Information Systems Intern at{" "}
            <span className="hero__hl">Avenew Group</span>.
          </p>

          <div className="hero__meta">
            <span>📍 Jakarta, Indonesia</span>
            <span className="hero__meta-dot">·</span>
            <span>🇧🇳 Grew up in Brunei</span>
            <span className="hero__meta-dot">·</span>
            <span className="hero__meta-avail">open Sept 2026</span>
          </div>

          <div className="hero__cta">
            <button onClick={() => navigate("contact")} className="btn btn--primary">
              say hi
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
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
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ─── PAGE WRAPPER ────────────────────────────────── */
function PageWrap({ title, children }) {
  return (
    <div className="page-wrap">
      <div className="container">
        <Reveal>
          <div className="sh">
            <h2 className="sh__title">{title}</h2>
          </div>
        </Reveal>
        {children}
      </div>
    </div>
  );
}

/* ─── ABOUT PAGE ──────────────────────────────────── */
function About() {
  return (
    <PageWrap title="About me.">
      <Reveal delay={0.05}>
        <div className="about__text">
          {data.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Reveal>
    </PageWrap>
  );
}

/* ─── EXPERIENCE PAGE ─────────────────────────────── */
function Experience() {
  return (
    <PageWrap title="Where I've worked.">
      <div className="exp">
        {data.experience.map((e, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="exp__row">
              <div className="exp__period">{e.period}</div>
              <div className="exp__body">
                <h3 className="exp__role">{e.role}</h3>
                <p className="exp__company">
                  <span className="exp__company-name">{e.company}</span>
                  <span className="exp__company-loc"> · {e.location}</span>
                </p>
                <ul className="exp__points">
                  {e.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </PageWrap>
  );
}

/* ─── PROJECTS PAGE ───────────────────────────────── */
function ProjectCard({ p }) {
  return (
    <article className="proj">
      <div className="proj__head">
        <h3 className="proj__name">{p.name}</h3>
        <span className="proj__sub">{p.subtitle}</span>
      </div>
      <p className="proj__desc">{p.desc}</p>
      <div className="proj__stack">
        {p.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  const total = data.projects.length;
  return (
    <PageWrap title="Things I've made.">
      <div className="projects__grid projects__grid--desktop">
        {data.projects.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>

      <div className="projects__carousel--mobile">
        <ProjectCard p={data.projects[active]} />
        <div className="carousel__controls">
          <button
            className="carousel__btn"
            onClick={() => setActive((a) => (a - 1 + total) % total)}
            aria-label="Previous"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </PageWrap>
  );
}

/* ─── SKILLS PAGE ─────────────────────────────────── */
function Skills() {
  const groups = [
    { label: "Languages", items: data.skills.languages },
    { label: "Frameworks & Tools", items: data.skills.frameworks },
    { label: "Tools & Methodologies", items: data.skills.tools },
    { label: "Languages spoken", items: data.skills.languages_spoken },
    { label: "Relevant coursework", items: data.education.coursework },
  ];
  return (
    <PageWrap title="What I work with.">
      <div className="skills">
        {groups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.06}>
            <div className="skills__group">
              <p className="skills__label">{g.label}</p>
              <div className="skills__chips">
                {g.items.map((s) => (
                  <span key={s} className="chip chip--lg">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </PageWrap>
  );
}

/* ─── CONTACT PAGE ────────────────────────────────── */
function Contact() {
  return (
    <div className="page-wrap">
      <div className="contact container">
        <Reveal>
          <h2 className="contact__title">
            Let's talk{" "}
            <span className="contact__wave" aria-hidden="true">
              👀
            </span>
          </h2>
          <p className="contact__sub">
            Open to grad roles, collaborations, and the occasional good
            conversation.
          </p>
          <a
            href={`mailto:${data.email}`}
            className="btn btn--primary contact__btn"
          >
            {data.email}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
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
    </div>
  );
}

/* ─── FOOTER ──────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <span className="footer__brand">
        <span className="footer__bracket">&lt;</span>
        XKF
        <span className="footer__bracket">/&gt;</span>
      </span>
      <span className="footer__sep">·</span>
      <span>built with care, {new Date().getFullYear()}</span>
    </footer>
  );
}

/* ─── ICONS ───────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 5.1 18 5.4 18 5.4c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ─── APP ─────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme] = useState(() => {
    const s = localStorage.getItem("theme");
    if (s === "light" || s === "dark") return s;
    return "light";
  });

  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#", "") || "home";
    return PAGES.includes(hash) ? hash : "home";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setPage(PAGES.includes(hash) ? hash : "home");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (newPage) => {
    setPage(newPage);
    window.history.pushState(
      null,
      "",
      newPage === "home" ? "#" : `#${newPage}`,
    );
    window.scrollTo(0, 0);
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        page={page}
        navigate={navigate}
      />
      <main className="main-page" key={page}>
        {page === "home" && <Hero navigate={navigate} />}
        {page === "about" && <About />}
        {page === "experience" && <Experience />}
        {page === "projects" && <Projects />}
        {page === "skills" && <Skills />}
        {page === "contact" && <Contact />}
      </main>
      <Footer />
    </>
  );
}
