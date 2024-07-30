import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/Customer/Navbar/Navbar";

export default function Main_Customer() {
  return (
    <div className="lg:px-80">
        <Navbar/>
        <Outlet/>
    </div>
  )
}
