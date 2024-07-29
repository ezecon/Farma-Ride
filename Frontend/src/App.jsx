import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Main from './Components/Main/Main';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Role from './Pages/Role/Role';
import Index from './Pages/Customer/Index';
import Index_Owner from './Pages/FarmacyOwner/Index';
import Index_Rider from './Pages/Rider/Index';
import Verify from './Pages/Verify/Verify';
import Information from './Pages/Information/Information';
import Email from './Pages/Email';
import CheckMedi from './Pages/FarmacyOwner/Inventory/CheckMedi';
import Search from './Pages/Customer/Search/Search';
import All from './Pages/Customer/Medicines/All';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/email" element={<Email />} />
                    <Route path="customer/login" element={<Login isCustomer />} />
                    <Route path="customer/register" element={<Register isCustomer/>} />

                    <Route path="farmacy-owner/login" element={<Login isOwner/>} />
                    <Route path="farmacy-owner/register" element={<Register isOwner />} />

                    <Route path="rider/login" element={<Login isRider/>} />
                    <Route path="rider/register" element={<Register isRider/>} />
                    
                    <Route path="/login" element={<Navigate to="/login/role" />} />
                    <Route path="/register" element={<Navigate to="/register/role" />} />

                    <Route path="/role" element={<Navigate to="/register/role" />} />
                    <Route path="*" element={<Navigate to="/" />} />

                    <Route path="login/role" element={<Role isLogin />} />
                    <Route path="register/role" element={<Role isRegister />} />
                    
                    <Route path="/farmacy-owner/check-medicine/:id" element={<CheckMedi />} />


                    <Route path="/customer" element={<Index />} />
                    <Route path="/rider" element={<Index_Rider />} />
                    <Route path="/farmacy-owner" element={<Index_Owner />} />
                    <Route path="/customer/search" element={<Search />} />
                    <Route path="/customer/all-medicine-view" element={<All/>} />
                    <Route path="/verify-customer" element={<Verify isCustomer/>} />
                    <Route path="/verify-rider" element={<Verify isRider/>} />
                    <Route path="/verify-farmacy-owner" element={<Verify isOwner/>} />
                    <Route path="/verify/information-customer" element={<Information isCustomer/>} />
                    <Route path="/verify/information-rider" element={<Information isRider/>} />
                    <Route path="/verify/information-farmacy-owner" element={<Information isOwner/>} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
