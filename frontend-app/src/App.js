import {BrowserRouter,Routes,Route, Link} from "react-router-dom";
import HomeScreen from "./screens/homescreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductScreen from "./screens/productscreen";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import {LinkContainer} from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import { Store } from "./Store";
import { useContext } from "react";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import ShippingAddress from "./screens/shippingAddressScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import CheckOutScreen from "./screens/CheckOutScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {

  const {state,dispatch:ctxDispatch} = useContext(Store);
  const {cart,userInfo} = state;

  const signoutHandler = () => {
    ctxDispatch({type:"USER_SIGNOUT"});
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = '/signin';
  }
 
  return (
  <BrowserRouter>
    <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Amazonaa</Navbar.Brand>
            </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">  
        <Nav className="me-auto w-100 justify-content-end">
          <Link to="/cart" className="nav-link">
            Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a,c) => a + c.quantity,0)}
              </Badge>
            )}
          </Link>
          {userInfo ? (
             <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <LinkContainer to="/profile">
                <NavDropdown.Item>
                  User Profile
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orderhistory">
                <NavDropdown.Item>
                  Order History
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>
                SignOut
              </Link>
             </NavDropdown>
          ):(
            <Link className="nav-link" to="/signin">
              Sign In
            </Link>
          )}
          </Nav>   
          </Navbar.Collapse> 
          </Container>
        </Navbar>
      </header>
      <main>
     <Container className="mt-3"> 
      <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen/>}/>
          <Route path="/signin" element={<SignInScreen/>} />
          <Route path="/shipping" element={<ShippingAddress />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/placeorder" element={<CheckOutScreen/>} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/orderhistory" element={<OrderHistoryScreen />} />
          <Route path="/profile" element={<ProfileScreen/>} />
        </Routes>
      </Container>  
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  </BrowserRouter>  
  );
}

export default App;
