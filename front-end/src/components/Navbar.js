import React, { useEffect, useState } from "react";
import { cleanLocPath } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "../css/Navbar.module.css";

const Navbar = ({ deleteToken }) => {
  const [navbarClasses, setNavbarClasses] = useState(classes["nav-list"]);

  const [homeLinkClassName, setHomeLinkClassName] = useState(
    classes["nav-item-link"]
  );

  const [addLinkClassName, setAddLinkClassName] = useState(
    classes["nav-item-link"]
  );

  const [booksLinkClassName, setBooksLinkClassName] = useState(
    classes["nav-item-link"]
  );

  const [podcastsLinkClassName, setPodcastsLinkClassName] = useState(
    classes["nav-item-link"]
  );

  const [podcastsEpisodesLinkClassName, setPodcastsEpisodesLinkClassName] =
    useState(classes["nav-item-link"]);

  const [
    motivationalSpeechesLinkClassName,
    setMotivationalSpeechesLinkClassName,
  ] = useState(classes["nav-item-link"]);

  const [aboutLinkClassName, setAboutLinkClassName] = useState(
    classes["nav-item-link"]
  );

  // const [logoutLinkClassName, setLogoutLinkClassName] = useState(
  //   classes["nav-item-link"]
  // );

  const logoutClickedHandler = () => {
    deleteToken();
    window.location.href = "/";
  };

  const hamburgerBtnClickedHandler = () => {
    const navbarOndDisplayOnPortraitMode = navbarClasses.includes(
      "Navbar_nav-list-portrait-display"
    );

    navbarOndDisplayOnPortraitMode
      ? setNavbarClasses(classes["nav-list"])
      : setNavbarClasses(
          `${classes["nav-list"]} ${classes["nav-list-portrait-display"]}`
        );
  };

  useEffect(() => {
    const locPath = window.location.pathname;
    const cleanedLocPath = cleanLocPath(locPath);

    const linkClassNames = {
      "home-link": setHomeLinkClassName,
      "add-link": setAddLinkClassName,
      "books-link": setBooksLinkClassName,
      "podcasts-link": setPodcastsLinkClassName,
      "podcast-episodes-link": setPodcastsEpisodesLinkClassName,
      "motivational-speeches-link": setMotivationalSpeechesLinkClassName,
      "about-link": setAboutLinkClassName,
      // "logout-link": setLogoutLinkClassName,
    };

    for (const link in linkClassNames) {
      if (link === `${cleanedLocPath}-link`) {
        linkClassNames[link](
          `${classes["nav-item-link"]} ${classes["active"]}`
        );
      } else {
        linkClassNames[link](classes["nav-item-link"]);
      }
    }
  }, []);

  return (
    <div className={classes["app-navbar"]} data-test="app-navbar">
      <button
        className={classes["hamburger-btn"]}
        data-test="hamburger-btn"
        onClick={hamburgerBtnClickedHandler}
      >
        <FontAwesomeIcon icon={faBars} className={classes["hamburger-icon"]} />
      </button>
      <ul className={navbarClasses} data-test="nav-list">
        <li className={classes["nav-item"]}>
          <a className={homeLinkClassName} href="/" data-test="home-link">
            Home
          </a>
        </li>
        <li className={classes["nav-item"]}>
          <a className={addLinkClassName} href="/add/" data-test="add-link">
            Add+
          </a>
        </li>
        <li className={classes["nav-item"]}>
          <a
            className={booksLinkClassName}
            href="/books/"
            data-test="books-link"
          >
            Books
          </a>
        </li>
        <li className={classes["nav-item"]}>
          <a
            className={podcastsLinkClassName}
            href="/podcasts/"
            data-test="podcasts-link"
          >
            Podcasts
          </a>
        </li>
        <li className={classes["nav-item"]}>
          <a
            className={podcastsEpisodesLinkClassName}
            href="/podcast-episodes/"
            data-test="podcast-episodes-link"
          >
            Podcasts Episodes
          </a>
        </li>
        <li className={classes["nav-item"]}>
          <a
            className={motivationalSpeechesLinkClassName}
            href="/motivational-speeches/"
            data-test="motivational-speeches-link"
          >
            Motivational Speeches
          </a>
        </li>
        <li className={classes["nav-item"]}>
          <a
            className={aboutLinkClassName}
            href="/about/"
            data-test="about-link"
          >
            About
          </a>
        </li>
        <li className={classes["nav-item"]}>
          <div
            className={classes["nav-item-link"]}
            onClick={logoutClickedHandler}
            data-test="logout-link"
          >
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
