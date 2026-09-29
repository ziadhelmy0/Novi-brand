const ICONS = {
  Phone: (
    <path
      d="M4.5 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3 4.6 1.5 1.5 0 0 1 4.5 3Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <circle cx="11" cy="11" r="3.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <circle cx="15.2" cy="6.8" r="0.9" fill="currentColor" />
    </>
  ),
  Facebook: (
    <path
      d="M13.5 8h-2V6.3c0-.6.4-.8.8-.8h1.2V3h-2C9.6 3 9 4.3 9 6v2H7.2v3H9v8h2.5v-8h1.7l.3-3Z"
      fill="currentColor"
    />
  ),
  Website: (
    <>
      <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M3.5 11h15M11 3.5c2 2.3 3 5 3 7.5s-1 5.2-3 7.5c-2-2.3-3-5-3-7.5s1-5.2 3-7.5Z" stroke="currentColor" strokeWidth="1.1" fill="none" />
    </>
  ),
};

const CONTACT_DETAILS = [
  {
    label: 'Phone',
    value: '01094044010',
    href: 'tel:+201094044010',
  },
  {
    label: 'Instagram',
    value: '@novi',
    href: 'https://www.instagram.com/noviistor?stkn=MXF1bmhlaHU5NGh6aw==',
  },
  {
    label: 'Facebook',
    value: 'novi - نوفي',
    href: 'https://www.facebook.com/profile.php?id=61571285128395',
  },
  {
    label: 'Website',
    value: 'novi.com',
    href: 'https://novi.com',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="border-t border-neutral-200 bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight mb-16">
          Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-sm">
              عندك سؤال عن مقاس أو طلب أو أي حاجة؟ تواصل معنا على أي من القنوات دي وهنرد عليك في أسرع وقت.
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {CONTACT_DETAILS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 py-5 border-b border-neutral-200 hover:border-ink transition-colors duration-300"
              >
                <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-500 group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    {ICONS[item.label]}
                  </svg>
                </span>
                <span className="font-display font-bold text-lg md:text-2xl uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {item.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;