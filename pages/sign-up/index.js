import React, { useState } from "react";
import styles from "./signup.module.css"; // Import your CSS module
import Loader from "../../components/loader/loader"; // Assuming you have a Loader component
import { apiCall } from "../../utils/common";
import { toast } from 'react-toastify';
import Link from "next/link";
const RegisterCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType:"user",
    termsAccepted: false,
    marketingConsent: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Flag for OTP form visibility
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Validate the form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms.";
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitDataToApi = async (formData) => {
    try {
      const response = await apiCall({
        endpoint: `/api/user/signup`,
        method: 'POST',
    
        body: formData,
      });
      if (response.success) {
        setLoading(false);
        setOtpSent(true); // Show OTP form after successful signup
        toast.success('Account Created Successfully.Please verify OTP to Login ');
      } else {
        setLoading(false);
        setErrors({ general: "Signup failed. Please try again." });
        toast.error(response.error);
      }

    } catch (error) {
      console.error("API call error:", error);
      return { success: false, error: error.message };
    }
  };
  // Handle form submission to signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      setErrors({});
      try {
        // Assuming you have an API function `submitDataToApi`
        const response = await submitDataToApi(formData); // Your API call
        
      
      } catch (err) {
        setLoading(false);
        setErrors({ general: "Error occurred. Please try again." });
      }
    }
  };
  const verifyOtpdApi = async (data) => {
    try {
      const response = await apiCall({
        endpoint: `/api/user/verify-otp`,
        method: 'POST',
    
        body: data, 
      });
      if (response.success) {
        setLoading(false);
        setOtpSent(true); // Show OTP form after successful signup
        toast.success('Otp Verified seccessfully ');
      } else {
        setLoading(false);
        setErrors({ general: "Signup failed. Please try again." });
        toast.error('Invalid Otp');
      }

    } catch (error) {
      console.error("API call error:", error);
      return { success: false, error: error.message };
    }
  };
  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      // Call the API to verify OTP and receive the response
      const response = await verifyOtpdApi({ email: formData.email, otp });
  
      // Check if the response is successful
    
        setLoading(false);
      
        
        // Save the token and user details in localStorage
        localStorage.setItem('token', response.token); // Store JWT token
        localStorage.setItem('user', JSON.stringify(response.user)); // Store user details as JSON
  
        // Redirect to the home page or dashboard after successful login/verification
        window.location.href = "/"; 
     
    } catch (err) {
      setLoading(false);
      setOtpError("Error occurred. Please try again.");
    }
  };
  

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Destinations</h1>
        <nav>Home ➔ Destinations</nav>
      </header>

      <div className={styles["card-container"]}>
        <h2 className={styles["card-title"]}>Register</h2>

        {/* Show loader when loading */}
        {loading ? (
          <div className={styles["loader-container"]}>
            <Loader />
          </div>
        ) : otpSent ? (
          // OTP verification form
          <form onSubmit={handleOtpSubmit} className={styles["form"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="otp">
                OTP<span className={styles["required"]}>*</span>
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={styles["form-input"]}
                placeholder="Enter OTP"
              />
              {otpError && <span className={styles["error"]}>{otpError}</span>}
            </div>
            <button type="submit" className={styles["submit-button"]}>
              Verify OTP
            </button>
          </form>
        ) : (
          // Signup form
          <form onSubmit={handleSubmit} className={styles["form"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="name">
                Name<span className={styles["required"]}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Enter name"
              />
              {errors.name && <span className={styles["error"]}>{errors.name}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="email">
                E-Mail<span className={styles["required"]}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Enter e-mail"
              />
              {errors.email && <span className={styles["error"]}>{errors.email}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="phone">
                Phone Number<span className={styles["required"]}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className={styles["error"]}>{errors.phone}</span>}
            </div>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="password">
                Password<span className={styles["required"]}>*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Enter password"
              />
              {errors.password && <span className={styles["error"]}>{errors.password}</span>}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]} htmlFor="confirmPassword">
                Confirm Password<span className={styles["required"]}>*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <span className={styles["error"]}>{errors.confirmPassword}</span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-checkbox"]}>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                I accept the{" "}
                <a href="/terms" className={styles["link"]}>
                  terms and conditions
                </a>
                .
              </label>
              {errors.termsAccepted && (
                <span className={styles["error"]}>{errors.termsAccepted}</span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-checkbox"]}>
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleChange}
                />
                I agree to receive emails and marketing messages.
              </label>
            </div>

            <button type="submit" className={styles["submit-button"]}>
              Register
            </button>
          </form>
        )}

        <p className={styles["login-text"]}>
          Already have an account?{" "}
          <Link href="/login" className={styles["link"]}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterCard;
