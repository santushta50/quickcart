import "../styles/CartSidebar.css";

function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={onClose}>X</button>
      </div>

      <div className="cart-items">
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-quantity">
                  <button className="quantity-btn" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => onRemoveItem(item.id)} aria-label="Remove item">✕</button>
              </div>
            ))
          )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;