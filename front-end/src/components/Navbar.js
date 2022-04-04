import React, { useEffect } from "react";
import "../css/Navbar.css";

function Navbar({ deleteToken }) {
  const logoutUser = () => {
    deleteToken();
    window.location.href = "/";
  };

  useEffect(() => {
    const locPath = window.location.pathname;

    const cleanLocPath = (locPath) => {
      if (locPath === "/") return "home";
      return locPath.replaceAll("/", "");
    };

    const cleanedLocPath = cleanLocPath(locPath);

    const navItemsLinks = [
      "home-link",
      "add-link",
      "books-link",
      "podcasts-link",
      "podcasts-episodes-link",
      "motivational-speeches-link",
      "about-link",
      "logout-link",
    ];

    navItemsLinks.forEach((link) => {
      const query = `[data-test=${link}]`;
      const elem = document.querySelector(query);
      if (link === `${cleanedLocPath}-link`) {
        elem.className = "nav-item-link active";
      } else {
        elem.className = "nav-item-link";
      }
    });
  }, []);

  return (
    <div className="app-navbar">
      <ul className="nav-list" data-test="nav-list">
        <li className="nav-item">
          <a className="nav-item-link" href="/" data-test="home-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-item-link" href="/add/" data-test="add-link">
            Add+
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-item-link" href="/books/" data-test="books-link">
            Books
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-item-link"
            href="/podcasts/"
            data-test="podcasts-link"
          >
            Podcasts
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-item-link"
            href="/podcasts-episodes/"
            data-test="podcasts-episodes-link"
          >
            Podcasts Episodes
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-item-link"
            href="/motivational-speeches/"
            data-test="motivational-speeches-link"
          >
            Motivational Speeches
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-item-link" href="/about/" data-test="about-link">
            About
          </a>
        </li>
        <li className="nav-item">
          <div
            className="nav-item-link "
            onClick={() => {
              logoutUser();
            }}
            data-test="logout-link"
          >
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
