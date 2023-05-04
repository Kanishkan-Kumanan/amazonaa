import data from "./data";
function App() {
  return (
    <div>
      <header>
        <a href='/'>Amazonaa</a>
      </header>
      <main>Listing</main>
      {
        data.products.map(product =>(
          <div>
            <img src={product.image} alt={product.image}/>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;
