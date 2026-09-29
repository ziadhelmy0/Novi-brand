const PHRASE = 'NOVI — Born to be elegant';

function Marquee() {
  // بنكرر نفس الجملة مرتين جوه شريط واحد عشان اللفة تبقى متصلة من غير قطع
  const track = Array.from({ length: 8 }, () => PHRASE).join('   ·   ');

  return (
    <div
      className="relative w-full overflow-hidden bg-ink py-3"
      role="presentation"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        <span className="font-display font-bold text-sm md:text-base tracking-tight text-paper/80 whitespace-nowrap px-4">
          {track}
        </span>
        <span className="font-display font-bold text-sm md:text-base tracking-tight text-paper/80 whitespace-nowrap px-4">
          {track}
        </span>
      </div>
    </div>
  );
}

export default Marquee;
