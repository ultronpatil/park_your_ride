import './App.css';
import { Route,Switch } from 'react-router-dom';

import Login from './My_componants/Login';
import SignupForm from './My_componants/Signup';
import Header from './My_componants/Header';
import { Footer } from './My_componants/Footer';
import { Home } from './My_componants/Home';
import { ParkLevel } from './My_componants/ParkLevel';
import { About } from './My_componants/About';
import Profile from './My_componants/Profile';
import Projectplans from './My_componants/Projectplans';
import SocialMedia from './My_componants/SocialMedia';
import ContactUs from './My_componants/ContactUs';



function App() {
  return (
    <>
    {/* <Header/> */}
  <Switch>
    <Route exact path='/' component={Login} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/signup' component={SignupForm} />
    
      <Route exact path='/home' component={Home} />
    
    <Route exact path='/parklevel' component={ParkLevel} />
    <Route exact path='/about' component={About} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/projectplans' component={Projectplans} />
    <Route exact path='/socialmedia' component={SocialMedia} />
    <Route exact path='/contactus' component={ContactUs} />
  </Switch>
    {/* <Footer/> */}
    </>
  );
}

export default App;
