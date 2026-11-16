import React, { useState, useEffect, useRef } from "react";

interface GooglePreferredSourceBtnProps {
  theme?: "light" | "dark";
  className?: string;
  sourceUrl?: string;
}

export default function GooglePreferredSourceBtn({
  theme = "light",
  className = "",
  sourceUrl = "https://www.curezy.in/",
}: GooglePreferredSourceBtnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasNativeIframe, setHasNativeIframe] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // 1. Ensure publisher.js is loaded
    const scriptSrc = "https://news.google.com/swg/js/v1/publisher.js";
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.src = scriptSrc;
      document.head.appendChild(script);
    }

    // 2. Try initializing Google's preferredSource API
    const initAPI = () => {
      try {
        const ps = (window as any).preferredSource;
        if (ps && typeof ps.init === "function") {
          ps.init({ theme, lang: "en" });
        }
      } catch (err) {
        // ignore
      }
    };

    initAPI();
    const timer = setTimeout(initAPI, 1000);

    // 3. Check if Google injected native iframe or elements
    const observer = new MutationObserver(() => {
      if (containerRef.current) {
        const injected = containerRef.current.querySelector("iframe, button, a");
        if (injected) {
          setHasNativeIframe(true);
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [theme]);

  const handleTrigger = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Try Google's official SDK method
    const ps = (window as any).preferredSource || (window as any).SWG?.preferredSource;
    if (ps && typeof ps.addPreferredSource === "function") {
      try {
        ps.addPreferredSource();
        setIsFollowing(true);
        return;
      } catch (err) {
        console.warn("preferredSource.addPreferredSource error, falling back:", err);
      }
    }

    // 2. Try clicking Google's injected element if it exists inside
    if (containerRef.current) {
      const childBtn = containerRef.current.querySelector("button, a, [role='button']") as HTMLElement | null;
      if (childBtn && childBtn !== e.currentTarget) {
        childBtn.click();
        setIsFollowing(true);
        return;
      }
    }

    // 3. Fallback: Direct Google Search Preferences dialog for Curezy
    setIsFollowing(true);
    const encodedUrl = encodeURIComponent(sourceUrl);
    const prefUrl = `https://www.google.com/preferences/source?q=${encodedUrl}`;
    window.open(prefUrl, "_blank", "noopener,noreferrer,width=650,height=750");
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Container where Google's publisher.js injects native iframe when on live domain */}
      <div
        ref={containerRef}
        {...({ "google-add-preferred-source-btn": "" } as Record<string, string>)}
        data-theme={theme}
        className={hasNativeIframe ? "inline-block" : "hidden"}
      />

      {/* Interactive Button: Always responsive, invokes Google modal or preference sync */}
      {!hasNativeIframe && (
        <button
          type="button"
          onClick={handleTrigger}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-sm hover:shadow transition-all group cursor-pointer"
          title="Add Curezy to your preferred sources on Google Search"
        >
          {/* Official Google 4-Color 'G' Logo */}
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
            {isFollowing ? "✓ Added on Google" : "Follow on Google"}
          </span>
        </button>
      )}
    </div>
  );
}
