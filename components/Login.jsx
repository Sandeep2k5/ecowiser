import React, { useState } from "react"; // Import React and useState hook for managing state
import { useNavigate } from "react-router-dom"; // Import useNavigate hook to navigate between routes
import "../styles/Login.css"; // Import custom styles for login page

const Login = () => {
  // State for storing email and password entered by the user
  const [formData, setFormData] = useState({ email: "", password: "" });

  // State for storing error message if login fails
  const [errorMessage, setErrorMessage] = useState("");
  
  // useNavigate hook for navigation after successful login
  const navigate = useNavigate();

  // Function to handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission for login
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const { email, password } = formData;

    // Retrieve stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("authToken", "fakeToken123");
      setErrorMessage("");
      navigate("/dashboard");
    } else {
      
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container"> 
        <h1>E-Shopper</h1> 
        <h2>Login to your account</h2>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label> 
            <input
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={formData.email} 
              onChange={handleChange}
              autoComplete="email" 
              required 
            />
          </div>
          <div>
            <label>Password</label> {/* Password label */}
            <input
              type="password" // Input for password (hidden text)
              name="password" // Name attribute for password field
              placeholder="Enter your password" // Placeholder text
              value={formData.password} // Controlled input
              onChange={handleChange} // Handle input change
              autoComplete="current-password" // Enable autocomplete for password
              required // Make password input required
            />
          </div>
          <button type="submit">Login</button> {/* Submit button for login */}
        </form>

        
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Link to navigate to sign-up page */}
        <p className="signup-link">
          Don't have an account?{" "}
          <a href="/signup">Sign up</a> 
        </p>
      </div>
    </div>
  );
};

export default Login; 
