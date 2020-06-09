import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./FooterStyles.scss";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Made with <FontAwesomeIcon icon={faHeart} className="footer__heart" />
        by
        <div className="footer__username">
          <a href="http://www.princesumberia.com" className="footer__link">
            Prince Sumberia
          </a>
        </div>
      </p>
      <p className="footer__container">
        <a href="https://www.github.com/" className="btn footer__link">
          Contribute on Github
        </a>
        <a href="https://www.google.com" className="btn footer__link">
          Buy Me a Coffee
        </a>
      </p>
    </footer>
  );
}

export default Footer;
