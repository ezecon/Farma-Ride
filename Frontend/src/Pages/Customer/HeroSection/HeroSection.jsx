
export default function HeroSection() {
    return (
      <div >
          <div >
          <div className="relative h-full">
              <img src="https://www.parcelandpostaltechnologyinternational.com/wp-content/uploads/2022/01/GEODIS-MyParcel-e1642607389310-1024x489.jpeg"
              className="h-full w-full object-cover object-center rounded-xl blur-img"
              alt="Hero Section Image" />
        </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                    <h1 className="montserrat-alternates-bold text-2xl py-4">You need your Medicines?</h1>
                    <a className="bg-black font-mono text-white p-2 rounded-lg" href="/Customer/Order">Order Now</a>
                </div>
                  
              </div>
          </div>
      </div>
    )
  }
  