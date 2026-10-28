import { useEffect } from 'react';

function CartDrawer({
  isOpen,
  onClose,
  groupedItems,
  onIncrement,
  onDecrement,
  onRemove,
  total,
  onCheckout,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const totalQty = groupedItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 z-[70] h-[100dvh] w-full sm:w-[460px] bg-paper flex flex-col sm:rounded-l-[2rem] transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="سلة المشتريات"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-5 sm:px-7 pt-6 pb-4">
          <h2 className="display-sm text-3xl">
            Your bag
            {totalQty > 0 && (
              <span className="ml-2 text-lg font-semibold text-ink/50 tabular-nums">{totalQty}</span>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق السلة"
            className="w-12 h-12 rounded-full grid place-items-center hover:bg-ink hover:text-paper transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {groupedItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="display-sm text-2xl">Your bag is empty</p>
            <p className="text-ink/60">اختار قطعة من الكولكشن وهتظهر هنا.</p>
            <button
              type="button"
              onClick={onClose}
              className="h-14 px-8 rounded-full bg-ink text-paper text-base font-medium active:scale-95 transition-transform"
            >
              Browse the collection
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-2 flex flex-col gap-3">
              {groupedItems.map((item) => (
                <div key={item.cartKey} className="flex gap-4 p-3 rounded-[1.5rem] bg-white/70">
                  <div
                    className="w-24 h-28 shrink-0 overflow-hidden rounded-[1.1rem]"
                    style={{ backgroundColor: item.tint }}
                  >
                    <img src={item.front} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="display-sm text-lg truncate">{item.name}</h3>
                        <p className="text-sm text-ink/60 mt-0.5">Size {item.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.cartKey)}
                        aria-label={`حذف ${item.name} من السلة`}
                        className="w-10 h-10 -mt-1.5 -mr-1.5 rounded-full grid place-items-center text-ink/50 hover:text-ink hover:bg-ink/5 transition-colors shrink-0"
                      >
                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                          <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full bg-paper">
                        <button
                          type="button"
                          onClick={() => onDecrement(item.cartKey)}
                          aria-label={`تقليل كمية ${item.name}`}
                          className="w-10 h-10 rounded-full grid place-items-center text-lg hover:bg-ink hover:text-paper transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => onIncrement(item)}
                          aria-label={`زيادة كمية ${item.name}`}
                          className="w-10 h-10 rounded-full grid place-items-center text-lg hover:bg-ink hover:text-paper transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="display-sm text-lg tabular-nums">
                        {(item.price * item.qty).toLocaleString('en-EG')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="px-5 sm:px-7 pt-5"
              style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
            >
              <div className="flex items-end justify-between mb-1">
                <span className="text-base text-ink/60">Subtotal</span>
                <span className="display-sm text-3xl tabular-nums">
                  {total.toLocaleString('en-EG')} <span className="text-base font-semibold">EGP</span>
                </span>
              </div>
              <p className="text-sm text-ink/50 mb-4">الشحن بيتحدد لما نأكد معاك الطلب.</p>
              <button
                type="button"
                onClick={onCheckout}
                className="w-full h-16 rounded-full bg-ink text-paper text-lg font-medium hover:bg-neutral-800 active:scale-[0.99] transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
