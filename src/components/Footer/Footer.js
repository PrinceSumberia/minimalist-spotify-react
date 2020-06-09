import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./FooterStyles.scss";
import bmac from "../../assets/bmac.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__title">
        Made with <FontAwesomeIcon icon={faHeart} className="footer__heart" />
        by
        <span className="footer__username">
          <a href="http://www.princesumberia.com" className="footer__link">
            Prince Sumberia
          </a>
        </span>
      </div>
      <div className="footer__container">
        <div>
          <a
            href="https://github.com/PrinceSumberia/minimalist-spotify-react"
            className="btn btn-github footer__link"
          >
            Contribute on Github
          </a>
        </div>
        <div>
          <a
            href="https://www.buymeacoffee.com/princesumberia"
            target="_blank"
            className="footer__link"
            rel="noopener noreferrer"
          >
            <img src={bmac} className="logo" alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
