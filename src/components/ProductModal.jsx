import { useEffect } from 'react';

import { Button, GhostButton } from './Button';

function ProductModal({ product, onClose, onAddToCart }) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`تفاصيل ${product.name}`}
    >
      <div
        className="glass-modal w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto bg-neutral-100">
          <div className="w-full bg-white">
            <img
              src={product.front}
              alt={`${product.name} - الوجه الأمامي`}
              className="w-full object-contain"
            />
          </div>

          {product.back && (
            <div className="w-full bg-white border-t border-neutral-200">
              <img
                src={product.back}
                alt={`${product.name} - الوجه الخلفي`}
                className="w-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white">
          <h2 className="font-display font-black text-3xl uppercase tracking-tight mb-4">
            {product.name}
          </h2>

          <p className="font-body font-semibold text-lg mb-8">
            {product.price.toLocaleString('en-EG')} EGP
          </p>

          <Button onClick={() => onAddToCart(product)} className="w-full">
            Add to cart
          </Button>

          <GhostButton onClick={onClose} className="w-full mt-4 py-3">
            إغلاق
          </GhostButton>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;