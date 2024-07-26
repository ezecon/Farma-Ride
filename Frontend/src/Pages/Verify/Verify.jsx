import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Verify() {
    const [verificationCode, setVerificationCode] = useState('');
    const [state, setState] = useState(null);
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (verificationCode === code) {
            try {
                const userEmail = { email: "md.econozzaman@gmail.com" }; 
                const response = await axios.put('http://localhost:5000/api/users/verify', {userEmail});
    
                if (response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.success("Verification successful!");
                    navigate('/customer/');
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                } else {
                    console.error('Error verification:', error);
                    toast.error("Verification failed. Please try again.");
                }
            }
        } else {
            toast.error("Wrong Code");
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const userEmail = "md.econozzaman@gmail.com"; // Just the email as a string
            try {
                const response = await axios.get('http://localhost:5000/api/users/verify', {
                    params: { email: userEmail }
                });
                if (response.status === 200) {
                    console.log("data fetched");
                    setState(response.data.isVerified);
                    setCode(response.data.verificationCode); // Assuming response.data contains verificationCode
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.log("error", error);
            }
        };
    
        if (state === true) {
            navigate('/customer/');
        } else {
            fetch();
        }
    }, [state, navigate]);
    

    return (
        <div className="relative min-h-screen bg-black montserrat-alternates-regular">
            <div className="relative flex flex-col items-center justify-center p-4 pt-36">
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-700 bg-white bg-opacity-10">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input 
                                type="text" 
                                id="name"
                                placeholder="Verification Code" 
                                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                                aria-label="Verification Code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-black hover:bg-slate-900 text-white py-3 rounded-lg transition duration-300">
                            Verify
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
