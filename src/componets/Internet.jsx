import React, { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleOnline = () => {
      setStatus(true);
      setMessage("You are currently online.");
    };
    const handleOffline = () => {
      setStatus(false);
      setMessage("You are currently offline.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      <div className="home">
        <h1>Form Validation</h1>
        <h2>Status: {online ? "Online" : "Offline"}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
