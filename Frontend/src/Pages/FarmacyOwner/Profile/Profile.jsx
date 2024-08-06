import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useToken } from '../../../Components/Hook/useToken';
import Map from '../MapCard/SingleMap';

export default function Profile_Owner() {
  const [user, setUser] = useState({});
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate('/login');
      }
      try {
        const response = await axios.post('https://farma-ride-server.vercel.app/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          console.log("Token verification failed:", response.data);
          removeToken();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  useEffect(() => {
    if (userID) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${userID}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUser();
    }
  }, [userID]);

  const parseUpazilas = (upazilas) => {
    try {
      return JSON.parse(upazilas).join(', ');
    } catch (error) {
      console.error('Error parsing upazilas:', error);
      return upazilas; // Return as is if parsing fails
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200 transition-transform transform-gpu hover:scale-105">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        {'Profile'}
      </h1>
      <form className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div>
              <img src={user.photo} alt="User" className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md" />
               
                <a href="profile-update"> <Button color="black" className="w-full mt-4 transition-transform transform hover:scale-105">Edit Profile</Button></a>
            </div>
            <div>
              <p className="text-lg font-semibold"><strong>Name:</strong> {user.name}</p>
              <p className="text-lg"><strong>Email:</strong> {user.email}</p>
              <p className="text-lg"><strong>Number:</strong> {user.number}</p>
              <p className="text-lg"><strong>Role:</strong> {user.role}</p>
             {user.role==='rider' && <p className="text-lg"><strong>Number of Delivery:</strong> {user.delivery}</p>}
              <p className="text-lg"><strong>Zip Code:</strong> {user.zipCode}</p>
              <p className="text-lg"><strong>Upazila:</strong> {parseUpazilas(user.upazilas)}</p>
              <p className="text-lg"><strong>District:</strong> {user.district}</p>
              <p className="text-lg"><strong>Division:</strong> {user.division}</p>
              <p className="text-lg"><strong>Country:</strong> {user.country}</p>
              {user && user.latitude && user.longitude && (
                <Map latitude={user.latitude} longitude={user.longitude} />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
