import { SIZES } from './ProductModal';

function ProductCard({ product, onSelect }) {
  const open = () => onSelect(product);

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
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 md:group-hover:opacity-0"
          />
          {product.back && (
            <img
              src={product.back}
              alt={`${product.name} - الوجه الخلفي`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 md:group-hover:opacity-100"
            />
          )}
        </div>
      </div>

      <div className="pt-4 px-1 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="display-sm text-lg md:text-2xl truncate">{product.name}</h3>
          <p className="text-sm text-ink/60 mt-1">{SIZES.join(', ')}</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          aria-label={`اختر مقاس ${product.name}`}
          className="shrink-0 w-12 h-12 rounded-full bg-ink text-paper grid place-items-center hover:scale-110 active:scale-95 transition-transform"
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
