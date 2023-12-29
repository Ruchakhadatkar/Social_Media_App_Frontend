import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useDispatch } from "react-redux";
import { LOGIN } from "../Redux/User/userTypes";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const { dispatch } = useAuthContext();
  const dispatch = useDispatch()

  const signup = async (
    name,
    contact,
    email,
    dateofBirth,
    gender,
    city,
    password
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        contact,
        email,
        dateofBirth,
        gender,
        city,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      dispatch({ type:LOGIN, payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
