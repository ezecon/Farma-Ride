
export default function HeroSection() {
  return (
    <div className="relative">
      <img
        src="https://images.aeonmedia.co/images/afef287f-dd6f-4a6a-b8a6-4f0a09330657/sized-kendal-l4ikccachoc-unsplash.jpg?width=3840&quality=75&format=auto"
        className="h-full w-full object-cover object-center rounded-xl blur-img"
        alt="Hero Section Image"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className=" text-center animated-text montserrat-alternates-bold text-xl md:text-2xl lg:text-4xl py-2 md:py-4">
            The Truth <br />
            The Myth <br />
            We live to serve you
          </h1>
        </div>
      </div>
    </div>
  );
}
