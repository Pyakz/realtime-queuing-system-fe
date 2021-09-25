import { Box } from "@chakra-ui/react";
import AdminLayout from "../../../layout/AdminLayout";
import QueuesTable from "./QueuesTable";

const Queues = () => {
  return (
    <AdminLayout>
      <Box>
        <QueuesTable />
      </Box>
    </AdminLayout>
  );
};

export default Queues;
