import { useEffect, useState } from 'react';
import logo from '../assets/novi-logo.jpg';

const WHATSAPP_URL = 'https://wa.me/201090999550';
const PHONE_URL = 'tel:+201090999550';

const NAV_LINKS = [
  { href: '#', id: 'home', label: 'Home' },
  { href: '#collection', id: 'collection', label: 'Collection' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

// بيتابع السكرول: الشريط يتقفل أكتر لما تنزل، واللينك بتاع القسم الحالي يتعلّم
function useScrollState() {
  const [state, setState] = useState({ scrolled: false, active: 'home' });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      const contact = document.getElementById('contact');
      const collection = document.getElementById('collection');

      let active = 'home';
      if (contact && contact.getBoundingClientRect().top <= line) active = 'contact';
      else if (collection && collection.getBoundingClientRect().top <= line) active = 'collection';

      const scrolled = window.scrollY > 24;
      setState((prev) =>
        prev.active === active && prev.scrolled === scrolled ? prev : { active, scrolled }
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, active } = useScrollState();

  // Escape يقفل القائمة
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // لو الشاشة كبرت (لف التليفون / تابلت) والقائمة مفتوحة، نقفلها
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    // الشريط عايم فوق الصفحة (margin سالب) بدل ما ياخد مساحة: 12px padding + 64px ارتفاع الشريط
    <header className="sticky top-0 z-50 px-3 sm:px-5 pt-3 -mb-[76px] pointer-events-none">
      {menuOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className="pointer-events-auto fixed inset-0 -z-10 bg-black/25 backdrop-blur-[2px] cursor-default lg:hidden"
        />
      )}

      <nav
        className={`pointer-events-auto relative mx-auto max-w-6xl h-16 flex items-center justify-between gap-2 rounded-full pl-3 sm:pl-5 pr-2 backdrop-blur-xl transition-[background-color,box-shadow] duration-300 ${
          scrolled || menuOpen
            ? 'bg-paper/95 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.5)]'
            : 'bg-paper/80 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.35)]'
        }`}
        aria-label="Main navigation"
      >
        <a href="#" className="shrink-0 block w-14 sm:w-16" aria-label="NOVI - الرئيسية">
          <img src={logo} alt="NOVI" className="w-full h-auto mix-blend-multiply" />
        </a>

        {/* لينكات الشاشات الكبيرة (من 1024 وطالع) */}
        <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                aria-current={active === link.id ? 'true' : undefined}
                className={`inline-flex items-center h-11 px-5 rounded-full text-[15px] font-medium transition-colors ${
                  active === link.id
                    ? 'bg-ink/10 text-ink'
                    : 'text-ink/70 hover:text-ink hover:bg-ink/5'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCartClick}
            className="h-11 pl-4 pr-1.5 rounded-full bg-ink text-paper inline-flex items-center gap-2.5 active:scale-95 transition-transform"
            aria-label={`السلة، ${cartCount} منتج`}
          >
            <svg width="18" height="20" viewBox="0 0 19 21" fill="none" aria-hidden="true">
              <path
                d="M5 6V4.5a4.5 4.5 0 0 1 9 0V6M1.5 6h16l-1 14h-14l-1-14Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[15px] font-medium">Bag</span>
            <span className="min-w-8 h-8 px-2 rounded-full bg-paper text-ink grid place-items-center text-sm font-semibold tabular-nums">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden relative w-11 h-11 rounded-full border border-ink/15 active:bg-ink/10 transition-colors"
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
          >
            <span
              className="absolute left-1/2 top-1/2 block w-5 h-[2px] rounded bg-ink transition-transform duration-300"
              style={{ transform: `translate(-50%, ${menuOpen ? 0 : -4}px) rotate(${menuOpen ? 45 : 0}deg)` }}
            />
            <span
              className="absolute left-1/2 top-1/2 block w-5 h-[2px] rounded bg-ink transition-transform duration-300"
              style={{ transform: `translate(-50%, ${menuOpen ? 0 : 4}px) rotate(${menuOpen ? -45 : 0}deg)` }}
            />
          </button>
        </div>

        {/* قائمة الموبايل والتابلت */}
        {menuOpen && (
          <div className="sheet-in absolute top-full left-0 right-0 mt-2 max-h-[calc(100dvh-100px)] overflow-y-auto rounded-[2rem] bg-paper shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] p-3 lg:hidden">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`flex items-center justify-between h-16 px-5 rounded-[1.4rem] display-sm text-2xl transition-colors ${
                      active === link.id ? 'bg-ink/10' : 'active:bg-ink/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="opacity-50">
                      <path d="M3 11L11 3M5 3H11V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-ink/10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 rounded-full bg-ink text-paper grid place-items-center text-[15px] font-medium active:scale-95 transition-transform"
              >
                WhatsApp
              </a>
              <a
                href={PHONE_URL}
                className="h-14 rounded-full border-2 border-ink/15 grid place-items-center text-[15px] font-medium active:bg-ink/5 transition-colors"
              >
                Call us
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
