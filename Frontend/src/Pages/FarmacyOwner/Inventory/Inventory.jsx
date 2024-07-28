
import Navbar from "../Navbar/Navbar";
import Medicines from "./Medicines/Medicines";
import Upload from "./Upload";

export default function Inventory() {

  return (
    <div className="lg:px-80">
      <Navbar/>
      <Upload/>
       <Medicines/>
    </div>
  )
}