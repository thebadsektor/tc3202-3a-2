import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                const resend = window.confirm(
                    "Your email is not verified. Would you like to resend the verification email?"
                );
                if (resend) {
                    await sendEmailVerification(user);
                    alert("Verification email sent! Please check your inbox.");
                    navigate("/verifyEmail");
                } else {
                    alert("Please verify your email before logging in.");
                }
                return;
            }

            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error.message);
            alert(`Login failed: ${error.message}`);
        }
    };

   

    const handleForgotPassword = async () => {
        if (!email) {
            alert("Please enter your email address to reset your password.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent! Please check your inbox.");
        } catch (error) {
            console.error("Password reset error:", error.message);
            alert(`Failed to send password reset email: ${error.message}`);
        }
    };

    const handleClose = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md relative">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✖
                </button>
                <h3 className="text-center font-bold text-blue-500 text-2xl">Login</h3>
                <form className="mt-4 space-y-4" onSubmit={handleLogin}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="mt-2 text-sm text-blue-500 hover:underline text-left"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mt-2"
                    >
                        Login
                    </button>
                </form>



                <div className="mt-4 text-center">
                    <p className="text-gray-600">Don't have an account?</p>
                    <Link
                        to="/signup"
                        className="mt-2 inline-block w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;