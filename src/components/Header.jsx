import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

export default function Header({ searchTerm, onSearchChange }) {
  const navigate = useNavigate();
  const { getTotalItems, toggleCart } = useCart();

  const categories = ["Electronics", "Accessories", "Home", "Sports"];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <Link to="/" className="header-logo">
            <h1 className="header-title">🛒 QuickCart</h1>
            <p className="header-subtitle">Your one-stop shop for everything</p>
          </Link>

          <div className="header-actions">
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
            <button className="cart-icon-btn" onClick={toggleCart} aria-label="Open cart">
              🛒
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </button>
          </div>
        </div>

        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          {categories.map(cat => (
            <Link key={cat} to={`/category/${cat}`} className="nav-link">{cat}</Link>
          ))}
          <Link to="/cart" className="nav-link">Cart</Link>
        </nav>
      </div>
    </header>
  );
}