import { useAuth } from "../context/AuthContext";
import Routes from "../routes/routes";

const StaffLayout = (props: any) => {
  const { auth } = useAuth();
  const availableRoutes = Routes.map((route) => {
    if (route?.role?.includes(auth?.role || "")) {
      return route;
    }
  });
  console.log(availableRoutes);
  return <div> {props.children}</div>;
};

export default StaffLayout;
