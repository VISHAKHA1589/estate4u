import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useLoginMutation } from '../../redux/api/UsersApiSlice';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import Navigation from '../Auth/Navigation'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

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
  
    // Check if the password matches the expected password
    const expectedPassword = "your_expected_password"; // Replace with your expected password
    if (password !== expectedPassword) {
      setError('Wrong password');
      return;
    }
  
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials(response));
      navigate('/');
    } catch (error) {
      console.error(error);
      setError(error.data.message);
    }
  };

  const googleLoginSuccessHandler = (response) => {
    // Handle successful Google login
    console.log("Google login success:", response);

    // Extract user's email from the Google response
    const { name, email } = response.profileObj;

    // Dispatch action to store credentials or perform any necessary steps
    dispatch(setCredentials({ name, email }));

    // Redirect to the home page
    navigate('/');
  };

  const googleLoginFailureHandler = (error) => {
    // Handle failed Google login
    console.error("Google login failure:", error);
    setError("Failed to login with Google. Please try again.");
  };

  return (
    <div>
      <Navigation/>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">
              Logo
            </h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email" id="email" name="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 text-center" onClick={submitHandler}>
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            <Link to={redirect ? `/register?redirect=${redirect}` : `/register`} className="hover:underline text-purple">Don't have an account? Register</Link>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="flex justify-center"> {/* Container to center Google button */}
            <GoogleLogin
              clientId="429348943020-qe603e1vi6ob27tr1vcl51qrrsldhgq7.apps.googleusercontent.com"
              buttonText="Sign up with Google"
              onSuccess={googleLoginSuccessHandler}
              onFailure={googleLoginFailureHandler}
              cookiePolicy={'single_host_origin'}
              isSignedIn={false}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
