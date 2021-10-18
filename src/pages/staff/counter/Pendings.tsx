import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Grid,
  Text,
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
  } = useQuery(FIND_MANY_QUEUES, {
    variables: {
      query: {
        take: 18,
        status: "PENDING",
        direction: "DESC",
      },
    },
  });

  const { data, loading: NewPendingLoading } = useSubscription(NEW_PENDING, {
    variables: { status: "PENDING" },
  });

  useEffect(() => {
    if (!Loading && Data && Data?.queues?.totalFiltered !== 0) {
      setQueues(Data?.queues?.results);
    }
  }, [Data]);

  useEffect(() => {
    if (!NewPendingLoading) {
      setQueues((prev: any) => {
        const newQueue = [data.newQueue, ...prev];
        newQueue.pop();
        return newQueue;
      });
    }
  }, [data]);

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
      <Grid templateColumns="repeat(6, 1fr)" gap={2}>
        {queues.map((queue: any) => (
          <PendingQueue number={queue.number} key={queue._id} />
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

  return (
    <Box p="4" height="100%">
      <Text fontSize="4xl" fontWeight="bold" color="gray.500">
        PENDINGS
      </Text>
      {UI}
    </Box>
  );
};

const PendingQueue = (props: any) => {
  const { number } = props;
  return (
    <Box
      m="2"
      bg="gray.400"
      rounded="sm"
      p="2"
      px="7"
      shadow="xs"
      textAlign="center"
    >
      <Text fontSize="7xl" fontWeight="bold" color="gray.600">
        {number}
      </Text>
    </Box>
  );
};

export default Pendings;
