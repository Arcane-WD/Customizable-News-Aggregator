// import React from "react";
// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <nav className="header">
//       <div className="logo">News App</div>
//       <ul className="nav-links">
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/signup">Sign Up</Link>
//         </li>
//         <li>
//           <Link to="/preferences">Preferences</Link>
//         </li>
//         <li>
//           <Link to="/article">Article</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar">
      <div className="logo">NewsApp</div>
      <ul className="nav-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>Signup</NavLink></li>
        <li><NavLink to="/preferences" className={({ isActive }) => isActive ? "active" : ""}>Preferences</NavLink></li>
        <li><NavLink to="/article" className={({ isActive }) => isActive ? "active" : ""}>Article</NavLink></li>
      </ul>
    </nav>
  );
}
