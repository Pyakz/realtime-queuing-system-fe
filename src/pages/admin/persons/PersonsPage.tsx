import { Box } from "@chakra-ui/react";
import AdminLayout from "../../../layout/AdminLayout";
import PersonsTable from "./PersonsTable";

const PersonPage = () => {
  return (
    <AdminLayout>
      <Box>
        <PersonsTable />
      </Box>
    </AdminLayout>
  );
};

export default PersonPage;
