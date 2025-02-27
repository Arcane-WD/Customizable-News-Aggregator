// components/pages/LoginSignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSignupPage({ setIsAuthenticated }) {
  console.log("setIsAuthenticated type:", typeof setIsAuthenticated);
  const navigate = useNavigate();
  const [isSignupMode, setIsSignupMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
  
    if (!name || !email || !password) {
      console.error("All fields are required");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Signup failed:", data.message || "Unknown error");
        return;
      }
  
      console.log("Server response:", data);  // Debugging line
  
      localStorage.setItem("authToken", data.token);
  
      if (typeof setIsAuthenticated === "function") {
        setIsAuthenticated(true);
        navigate("/mainNews");
      } else {
        console.error("setIsAuthenticated is not a function");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  
  
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        setIsAuthenticated(true);
        navigate("/mainNews");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {isSignupMode ? (
        <form className="p-10 bg-white rounded shadow" onSubmit={handleSignup}>
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="border p-2 my-2" 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-2 my-2" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border p-2 my-2" 
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">Sign Up</button>
          <p className="mt-4">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => setIsSignupMode(false)}>
              Sign In
            </span>
          </p>
        </form>
      ) : (
        <form className="p-10 bg-white rounded shadow" onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-2 my-2" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border p-2 my-2" 
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">Login</button>
          <p className="mt-4">
            Don't have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => setIsSignupMode(true)}>
              Sign Up
            </span>
          </p>
        </form>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa"; // Import icons

// export default function LoginSignupPage({setIsAuthenticated}) {
//   const [isRightPanelActive, setRightPanelActive] = useState(false);

//   const navigate = useNavigate();

//   const handleSignup = (event) => {
//     event.preventDefault(); // Prevent form submission
//     setIsAuthenticated(true); // Set auth state
//     console.log("User signed up");
//     navigate("/mainNews"); // Redirect to mainNewsPage
//   };

//   // Simulated OAuth functions for demonstration purposes
//   const handleGoogleLogin = () => {
//     console.log("Signing in with Google...");
//     // Replace this with actual Google OAuth logic
//     const redirectUrl = "https://www.youtube.com/watch?v=xvFZjo5PgG0"; // Example redirect URL
//     window.open(redirectUrl, "_blank"); // Open in a new tab // Example redirect URL
//   };

//   const handleFacebookLogin = () => {
//     console.log("Signing in with Facebook...");
//     // Replace this with actual Facebook OAuth logic
//     const redirectUrl = "https://www.youtube.com/watch?v=xvFZjo5PgG0"; // Example redirect URL
//     window.open(redirectUrl, "_blank"); // Open in a new tab
//   };

//   const handleLinkedInLogin = () => {
//     console.log("Signing in with LinkedIn...");
//     // Replace this with actual LinkedIn OAuth logic
//     const redirectUrl = "https://www.youtube.com/watch?v=xvFZjo5PgG0"; // Example redirect URL
//     window.open(redirectUrl, "_blank"); // Open in a new tab // Example redirect URL
//   };
//   const handleLogin = (event) => {
//     event.preventDefault()
//     console.log("User logged in");
//     setIsAuthenticated(true);
//   };
  

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div
//         className={`relative w-[768px] max-w-full min-h-[480px] bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ${
//           isRightPanelActive ? "right-panel-active" : ""
//         }`}
//       >
//         {/* Sign Up Form */}
//         <div
//           className={`absolute top-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-500 ${
//             isRightPanelActive ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"
//           }`}
//         >
//           <form className="text-center p-10">
//             <h1 className="text-2xl font-bold">Create Account</h1>
//             <div className="flex space-x-3 my-4">
//               {/* Facebook Button */}
//               <button
//                 onClick={handleFacebookLogin}
//                 className="p-2 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//               >
//                 <FaFacebook size={24} />
//               </button>
//               {/* Google Button */}
//               <button
//                 onClick={handleGoogleLogin}
//                 className="p-2 border rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
//               >
//                 <FaGoogle size={24} />
//               </button>
//               {/* LinkedIn Button */}
//               <button
//                 onClick={handleLinkedInLogin}
//                 className="p-2 border rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
//               >
//                 <FaLinkedin size={24} />
//               </button>
//             </div>
//             <span className="text-sm">or use your email for registration</span>
//             <input type="text" placeholder="Name" className="w-full p-2 my-2 border rounded" />
//             <input type="email" placeholder="Email" className="w-full p-2 my-2 border rounded" />
//             <input type="password" placeholder="Password" className="w-full p-2 my-2 border rounded" />
//             <button className="bg-red-500 text-white px-6 py-2 rounded mt-4" onClick={handleSignup}>Sign Up</button>
//           </form>
//         </div>

//         {/* Sign In Form */}
//         <div className={`absolute top-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-500`}>
//           <form className="text-center p-10">
//             <h1 className="text-2xl font-bold">Sign In</h1>
//             <div className="flex space-x-3 my-4">
//               {/* Facebook Button */}
//               <button
//                 onClick={handleFacebookLogin}
//                 className="p-2 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//               >
//                 <FaFacebook size={24} />
//               </button>
//               {/* Google Button */}
//               <button
//                 onClick={handleGoogleLogin}
//                 className="p-2 border rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
//               >
//                 <FaGoogle size={24} />
//               </button>
//               {/* LinkedIn Button */}
//               <button
//                 onClick={handleLinkedInLogin}
//                 className="p-2 border rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
//               >
//                 <FaLinkedin size={24} />
//               </button>
//             </div>
//             <span className="text-sm">or use your account</span>
//             <input type="email" placeholder="Email" className="w-full p-2 my-2 border rounded" />
//             <input type="password" placeholder="Password" className="w-full p-2 my-2 border rounded" />
//             <a href="#" className="text-sm text-gray-500">Forgot your password?</a>
//             <button className="bg-red-500 text-white px-6 py-2 rounded mt-4">Sign In</button>
//           </form>
//         </div>

//         {/* Overlay */}
//         <div
//           className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-red-400 to-red-600 text-white flex flex-col items-center justify-center transition-all duration-500 ${
//             isRightPanelActive ? "-translate-x-full" : ""
//           }`}
//         >
//           <div className="text-center p-10">
//             {isRightPanelActive ? (
//               <>
//                 <h1 className="text-2xl font-bold">Welcome Back!</h1>
//                 <p className="my-4">To keep connected with us, please login with your personal info</p>
//                 <button onClick={() => setRightPanelActive(false)} className="border border-white px-6 py-2 rounded">Sign In</button>
//               </>
//             ) : (
//               <>
//                 <h1 className="text-2xl font-bold">Hello, Friend!</h1>
//                 <p className="my-4">Enter your personal details and start your journey with us</p>
//                 <button onClick={() => setRightPanelActive(true)} className="border border-white px-6 py-2 rounded">Sign Up</button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }