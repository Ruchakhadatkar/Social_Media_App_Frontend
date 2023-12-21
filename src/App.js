import logo from "./logo.svg";
import "./App.css";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      {/* <SignupPage/> */}
      {/* <LoginPage/> */}
      {/* <HomePage /> */}
      <Navbar/>
    </div>
  );
}

export default App;
