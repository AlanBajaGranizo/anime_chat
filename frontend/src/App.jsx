import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

import { AuthProvider } from "./context/AuthContext";
import HomePage from "./views/HomePage";

import RegisterPage from "./views/RegisterPage";
import MyInbox from "./views/MyInbox";
import LoginPage from "./views/LoginPage";
import Dashboard from "./views/Dashboard";
import Navbar from "./views/Navbar";

function App() {
  return (
    <Router>
      
      <AuthProvider>
        <Navbar />
        <Routes>
          
          <Route path="" element={<HomePage/>}/>
          <Route  element={<PrivateRoute/>} >
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="inbox" element={<MyInbox/>} />
          </Route>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
