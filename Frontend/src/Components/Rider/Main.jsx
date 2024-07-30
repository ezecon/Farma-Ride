import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/Rider/Navbar/Navbar";

export default function Main_Rider() {
  return (
    <div className="lg:px-80">
        <Navbar/>
        <Outlet/>
    </div>
  )
}
