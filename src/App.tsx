import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Carts from "./pages/Carts";
import CartDetails from "./pages/CartDetails";
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/home" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/carts/:id" element={<CartDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
