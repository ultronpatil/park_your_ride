import React from 'react';
import './SocialMedia.css';
import Header from './Header';
import {Footer} from './Footer'; // Import Footer without curly braces
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

import facebook from './facebook.png';
import twitter from './twitter.png';
import instagram from './instagram.jpg';

const FollowUsOn = () => {
  return (
    <div>
      <Header />

      <Container className="follow-us-container text-center mt-5">
        <h3 className="mb-5">Follow Us On</h3>
        <Row>
          <Col md={4}>
            <a href="https://www.facebook.com">
              <img src={facebook} alt="Facebook" className="img-fluid rounded-circle" />
            </a>
          </Col>
          <Col md={4}>
            <a href="https://www.twitter.com">
              <img src={twitter} alt="Twitter" className="img-fluid rounded-circle" />
            </a>
          </Col>
          <Col md={4}>
            <a href="https://www.instagram.com">
              <img src={instagram} alt="Instagram" className="img-fluid rounded-circle" />
            </a>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default FollowUsOn;
