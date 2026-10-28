import { useEffect, useState } from 'react';

export const SIZES = ['S', 'M', 'L', 'XL'];

function ProductModal({ product, onClose, onAddToCart }) {
  const [size, setSize] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleAdd = () => {
    if (!size) {
      setShowError(true);
      return;
    }
    onAddToCart(product, size);
  };

  return (
    <div
      className="fixed inset-0 z-[55] flex items-end md:items-center justify-center md:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`تفاصيل ${product.name}`}
    >
      <div
        className="sheet-in relative bg-paper w-full md:max-w-6xl max-h-[94dvh] md:max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row rounded-t-[2rem] md:rounded-[2.5rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-3 right-3 z-20 w-12 h-12 rounded-full bg-paper text-ink grid place-items-center hover:bg-ink hover:text-paper transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* الصور على خلفية لون المنتج: سحب أفقي على الموبايل، عمودي على الشاشات الكبيرة */}
        <div
          className="md:w-1/2 shrink-0 md:max-h-[90vh] md:overflow-y-auto p-3 md:p-4"
          style={{ backgroundColor: product.tint }}
        >
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar">
            <img
              src={product.front}
              alt={`${product.name} - الوجه الأمامي`}
              className="w-[88%] md:w-full shrink-0 snap-center object-cover rounded-[1.5rem] md:rounded-[2rem]"
            />
            {product.back && (
              <img
                src={product.back}
                alt={`${product.name} - الوجه الخلفي`}
                className="w-[88%] md:w-full shrink-0 snap-center object-cover rounded-[1.5rem] md:rounded-[2rem]"
              />
            )}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col md:overflow-y-auto">
          <div className="p-6 md:p-12 md:pb-6 flex-1 flex flex-col justify-center">
            <h2 className="display text-4xl md:text-6xl mb-5">{product.name}</h2>

            <p className="inline-flex self-start items-baseline gap-1.5 -rotate-2 bg-ink text-paper rounded-full px-5 py-2 mb-9">
              <span className="display-sm text-2xl tabular-nums">{product.price}</span>
              <span className="text-sm">EGP</span>
            </p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-medium">اختار المقاس</span>
                {showError && !size && (
                  <span className="text-sm text-red-600" role="alert">
                    لازم تختار مقاس الأول
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2.5 md:gap-3" role="radiogroup" aria-label="المقاس">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={size === s}
                    onClick={() => {
                      setSize(s);
                      setShowError(false);
                    }}
                    className={`aspect-square rounded-2xl display-sm text-xl border-2 transition-all duration-200 ${
                      size === s
                        ? 'bg-ink text-paper border-ink scale-105'
                        : 'bg-white/60 border-ink/15 hover:border-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="sticky bottom-0 px-6 md:px-12 pt-3 bg-paper"
            style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={handleAdd}
              className="w-full h-16 rounded-full bg-ink text-paper flex items-center justify-between px-8 text-lg font-medium hover:bg-neutral-800 active:scale-[0.99] transition"
            >
              <span>Add to bag</span>
              <span className="tabular-nums">{product.price} EGP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
