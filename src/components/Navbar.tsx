import React, { useEffect, useState } from "react";

export function Navbar() {
  const [navbarStyle, setNavbarStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: "translateY(-24px)",
  });

  useEffect(() => {
    const handleScroll = () => {
      const formSection = document.getElementById("form-section");
      if (!formSection) return;
      const rect = formSection.getBoundingClientRect();
      // Animate in as form section approaches top
      const threshold = 120; // px from top where animation starts
      const opacity = Math.min(1, 1 - rect.top / threshold);
      const translateY = Math.max(0, -24 + 24 * (1 - rect.top / threshold));
      setNavbarStyle({
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.1 ? "auto" : "none",
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-white/20 shadow-sm flex items-center justify-between px-4 sm:px-8 py-2 sm:py-3 transition-all duration-300"
      style={{
        ...navbarStyle,
        transform:
          navbarStyle.opacity && (navbarStyle.opacity as number) <= 0.1
            ? "scale(0)"
            : "none",
      }}
    >
      <div className="flex items-center gap-2">
        {/* Placeholder logo */}
        <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md">
          T
        </span>
        <span className="ml-2 text-lg sm:text-xl font-semibold text-white tracking-wide">
          TaleTalk
        </span>
      </div>
      <button className="px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow hover:from-purple-600 hover:to-pink-600 transition-all">
        Get Started
      </button>
    </nav>
  );
}
