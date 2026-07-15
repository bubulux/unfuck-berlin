import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

export function Navbar({ isPurple }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    isPurple
      ? `font-bold text-xs md:text-sm transition ${isActive ? "text-volt-lime underline" : "text-white hover:text-volt-lime"}`
      : `font-bold text-xs md:text-sm transition ${isActive ? "text-volt-dark underline" : "text-volt-purple hover:text-volt-dark"}`;

  const spendenClass = isPurple
    ? "font-bold text-xs md:text-sm text-white hover:text-volt-lime transition"
    : "font-bold text-xs md:text-sm text-volt-purple hover:text-volt-dark transition";

  return (
    <header
      className={`sticky top-0 z-40 transition-shadow duration-300 ${
        isPurple ? "bg-volt-purple" : "bg-white"
      } ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-2 md:py-3">
        <Link to="/" aria-label="Startseite">
          <Logo variant={isPurple ? "dark" : "light"} />
        </Link>

        <nav className="flex items-center gap-4 md:gap-8">
          <NavLink to="/wahlprogramm" className={linkClass}>Wahlprogramm</NavLink>
          <a
            href="https://voltdeutschland.org/berlin/spenden"
            target="_blank"
            rel="noopener noreferrer"
            className={spendenClass}
          >
            Spenden
          </a>
          <Link to="https://voltdeutschland.org/berlin/mitmachen" className={linkClass}>Mitmachen</Link>
        </nav>
      </div>
    </header>
  );
}
