import { useEffect } from 'react';
import { Button } from './Button';

function CartDrawer({ isOpen, onClose, groupedItems, onIncrement, onDecrement, total }) {
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

  return (
    <>
      {/* الخلفية المعتمة - بتقفل الكارت لو دوست برة */}
      <div
        className={`fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* اللوحة الجانبية */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[420px] bg-paper flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="سلة المشتريات"
      >
        <div className="flex items-center justify-between px-8 py-7 border-b border-neutral-200">
          <h2 className="font-display font-bold text-lg uppercase tracking-wide">
            Your Bag {groupedItems.length > 0 && `(${groupedItems.reduce((sum, i) => sum + i.qty, 0)})`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق السلة"
            className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-ink transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>

        {groupedItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="w-10 h-10 rounded-full border border-neutral-300" aria-hidden="true" />
            <p className="font-body text-sm text-neutral-400">
              السلة فاضية
            </p>
            <button
              type="button"
              onClick={onClose}
              className="font-body text-sm font-medium border-b border-ink pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              اكتشف الكولكشن
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
              {groupedItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden">
                    <img src={item.front} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-display font-bold text-xs uppercase tracking-wide truncate">
                        {item.name}
                      </h3>
                      <p className="font-body text-sm text-neutral-400 mt-1">
                        {item.price.toLocaleString('en-EG')} EGP
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onDecrement(item.id)}
                        aria-label={`تقليل كمية ${item.name}`}
                        className="w-6 h-6 flex items-center justify-center border border-neutral-200 text-neutral-600 hover:border-ink hover:text-ink transition-colors"
                      >
                        −
                      </button>
                      <span className="font-body text-sm w-4 text-center">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => onIncrement(item)}
                        aria-label={`زيادة كمية ${item.name}`}
                        className="w-6 h-6 flex items-center justify-center border border-neutral-200 text-neutral-600 hover:border-ink hover:text-ink transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-8 py-7 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-5">
                <span className="font-body text-sm text-neutral-500">
                  Subtotal
                </span>
                <span className="font-display font-bold text-lg">
                  {total.toLocaleString('en-EG')} EGP
                </span>
              </div>
              <Button
                onClick={() => alert('صفحة الدفع لسه مش جاهزة - قولّي لما تحب نعملها')}
                className="w-full"
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
