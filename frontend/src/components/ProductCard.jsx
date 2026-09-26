import { Star, Plus, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Product Image */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-xs font-semibold px-2.5 py-1 rounded-full text-slate-700 shadow-xs">
          {product.category}
        </span>

        {/* Quick View Floating Button */}
        <button
          onClick={() => onSelectProduct(product)}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-700 hover:text-indigo-600 p-2 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          title="Quick View"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div
          onClick={() => onSelectProduct(product)}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold mb-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating}</span>
          </div>

          <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-slate-500 text-xs mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price & Add Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Price</span>
            <span className="text-lg font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-medium py-2 px-3.5 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}