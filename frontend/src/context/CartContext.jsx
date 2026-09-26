import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const COUPONS = {
  WELCOME10: 0.1, // 10% discount
  SAVE20: 0.2,    // 20% discount
};

const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_SHIPPING_FEE = 15;

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shoppy_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('shoppy_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const applyCoupon = (code) => {
    const formatted = code.trim().toUpperCase();
    if (COUPONS[formatted]) {
      setDiscountRate(COUPONS[formatted]);
      setCouponCode(formatted);
      setCouponError('');
      showToast(`Coupon "${formatted}" applied successfully!`);
      return true;
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or SAVE20');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountRate(0);
    setCouponError('');
  };

  const clearCart = () => {
    setCart([]);
    removeCoupon();
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountAmount,
        discountRate,
        couponCode,
        couponError,
        applyCoupon,
        removeCoupon,
        shippingFee,
        finalTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}