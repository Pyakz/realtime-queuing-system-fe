import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FIND_MANY_QUEUES } from "../../admin/queues/_apolloQueries";

import { useQuery, useSubscription } from "@apollo/client";
import CenterSpinner from "../../../components/common/CenterSpinner";
import { NEW_PENDING } from "./__apolloSubscriptions";
import { useEffect, useState } from "react";

const Pendings = () => {
  const [queues, setQueues] = useState<any>([]);
  const {
    data: Data,
    loading: Loading,
    error: QueryError,
    refetch,
  } = useQuery(FIND_MANY_QUEUES, {
    variables: {
      query: {
        take: 20,
        status: "PENDING",
        direction: "ASC",
      },
    },
  });

  const { data, loading: NewPendingLoading } = useSubscription(NEW_PENDING, {
    variables: { status: "PENDING" },
  });
  const { data: NewCompleted, loading: NewCompletedLoading } = useSubscription(
    NEW_PENDING,
    {
      variables: { status: "COMPLETED" },
    }
  );
  const { data: NewCancelled, loading: NewCancelledLoading } = useSubscription(
    NEW_PENDING,
    {
      variables: { status: "CANCELLED" },
    }
  );
  useEffect(() => {
    refetch();
  }, [
    NewCompleted,
    NewCompletedLoading,
    NewCancelled,
    NewCancelledLoading,
    refetch,
  ]);

  useEffect(() => {
    if (!Loading && Data && Data?.queues?.totalFiltered !== 0) {
      setQueues(Data?.queues?.results);
    }
  }, [Data, Loading]);

  useEffect(() => {
    if (!NewPendingLoading) {
      console.log(data);
      setQueues((prev: any) => {
        const newQueue = [...prev];
        newQueue.push(data.newQueue);
        return newQueue.slice(0, 20);
      });
    }
  }, [data, NewPendingLoading]);

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
    UI = (
      <Flex
        mx="auto"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="flex-start"
      >
        {queues.map((queue: any, index: number) => (
          <PendingQueue index={index} number={queue.number} key={queue._id} />
        ))}
      </Flex>
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

  return (
    <Box p="4" height="100%">
      <Text
        fontSize="4xl"
        fontWeight="bold"
        color="gray.500"
        textAlign="center"
        my="2"
      >
        PENDINGS
      </Text>
      {UI}
    </Box>
  );
};

const PendingQueue = (props: any) => {
  const { number, index } = props;
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const firstRow = index < 5;

  return (
    <Box
      m="2"
      bg={firstRow ? "blue.400" : "gray.400"}
      rounded="sm"
      p="2"
      px="7"
      shadow={firstRow ? "lg" : "xs"}
      textAlign="center"
      width={isLargerThan600 ? "14rem" : "7rem"}
    >
      <Text
        fontSize={isLargerThan600 ? "7xl" : "2xl"}
        fontWeight="bold"
        color={firstRow ? "white" : "gray.600"}
      >
        {number}
      </Text>
    </Box>
  );
};

export default Pendings;
