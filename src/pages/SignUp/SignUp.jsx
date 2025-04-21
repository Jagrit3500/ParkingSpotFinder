import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import '../SignIn/SignIn.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);
    
    // This would normally be an API call to your backend
    // For now, we'll just simulate a successful registration after a delay
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, success is always returned
      // In a real app, this would come from your authentication service
      const success = true; 
      
      if (success) {
        // Redirect to home page after successful registration
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    }, 1500);
  };

  const handleSocialSignUp = (provider) => {
    // This would normally redirect to the OAuth provider
    console.log(`Sign up with ${provider}`);
    // For demo purposes, we'll just show the loading state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="auth-page sign-up-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create an Account</h1>
            <p>Join us to find the perfect parking spot</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="remember-me">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <p className="policy-agreement">
              By signing up, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              className={`auth-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or sign up with</span>
          </div>

          <div className="social-auth">
            <button
              className="social-button google"
              onClick={() => handleSocialSignUp('Google')}
              disabled={isLoading}
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            <button
              className="social-button facebook"
              onClick={() => handleSocialSignUp('Facebook')}
              disabled={isLoading}
            >
              <FaFacebook />
              <span>Facebook</span>
            </button>
            <button
              className="social-button apple"
              onClick={() => handleSocialSignUp('Apple')}
              disabled={isLoading}
            >
              <FaApple />
              <span>Apple</span>
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 