import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('quickcart-cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // small delay to simulate loading
    const t = setTimeout(() => setIsLoading(false), 60);
    return () => clearTimeout(t);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart(prev => {
      if (qty <= 0) return prev.filter(item => item.id !== id);
      return prev.map(item => (item.id === id ? { ...item, quantity: qty } : item));
    });
  };

  const toggleCart = () => setIsCartOpen(v => !v);

  const getTotalItems = () => cart.reduce((s, i) => s + (i.quantity || 0), 0);
  const getTotalPrice = () => cart.reduce((s, i) => s + (i.price * (i.quantity || 0)), 0);

  const value = {
    cart,
    setCart,
    isCartOpen,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
