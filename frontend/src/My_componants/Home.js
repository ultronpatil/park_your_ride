import React from 'react'
import './Home.css';
import myImage from './parking-lot.jpg';
import { Route, useHistory } from 'react-router-dom';
import { ParkLevel } from './ParkLevel';
import Header from './Header';
import { Footer } from './Footer'
export const Home = () => {

  const history = useHistory();

  const handleBookNowClick = () => {
    history.push('/ParkLevel');
  };



  return (
    <div>
     <Header></Header>
<div className='Home' >
      <h1>Welcome to Park Your Ride</h1>
      <p>Find the perfect spot for your vehicle in our parking lot.</p>
      <button className="cta-button" onClick={handleBookNowClick}>
        Book Now
      </button>
      <img src={myImage} alt="Parking Lot" className="parking-lot-image" />

      <Route path="/parklevel" component={ParkLevel} /> 
      </div>
      <Footer></Footer>
    </div>
    
  );
}