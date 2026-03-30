import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const total = getTotalPrice();

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          <p>Your cart is empty</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-page-content">
          <div className="cart-items-list">
            {cart.map(item => (
              <div key={item.id} className="cart-page-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <div>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span style={{margin: '0 8px'}}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total: ${total.toFixed(2)}</p>
            <button className="checkout-btn">Proceed to Checkout</button>
            <Link to="/" style={{display: 'block', marginTop: 12}}>Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
