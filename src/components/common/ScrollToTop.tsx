import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        // Small delay to ensure the target element is mounted in DOM
        const timeout = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
        return () => clearTimeout(timeout);
      }
    } else {
      // Normal page navigation without hash: always scroll to the very top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}
