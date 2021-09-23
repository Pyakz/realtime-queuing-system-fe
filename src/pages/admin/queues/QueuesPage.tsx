import { useQuery } from "@apollo/client";
import { Box, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import CenterSpinner from "../../../components/common/CenterSpinner";
import AdminLayout from "../../../layout/AdminLayout";
import QueuesTable from "./QueuesTable";
import { FIND_MANY_QUEUES } from "./_apolloQueries";

const Queues = () => {
  const {
    data: Data,
    loading: Loading,
    error: QueryError,
  } = useQuery(FIND_MANY_QUEUES, {
    variables: { query: { take: 10 } },
  });

  if (!Loading) {
    console.log(Data);
  }

  let UI;
  if (!Loading && QueryError) {
    UI = (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={2}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {QueryError.message}
        </AlertTitle>
      </Alert>
    );
  }

  if (!Loading && Data) {
    UI = <QueuesTable data={Data?.queues} />;
  }

  if (Loading && !Data && !QueryError) {
    UI = <CenterSpinner />;
  }
  return (
    <AdminLayout>
      <Box>{UI}</Box>
    </AdminLayout>
  );
};

export default Queues;
