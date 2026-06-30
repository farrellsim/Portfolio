import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import { SunIcon, MoonIcon } from "./Icons";
import { PAGES } from "../data";

export default function Navbar({ theme, toggleTheme, page, navigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    h();
    window.addEventListener("scroll", h, { passive: true });
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
    return () => { document.body.style.cssText = ""; };
  }, [open]);

  const go = (p) => {
    navigate(p);
    setOpen(false);
  };

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <button className="nav__logo" onClick={() => go("home")} aria-label="Home">
        <BrandLogo theme={theme} variant="horizontal" height="22px" eager />
      </button>

      <button
        className="nav__burger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span className={open ? "open" : ""} />
        <span className={open ? "open" : ""} />
      </button>

      <div className="nav__right">
        <ul className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {PAGES.map((l) => (
            <li key={l}>
              <button
                className={`nav__link-btn ${page === l ? "nav__link-btn--active" : ""}`}
                onClick={() => go(l)}
                aria-current={page === l ? "page" : undefined}
              >
                {l}
              </button>
            </li>
          ))}
          <li>
            <button className="nav__cta" onClick={() => go("contact")}>
              let's talk
            </button>
          </li>
        </ul>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}
