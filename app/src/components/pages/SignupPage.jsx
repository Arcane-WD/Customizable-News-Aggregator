import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa"; // Import icons

export default function SignupPage() {
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  // Simulated OAuth functions for demonstration purposes
  const handleGoogleLogin = () => {
    console.log("Signing in with Google...");
    // Replace this with actual Google OAuth logic
    const redirectUrl = "https://www.youtube.com/watch?v=xvFZjo5PgG0"; // Example redirect URL
    window.open(redirectUrl, "_blank"); // Open in a new tab // Example redirect URL
  };

  const handleFacebookLogin = () => {
    console.log("Signing in with Facebook...");
    // Replace this with actual Facebook OAuth logic
    const redirectUrl = "https://www.youtube.com/watch?v=xvFZjo5PgG0"; // Example redirect URL
    window.open(redirectUrl, "_blank"); // Open in a new tab
  };

  const handleLinkedInLogin = () => {
    console.log("Signing in with LinkedIn...");
    // Replace this with actual LinkedIn OAuth logic
    const redirectUrl = "https://www.youtube.com/watch?v=xvFZjo5PgG0"; // Example redirect URL
    window.open(redirectUrl, "_blank"); // Open in a new tab // Example redirect URL
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className={`relative w-[768px] max-w-full min-h-[480px] bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-500 ${
            isRightPanelActive ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <form className="text-center p-10">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <div className="flex space-x-3 my-4">
              {/* Facebook Button */}
              <button
                onClick={handleFacebookLogin}
                className="p-2 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <FaFacebook size={24} />
              </button>
              {/* Google Button */}
              <button
                onClick={handleGoogleLogin}
                className="p-2 border rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <FaGoogle size={24} />
              </button>
              {/* LinkedIn Button */}
              <button
                onClick={handleLinkedInLogin}
                className="p-2 border rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
              >
                <FaLinkedin size={24} />
              </button>
            </div>
            <span className="text-sm">or use your email for registration</span>
            <input type="text" placeholder="Name" className="w-full p-2 my-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 my-2 border rounded" />
            <input type="password" placeholder="Password" className="w-full p-2 my-2 border rounded" />
            <button className="bg-red-500 text-white px-6 py-2 rounded mt-4">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-500`}>
          <form className="text-center p-10">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <div className="flex space-x-3 my-4">
              {/* Facebook Button */}
              <button
                onClick={handleFacebookLogin}
                className="p-2 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <FaFacebook size={24} />
              </button>
              {/* Google Button */}
              <button
                onClick={handleGoogleLogin}
                className="p-2 border rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <FaGoogle size={24} />
              </button>
              {/* LinkedIn Button */}
              <button
                onClick={handleLinkedInLogin}
                className="p-2 border rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
              >
                <FaLinkedin size={24} />
              </button>
            </div>
            <span className="text-sm">or use your account</span>
            <input type="email" placeholder="Email" className="w-full p-2 my-2 border rounded" />
            <input type="password" placeholder="Password" className="w-full p-2 my-2 border rounded" />
            <a href="#" className="text-sm text-gray-500">Forgot your password?</a>
            <button className="bg-red-500 text-white px-6 py-2 rounded mt-4">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-red-400 to-red-600 text-white flex flex-col items-center justify-center transition-all duration-500 ${
            isRightPanelActive ? "-translate-x-full" : ""
          }`}
        >
          <div className="text-center p-10">
            {isRightPanelActive ? (
              <>
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="my-4">To keep connected with us, please login with your personal info</p>
                <button onClick={() => setRightPanelActive(false)} className="border border-white px-6 py-2 rounded">Sign In</button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">Hello, Friend!</h1>
                <p className="my-4">Enter your personal details and start your journey with us</p>
                <button onClick={() => setRightPanelActive(true)} className="border border-white px-6 py-2 rounded">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}