import { useQuery } from "@apollo/client";
import {
  Box,
  Text,
  Flex,
  Grid,
  useMediaQuery,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import CenterSpinner from "../../../components/common/CenterSpinner";
import { FIND_MANY_QUEUES } from "../../admin/queues/_apolloQueries";

const CounterPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 650px)");
  const {
    data: Data,
    loading: Loading,
    error: QueryError,
  } = useQuery(FIND_MANY_QUEUES, {
    variables: {
      query: {
        take: 18,
        status: "PROCESSING",
        direction: "DESC",
      },
    },
  });

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
    console.log(Data?.queues?.results);
    UI = (
      <Grid templateColumns={`repeat(${isMobile ? "1" : "2"}, 1fr)`} gap={5}>
        {Data?.queues?.results.map((queue: any) => (
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
      bg="gray.200"
      rounded="sm"
      p="2"
      justifyContent="space-between"
      alignContent="center"
      shadow="sm"
    >
      <Box
        bg="gray.300"
        rounded="sm"
        p={isMobile ? "3" : "2"}
        px="7"
        w="25%"
        textAlign="center"
      >
        <Text
          fontSize={isMobile ? "2xl" : "4xl"}
          fontWeight="bold"
          color="gray.600"
        >
          {number}
        </Text>
      </Box>

      <Box rounded="sm" p="2" px="7" m="2" borderBottom="5px solid">
        <Text
          fontSize={isMobile ? "1xl" : "2xl"}
          fontWeight="bold"
          color="gray.600 "
        >
          Counter {counter}
        </Text>
      </Box>
    </Flex>
  );
};
export default CounterPage;
