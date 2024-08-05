
import { useState } from "react";
import { Option, Select } from "@material-tailwind/react";


export default function DailyTips() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

const products = [
    {
        name: 'চুল লম্বা করো',
        version: 'hair',
        lekha: "প্রতিদিন নিয়ম করে শেম্পু দিয়ে চুল ধুবেন। চুল ভালো থাকবে"
    }
]


 

  const filterProducts = (category) => {
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.version === category));
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category);
  };


  return (
    <div>
      <div className="w-full bg-black text-center py-56">
        <h1 className="text-[goldenrod] montserrat-alternates-bold text-4xl">HEALTH TIPS</h1>
        <p className="text-white montserrat-alternates-light">Watch Now</p>
      </div>
      <form className="p-4 space-y-4">
        <div className="flex gap-6">
          <div className="w-full">
            <Select
              required
              label="Select Category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e)}
            >
              <Option value="">All</Option>
              <Option value="hair">Hair</Option>
            </Select>
          </div>
        </div>
      </form>
      <div className=" bg-white rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {filteredProducts.reverse().map((item) => (
           <> 
                <div className=" w-full p-10 border rounded-lg shadow-md">
                    <p className="font-bold text-2xl py-4">{item.name}</p>
                    <p className="text-sm">{item.lekha}</p>
                </div>
           </>
        ))}
      </div>
    </div>
  );
}


