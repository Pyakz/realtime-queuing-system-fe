import AdminSideBar from "../components/layout/AdminSideBar";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminSideBar>
      <Box
        bg={useColorModeValue("white", "gray.600")}
        shadow="sm"
        w="100%"
        h="100%"
        p={3}
        rounded="sm"
      >
        {children}
      </Box>
    </AdminSideBar>
  );
};

export default AdminLayout;
