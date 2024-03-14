import React from 'react';
import Header from './Header';
import {Footer} from './Footer'; 


const Projectplans = () => {
  return (
    <div>
      <Header />

      <div className='container'>
        <h2 className='mt-5 mb-4'>IT Project Plans</h2>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card mb-4'>
              <div className='card-body'>
                <h5 className='card-title'>
                  <strong>Cloud Migration</strong>
                </h5>
                <p className='card-text'>
                  Migrate an existing application to a cloud-based infrastructure for improved scalability and reliability.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='card mb-4'>
              <div className='card-body'>
                <h5 className='card-title'>
                  <strong>DevOps Implementation</strong>
                </h5>
                <p className='card-text'>
                  Implement DevOps practices to streamline software development and deployment processes.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='card mb-4'>
              <div className='card-body'>
                <h5 className='card-title'>
                  <strong>Blockchain Development</strong>
                </h5>
                <p className='card-text'>
                  Develop a blockchain-based application for secure and transparent data management.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='card mb-4'>
              <div className='card-body'>
                <h5 className='card-title'>
                  <strong>AI/ML Integration</strong>
                </h5>
                <p className='card-text'>
                  Integrate artificial intelligence and machine learning technologies into an existing application for improved automation and decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projectplans;
