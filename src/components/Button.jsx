/**
 * زرار موحّد لكل الصفحة - نفس حركة الملء (sweep) في كل مكان
 * عشان يبقى فيه إحساس واحد مميز بدل ما كل زرار يتصرف لوحده.
 */
const BASE =
  'group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-body font-semibold text-sm overflow-hidden isolate transition-colors duration-300';

function Fill() {
  return (
    <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
  );
}

export function Button({ children, className = '', ...props }) {
  return (
    <button type="button" className={`${BASE} bg-ink text-paper ${className}`} {...props}>
      <Fill />
      <span className="relative">{children}</span>
    </button>
  );
}

export function ButtonLink({ children, className = '', ...props }) {
  return (
    <a className={`${BASE} bg-ink text-paper w-fit ${className}`} {...props}>
      <Fill />
      <span className="relative">{children}</span>
    </a>
  );
}

export function GhostButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`font-body text-xs text-neutral-400 hover:text-ink transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
