import { useAuth } from "../../context/AuthContext";
import AdminPage from "../admin/Admin";
import StaffPage from "../staff/Staffs";

const Dashboard = () => {
  const { auth } = useAuth();
  return auth.role === "ADMIN" ? <AdminPage /> : <StaffPage />;
};

export default Dashboard;
