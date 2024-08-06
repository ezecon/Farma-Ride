import { useEffect, useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import Medicines from './Medicines/Medicines';

export default function CheckFarmacy() {
  const [user, setUser] = useState({});
  const { id } = useParams();


  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${id}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUser();
    }
  }, [id]);

  const parseUpazilas = (upazilas) => {
    try {
      return JSON.parse(upazilas).join(', ');
    } catch (error) {
      console.error('Error parsing upazilas:', error);
      return upazilas; // Return as is if parsing fails
    }
  };
  return (
    <div>
        <div className=" montserrat-alternates-light p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200 transition-transform transform-gpu hover:scale-105">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        {'Profile'}
      </h1>
      <form className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div>
              <img src={user.photo} alt="User" className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md" />
               
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

            </div>
          </div>
        </div>
      </form>
    </div>
    <div>
      <Medicines id={id}/>
    </div>
    </div>
  );
}
