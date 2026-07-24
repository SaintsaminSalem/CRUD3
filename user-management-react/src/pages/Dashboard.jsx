import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";
import { disconnectSocket } from "../socket";

function Dashboard() {
  const navigate = useNavigate();

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    disconnectSocket();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{user?.role === "admin" ? "Welcome Admin" : "Welcome User"}</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <NotificationBell />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <h3>Role: {user?.role}</h3>
    </div>
  );
}

export default Dashboard;