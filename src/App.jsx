import { useState, useMemo, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { loadProducts } from './utils/loadProducts';

// كل لون له درجة خلفية (tint): لما العميل يختار اللون، صفحة الكولكشن كلها بتتلوّن بيه
const SHADES = {
  black: { name: 'Black', swatch: '#000000', tint: '#cfd0d4' },
  white: { name: 'White', swatch: '#ffffff', tint: '#fbfbf9' },
  green: { name: 'Green', swatch: '#4d7c3a', tint: '#cde4b5' },
  pink: { name: 'Pink', swatch: '#f08fb0', tint: '#f7c8d8' },
  olive: { name: 'Olive', swatch: '#7a7a3a', tint: '#d9d7a3' },
  gray: { name: 'Gray', swatch: '#9b9ba0', tint: '#dcdce0' },
};

// folder = اسم المجلد جوه src/assets
const TYPES = [
  { id: 'tshirts', label: 'T-Shirts', folder: 'tshirts', single: 'T-Shirt', price: 400, shades: ['black', 'white', 'green', 'pink'] },
  { id: 'pants', label: 'Pants', folder: 'sweatpants', single: 'Pants', price: 600, shades: ['black', 'green', 'white', 'pink', 'olive'] },
  { id: 'hoodies', label: 'Hoodies', folder: 'hoodie', single: 'Hoodie', price: 800, shades: ['black', 'white', 'gray', 'pink', 'olive'] },
];

const CATEGORIES = TYPES.flatMap((type) =>
  type.shades.map((shade) => ({
    id: `${shade}_${type.folder}`,
    type: type.id,
    shade,
    label: `${SHADES[shade].name} ${type.single}`,
    price: type.price,
    swatch: SHADES[shade].swatch,
    tint: SHADES[shade].tint,
  }))
);

const STORAGE_KEY = 'novi_cart_v1';

// بنحفظ بس { id, size } مش الصور، عشان لينكات الصور بتتغير بعد كل نشر للموقع
function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const [cart, setCart] = useState(readStoredCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const active = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];
  const activeType = TYPES.find((t) => t.id === active.type);
  const typeCategories = CATEGORIES.filter((c) => c.type === active.type);

  const allProducts = useMemo(() => loadProducts(CATEGORIES), []);
  const productsById = useMemo(
    () => new Map(allProducts.map((p) => [p.id, p])),
    [allProducts]
  );

  const visibleProducts = useMemo(
    () => allProducts.filter((p) => p.color === activeCategory),
    [allProducts, activeCategory]
  );

  // لما العميل يغيّر النوع، بنحاول نخلّي نفس اللون لو موجود
  const handleType = (typeId) => {
    const type = TYPES.find((t) => t.id === typeId);
    const shade = type.shades.includes(active.shade) ? active.shade : type.shades[0];
    setActiveCategory(`${shade}_${type.folder}`);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* التخزين غير متاح - مش مشكلة */
    }
  }, [cart]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const groupedCart = useMemo(() => {
    const map = new Map();
    cart.forEach(({ id, size }) => {
      const product = productsById.get(id);
      if (!product) return;
      const cartKey = `${id}|${size}`;
      if (map.has(cartKey)) {
        map.get(cartKey).qty += 1;
      } else {
        map.set(cartKey, { ...product, size, cartKey, qty: 1 });
      }
    });
    return Array.from(map.values());
  }, [cart, productsById]);

  const cartCount = useMemo(
    () => groupedCart.reduce((sum, item) => sum + item.qty, 0),
    [groupedCart]
  );

  const cartTotal = useMemo(
    () => groupedCart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [groupedCart]
  );

  const handleAddToCart = useCallback((product, size) => {
    setCart((prev) => [...prev, { id: product.id, size }]);
    setSelectedProduct(null);
    setToast({ key: Date.now(), message: `${product.name}, size ${size}`, image: product.front });
  }, []);

  const handleIncrement = useCallback((item) => {
    setCart((prev) => [...prev, { id: item.id, size: item.size }]);
  }, []);

  const handleDecrement = useCallback((cartKey) => {
    const [id, size] = cartKey.split('|');
    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === id && p.size === size);
      if (index === -1) return prev;
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  }, []);

  const handleRemove = useCallback((cartKey) => {
    const [id, size] = cartKey.split('|');
    setCart((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
  }, []);

  const handleCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(true);
  }, []);

  const handleOrderComplete = useCallback(() => {
    setCart([]);
    setCheckoutOpen(false);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <Marquee />

      <main
        id="collection"
        style={{ backgroundColor: active.tint }}
        className="transition-colors duration-700 scroll-mt-0"
      >
        <div className="max-w-[1500px] mx-auto px-5 md:px-14 pt-16 md:pt-28 pb-20 md:pb-32">
          <header className="mb-12 md:mb-20">
            <h2 className="display text-[12.5vw] md:text-[9vw] mb-8 md:mb-12">
              Collection
              <span className="ml-2 md:ml-3 align-top text-[0.26em] font-semibold tracking-normal tabular-nums">
                {visibleProducts.length}
              </span>
            </h2>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="inline-flex self-start rounded-full bg-ink p-1.5" role="group" aria-label="نوع المنتج">
                {TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleType(type.id)}
                    aria-pressed={active.type === type.id}
                    className={`h-11 px-3.5 sm:px-5 md:px-7 rounded-full text-[15px] font-medium whitespace-nowrap transition-colors duration-300 ${
                      active.type === type.id ? 'bg-paper text-ink' : 'text-paper/70 hover:text-paper'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap" role="group" aria-label="اللون">
                {typeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={active.id === cat.id}
                    aria-label={SHADES[cat.shade].name}
                    style={{ backgroundColor: cat.swatch }}
                    className={`w-11 h-11 rounded-full border border-ink/20 transition-transform duration-300 hover:scale-110 ${
                      active.id === cat.id ? 'outline outline-2 outline-ink outline-offset-4 scale-110' : ''
                    }`}
                  />
                ))}
                <span className="ml-1 text-[15px] font-medium tabular-nums">
                  {SHADES[active.shade].name}, {active.price} EGP
                </span>
              </div>
            </div>
          </header>

          {visibleProducts.length > 0 ? (
            <section
              aria-label={`${activeType.label} - ${SHADES[active.shade].name}`}
              className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-14 md:gap-y-20"
            >
              {visibleProducts.map((p) => (
                <ProductCard key={p.id} product={p} onSelect={setSelectedProduct} />
              ))}
            </section>
          ) : (
            <div className="py-24 text-center">
              <p className="display-sm text-2xl md:text-3xl mb-2">Nothing here yet</p>
              <p className="text-ink/60">القسم ده لسه مفيهوش منتجات. جرّب لون تاني.</p>
            </div>
          )}
        </div>
      </main>

      <Contact />
      <Footer />

      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        groupedItems={groupedCart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
        total={cartTotal}
        onCheckout={handleCheckout}
      />

      {checkoutOpen && (
        <CheckoutModal
          items={groupedCart}
          total={cartTotal}
          onClose={() => setCheckoutOpen(false)}
          onComplete={handleOrderComplete}
        />
      )}

      <Toast
        toast={toast}
        onView={() => {
          setToast(null);
          setCartOpen(true);
        }}
      />
    </div>
  );
}

export default App;
