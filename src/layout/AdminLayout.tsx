import AdminSideBar from "../components/layout/AdminSideBar";
import { Box } from "@chakra-ui/react";
const AdminLayout = (props: any) => {
  return (
    <AdminSideBar>
      <Box bg="white" w="100%" h="100%" p={3} rounded="md">
        {props.children}
      </Box>
    </AdminSideBar>
  );
};

export default AdminLayout;
