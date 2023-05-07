//import data from "../data";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function HomeScreen(){

  const [products,setProducts] = useState([]);

  useEffect(()=>{    
    const fetchData = async () =>{
      console.log("data");
      try{
      const result = await axios.get("/api/products");
      console.log(result);
      setProducts(result.data); 
      }catch(err){
        console.log(err);
      }
            
    }
    fetchData();
  },[]);

  return(
      <div className="products">
      {products.map((product) =>(
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