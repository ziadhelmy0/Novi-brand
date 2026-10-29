// كل كارت بلون من ألوان المنتجات عشان الصفحة كلها تفضل في نفس العالم
const CONTACT_DETAILS = [
  { label: 'Call or WhatsApp', value: '01090999550', href: 'tel:+201090999550', className: 'bg-ink text-paper' },
  { label: 'Instagram', value: '@novi', href: 'https://instagram.com/novi', className: 'bg-[#f7c8d8] text-ink' },
  { label: 'Facebook', value: 'novi - نوفي', href: 'https://facebook.com/novi', className: 'bg-[#cde4b5] text-ink' },
  { label: 'Website', value: 'novi.com', href: 'https://novi.com', className: 'bg-[#d9d7a3] text-ink' },
];

const Contact = () => {
  return (
    <section id="contact" className="bg-paper scroll-mt-4">
      <div className="max-w-[1500px] mx-auto px-5 md:px-14 py-20 md:py-32">
        <h2 className="display text-[12.5vw] md:text-[9vw] mb-6">Let's talk</h2>
        <p className="text-lg md:text-xl text-ink/70 max-w-xl leading-relaxed mb-12 md:mb-16" dir="rtl">
          عندك سؤال عن مقاس أو طلب؟ كلمنا على أي قناة من دول وهنرد عليك في أسرع وقت.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {CONTACT_DETAILS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group relative flex flex-col justify-between gap-10 min-h-[170px] md:min-h-[220px] p-6 md:p-8 rounded-[2rem] ${item.className} active:scale-[0.99] transition-transform`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-medium opacity-70">{item.label}</span>
                <span className="w-11 h-11 rounded-full border border-current grid place-items-center opacity-70 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11L11 3M5 3H11V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <span className="display-sm text-3xl md:text-4xl break-words">{item.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
