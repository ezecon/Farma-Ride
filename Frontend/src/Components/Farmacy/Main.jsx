import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/FarmacyOwner/Navbar/Navbar";

export default function Main_Farmacy() {
  return (
    <div className="lg:px-80">
        <Navbar/>
        <Outlet/>
    </div>
  )
}
