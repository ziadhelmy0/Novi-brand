import coverImage from '../assets/cover-pic.jpg';

const Hero = () => {
  return (
    <section
      className="relative w-full h-[88svh] min-h-[540px] md:h-[100svh] overflow-hidden bg-ink rounded-b-[2rem] md:rounded-b-[3.5rem]"
      aria-label="NOVI - الصورة الرئيسية"
    >
      <img
        src={coverImage}
        alt="NOVI - كوليكشن الملابس الجديدة"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />

      <div className="absolute inset-x-0 bottom-0 px-5 md:px-14 pb-14 md:pb-20 flex flex-col md:flex-row-reverse md:items-end md:justify-between gap-6">
        <p dir="rtl" className="max-w-md text-paper text-lg md:text-xl leading-relaxed">
          قطع أساسية بتصميم دقيق وخامات مختارة بعناية. مصممة عشان تعيش في خزانتك سنين، مش موسم.
        </p>
        <a
          href="#collection"
          className="inline-flex items-center justify-center gap-3 h-16 px-9 rounded-full bg-paper text-ink text-lg font-medium hover:bg-white active:scale-95 transition w-full md:w-fit"
        >
          Shop the collection
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 2V15M3 10L9 16L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
