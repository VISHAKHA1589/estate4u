import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useLoginMutation } from '../../redux/api/UsersApiSlice';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import Navigation from './Navigation';
import Footer from '../User/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector(state => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "429348943020-qe603e1vi6ob27tr1vcl51qrrsldhgq7.apps.googleusercontent.com",
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Basic password validation
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials(response));
      navigate('/');
      toast.success('Logged in successfully');
    } catch (error) {
      console.error(error);
      if (error.data.message === 'Invalid password') {
        setPasswordError('Incorrect password. Please try again.');
      } else {
        setError(error.data.message);
      }
    }
  };

  const googleLoginSuccessHandler = (response) => {
    // Handle successful Google login
    console.log("Google login success:", response);

    // Extract user's email from the Google response
    const { name,email } = response.profileObj;

    // Dispatch action to store credentials or perform any necessary steps
    dispatch(setCredentials({ name,email }));

    // Redirect to the home page
    navigate('/');
  };

  const googleLoginFailureHandler = (error) => {
    // Handle failed Google login
    console.error("Google login failure:", error);
    toast.error("Failed to login with Google. Please try again.");
  };

  return (
    <div>
      <Navigation />
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full lg:p-8 md:p-6 sm:p-4 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {passwordError && <p className="text-red-500 mb-4 text-center">{passwordError}</p>}
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="on"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full cursor-pointer text-center"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-6 text-blue-500 text-center">
            <Link to={redirect ? `/register?redirect=${redirect}` : `/register`} className="hover:underline">Don't have an account? Sign up Here</Link>
          </div>
          <div id="googleSignInButton" className="mt-6 text-center">
            <GoogleLogin
              clientId="429348943020-qe603e1vi6ob27tr1vcl51qrrsldhgq7.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={googleLoginSuccessHandler}
              onFailure={googleLoginFailureHandler}
              cookiePolicy={'single_host_origin'}
              isSignedIn={false}
              scope="profile email" // Add the 'profile' scope here
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
