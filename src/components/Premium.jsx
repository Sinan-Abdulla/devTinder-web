import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from "../utils/constants";

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false);
    useEffect(() => {
        verifyPremuimUser();
    }, []);

    const verifyPremuimUser = async () => {
        const res = await axios.post(BASE_URL + "/payment/verify",{}, {
            withCredentials: true,
        });
        if (res.data.ispremium) {
            setIsUserPremium(true);
        }
    };

    const handleBuyClick = async (type) => {
        const order = await axios.post(BASE_URL + "/payment/Create", {
            membershipType: type,
        },
            { withCredentials: true }
        );
        const { amount, keyId, currency, notes, orderId } = order.data;
        const options = {
            key: keyId,
            amount,
            currency,
            name: "Dev Tinder",
            description: "connect to develepers",
            order_id: orderId,
            profile: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                phone: "9090777777",
            },
            theme: {
                color: "#3399cc",
            },
            handler: verifyPremuimUser,
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    };




    return (isUserPremium ? (
        "uou are already a premium user"
    ) :
        <div className='m-10'>
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className='font-bold text-3xl'>Silver Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - 100 connection request per day</li>
                        <li> - Blue tick</li>
                        <li> - 3 months</li>
                    </ul>
                    <button onClick={() => handleBuyClick("silver")} className='btn btn-primary'>Buy Silver</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className='font-bold text-3xl'>Gold Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - Infinite connection request per day</li>
                        <li> - Blue tick</li>
                        <li> - 6 months</li>
                    </ul>
                    <button onClick={() => handleBuyClick("gold")} className='btn btn-primary'>Buy Gold</button>
                </div>
            </div>
        </div>

    );
};

export default Premium
