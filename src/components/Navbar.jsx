import { useEffect, useState } from 'react';
import logo from '../assets/novi-logo.jpg';

const NAV_LINKS = [
  { href: '#', label: 'Home' },
  { href: '#collection', label: 'Collection' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // النافبار شفاف فوق الهيرو، وبيتحول لخلفية بيضاء لما اليوزر يبدأ يسكرول
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tone = scrolled || menuOpen ? 'text-ink' : 'text-paper';

  return (
    <nav
      className={`fixed top-0 z-50 w-full flex items-center justify-between px-6 md:px-14 py-5 transition-colors duration-500 ${
        scrolled || menuOpen
          ? 'bg-paper/90 backdrop-blur-xl border-b border-neutral-200/70'
          : 'bg-transparent border-b border-transparent'
      }`}
      aria-label="Main navigation"
    >
      <a href="#" className="w-11 hover:opacity-70 transition-opacity">
        <img src={logo} alt="NOVI" className={scrolled || menuOpen ? '' : 'invert'} />
      </a>

      <div className={`hidden md:flex gap-10 font-body font-medium text-sm ${tone}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="relative group py-1">
            {link.label}
            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onCartClick}
          className={`relative w-10 h-10 flex items-center justify-center hover:opacity-60 transition-opacity ${tone}`}
          aria-label={`Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
        >
          <svg width="19" height="21" viewBox="0 0 19 21" fill="none">
            <path
              d="M5 6V4.5a4.5 4.5 0 0 1 9 0V6M1.5 6h16l-1 14h-14l-1-14Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-paper text-[10px] font-body font-semibold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className={`md:hidden flex flex-col gap-1.5 p-2 ${tone}`}
          aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-[1.5px] bg-current transition-transform ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full flex flex-col items-center gap-6 py-8 bg-paper/95 backdrop-blur-xl border-b border-neutral-200 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body font-medium text-sm text-neutral-600 hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
