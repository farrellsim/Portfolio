import { useEffect, useRef, useState } from "react";
import "./App.css";

/* ─── DATA ────────────────────────────────────────── */
const data = {
  name: "Xaviero Kenjiro Farrell",
  nickname: "Farrell",
  email: "farrellsim09@gmail.com",
  phone: "(+60) 1126213417",
  linkedin: "linkedin.com/in/xavierokenjirofarrell",
  github: "github.com/farrellsim",
  instagram: "instagram.com/farrell.sim",
  about: [
    "I'm a final-year Software Engineering student at Taylor's University in Malaysia. Right now I'm in Jakarta, interning as an Information Systems Intern at Avenew Group, building websites, sketching UI flows, and writing test plans for QA.",
    "Across three internships and a final-year mobile app project, I've worked on software engineering, front-end development, quality assurance, and project delivery. The throughline: figuring out how systems actually behave, and bridging stakeholders to keep things moving.",
    "Open to graduate roles starting August 2026, anywhere I can ship real things and learn from people who care about the craft.",
    "Off-keyboard: golf when the weather plays nice, games when it doesn't, coffee always.",
  ],
  experience: [
    {
      role: "Information Systems Intern",
      company: "Avenew Indonesia",
      location: "Jakarta, Indonesia · On-site",
      period: "Apr 2026 – Present",
      points: [
        "Developing and maintaining company websites with focus on performance and user experience.",
        "Designing UI/UX flows and building automation workflows to streamline internal processes.",
        "Performing QA and software testing across features to ensure reliability before deployment.",
      ],
    },
    {
      role: "Website Developer",
      company: "Confer Sdn Bhd",
      location: "Bandar Seri Begawan, Brunei · Part-time, Remote",
      period: "Mar 2026 – Present",
      points: [
        "Renovated and modernised the company website with updated content and refreshed visuals.",
        "Improved structure and usability across the site's primary pages.",
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Hostelent",
      location: "Surabaya, Indonesia · Remote",
      period: "Jan 2024 – Jun 2024",
      points: [
        "Assisted in UI/UX redesign of web interfaces, improving consistency across multiple pages.",
        "Performed website testing across 20+ features, identifying bugs before production.",
        "Collaborated with developers and designers to refine workflows and maintain design accuracy.",
      ],
    },
    {
      role: "Head of Visual Marketing",
      company: "Taylor's University Agents of Tech Club",
      location: "Subang Jaya, Malaysia · Leadership",
      period: "Oct 2023 – Jul 2025",
      points: [
        "Led visual marketing campaigns growing the club's following by 1,000+ users.",
        "Organised ImagineHack 2024, ImagineHack 2025, and the NexTech Conference.",
        "Coordinated with Hilti, PayNet, Deriv, Accenture, and Deloitte for sponsorships.",
      ],
    },
  ],
  projects: [
    {
      name: "DigiSahabat",
      subtitle: "Final Year Project",
      desc: "A culturally adaptive digital literacy mobile app for Orang Asli communities, with AI-powered voice assistance and chat guidance designed for low-literacy users.",
      stack: ["React Native", "Tailwind", "Node.js", "MongoDB", "Gemini AI"],
      video: "https://www.youtube.com/embed/CXhs7iIb_ho",
    },
    {
      name: "Smart CV Analyzer",
      subtitle: "University Project",
      desc: "A web-based CV evaluation system that uses Gemini AI to generate feedback on resume clarity, structure, and job relevance, with database storage for user submissions.",
      stack: ["JavaScript", "HTML/CSS", "MySQL", "Gemini AI"],
    },
    {
      name: "DoomParade",
      subtitle: "University Project",
      desc: "A tower defence game built with Java and JavaFX, implementing enemy movement, tower placement, and attack systems with modular OOP-structured game logic.",
      stack: ["Java", "JavaFX"],
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java"],
    frameworks: [
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "MongoDB",
      "SQL",
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
  },
  education: {
    school: "Taylor's University",
    degree: "B.S. in Software Engineering (Honors)",
    location: "Subang Jaya, Selangor",
    period: "Sep 2023 – Aug 2026",
    gpa: "3.42",
  },
};

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

/* ─── NAVBAR ──────────────────────────────────────── */
function Navbar({ theme, toggleTheme }) {
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

  const links = ["about", "experience", "projects", "skills", "contact"];

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#hero" className="nav__logo">
        <span className="nav__logo-bracket">&lt;</span>
        XKF
        <span className="nav__logo-bracket">/&gt;</span>
      </a>

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
              <a href={`#${l}`} onClick={() => setOpen(false)}>
                {l}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${data.email}`} className="nav__cta">
              hire me
            </a>
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

/* ─── HERO ────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" className="hero container">
      <div className="hero__layout">
        <Reveal delay={0.05} className="hero__photo-wrap">
          <div className="hero__photo">
            <img src="/avatar.PNG" alt="Xaviero Kenjiro Farrell" />
          </div>
        </Reveal>

        <Reveal className="hero__body">
          <h1 className="hero__greeting">
            Hi{" "}
            <span className="hero__wave" aria-hidden="true">
              👋
            </span>
          </h1>
          <p className="hero__intro">
            I'm <strong>{data.nickname}</strong>{" "}
            <span className="hero__intro-fullname">({data.name})</span>. A
            final-year Software Engineering student at{" "}
            <span className="hero__hl">Taylor's University</span>, currently in{" "}
            <span className="hero__hl">Jakarta</span> as an Information Systems
            Intern at <span className="hero__hl">Avenew Group</span>. Open to
            graduate roles starting August 2026.
          </p>

          <div className="hero__meta">
            <span>📍 Based in Jakarta, Indonesia</span>
            <span className="hero__meta-dot">·</span>
            <span>🇧🇳 Grew up in Brunei</span>
          </div>

          <div className="hero__cta">
            <a href={`mailto:${data.email}`} className="btn btn--primary">
              Say hi
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
    </section>
  );
}

/* ─── SECTION HEAD ────────────────────────────────── */
function SectionHead({ title, sub }) {
  return (
    <Reveal>
      <div className="sh">
        <h2 className="sh__title">{title}</h2>
        {sub && <p className="sh__sub">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ─── ABOUT ───────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead title="About me." />
        <div className="about__layout">
          <Reveal delay={0.05}>
            <div className="about__text">
              {data.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="edu">
              <p className="edu__label">Education</p>
              <p className="edu__school">{data.education.school}</p>
              <p className="edu__degree">{data.education.degree}</p>
              <ul className="edu__meta">
                <li>{data.education.period}</li>
                <li>{data.education.location}</li>
                <li className="edu__gpa">GPA {data.education.gpa} / 4.00</li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ──────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead title="Where I've been." />
        <div className="exp">
          {data.experience.map((e, i) => (
            <Reveal key={i} delay={i * 0.04}>
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
      </div>
    </section>
  );
}

/* ─── PROJECTS ────────────────────────────────────── */
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
      {p.video && (
        <div className="proj__video">
          <iframe
            src={p.video}
            title={`${p.name} demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </article>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  const total = data.projects.length;
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead title="Things I've made." />

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
      </div>
    </section>
  );
}

/* ─── SKILLS ──────────────────────────────────────── */
function Skills() {
  const groups = [
    { label: "Languages", items: data.skills.languages },
    { label: "Frameworks & Technologies", items: data.skills.frameworks },
    { label: "Tools & Methodologies", items: data.skills.tools },
  ];
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead title="What I work with." />
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
      </div>
    </section>
  );
}

/* ─── CONTACT ─────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="contact container">
      <Reveal>
        <h2 className="contact__title">
          Let's talk{" "}
          <span className="contact__wave" aria-hidden="true">
            👀
          </span>
        </h2>
        <p className="contact__sub">
          Open to internships, graduate roles, collaborations, and the
          occasional good conversation.
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
    </section>
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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
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
