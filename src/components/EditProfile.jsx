import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about || "software engineer");
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);



    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            }, { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() =>{
                setShowToast(false);
            },3000);
        } catch (err) {
            setError(error.response.data)
        }
    }

    return (
        <>
            <div className='flex justify-center my-8'>
                <div className='flex justify-center mx-10'>
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title flex justify-center">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset ">
                                    <legend className="fieldset-legend">Firs tName</legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset ">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset ">
                                    <legend className="fieldset-legend">PhotoUrl</legend>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        className="input"
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset ">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input
                                        type="text"
                                        value={age}
                                        className="input"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset ">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input
                                        type="text"
                                        value={gender}
                                        className="input"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset ">
                                    <legend className="fieldset-legend">About</legend>
                                    <input
                                        type="text"
                                        value={about}
                                        className="input"
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </fieldset>
                            </div>
                            <div className="card-actions justify-center m-2">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile </button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
            <div>
                {showToast && (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span>profile was saved successfully.</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default EditProfile
