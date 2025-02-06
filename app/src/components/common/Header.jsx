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
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar">
      <div className="logo">NewsApp</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/preferences">Preferences</Link></li>
      </ul>
    </nav>
  );
}
