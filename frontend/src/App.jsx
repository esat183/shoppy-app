import { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { PRODUCTS, CATEGORIES } from './data/products';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import Toast from './components/Toast';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Banner */}
          <section className="mb-8 p-8 rounded-3xl bg-linear-to-r from-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
                Exclusive Collection
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
                Modern Essentials for Work & Lifestyle
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Explore handpicked premium gear, top-tier audio, and everyday tech designed to elevate your setup. Use code <span className="text-indigo-300 font-bold">WELCOME10</span> for 10% off!
              </p>
            </div>
          </section>

          {/* Category Filter Pills */}
          <section className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </section>

          {/* Product Grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Featured Products</h2>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredProducts.length} items
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                <p className="font-semibold text-base">No products found</p>
                <p className="text-xs mt-1">Try clearing your search query or selecting another category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Global Cart Drawer */}
        <CartDrawer />

        {/* Quick View Product Modal */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        {/* Toast Notifications */}
        <Toast />
      </div>
    </CartProvider>
  );
}