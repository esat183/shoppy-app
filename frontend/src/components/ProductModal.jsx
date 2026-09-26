import { useState } from 'react';
import { X, Star, Plus, Minus, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="md:w-1/2 aspect-square md:aspect-auto bg-slate-100 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-xs font-semibold px-3 py-1 rounded-full text-slate-700 shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Modal Info */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold mb-2">
              <Star className="w-4 h-4 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.stock} in stock)</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {product.name}
            </h2>

            <p className="text-2xl font-extrabold text-indigo-600 mt-2">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-slate-600 text-xs sm:text-sm mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Badges */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-500" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-600 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-600 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart (${(product.price * quantity).toFixed(2)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}