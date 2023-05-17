import React from 'react'
import './Projectplans.css'
import Header from './Header';
import { Footer } from './Footer'
const Projectplans = () => {
    return (
      <div><Header></Header>
      <div className='project-plans-container'>
        <h2>IT Project Plans</h2>
        <ul>
          <li>
            <strong>Cloud Migration:</strong> Migrate an existing application to a cloud-based infrastructure for improved scalability and reliability.
          </li>
          <li>
            <strong>DevOps Implementation:</strong> Implement DevOps practices to streamline software development and deployment processes.
          </li>
          <li>
            <strong>Blockchain Development:</strong> Develop a blockchain-based application for secure and transparent data management.
          </li>
          <li>
            <strong>AI/ML Integration:</strong> Integrate artificial intelligence and machine learning technologies into an existing application for improved automation and decision-making.
          </li>
        </ul>
      </div>
      <Footer></Footer>
      </div>
    );
}

export default Projectplans
