import React from 'react';
import aboutImg from './about-img.jpg';
import './About.css';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { Footer } from './Footer'

import socialMediaIcon from './social.jpg';
import projectPlansIcon from './project.jpg';
import contactUsIcon from './contact.jpg';

export const About = () => {

  const history = useHistory();

  const projectplans = () => {
    history.push('/Projectplans');
  };

  const socialmedia = () => {
    history.push('/SocialMedia');
  };

  const c = () => {
    history.push('/ContactUs');
  };



  return (
    <div><Header></Header>
    <div className="about-page">
      <div className="about-content">
        <h1>About Our Parking Service</h1>
        <p>
          At Smart Parking, we provide a state-of-the-art automatic parking system that allows you to park your vehicle quickly and securely. Our system uses advanced technology to monitor parking availability and guide you to an available spot, saving you time and reducing stress.
        </p>
        <p>
          Our system also includes features such as real-time occupancy tracking, automatic billing, and remote reservation options, making it easier than ever to park your vehicle. Whether you're running errands or heading out for a night on the town, Smart Parking has you covered.
        </p>

        <div className="buttons-container">
          <button className="button-icon" onClick={socialmedia}>
            <img src={socialMediaIcon} alt="Social Media" />
            <span>Social Media</span>
          </button>
          <button className="button-icon" onClick={projectplans}>
            <img src={projectPlansIcon} alt="Project Plans" />
            <span>Project Plans</span>
          </button>
          <button className="button-icon" onClick={c}>
            <img src={contactUsIcon} alt="Contact Us" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
}
