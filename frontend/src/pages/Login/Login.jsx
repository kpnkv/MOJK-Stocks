import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../Api/axios';
import './Login.css';
import Navbar from '../../components/Navbar/Navbar';

const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setuser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      const { user: loggedInUser, email, stockList, _id, accessToken } = response?.data;

      setAuth({
        user: loggedInUser,
        email,
        stockList,
        _id,
        accessToken
      });

      setuser('');
      setPwd('');
      setSuccess(true);
      navigate('/home'); // Redirect to the home page after successful login
    } catch (err) {
      if (!err?.response) {
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
  };

  return (
    <>
    <Navbar />
      <div className="login-form">
        {success ? (
          <section>
            <h1>You are Logged in!</h1>
            <br />
            <p>
              <Link to="/home">Go to Home</Link>
            </p>
          </section>
        ) : (
          <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
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
                <Link to="/signUp">Sign up</Link>
              </span>
            </p>
          </section>
        )}
      </div>
    </>
  );
};

export default Login;
