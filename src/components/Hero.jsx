import coverImage from '../assets/cover-pic.jpg';
import { ButtonLink } from './Button';

const Hero = () => {
  return (
    <section
      className="relative w-full hero-height max-h-[820px] md:h-[92vh] md:max-h-none overflow-hidden bg-ink"
      aria-label="NOVI - الصورة الرئيسية"
    >
      <img
        src={coverImage}
        alt="NOVI - كوليكشن الملابس الجديدة"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        style={{ objectPosition: window.innerWidth < 768 ? '65% center' : 'center' }}
        fetchPriority="high"
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />

      <div className="absolute inset-x-0 bottom-0 px-8 md:px-12 pb-16 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="max-w-md text-paper text-sm leading-relaxed drop-shadow-md">
            قطع أساسية بتصميم دقيق وخامات مختارة بعناية. مصممة عشان تعيش في خزانتك سنين، مش موسم.
          </p>
          <ButtonLink href="#collection">Shop the collection</ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;