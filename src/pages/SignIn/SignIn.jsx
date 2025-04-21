import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    // This would normally be an API call to your backend
    // For now, we'll just simulate a successful login after a delay
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, success is always returned
      // In a real app, this would come from your authentication service
      const success = true; 
      
      if (success) {
        // Redirect to home page after successful login
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    // This would normally redirect to the OAuth provider
    console.log(`Login with ${provider}`);
    // For demo purposes, we'll just show the loading state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="auth-page sign-in-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to access your account</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="remember-me">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className={`auth-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          <div className="social-auth">
            <button
              className="social-button google"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            <button
              className="social-button facebook"
              onClick={() => handleSocialLogin('Facebook')}
              disabled={isLoading}
            >
              <FaFacebook />
              <span>Facebook</span>
            </button>
            <button
              className="social-button apple"
              onClick={() => handleSocialLogin('Apple')}
              disabled={isLoading}
            >
              <FaApple />
              <span>Apple</span>
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 