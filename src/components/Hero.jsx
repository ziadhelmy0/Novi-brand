import coverImage from '../assets/cover-pic.jpg';

// اختياري: لو حطيت صورة بالطول اسمها cover-mobile.jpg (أو png / webp) جوه src/assets
// هتتعرض على الموبايل بدل الصورة العريضة. لو مفيش، الصورة العريضة بتتعرض كاملة من غير قص.
const mobileCovers = import.meta.glob('../assets/cover-mobile.{jpg,jpeg,png,webp}', { eager: true });
const mobileCover = Object.values(mobileCovers)[0]?.default;

const Hero = () => {
  // stacked = الموبايل من غير صورة مخصصة: الصورة كاملة فوق، والنص تحتها (من غير قص)
  const stacked = !mobileCover;

  return (
    <section
      className={`relative w-full overflow-hidden bg-ink rounded-b-[2rem] md:rounded-b-[3.5rem] md:h-[100svh] md:min-h-[540px] ${
        stacked ? 'pt-[88px] md:pt-0' : 'h-[88svh] min-h-[520px]'
      }`}
      aria-label="NOVI - الصورة الرئيسية"
    >
      <picture className="contents">
        {mobileCover && <source media="(max-width: 767px)" srcSet={mobileCover} />}
        <img
          src={coverImage}
          alt="NOVI - كوليكشن الملابس الجديدة"
          className={
            stacked
              ? 'block w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover md:object-center'
              : 'absolute inset-0 w-full h-full object-cover object-center'
          }
          fetchPriority="high"
          loading="eager"
        />
      </picture>

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none ${
          stacked ? 'hidden md:block' : ''
        }`}
      />

      <div
        className={`flex flex-col md:flex-row-reverse md:items-end md:justify-between gap-6 ${
          stacked
            ? 'relative px-5 pt-7 pb-10 md:absolute md:inset-x-0 md:bottom-0 md:px-14 md:pt-0 md:pb-20'
            : 'absolute inset-x-0 bottom-0 px-5 pb-14 md:px-14 md:pb-20'
        }`}
      >
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