const initialState = {
  user: JSON.parse(localStorage.getItem("user"))
};
// useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (user) {
//       dispatch({ type: "LOGIN", payload: user });
//     }
//   }, []);

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};
