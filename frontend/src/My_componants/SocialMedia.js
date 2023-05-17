import React from 'react';
import './SocialMedia.css';
import Header from './Header';
import { Footer } from './Footer'

import facebook from './facebook.png';
import twitter from './twitter.png';
import instagram from './instagram.jpg';


const FollowUsOn = () => {
  return (
    <div><Header></Header>
    <div className="follow-us-container">
      <h3>Follow Us On</h3>
      <ul>
        <li>
          <a href="https://www.facebook.com">
            <img src={facebook} alt="Facebook" />
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com">
            <img src={twitter} alt="Twitter" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com">
            <img src={instagram} alt="Instagram" />
          </a>
        </li>
      </ul>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default FollowUsOn;
