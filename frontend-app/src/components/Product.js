import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";

function Product(props){
    const {product} = props;
    return(
        <Card>
            <Link to={`/products/${product.slug}`}>
            <img src={product.image} className="card-img-top" alt={product.image}/>
            </Link>
            <Card.Body>
              <Link to={`/products/${product.slug}`}> 
                <Card.Title>{product.name}</Card.Title>
              </Link> 
              <Card.Text>${product.price}</Card.Text>
              <Button className="btn-primary">Add to Cart</Button>
              <Rating rating={product.rating} reviews={product.numReviews} />
            </Card.Body>
         
          </Card>
    )
}

export default Product;