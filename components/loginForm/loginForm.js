import React, { useState } from "react";
import styles from "../../pages/login/login.module.css"; // Import your CSS module
import Loader from "../../components/loader/loader"; // Assuming you have a Loader component
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiCall } from "../../utils/common";

const LoginForm = ({  isComponent,toggleToLogin,toggleToHide }) => {
    
console.log(isComponent)
    const router = useRouter()
    const [formData, setFormData] = useState({

        email: "",
        accountType: "user",

    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false); // Flag for OTP form visibility
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
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
                endpoint: `/api/user/login`,
                method: 'POST',

                body: formData,
            });
            if (response.success) {
                setLoading(false);
                setOtpSent(true);
                toast.success('Please verify OTP to Login ');
            } else {
                setLoading(false);
                setErrors({ general: "Login failed. Please try again." });
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

        try {

            const response = await submitDataToApi(formData);
            console.log(response)

        } catch (err) {
            setLoading(false);
            setErrors({ general: "Error occurred. Please try again." });
        }

    };
    const verifyOtpdApi = async (data) => {
        console.log(data)

        try {

            const response = await apiCall({
                endpoint: `/api/user/verify-otp`,
                method: 'POST',

                body: data,
            });
            console.log(response)

            if (response.success) {
                setLoading(false);
                setOtpSent(true);
                toast.success('Otp Verified seccessfully ');
                toggleToHide()

                localStorage.clear();

                localStorage.setItem("token", response.token);
                localStorage.setItem("username", (response.user.name));
                localStorage.setItem("phone", (response.user.phone));
                localStorage.setItem("userId", (response.user.id));
                localStorage.setItem("email", (response.user.email));

                if (isComponent!=true) {

                    router.push("/");
                }


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

            // Call the API to verify OTP
            const response = await verifyOtpdApi({ email: formData.email, otp });


        } catch (err) {
            setLoading(false);

            // Handle API errors
            setOtpError(err.response?.data?.error || "Error occurred. Please try again.");
        }

    };

    return (
        <>
            <h2 className={styles["card-title"]}>Login</h2>

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
                    <button type="submit" className={styles["submit-button"]}>
                        Login
                    </button>
                </form>
            )}
            {console.log(isComponent)}

            <div className={styles["login-text"]}>
                Want to create an account?{" "}
                {isComponent==true ? <p className={styles["link"]}  onClick={toggleToLogin}>
                    Register
                </p>
                    : <Link href="/sign-up" className={styles["link"]}>
                        Register
                    </Link>
                }

            </div>

        </>

    );
};

export default LoginForm;
