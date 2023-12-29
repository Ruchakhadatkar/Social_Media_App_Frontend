import { useDispatch } from "react-redux";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutsContext";
import { LOGOUT } from "../Redux/User/userTypes";

const useLogout = () => {
  const dispatch = useDispatch()  

  const logout = () => {
    //remove user from storage

    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({ type: LOGOUT });

  };
  return { logout };
};

export default useLogout;
