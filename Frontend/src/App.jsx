import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './Components/Main/Main';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Role from './Pages/Role/Role';
import Index from './Pages/Customer/Index';
import Index_Owner from './Pages/FarmacyOwner/Index';
import Index_Rider from './Pages/Rider/Index';
import Medicine from './Pages/Customer/Medicine/Medicine';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/role" element={<Role/>} />
                    <Route path="/customer" element={<Index/>} />
                    <Route path="/rider" element={<Index_Rider/>} />
                    <Route path="/farmacy-owner" element={<Index_Owner/>} />
                    <Route path="/medicine" element={<Medicine/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
