import Navbar from '../../components/Navbar/Navbar';
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../Api/axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/SignUp`;


const SignUp = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //setting focus for when component loads on user input
  useEffect(() => {
    emailRef.current?.focus();
  }, [])

  // validate the email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])

  //validate the username
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  //validate the password and match with account
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd == matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  //error message
  useEffect(() => {
    setErrMsg('');
  }, [email, user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = USER_REGEX.test(user);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ email, user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSuccess(true);
      setEmail('');
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current?.focus();
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="signup-container">
      {success ? (
          <section>
              <h1>Success!</h1>
              <p>
                <Link to="/login">Login</Link>
              </p>
          </section>
      ) : (
    <section>
        {/*display error message */}
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
         <span className={validEmail ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validEmail || !email ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
         </span>
    </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="eidnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
      />
    <p id="eidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
     <FontAwesomeIcon icon={faInfoCircle} />
      Must be a valid email address.
   </p>

  {/* Username Field */}
      <label htmlFor="username">
        Username:
      <span className={validName ? "valid" : "hide"}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span className={validName || !user ? "hide" : "invalid"}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        onChange={(e) => setUser(e.target.value)}
        required
        aria-invalid={validName ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
      />
    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
      <FontAwesomeIcon icon={faInfoCircle} />
      4 to 24 characters. <br />
      Must begin with a letter. <br />
      Letters, numbers, underscores, hyphens allowed.
    </p>

  {/* Password Field */}
    <label htmlFor="password">
      Password:
      <span className={validPwd ? "valid" : "hide"}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span className={validPwd || !pwd ? "hide" : "invalid"}>
       <FontAwesomeIcon icon={faTimes} />
      </span>
    </label>
      <input
        type="password"
        id="password"
        onChange={(e) => setPwd(e.target.value)}
        required
        aria-invalid={validPwd ? "false" : "true"}
        aria-describedby="pwdnote"
        onFocus={() => setPwdFocus(true)}
        onBlur={() => setPwdFocus(false)}
      />
    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
      <FontAwesomeIcon icon={faInfoCircle} />
      8 to 24 characters. <br />
      Must include uppercase and lowercase letters, a number, and a special character. <br />
      Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span>{' '}
      <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span>{' '}
      <span aria-label="percent">%</span>
    </p>

  {/* Confirm Password Field */}
    <label htmlFor="confirm_pwd">
      Confirm Password:
      <span className={validMatch && matchPwd ? "valid" : "hide"}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </label>
      <input
        type="password"
        id="confirm_pwd"
        onChange={(e) => setMatchPwd(e.target.value)}
        required
        aria-invalid={validMatch ? "false" : "true"}
        aria-describedby="confirmnote"
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
      />
    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
      <FontAwesomeIcon icon={faInfoCircle} />
      Must match the first password input field.
    </p>

  {/* Sign Up Button */}
  <button disabled={!validEmail || !validName || !validPwd || !validMatch}>Sign Up</button>

</form>
        <p>
            Already Signed Up?<br />
            <span className="line">
              <Link to="/login">Login</Link>
            </span>

        </p>

    </section>
      )}
      </div>
    </>
  )
}

export default SignUp;