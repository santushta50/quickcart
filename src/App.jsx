import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { products } from "./data/products";
import "./styles/App.css";

function App() {
  return (
    <div>
      <Header />
      <p>QuickCart App</p>
      <p>PR test change</p>
      <ProductList products={products} />
    </div>
  );
}

export default App;