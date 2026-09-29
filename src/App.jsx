import { useState, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { loadProducts } from './utils/loadProducts';

const CATEGORIES = [
  { id: 'black_tshirts', label: 'Black T-Shirt', price:400 },
  { id: 'white_tshirts', label: 'White T-Shirt', price:400 },
  { id: 'green_tshirts', label: 'Green T-Shirt', price:400 },
  { id: 'pink_tshirts', label: 'Pink T-Shirt', price:400 },
  { id: 'black_sweatpants', label: 'Black Pants', price:600 },
  { id: 'green_sweatpants', label: 'Green Pants', price:600 },
  { id: 'white_sweatpants', label: 'White Pants', price:600 },
  { id: 'pink_sweatpants', label: 'Pink Pants', price:600 },
  { id: 'olive_sweatpants', label: 'Olive Pants', price:600 },
  { id: 'black_hoodie', label: 'Black Hoodie', price:800 },
  { id: 'white_hoodie', label: 'White Hoodie', price:800 },
  { id: 'gray_hoodie', label: 'Gray Hoodie', price:800 },
  { id: 'pink_hoodie', label: 'Pink Hoodie', price:800 },
  { id: 'olive_hoodie', label: 'Olive Hoodie', price:800 },
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const allProducts = useMemo(() => loadProducts(CATEGORIES), []);

  const visibleProducts = useMemo(
    () => allProducts.filter((p) => p.color === activeCategory),
    [allProducts, activeCategory]
  );

  const handleAddToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
    setSelectedProduct(null);
  }, []);

  // نجمع منتجات الكارت حسب الـ id عشان نعرض الكمية بدل ما نكرر نفس المنتج كذا مرة
  const groupedCart = useMemo(() => {
    const map = new Map();
    cart.forEach((item) => {
      if (map.has(item.id)) {
        map.get(item.id).qty += 1;
      } else {
        map.set(item.id, { ...item, qty: 1 });
      }
    });
    return Array.from(map.values());
  }, [cart]);

  const cartTotal = useMemo(
    () => groupedCart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [groupedCart]
  );

  const handleDecrement = useCallback((productId) => {
    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === productId);
      if (index === -1) return prev;
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cart.length} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <Marquee />

      <main id="collection" className="max-w-[1400px] mx-auto px-6 md:px-14 py-24">
        <header className="mb-14">
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight mb-12">
            Collection
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-1 border-b border-neutral-200">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
                className={`relative font-body text-sm pb-3 whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === cat.id
                    ? 'text-ink font-semibold'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {cat.label}
                <span
                  className={`absolute left-0 -bottom-px w-full h-px bg-accent transition-transform duration-300 origin-left ${
                    activeCategory === cat.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            ))}
          </div>
        </header>

        {visibleProducts.length > 0 ? (
          <section className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
            {visibleProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={setSelectedProduct}
                onAddToCart={handleAddToCart}
              />
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <span className="w-10 h-10 rounded-full border border-neutral-300" aria-hidden="true" />
            <p className="font-body text-neutral-400 text-sm">
              لا توجد منتجات في هذا القسم حالياً
            </p>
          </div>
        )}
      </main>

      <Contact />
      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        groupedItems={groupedCart}
        onIncrement={handleAddToCart}
        onDecrement={handleDecrement}
        total={cartTotal}
      />
    </div>
  );
}

export default App;
