const Footer = () => {
  return (
    <footer className="bg-ink text-paper rounded-t-[2rem] md:rounded-t-[3.5rem] overflow-hidden">
      <div className="relative z-10 max-w-[1500px] mx-auto px-5 md:px-14 pt-12 md:pt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[15px] font-medium" aria-label="Footer">
          <a href="#" className="py-2 hover:opacity-60 transition-opacity">Home</a>
          <a href="#collection" className="py-2 hover:opacity-60 transition-opacity">Collection</a>
          <a href="#contact" className="py-2 hover:opacity-60 transition-opacity">Contact</a>
        </nav>
        <p className="text-sm text-paper/50">© {new Date().getFullYear()} NOVI. All rights reserved.</p>
      </div>

      {/* الاسم بحجم الصفحة كلها، مقصوص من تحت عن قصد */}
      <p
        aria-hidden="true"
        className="display text-[28vw] leading-[0.74] whitespace-nowrap text-center text-paper/[0.09] select-none pointer-events-none mt-8 md:mt-10 -mb-[3vw]"
      >
        NOVI
      </p>
    </footer>
  );
};

export default Footer;
