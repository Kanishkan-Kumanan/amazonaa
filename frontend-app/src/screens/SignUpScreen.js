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

export default function SignUpScreen(){
  const navigate = useNavigate();
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const {state,dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;

    const submitHandler = async (e) =>{
      e.preventDefault();
      if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return;
      }
      try{
      const {data} = await axios.post("/api/users/signup",{
        name,
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
            <title>Sign Up</title>
         </Helmet>
         <h1 className="my-3">Sign Up</h1>
         <Form onSubmit={submitHandler}>
         <Form.Group className="mb-3" controlId="name" onChange={(e) => setName(e.target.value)}>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" required/>
          </Form.Group>  
          <Form.Group className="mb-3" controlId="email" onChange={(e) => setEmail(e.target.value)}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password" onChange={(e) =>setPassword(e.target.value)}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmpassword" onChange={(e) =>setConfirmPassword(e.target.value)}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sign Up</Button>
          </div>
          <div className="mb-3">
           Already have an account?{' '}
           <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
         </Form>
        </Container>
    )
}