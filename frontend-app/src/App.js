import {BrowserRouter,Routes,Route, Link} from "react-router-dom";
import HomeScreen from "./screens/homescreen";
import ProductScreen from "./screens/productscreen";
function App() {
  return (
  <BrowserRouter>
    <div>
      <header>
        <Link to="/">Amazonaa</Link>
      </header>
      <main>
      <h1>Featured Products</h1>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/:slug" element={<ProductScreen />} />
        </Routes>
     
      </main>
    </div>
  </BrowserRouter>  
  );
}

export default App;
