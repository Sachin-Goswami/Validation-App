import React, { useEffect, useState } from "react";
import ThemeProvider from "./componets/contexts/ThemeContext";
import AuthProvider from "./componets/contexts/AuthContext";
import UserProvider from "./componets/contexts/UserContext";
import PageRoutes from "./componets/routes/PageRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

export const App = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      <div className="home centerTextStyles">
        <h1>Form Validation</h1>
        <h2>{online ? "Online" : "Offline"}</h2>
      </div>

      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <PageRoutes />
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
