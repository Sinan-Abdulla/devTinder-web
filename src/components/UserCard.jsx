import React from "react";

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, about, age, gender } = user;
    console.log(user);





    return (
        <div className="card bg-base-300 w-96 shadow-sm p-5">
            <figure>
                <img
                    src={user.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                    alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + "," + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary">ignore</button>
                    <button className="btn btn-secondary">interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
