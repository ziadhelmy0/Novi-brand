import { useState } from 'react';
import { SIZES } from './ProductModal';

function ProductCard({ product, onSelect }) {
  const open = () => onSelect(product);
  // على الموبايل مفيش hover، فالزرار الصغير هو اللي بيبدّل بين الأمام والخلف
  const [showBack, setShowBack] = useState(false);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      className="group cursor-pointer"
      aria-label={`عرض ${product.name} واختيار المقاس`}
    >
      <div className="relative">
        {/* تاج السعر المعلّق: بيتأرجح لما تقف عليه */}
        <div className="tag-swing absolute -top-4 right-4 md:right-6 z-20 flex flex-col items-center drop-shadow-md pointer-events-none">
          <span className="block w-px h-5 bg-ink/60" />
          <div className="tag-shape relative bg-paper text-ink pt-3.5 pb-2 px-3.5 text-center">
            <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-ink/30" />
            <span className="block display-sm text-xl md:text-2xl leading-none tabular-nums">
              {product.price}
            </span>
            <span className="block text-[10px] font-medium text-ink/55 mt-0.5">EGP</span>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white/50">
          <img
            src={product.front}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              showBack ? 'opacity-0' : 'opacity-100 md:group-hover:opacity-0'
            }`}
          />
          {product.back && (
            <img
              src={product.back}
              alt={`${product.name} - الوجه الخلفي`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                showBack ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
              }`}
            />
          )}

          {product.back && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowBack((v) => !v);
              }}
              aria-pressed={showBack}
              aria-label={showBack ? 'عرض الوجه الأمامي' : 'عرض الوجه الخلفي'}
              className="absolute bottom-3 left-3 z-10 hidden [@media(hover:none)]:inline-flex items-center gap-1.5 h-10 pl-3 pr-3.5 rounded-full bg-paper/90 backdrop-blur text-sm font-medium active:scale-95 transition-transform"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2.5 6.5A5.5 5.5 0 0 1 12.7 4.3M13.5 9.5A5.5 5.5 0 0 1 3.3 11.7M12.8 1.8v2.8H10M3.2 14.2v-2.8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {showBack ? 'Front' : 'Back'}
            </button>
          )}
        </div>
      </div>

      <div className="pt-4 px-1 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="display-sm text-[17px] md:text-2xl break-words">{product.name}</h3>
          <p className="text-[13px] md:text-sm text-ink/60 mt-1">{SIZES.join(', ')}</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          aria-label={`اختر مقاس ${product.name}`}
          className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-ink text-paper grid place-items-center hover:scale-110 active:scale-95 transition-transform"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1.5v13M1.5 8h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;