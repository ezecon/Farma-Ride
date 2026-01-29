import { Button } from "@material-tailwind/react";

export default function Business() {
  return (
    <section className="Mina space-y-20 py-16 bg-gradient-to-b from-gray-50 to-white">

      {/* Rider Card */}
      <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition max-w-7xl mx-auto overflow-hidden">
        
        {/* Image */}
        <div className="md:w-1/2 w-full">
          <img
            src="https://media.istockphoto.com/id/1345329817/photo/courier-on-bicycle-with-parcel-bike-delivery-service.jpg?s=612x612&w=0&k=20&c=uIeqd49y0oEJqIEJjH7VdeO8p2A6ERo1ETxz0Bk_Jt4="
            alt="Rider Service"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 w-full px-6 md:px-16 py-12 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            রাইডার হিসেবে আয় করুন
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            আপনি কি রাইডার হিসেবে কাজ শুরু করতে চান?  
            প্রয়োজনীয় ওষুধ দ্রুত পৌঁছে দিয়ে আয় করুন এবং একই সঙ্গে মানুষের পাশে দাঁড়ান।
          </p>

          <a href="/role">
            <Button className="bg-black px-6 py-3 rounded-full text-white hover:scale-105 transition">
              শুরু করুন
            </Button>
          </a>
        </div>
      </div>

      {/* Business Card */}
      <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition max-w-7xl mx-auto overflow-hidden">
        
        {/* Text */}
        <div className="md:w-1/2 w-full px-6 md:px-16 py-12 space-y-6 order-2 md:order-1">
          <h2 className="text-3xl font-bold text-gray-900">
            আপনার ব্যবসা অনলাইনে নিয়ে আসুন
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            আপনার কি ফার্মেসি বা স্বাস্থ্যসেবা ব্যবসা রয়েছে?  
            অনলাইনে যুক্ত হয়ে আরও বেশি মানুষের কাছে পৌঁছান এবং ব্যবসা বৃদ্ধি করুন।
          </p>

          <a href="/role">
            <Button className="bg-black px-6 py-3 rounded-full text-white hover:scale-105 transition">
              শুরু করুন
            </Button>
          </a>
        </div>

        {/* Image */}
        <div className="md:w-1/2 w-full order-1 md:order-2">
          <img
            src="https://media.istockphoto.com/id/943974286/photo/hand-holding-medicine-capsule-pack.jpg?s=612x612&w=0&k=20&c=KMEtxYBqCrfMB0DBeBIqKrq17TDqxYjBClIHKQ88Ifw="
            alt="Online Pharmacy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
