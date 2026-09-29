import logo from '../assets/novi-logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-ink text-neutral-400">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="w-10 opacity-90">
          <img src={logo} alt="NOVI" className="invert" />
        </div>

        <div className="flex gap-8 font-body text-sm">
          <a href="#" className="hover:text-paper transition-colors">Home</a>
          <a href="#collection" className="hover:text-paper transition-colors">Collection</a>
          <a href="#contact" className="hover:text-paper transition-colors">Contact</a>
        </div>

        <p className="font-body text-sm text-neutral-600">
          © {new Date().getFullYear()} NOVI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
