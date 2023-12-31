import { useDispatch } from "react-redux";
import { LOGOUT } from "../Redux/User/userTypes";
import { AuthContext } from "../context/AuthContext";

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    //remove user from storage

    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({ type: LOGOUT });
  };
  return { logout };
};

export default useLogout;
