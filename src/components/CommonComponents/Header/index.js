import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation(); // useLocation hook of react router dom gives all paths
  const currentPath = location.pathname; // pathname will give us the currentpath of the current page

  return (
    <div className="navbar">
      <div className="gradient"></div>
      <div className="links">
        <Link to="/" className={currentPath === "/" ? "active" : ""}>
          SignUp
        </Link>
        <Link
          to="/podcasts"
          className={currentPath === "/podcasts" ? "active" : ""}
        >
          Podcasts
        </Link>
        <Link
          to="/start-a-podcast"
          className={currentPath === "/start-a-podcast" ? "active" : ""}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath === "/profile" ? "active" : ""}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Header;
