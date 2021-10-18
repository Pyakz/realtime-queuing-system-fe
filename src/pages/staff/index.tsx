import { useQuery, useLazyQuery } from "@apollo/client";
import {
  Box,
  Text,
  Flex,
  Button,
  Tag,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CenterSpinner from "../../components/common/CenterSpinner";
import StaffLayout from "../../layout/StaffLayout";
import { CURRENT_QUEUES } from "./__apolloQueries";

export enum STATUS_ENUM {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  PROCESSING = "PROCESSING",
  CANCELLED = "CANCELLED",
}

const StaffPage = () => {
  const {
    data: Data,
    loading: Loading,
    error: QueryError,
  } = useQuery(CURRENT_QUEUES);

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

  if (!Loading && Data && Data?.currentQueueByUser) {
    UI = <QueuesBody data={Data?.currentQueueByUser} />;
  }

  if (Loading && !Data && !QueryError) {
    UI = <CenterSpinner />;
  }

  if (!Loading && Data && !Data?.currentQueueByUser) {
    UI = (
      <Flex justifyContent="center" alignContent="center">
        <Text fontSize="3xl">No Data Found</Text>
      </Flex>
    );
  }

  return <StaffLayout>{UI}</StaffLayout>;
};

export default StaffPage;

type TPreviousBox = {
  status: string;
  number: number;
};

const QueuesBody = (props: any) => {
  const { data } = props;
  const currentNumber = data.current;
  const nextNumber = data.next;

  return (
    <div className="parent">
      <div className="div1">
        <Box
          p="2"
          flex="1"
          shadow="sm"
          rounded="md"
          textAlign="center"
          bg="gray.100"
          mt="4"
        >
          <Text fontSize="2xl" color="orange" my="4">
            Current Serving
          </Text>
          <Text fontSize="3xl" color="gray" my="4">
            Ticket Number
          </Text>
          <Box rounded="md" borderColor="orange" bg="orange" m="5" py="8">
            <Text fontSize="9xl" color="white" fontWeight="bold">
              {currentNumber?.number}
            </Text>
          </Box>
          <Flex justifyContent="center" p="3">
            <Button
              size="lg"
              mx="2"
              colorScheme="red"
              w="100%"
              onClick={() => {
                console.table(currentNumber);
              }}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              mx="2"
              colorScheme="green"
              w="100%"
              onClick={() => {
                console.table(nextNumber);
              }}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </div>

      <Box className="div2" mt="3" p="3">
        <Text
          p="3"
          fontSize="1xl"
          color="gray.500"
          fontWeight="bold"
          shadow="sm"
          bg="gray.300"
          rounded="md"
        >
          Previous Tickets
        </Text>
        <Flex
          rounded="md"
          w="100%"
          shadow="sm"
          flexDirection="column"
          overflowY="scroll"
          height="28rem"
        >
          {/* {data.map((ticket: any) => (
            <PreviousBox
              key={ticket._id}
              status={ticket.status}
              number={ticket.number}
            />
          ))} */}
        </Flex>
      </Box>
    </div>
  );
};
const PreviousBox = ({ status, number }: TPreviousBox) => {
  return (
    <Flex
      p="3"
      mx="3"
      mt="2"
      bg="gray.200"
      rounded="md"
      shadow="sm"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Text fontSize="1xl" color="gray.500" fontWeight="bold">
        #{number}
      </Text>

      <Tag
        variant="solid"
        colorScheme={status === "COMPLETED" ? "green" : "red"}
      >
        {status}
      </Tag>
    </Flex>
  );
};
