import { useNavigate } from "react-router-dom";
import Users from "./Users";
import NotificationBell from "../components/NotificationBell";
import { disconnectSocket } from "../socket";

export default function AdminDashboard() {
  const navigate = useNavigate();

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
        <h1>Admin Dashboard</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <NotificationBell />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <p>Manage users and system settings</p>

      <Users />
    </div>
  );
}