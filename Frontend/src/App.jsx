import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './Components/Main/Main';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Role from './Pages/Role/Role';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/role" element={<Role/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;