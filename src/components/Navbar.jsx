import { useState } from 'react';
import logo from '../assets/novi-logo.jpg';

const NAV_LINKS = [
  { href: '#', label: 'Home' },
  { href: '#collection', label: 'Collection' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 md:px-6 pt-3 -mb-[76px] pointer-events-none">
      <nav
        className="pointer-events-auto relative mx-auto max-w-5xl flex items-center justify-between gap-2 rounded-full bg-paper/85 backdrop-blur-xl pl-4 pr-2 py-2 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.4)]"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="#" className="block w-10 md:w-11 shrink-0" aria-label="NOVI - الرئيسية">
          <img src={logo} alt="NOVI" className="mix-blend-multiply w-full h-auto" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="py-1 hover:opacity-55 transition-opacity">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions (Bag & Hamburger) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onCartClick}
            className="h-10 md:h-12 pl-4 md:pl-5 pr-2 rounded-full bg-ink text-paper flex items-center gap-2 md:gap-3 active:scale-95 transition-transform"
            aria-label={`السلة، ${cartCount} منتج`}
          >
            <span className="text-sm md:text-[15px] font-medium">Bag</span>
            <span className="min-w-7 md:min-w-8 h-7 md:h-8 px-2 rounded-full bg-paper text-ink grid place-items-center text-xs md:text-sm font-semibold tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Hamburger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden w-10 h-10 rounded-full grid place-items-center active:bg-ink/10 shrink-0"
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 7H19M3 15H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl bg-paper/95 backdrop-blur-xl shadow-xl overflow-hidden md:hidden border border-ink/10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 text-base font-medium border-t border-ink/10 first:border-t-0 active:bg-ink/5"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;