import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = memo(() => {
  
  const user = useSelector((store) => store.user);
  console.log(user);


  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">🧑‍💻DevTinder</Link>
        </div>

        {user && (
          <div className="flex gap-2">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-green-400 font-semibold px-4 py-2 rounded-xl shadow-md text-center">
              👋 Welcome, {user.firstName}!
            </div>

            <div className="dropdown dropdown-end " >
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User photo"
                    src={user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Dulquer_Salmaan_at_Zoya_Factor_Trailer_Launch_function_%28cropped%29.jpg/250px-Dulquer_Salmaan_at_Zoya_Factor_Trailer_Launch_function_%28cropped%29.jpg"} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">Neww</span>
                  </Link>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
});

export default NavBar
