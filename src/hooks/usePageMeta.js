import { useEffect } from "react";
import { PAGE_META } from "../data";

export function usePageMeta(page) {
  useEffect(() => {
    const meta = PAGE_META[page] || PAGE_META.home;
    document.title = meta.title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute("content", meta.description);

    // Open Graph
    const setOg = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setOg("og:title", meta.title);
    setOg("og:description", meta.description);
    setOg("og:type", "website");
    setOg("og:url", window.location.href);
  }, [page]);
}
