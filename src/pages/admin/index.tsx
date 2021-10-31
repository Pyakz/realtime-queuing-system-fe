import AdminLayout from "../../layout/AdminLayout";
import { useQuery, useSubscription } from "@apollo/client";
import { DASHBOARD } from "./__apolloQueries";
import { useEffect, Fragment } from "react";
import { Box, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import CenterSpinner from "../../components/common/CenterSpinner";
import CounterPage from "../staff/counter/CounterPage";
import { STATUS_ENUM } from "../staff";
import { NEW_PENDING } from "../staff/counter/__apolloSubscriptions";
import Pendings from "../staff/counter/Pendings";

type TDashboard = {
  totalQueue: number;
  totalPerson: number;
  totalPending: number;
  totalCompleted: number;
  totalCancelled: number;
  averageCompleted: number;
  averageCancelled: number;
};
const AdminPage = () => {
  const { data: Data, loading: Loading, refetch } = useQuery(DASHBOARD);

  const { data: NewProcessing, loading: NewProcessingLoading } =
    useSubscription(NEW_PENDING, {
      variables: { status: STATUS_ENUM.COMPLETED },
    });

  const { data: NewCancelled, loading: NewCancelledLoading } = useSubscription(
    NEW_PENDING,
    {
      variables: { status: STATUS_ENUM.CANCELLED },
    }
  );

  const { data: NewPending, loading: NewPendingLoading } = useSubscription(
    NEW_PENDING,
    {
      variables: { status: STATUS_ENUM.PENDING },
    }
  );

  useEffect(() => {
    refetch();
  }, [
    NewProcessing,
    NewCancelled,
    NewPending,
    NewProcessingLoading,
    NewCancelledLoading,
    NewPendingLoading,
    refetch,
  ]);
  const BG = useColorModeValue("gray.200", "gray.700");
  const BGCounter = useColorModeValue("white", "gray.700");

  const DATA: TDashboard = Data?.dashboard;
  return (
    <AdminLayout>
      {Loading ? (
        <CenterSpinner />
      ) : (
        <Fragment>
          <SimpleGrid columns={[1, 2, 3]} spacing="15px">
            <Box bg={BG} rounded="sm" shadow="sm" p="3">
              <Text fontSize="1xl" fontWeight="bold">
                Total Queue
              </Text>

              <Text fontSize="4xl" fontWeight="bold" m="2">
                {DATA.totalQueue}
              </Text>
            </Box>
            <Box bg={BG} rounded="sm" shadow="sm" p="3">
              <Text fontSize="1xl" fontWeight="bold">
                Average Completed
              </Text>

              <Text fontSize="4xl" fontWeight="bold" m="2">
                {DATA.averageCompleted}
                <span
                  style={{
                    fontSize: "1.5rem",
                    marginLeft: "5px",
                  }}
                >
                  %
                </span>
              </Text>
            </Box>
            <Box bg={BG} rounded="sm" shadow="sm" p="3">
              <Text fontSize="1xl" fontWeight="bold">
                Average Cancelled
              </Text>
              <Text fontSize="4xl" fontWeight="bold" m="2">
                {DATA.averageCancelled}
                <span
                  style={{
                    fontSize: "1.5rem",
                    marginLeft: "5px",
                  }}
                >
                  %
                </span>
              </Text>
            </Box>
            <Box bg={BG} rounded="sm" shadow="sm" p="3">
              <Text fontSize="1xl" fontWeight="bold">
                Total Person
              </Text>
              <Text fontSize="4xl" fontWeight="bold" m="2">
                {DATA.totalPerson}
              </Text>
            </Box>
            <Box bg={BG} rounded="sm" shadow="sm" p="3">
              <Text fontSize="1xl" fontWeight="bold">
                Total Completed
              </Text>
              <Text fontSize="4xl" fontWeight="bold" m="2">
                {DATA.totalCompleted}
              </Text>
            </Box>
            <Box bg={BG} rounded="sm" shadow="sm" p="3">
              <Text fontSize="1xl" fontWeight="bold">
                Total Cancelled
              </Text>
              <Text fontSize="4xl" fontWeight="bold" m="2">
                {DATA.totalCancelled}
              </Text>
            </Box>
          </SimpleGrid>
          <Box mt="4" shadow="sm" p="2" bg={BGCounter}>
            <CounterPage />
          </Box>

          <Box mt="4" shadow="sm" p="2" bg={BGCounter}>
            <Pendings />
          </Box>
        </Fragment>
      )}
    </AdminLayout>
  );
};

export default AdminPage;
