import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // a hook to redirect
const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    });

    const collectData = async() => {
        // Integration of API here
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type':'application/json'
            },
        })
        result = await result.json();
        console.warn(result);
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        if(result) {
            navigate('/');
        }
    };

    return (
        <div className='register'>
            <h1>Register</h1>

            <div className='boxes'>
            <input className = 'inputBox' type = "text" 
            value = {name} onChange = {(e) => setName(e.target.value)} placeholder = "EnterName"></input>

            <input className = 'inputBox' type = "text" 
            value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder = "Enter Email"></input>

            <input className = "inputBox" type = "password" 
            value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = "Enter Password"></input>
            </div>
            
            <button onClick = {collectData} className='appButton' type='button'>SignUp</button>

        </div>
    )
}

export default SignUp;