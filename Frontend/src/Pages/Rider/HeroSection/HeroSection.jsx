import { GiMedicines } from "react-icons/gi";
export default function HeroSection() {
  return (
    <div className="relative">
      <img
        src="https://static.ecommercedb.com/media/2024/02/rider-with-parcel-on-a-delivery-bike-12413.webp"
        className="h-full w-full object-cover object-center rounded-xl blur-img"
        alt="Hero Section Image"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="animated-text montserrat-alternates-bold text-xl md:text-2xl lg:text-4xl py-2 md:py-4">
            You need your Medicines?
          </h1>
          <a
            className="  w-1/2 flex justify-center bg-black font-mono text-white p-2 md:p-4 rounded-lg"
            href="/Customer/Order"
          >
            <GiMedicines className="px-2 text-3xl"/>ORDER NOW 
          </a>
        </div>
      </div>
    </div>
  );
}
