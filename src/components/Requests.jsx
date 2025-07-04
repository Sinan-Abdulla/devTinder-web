import axios from 'axios';
import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [loading, setLoading] = useState(true); 
  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (loading) {
    
    return (
      <h1 className="flex justify-center text-2xl my-10 text-yellow-400">
        Loading...
      </h1>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <h1 className="flex justify-center text-2xl my-10 text-green-300">
        No requests found
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl text-pink-400">
        Requests ({requests.length})
      </h1>
      {requests.map((request) => {
        const from = request?.fromUserId; 
        if (!from) return null;           

        const { _id, firstName, lastName, photoUrl, age, gender, about } = from;

        return (
          <div
            key={request._id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-14 h-14 rounded-full object-contain"
                src={photoUrl}
              />
            </div>
            <div className="text-left m-4 p-4">
              <h2 className="font-bold text-xl">
                {firstName + ' ' + lastName}
              </h2>
              {age && gender && <p>{age + ' ' + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest('rejected', request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest('accepted', request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
