import React, { useState } from 'react';
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { authActions } from '../../../Store';
import { useRouter } from 'next/router';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name === "name" ? "username" : name; 
    setRegisterForm(prevState => ({ ...prevState, [fieldName]: value }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/signin', loginForm);
      dispatch(authActions.setToken(response.data.token));
      dispatch(authActions.loggedIn(true));
      router.push('/books');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred while processing your request.');
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/signup', registerForm);
      
      setError(response.data.message);
      
      setRegisterForm({ username: '', email: '', password: '' });
    }catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(error => error.msg).join(', ');
        setError(errorMessages);
      } else {
        setError('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div className="login-container">
      <ul className="tab-list">
        <li className={activeTab === 'login' ? 'active' : ''}>
          <button onClick={() => handleTabChange('login')}>Login</button>
        </li>
        <li className={activeTab === 'register' ? 'active' : ''}>
          <button onClick={() => handleTabChange('register')}>Register</button>
        </li>
      </ul>
      <div className="form-container">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {activeTab === 'login' && (
          <div className="form">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={loginForm.email} onChange={handleLoginChange} />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" value={loginForm.password} onChange={handleLoginChange} />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        )}
        {activeTab === 'register' && (
          <div className="form">
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="username" value={registerForm.username} onChange={handleRegisterChange} />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={registerForm.email} onChange={handleRegisterChange} />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" value={registerForm.password} onChange={handleRegisterChange} />
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh; /* Set height to 100% of viewport height */
          margin-top: 50px;
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .tab-list {
          display: flex;
          list-style: none;
          padding: 0;
        }

        .tab-list li {
          margin-right: 10px;
        }

        .tab-list button {
          padding: 5px 10px;
          cursor: pointer;
          border: none;
          background-color: transparent;
          font-size: 18px;
          color: #555;
          transition: color 0.3s;
        }

        .tab-list li.active button {
          font-weight: bold;
          color: #007bff;
        }

        .form-container {
          width: 100%;
        }

        .form {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 5px;
          margin-top: 20px;
          background-color: #fff;
        }

        .form h2 {
          margin-top: 0;
          margin-bottom: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form label {
          display: block;
          margin-bottom: 5px;
          color: #555;
        }

        .form input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }

        .form button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .form button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Login;
