import React from 'react'
import Header from './Header'
import { Footer } from './Footer'

const ResetPass = () => {
    return (
        <div>
            <Header></Header>
            <div>reset your password</div>
            <input
                placeholder='enter email'
            ></input>

            <input
                placeholder='enter new password'
            ></input>

            <input
                placeholder='confirm password'
            ></input>



            <Footer></Footer>
        </div>
    )
}

export default ResetPass
