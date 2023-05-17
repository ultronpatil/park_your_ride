import { useState } from 'react'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';


function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [phone,setPhone] = useState("");
    const [password, setPassword] = useState("");    
    const history = useHistory();


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ name, email, vehicle, phone, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setName("");
            setEmail("");
            setPhone("");
            setVehicle("");
            setPassword ("");
            history.push('/login')
        }
        
    }
    return (
        <>
            <h1>signup Page </h1>
            <form action="">
                <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <label htmlFor="vehicle">Vehicle Number</label>
        <input
          type="text"
          id="vehicle"
          placeholder="Enter your vehicle number"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          placeholder="Create your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
                <button type="submit"
                onClick={handleOnSubmit} >Submit</button>
                 <p>
          Already user? <Link to="/login">Login here</Link>.
        </p>
            </form>
        </>
    );
}
 
export default SignupForm;