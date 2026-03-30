import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartSidebar from "./components/CartSidebar";
import { products } from "./data/products";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ADD TO CART
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // UPDATE QUANTITY
  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map(item =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  // TOGGLE CART
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // TOTAL ITEMS
  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={toggleCart}
      />

      <ProductList
        products={products}
        onAddToCart={addToCart}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </>
  );
}