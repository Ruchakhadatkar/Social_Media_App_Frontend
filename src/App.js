import "./App.css";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./pages/Profile/ProfilePage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

function App() {
  const PrivateRoutes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("privateRoute", user);
    let auth = { token: user ? true : false };
    return auth.token ? <Outlet /> : <Navigate to="/login" />;
  };

  const PublicRoutes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Public", user);
    let auth = { token: user ? true : false };
    console.log(auth);
    return !auth.token ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<ProfilePage />} path="/profile/:id" />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignupPage />} path="/signup" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
