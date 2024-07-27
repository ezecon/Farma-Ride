import { Button } from "@material-tailwind/react";
import axios from "axios";
import {useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

    const handleSubmit = async (event) => {
        event.preventDefault();

            try {
                const userEmail = "hypnotoxinofficial@gmail.com"; // Use string directly
                const response = await axios.put('http://localhost:5000/api/users/', { 
                    email: userEmail,
                    city: city,
                    zipCode: code,
                    district: district,
                    country:country,
                    latitude: latitude,
                    longitude: longitude,
                    photo: photo 
                });
    
                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success("Verification successful!");
                    if(isCustomer){
                        navigate('/customer');
                      }
                      else if(isRider){
                        navigate('/rider');
                      }
                      else if(isOwner){
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
    
 

 // Function to capture user's current location
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
         // Handle errors here
       }
     );
   } else {
     console.error('Geolocation is not supported by this browser.');
     // Handle unsupported geolocation
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
                                aria-label="Verification Code"
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
                                aria-label="Verification Code"
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
                                aria-label="Verification Code"
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
                                placeholder="Photo" 
                                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                                aria-label="Verification Code"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
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
