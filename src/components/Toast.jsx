function Toast({ toast, onView }) {
  return (
    <div
      aria-live="polite"
      className="fixed z-[90] inset-x-4 bottom-4 md:inset-x-auto md:right-8 md:bottom-8 pointer-events-none flex md:justify-end"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {toast && (
        <div
          key={toast.key}
          className="toast-in pointer-events-auto w-full md:w-auto md:min-w-[380px] bg-ink text-paper rounded-full pl-2.5 pr-3 py-2.5 flex items-center gap-3 shadow-2xl"
        >
          {toast.image && (
            <img src={toast.image} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm text-paper/60 leading-tight">Added to your bag</p>
            <p className="text-[15px] font-medium truncate leading-snug">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={onView}
            className="shrink-0 h-11 px-5 rounded-full bg-paper text-ink text-sm font-medium active:scale-95 transition-transform"
          >
            View bag
          </button>
        </div>
      )}
    </div>
  );
}

export default Toast;
