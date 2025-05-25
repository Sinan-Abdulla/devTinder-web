import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [email, setEmail] = useState("mini@gmail.com");
    const [password, setPassword] = useState("mini@123");
    const [firstName, setFirstName] = useState("mini");
    const [lastName, setLastName] = useState("mouse");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    email: email,
                    password: password
                },
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (err) {
            setError(err?.response?.data);
            console.error(err);
        }
    }
    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, email, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data  ));
            return navigate("/profile ");
        } catch (err) {
            setError(err?.response?.data);
        }
    };


    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                    <div>
                        {!isLoginForm && (
                            <>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input"
                                        placeholder="Enter First Name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input"
                                        placeholder="Enter Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </>
                        )}
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input
                                type="text"
                                value={email}
                                className="input"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Password</legend>
                            <input
                                type="password"
                                value={password}
                                className="input"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <p className="text-red-500 ">{error}</p>
                    <div className="card-actions justify-center m-5">
                        <button className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}>
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>
                    <p className="m-auto cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm
                            ? "New User?Signup Here"
                            : "Existing User ?Login Here"
                        }</p>
                </div>
            </div>
        </div>
    )
}

export default Login
