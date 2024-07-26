import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const texts = ["Do you need medicine emergency?", "Are you free to ride?", "Hang on!", "Just Login"];

export default function Login() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const showDuration = 1000; // 1 second for text to show
    const hideDuration = 500; // 0.5 second for text to hide

    const showTimer = setTimeout(() => {
      setVisible(false);
    }, showDuration);

    const hideTimer = setTimeout(() => {
      setVisible(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, showDuration + hideDuration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [currentIndex]);


  //loggin
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password, 
    };
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', user);
      
      if (response.data.error) {
        toast.error(response.data.error); // Display error message
      } else {
        toast.success("Login successful!");
        localStorage.setItem('token', response.data.token); 
        console.log("Token:", response.data.token);
          // Store token in local storage
        navigate('/customer'); // Redirect to dashboard or any protected route
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Display specific backend error message
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black montserrat-alternates-regular">

      <div className="relative flex flex-col items-center justify-center p-4 pt-36">
        <div className="text-center text-2xl font-bold text-white mb-8 flex">
          <p>_</p> {visible && <span>{texts[currentIndex]}</span>} <p>_</p>
        </div>

        <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-700 bg-white bg-opacity-10">
          <h1 className="text-2xl text-white font-bold mb-6 text-center">Login Form</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-200">Username or Email</label>
              <input 
                type="text" 
                id="email"
                placeholder="Enter  Email" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">Password</label>
              <input 
                type="password" 
                id="password"
                placeholder="Enter Password" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-black hover:bg-slate-900 text-white py-3 rounded-lg transition duration-300">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
