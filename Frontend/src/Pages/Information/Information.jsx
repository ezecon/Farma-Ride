import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Information({isCustomer, isRider, isOwner}) {
    const [city, setCity] = useState(null);
    const [code, setCode] = useState('');
    const [district, setDistrict] = useState(null);
    const [country, setCountry] = useState('');
    const [photo, setPhoto] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { userEmail } = location.state || {};

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (userEmail === null) {
                navigate('/register/role');
                return;
            }

            const formData = new FormData();
            formData.append('email', userEmail);
            formData.append('city', city);
            formData.append('zipCode', code);
            formData.append('district', district);
            formData.append('country', country);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('photo', photo); // Ensure photo is a File object

            const response = await axios.put('http://localhost:5000/api/users/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success("Verification successful!");
                if (isCustomer) {
                    navigate('/customer');
                } else if (isRider) {
                    navigate('/rider');
                } else if (isOwner) {
                    navigate('/farmacy-owner');
                }
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                console.error('Error verification:', error);
                toast.error("Verification failed. Please try again.");
            }
        }
    };

    const captureLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    toast.success("Shared");
                },
                error => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="relative min-h-screen bg-black montserrat-alternates-regular">
            <div className="relative flex flex-col items-center justify-center p-4 pt-36">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-700 bg-white bg-opacity-10">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input 
                                type="text" 
                                id="city"
                                placeholder="City" 
                                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                                aria-label="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input 
                                type="number" 
                                id="zipCode"
                                placeholder="Zip Code" 
                                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                                aria-label="Zip Code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                id="district"
                                placeholder="District" 
                                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                                aria-label="District"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                id="country"
                                placeholder="Country" 
                                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                                aria-label="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input 
                                type="file" 
                                accept=".png, .jpg, .jpeg"
                                id="photo"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                                aria-label="Photo"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                required
                            />
                        </div>
                        <div className="flex cursor-pointer" onClick={captureLocation}>
                            <FaMapMarkerAlt className="text-[red]"/> <p className="text-white px-2 text-sm font-mono">Click here to share your location!</p>
                        </div>
                        <Button type="submit" className="w-full bg-black hover:bg-slate-900 text-white py-3 rounded-lg transition duration-300">
                            SAVE
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
