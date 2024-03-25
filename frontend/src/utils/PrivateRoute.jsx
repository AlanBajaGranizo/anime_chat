import { useNavigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute= () =>  {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(()=> {
    if (!user) {
        navigate("/login");
      }
  }, [user])
  
  return <Outlet/>

}
export default PrivateRoute;
