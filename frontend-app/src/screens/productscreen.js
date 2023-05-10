import {useParams} from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Rating from "../components/Rating";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


const reducer = (state,action) =>{
    switch(action.type){
      case 'FETCH_REQUEST':
        return {...state,loading:true};
      case 'FETCH_SUCCESS':
        return {...state,product:action.payload,loading:false};
      case 'FETCH_FAIL':
        return {...state,loading:false,error:action.payload};
      default:
        return state;      
    }
  }

function ProductScreen(){
    const params = useParams();
    const {slug} = params

    const [{loading,error,product},dispatch] = useReducer(reducer,{
        product: [],
        loading : true,
        error : '',
      });
    
      useEffect(()=>{    
        const fetchData = async () =>{
          dispatch({type:"FETCH_REQUEST"});
          try{        
          const result = await axios.get(`/api/products/slug/${slug}`);
          dispatch({type:"FETCH_SUCCESS",payload:result.data});      
          }catch(err){
            dispatch({type:"FETCH_FAIL",payload:err.message});
          }            
        }
        fetchData();
      },[slug]);

    return(
        loading ?( <LoadingBox />
        ):error ? (
          <MessageBox variant="danger">{error}</MessageBox>):
        <div>
            <Row>
                <Col mg={6}>
                    <img src={product.image} alt={product.name} className="img-large"/>
                </Col>
                <Col mg={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Helmet>  
                            <title>{product.name}</title>
                           </Helmet>  
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Rating rating={product.rating} reviews={product.numReviews}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description :
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col mg={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price: </Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status: </Col>
                                        <Col>{product.countInStock > 0 ?  <Badge bg="success">In Stock</Badge> : <Badge bg="danger">Not Available</Badge>}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 &&
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button variant="primary">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductScreen;