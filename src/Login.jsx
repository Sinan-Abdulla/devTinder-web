import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const [emailId, setEmailId] = useState("dhoni@gmail.com");
    const [password, setPassword] = useState("Dhoni@123");

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:7777/login", {
                email: emailId,
                password: password
            },
                { withCredentials: true }
            );
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input
                                type="text"
                                value={emailId}
                                className="input"
                                placeholder="Enter your email"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Password</legend>
                            <input
                                type="text"
                                value={password}
                                className="input"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center m-5">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
