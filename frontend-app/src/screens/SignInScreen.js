import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import {  Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store.js";
import { toast } from "react-toastify";
import { getError } from "../util.js";

export default function SignInScreen(){
  const navigate = useNavigate();
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {state,dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;

    const submitHandler = async (e) =>{
      e.preventDefault();
      try{
      const {data} = await axios.post("/api/users/signin",{
        email,
        password,
      });
      ctxDispatch({type:"USER_SIGNIN",payload : data});
      localStorage.setItem('userInfo',JSON.stringify(data));
      navigate(redirect || "/");
    }catch(err){
       console.log(err.message);
       toast.error(getError(err));
    }
    }

    useEffect(() =>{
      if(userInfo){
        navigate(redirect)
      }
    },[userInfo,navigate,redirect])

    return(
        <Container className="small-container">
         <Helmet>
            <title>Sign In</title>
         </Helmet>
         <h1 className="my-3">Sign In</h1>
         <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email" onChange={(e) => setEmail(e.target.value)}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password" onChange={(e) =>setPassword(e.target.value)}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sign In</Button>
          </div>
          <div className="mb-3">
            New Customer?{' '}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
         </Form>
        </Container>
    )
}