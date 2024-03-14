import React from 'react'

export const Footer = () => {
  
  let footerStyle = {
    position:"relative",
    top:"20vh",
    width:"100%",
    padding:"15px"

  }
  
  
  return (
    <footer className='bg-dark text-light py-15' style={footerStyle}>
      <p className="text-center">
      parkyourride.com Copyright &copy; 2023-3023 PATIL Industries Pvt. Ltd. All rights reserved 
    </p>
    </footer>
  )
}
