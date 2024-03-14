import React from 'react';
import './About.css';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import { Footer } from './Footer';

import socialMediaIcon from './social.jpg';
import projectPlansIcon from './project.jpg';
import contactUsIcon from './contact.jpg';

// Import your background image (you may need to adjust the path)
import aboutImg from './about-img.jpg';

const aboutBackgroundStyle = {
  backgroundImage: `url(${aboutImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const buttonTextStyle = {
  color: 'black', // Set text color to black
};

export const About = () => {
  const history = useHistory();

  const projectplans = () => {
    history.push('/Projectplans');
  };

  const socialmedia = () => {
    history.push('/SocialMedia');
  };

  const c = () => {
    history.push('/contact');
  };

  return (
    <div>
      <Header />
      <div className="container-fluid about-page" style={aboutBackgroundStyle}>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <div className='information'>
              <h1>About Our Parking Service</h1>
              <p>
                At Smart Parking, we provide a state-of-the-art automatic parking system that allows you to park your vehicle quickly and securely. Our system uses advanced technology to monitor parking availability and guide you to an available spot, saving you time and reducing stress.
              </p>
              <p>
                Our system also includes features such as real-time occupancy tracking, automatic billing, and remote reservation options, making it easier than ever to park your vehicle. Whether you're running errands or heading out for a night on the town, Smart Parking has you covered.
              </p>
            </div>
          </div>
          {/* Right Column */}
          <div className="col-md-6">
            <div className="buttons-container">
              <button className="button-icon btn btn-primary btn-lg" onClick={socialmedia} style={buttonTextStyle}>
                <img src={socialMediaIcon} alt="Social Media" />
                <span>Social Media</span>
              </button>
              <button className="button-icon btn btn-primary btn-lg" onClick={projectplans} style={buttonTextStyle}>
                <img src={projectPlansIcon} alt="Project Plans" />
                <span>Project Plans</span>
              </button>
              <button className="button-icon btn btn-primary btn-lg" onClick={c} style={buttonTextStyle}>
                <img src={contactUsIcon} alt="Contact Us" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
