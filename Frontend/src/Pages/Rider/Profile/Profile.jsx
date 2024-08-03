import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@material-tailwind/react';
import { useToken } from '../../../Components/Hook/useToken';
import Map from '../MapCard/SingleMap';

export default function Profile_Customer() {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
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
        const response = await axios.post('http://localhost:5000/api/verifyToken', { token });

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    city: '',
    zipCode: '',
    district: '',
    country: '',
    latitude: '',
    longitude: '',
    photo: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userID}`);
        const { password, _id, role, __v, isVerified, verificationCode, ...profileData } = response.data;
        setUser(profileData);
        setFormData(profileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/profile/${userID}`, formData);
      setUser(formData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200 transition-transform transform-gpu hover:scale-105">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        {editing ? 'Edit Profile' : 'Profile'}
      </h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        {editing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(formData).map((key) => (
                key !== 'photo' && key !== 'role' && (
                  <div key={key} className="relative">
                    <Input
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="transition-transform transform hover:scale-105"
                    />
                  </div>
                )
              ))}
              <div className="relative">
                <Input
                  label="Photo"
                  type="file"
                  accept=".jpg, .png"
                  name="photo"
                  onChange={handleChange}
                  className="transition-transform transform hover:scale-105"
                />
              </div>
            </div>

            <div className="relative">
              <Input
                label="Role"
                name="role"
                value={user.role}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>

            <Button type="submit" color="green" className="w-full mt-4 transition-transform transform hover:scale-105">Save Changes</Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div>
                <img src={`http://localhost:5000/uploads/${user.photo}`} alt="User" className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md" />
                <Button onClick={() => setEditing(true)} color="black" className="w-full mt-4 transition-transform transform hover:scale-105">Edit Profile</Button>
              </div>
              <div>
                <p className="text-lg font-semibold"><strong>Name:</strong> {user.name}</p>
                <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                <p className="text-lg"><strong>Number:</strong> {user.number}</p>
                <p className="text-lg"><strong>Role:</strong> {user.role}</p>
                <p className="text-lg"><strong>City:</strong> {user.city}</p>
                <p className="text-lg"><strong>Zip Code:</strong> {user.zipCode}</p>
                <p className="text-lg"><strong>District:</strong> {user.district}</p>
                <p className="text-lg"><strong>Country:</strong> {user.country}</p>
                {user && user.latitude && user.longitude && (
                        <Map latitude={user.latitude} longitude={user.longitude} />
                      )}
              </div>
            </div>
           
          </div>
        )}
      </form>
    </div>
  );
}
