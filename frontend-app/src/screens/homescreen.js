import data from "../data";
import {Link} from "react-router-dom";
function HomeScreen(){
    return(
        <div className="products">
        {data.products.map((product) =>(
            <div className="product" key={product.slug}>
              <Link to={`/products/${product.slug}`}>
              <img src={product.image} alt={product.image}/>
              </Link>
              <div className="product-info">
              <Link to={`/products/${product.slug}`}> 
              <p>{product.name}</p>
              </Link> 
              <p><strong>${product.price}</strong></p>
              </div>
            </div>
          ))}
        </div>
    )
}

export default HomeScreen;