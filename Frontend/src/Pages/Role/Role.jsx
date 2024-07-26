
import { useEffect, useState } from "react";

const texts = ["OH?", "Are you free?", "Hang on!", "Select Your Role!"];

export default function Role() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showDuration = 1000; 
    const hideDuration = 500; 

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

  return (
    <div className="relative min-h-screen bg-black montserrat-alternates-regular">

      <div className="relative flex flex-col items-center justify-center p-4 pt-36">
        <div className="text-center text-2xl font-bold text-white mb-8 flex">
          <p>_</p> {visible && <span>{texts[currentIndex]}</span>} <p>_</p>
        </div>

      <div>
      <a href="/farmacy-owner">
          <div className="mt-2 w-full max-w-md p-8 rounded-lg shadow-lg border text-white border-gray-700 bg-white bg-opacity-10">
                Join as Farmacy Owner
            </div>
      </a>
       <a href="/customer">
        <div className="mt-2 w-full max-w-md p-8 rounded-lg shadow-lg border text-white border-gray-700 bg-white bg-opacity-10">
              Join as Customer
          </div>
       </a>
       <a href="/rider">
          <div className="mt-2 w-full max-w-md p-8 rounded-lg shadow-lg border text-white border-gray-700 bg-white bg-opacity-10">
                Join as Rider
            </div>
       </a>
        
      </div>
      </div>
    </div>
  );
}
