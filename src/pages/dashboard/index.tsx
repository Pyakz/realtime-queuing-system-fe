import { useAuth } from "../../context/AuthContext";
import AdminPage from "../admin";
import StaffPage from "../staff";
import Scanner from "../staff/counter/Scanner";

const Dashboard = () => {
  const { auth } = useAuth();
  return auth.role === "ADMIN" ? (
    <AdminPage />
  ) : auth.role === "ADMIN" ? (
    <StaffPage />
  ) : (
    <Scanner />
  );
};

export default Dashboard;
