import { useQuery, useSubscription } from "@apollo/client";
import {
  Box,
  Text,
  Flex,
  Grid,
  useMediaQuery,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorModeValue,
} from "@chakra-ui/react";
import { sortBy } from "lodash";
import { useEffect } from "react";
import { STATUS_ENUM } from "..";
import CenterSpinner from "../../../components/common/CenterSpinner";
import { FIND_MANY_QUEUES } from "../../admin/queues/_apolloQueries";
import { NEW_PENDING } from "./__apolloSubscriptions";

const CounterPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 650px)");
  const {
    data: Data,
    loading: Loading,
    error: QueryError,
    refetch,
  } = useQuery(FIND_MANY_QUEUES, {
    variables: {
      query: {
        take: 10,
        status: STATUS_ENUM.PROCESSING,
        direction: "DESC",
      },
    },
  });

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
  useEffect(() => {
    if (!NewProcessingLoading || !NewCancelledLoading) {
      refetch();
    }
  }, [
    NewProcessing,
    NewProcessingLoading,
    NewCancelled,
    NewCancelledLoading,
    refetch,
  ]);

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

  if (!Loading && Data && Data?.queues?.totalFiltered !== 0) {
    const chronologicalData = sortBy(Data?.queues?.results, [
      "processedBy.counterNumber",
    ]);
    UI = (
      <Grid templateColumns={`repeat(${isMobile ? "1" : "2"}, 1fr)`} gap={5}>
        {chronologicalData.map((queue: any) => (
          <Queue
            number={queue.number}
            key={queue._id}
            counter={queue.processedBy.counterNumber}
          />
        ))}
      </Grid>
    );
  }

  if (!Loading && Data && Data?.queues?.totalFiltered === 0) {
    UI = (
      <Flex justifyContent="center" alignContent="center">
        <Text fontSize="3xl">No Data Found</Text>
      </Flex>
    );
  }

  if (Loading && !Data && !QueryError) {
    UI = <CenterSpinner />;
  }

  return <Box p="3">{UI}</Box>;
};

const Queue = (props: any) => {
  const [isMobile] = useMediaQuery("(max-width: 650px)");
  const { number, counter } = props;
  return (
    <Flex
      bg={useColorModeValue("gray.200", "gray.600")}
      rounded="sm"
      p="2"
      justifyContent="space-between"
      alignContent="center"
      shadow="sm"
    >
      <Box
        bg={useColorModeValue("gray.300", "gray.500")}
        rounded="sm"
        p={isMobile ? "3" : "2"}
        px="7"
        w="25%"
        textAlign="center"
      >
        <Text
          fontSize={isMobile ? "2xl" : "4xl"}
          fontWeight="bold"
          color={useColorModeValue("gray.600", "white")}
        >
          {number}
        </Text>
      </Box>

      <Box
        rounded="sm"
        p="2"
        px="7"
        m="2"
        borderBottom={`5px solid  ${useColorModeValue("black", "#E2E8F0")} `}
      >
        <Text
          fontSize={isMobile ? "1xl" : "2xl"}
          fontWeight="bold"
          color={useColorModeValue("gray.600", "white")}
        >
          Counter {counter}
        </Text>
      </Box>
    </Flex>
  );
};
export default CounterPage;
