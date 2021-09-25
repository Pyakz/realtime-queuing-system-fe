import { Box } from "@chakra-ui/react";
import AdminLayout from "../../../layout/AdminLayout";
import StaffTable from "./StaffTable";

const AdminStaffPage = () => {
  return (
    <AdminLayout>
      <Box>
        <StaffTable />
      </Box>
    </AdminLayout>
  );
};

export default AdminStaffPage;
