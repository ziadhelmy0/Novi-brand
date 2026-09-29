function ProductCard({ product, onSelect, onAddToCart }) {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(product);
      }}
      className="group cursor-pointer"
      aria-label={`عرض تفاصيل ${product.name}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={product.front}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-500 group-hover:opacity-0 group-hover:scale-105"
        />
        {product.back && (
          <img
            src={product.back}
            alt={`${product.name} - الوجه الخلفي`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* زرار الإضافة السريعة - بيظهر بس عند الهوفر على الديسكتوب، دايمًا ظاهر على الموبايل */}
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`أضف ${product.name} للسلة`}
          className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center bg-paper text-ink opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-accent hover:text-paper"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="pt-4 flex items-start justify-between gap-2">
        <h3 className="font-body text-sm text-neutral-800 leading-snug">
          {product.name}
        </h3>
        <p className="font-body font-semibold text-sm text-neutral-500 shrink-0">
          {product.price.toLocaleString('en-EG')} EGP
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
