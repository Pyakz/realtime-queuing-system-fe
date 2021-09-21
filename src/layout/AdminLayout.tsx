import { Container } from "@chakra-ui/layout";
import { useAuth } from "../context/AuthContext";
import Routes from "../routes/routes";

const AdminLayout = (props: any) => {
  const { auth } = useAuth();
  const availableRoutes = Routes.map((route) => {
    if (route?.role?.includes(auth?.role || "")) {
      return route;
    }
  });
  console.log(availableRoutes);
  return <Container maxW="container.xl">{props.children}</Container>;
};

export default AdminLayout;
