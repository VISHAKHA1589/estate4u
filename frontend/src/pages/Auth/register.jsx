import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useRegisterMutation } from '../../redux/api/UsersApiSlice';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import Navigation from './Navigation';
import Footer from '../User/Footer';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
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
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(response));
      navigate(redirect);
    } catch (error) {
      console.error(error);
      setError(error.data.message);
    }
  };

  const googleLoginSuccessHandler = (response) => {
    // Handle successful Google login
    console.log("Google login success:", response);

    // Extract user's name and email from the Google response
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
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-100">
        <div className="max-w-md w-full px-8 py-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text" id="name" name="name" value={name}
                onChange={e => setName(e.target.value)}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email" id="email" name="email" value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex items-center justify-center">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 hover:bg-blue-600 text-center" onClick={submitHandler}>
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-gray-600 text-center">
            <Link to={redirect ? `/login?redirect=${redirect}` : `/login`} className="hover:underline text-purple-700">Already have an account? Login</Link>
          </div>
          <div className="flex items-center justify-center mt-4">
            <hr className="w-1/3 border-gray-300" />
            <p className="mx-3 text-gray-500">OR</p>
            <hr className="w-1/3 border-gray-300" />
          </div>
          <div className="mt-4">
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
      <Footer/>
    </div>
  );
}

export default Register;
