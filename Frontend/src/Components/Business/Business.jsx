import { Button } from "@material-tailwind/react";

export default function Business(){
  return (
    <div className="">
      <div className="flex flex-col md:flex-row bg-white rounded-lg  w-full py-10 px-20">
         {/* Image Section */}
         <div className="flex p-4 sm:w-full">
          <img 
            src="https://media.istockphoto.com/id/1345329817/photo/courier-on-bicycle-with-parcel-bike-delivery-service.jpg?s=612x612&w=0&k=20&c=uIeqd49y0oEJqIEJjH7VdeO8p2A6ERo1ETxz0Bk_Jt4=" 
            alt="Sample Image" 
            className="w-full h-auto object-cover rounded-lg" 
          />
        </div>
        {/* Text Section */}
        <div className="p-4 sm:w-full">
          <p className="text-black montserrat-alternates-extralight">
            Want to run your profession as a Rider? Big chance to save yourself and also the needy. So, why waiting?
          </p>
          <a href="/role"><Button className="bg-black px-2 rounded-2xl mt-2">Get Started</Button></a>
        </div>
      </div>
      <div className="flex flex-col  md:flex-row bg-white rounded-lg  w-full py-10 px-20">
        {/* Text Section */}
        <div className="p-4 sm:w-full">
          <p className="text-black montserrat-alternates-extralight">
            Want to run your business on online? Big chance to engage in the online world. Let's explore. So, why waiting?
          </p>
          <a href="/role"><Button className="bg-black px-2 rounded-2xl mt-2">Get Started</Button></a>
        </div>
         {/* Image Section */}
         <div className="flex p-4 sm:w-full">
          <img 
            src="https://media.istockphoto.com/id/943974286/photo/hand-holding-medicine-capsule-pack.jpg?s=612x612&w=0&k=20&c=KMEtxYBqCrfMB0DBeBIqKrq17TDqxYjBClIHKQ88Ifw="
            alt="Sample Image" 
            className="w-full h-auto object-cover rounded-lg" 
          />
        </div>
        
      </div>
    </div>
  );
}
