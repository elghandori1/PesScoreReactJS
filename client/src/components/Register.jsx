import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import footballBg from "../assets/images/efootbalBG3.png";

function Register() {
    const [alert, setAlert] = useState({ message: "", type: "" });
    const navigate = useNavigate();
    const showAlert = (message, type = "success") => {
        setAlert({ message, type });

        setTimeout(() => {
            setAlert({ message: "", type: "" });
        }, 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const account_name = e.target.account_name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            showAlert("Passwords do not match!", "error");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, account_name, email, password })
            });

            const result = await response.json();

            if (response.ok) {
                showAlert(result.message, "success");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                showAlert(result.message || "An unknown error occurred", "error");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            showAlert("Network error. Please try again.", "error");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center overflow-x-hidden relative">
            {/* Background Image */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: `url(${footballBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"
                }}
            />

            {/* Alert Notification */}
            {alert.message && (
                <div
                    className={`fixed top-4 sm:top-5 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[400px] min-w-[250px] px-4 py-3 sm:px-6 sm:py-4 rounded
    font-bold text-center z-[1000] transition-opacity duration-300 border-l-4 shadow-lg flex items-center justify-between space-x-2 sm:space-x-4
    ${alert.type === "success"
                            ? "bg-green-100 text-green-800 border-green-600"
                            : "bg-red-100 text-red-800 border-red-600"}`}
                >
                    <span className="text-sm sm:text-base">{alert.message}</span>
                    <button
                        className="text-lg sm:text-xl font-bold hover:opacity-80"
                        onClick={() => setAlert({ message: "", type: "" })}
                        aria-label="Close alert"
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Header */}
            <header className="w-full flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 text-white fixed top-0 left-0 z-10 bg-black/60">
                <h2 className="text-2xl font-bold">PesScore</h2>
            </header>

            {/* Main Content */}
            <main className="flex mt-16 justify-center px-2 sm:px-4 mb-3">
                <section className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg max-w-md w-full text-center mx-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3">Register</h2>

                    <form className="flex flex-col gap-3 sm:gap-4 text-left" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block font-medium text-gray-700 text-sm sm:text-base">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label htmlFor="account_name" className="block font-medium text-gray-700 text-sm sm:text-base">Account Name</label>
                            <input
                                type="text"
                                id="account_name"
                                name="account_name"
                                placeholder="Enter account name"
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium text-gray-700 text-sm sm:text-base">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-medium text-gray-700 text-sm sm:text-base">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block font-medium text-gray-700 text-sm sm:text-base">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white py-2 rounded-lg sm:rounded-xl font-semibold hover:scale-105 transition text-sm sm:text-base"
                        >
                            Register
                        </button>
                    </form>
                    <p className="mt-3 sm:mt-4 text-gray-700 text-sm sm:text-base">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-700 font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-blue-800 to-blue-700 text-white w-full text-center py-4 mt-auto text-sm backdrop-blur-sm">
                PesScore © 2025 - Football Match Tracker
            </footer>
        </div>
    );
}

export default Register;
