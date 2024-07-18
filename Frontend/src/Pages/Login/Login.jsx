import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const texts = ["Do you need medicine emergency?", "Are you free to ride?", "Hang on!", "Just Login"];

export default function Login() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="relative min-h-screen bg-gray-100 montserrat-alternates-regular">
      {/* Background Image */}
      <img
        src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?t=st=1721279869~exp=1721283469~hmac=e4343b5081d11859028d62ecbec877b7ec70fcc2b39e555358b9d65e17eaed2a&w=996"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />

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
                id="username"
                placeholder="Enter Username or Email" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                aria-label="Username or Email"
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
