import { useAuth } from "../../context/AuthContext";
import AdminPage from "../admin";
import StaffPage from "../staff";

const Dashboard = () => {
  const { auth } = useAuth();
  return auth.role === "ADMIN" ? <AdminPage /> : <StaffPage />;
};

export default Dashboard;
