import React from 'react';
import {
  fas,faCopyright
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Footer.css';

function Footer(props) {
    return (
        <div className="footer-section">
            <p>
                <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={(fas, faCopyright)} />
                </span> 2020
            </p>
        </div>
    );
}

export default Footer;