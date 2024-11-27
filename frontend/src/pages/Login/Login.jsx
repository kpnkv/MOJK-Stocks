import Navbar from '../../components/Navbar/Navbar';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../Context/AuthProvider";
import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import './Login.css';
import axios from '../Api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setuser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //set focus on first input when component loads
  useEffect(() => {
    userRef.current.focus();
  }, [])

  //empty out any error message we might have if the user changes the state of the password or username
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}), 
        {
          headers: { 'Content-Type' : 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({ user, pwd, accessToken });
      setuser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
        if(!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }    
  }

  return (
    <>
    <Navbar />
    <div class="login-form">
      {success ? (
        <section>
          <h1>You are Logged in!</h1>
          <br />
          <p>
            <Link to="/Home">Go to Home</Link>
          </p>
        </section>
      ) : (
    <section>
        

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setuser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Login</button>

        </form>
        <p>
          Need an Account?<br />
          <span className="line">
            <Link to="/SignUp">Sign up</Link>
            </span>   
        </p>
    </section>
      )}
        </div>
      </>
    
  );
};

export default Login;
