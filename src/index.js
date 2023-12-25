import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { CloudinaryContext } from "cloudinary-react";

const cloudinaryConfig = {
  cloud_name: "ditqh6dqi",
  api_key: "342268914234271",
  api_secret: "ZzcpgFHfBR2wPKIfumVrgVDPzF4",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CloudinaryContext cloudName={cloudinaryConfig.cloud_name}>
          <App />
        </CloudinaryContext>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
