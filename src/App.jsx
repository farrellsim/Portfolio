import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { PAGES } from "./data";
import { usePageMeta } from "./hooks/usePageMeta";

const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

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

  usePageMeta(page);

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
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  const navigate = (newPage) => {
    setPage(newPage);
    window.history.pushState(null, "", newPage === "home" ? "#" : `#${newPage}`);
    window.scrollTo(0, 0);
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} page={page} navigate={navigate} />
      <main className="main-page" key={page}>
        {page === "home" && <Home navigate={navigate} theme={theme} />}
        {page !== "home" && (
          <Suspense fallback={<div className="page-wrap" />}>
            {page === "services" && <Services navigate={navigate} />}
            {page === "projects" && <Projects navigate={navigate} />}
            {page === "about" && <About />}
            {page === "contact" && <Contact />}
          </Suspense>
        )}
      </main>
      <Footer theme={theme} />
    </>
  );
}
