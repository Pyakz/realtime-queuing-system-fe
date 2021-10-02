import { useQuery } from "@apollo/client";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  Text,
  SimpleGrid,
  Tag,
  Checkbox,
  useMediaQuery,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  Select,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import CenterSpinner from "../../../components/common/CenterSpinner";
import Pagination from "../../../components/Pagination";
import PerPage from "../../../components/Perpage";
import THeader from "../../../components/TableHeader";
import { FIND_MANY_QUEUES } from "./_apolloQueries";

const QueuesTable = () => {
  const [isMobile] = useMediaQuery("(max-width: 599px)");

  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string>("ALL");
  const [perPage, setPerPage] = useState(10);

  const {
    data: Data,
    loading: Loading,
    error: QueryError,
  } = useQuery(FIND_MANY_QUEUES, {
    variables: {
      query: {
        take: perPage,
        page: page,
        status: status,
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
    UI = Data?.queues?.results?.map((rowData: any) => (
      <Row rowData={rowData} key={rowData._id} />
    ));
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
    <Box pb={5} p={1}>
      <Flex mb="3" p="1" justifyContent="space-between" alignItems="center">
        <Flex justifyContent="center">
          <Button colorScheme="gray" size="md" rounded="sm">
            Download
          </Button>
        </Flex>

        <Flex justifyContent="center">
          <Select
            w="10rem"
            rounded="sm"
            size="md"
            defaultValue={status}
            onChange={(e) => {
              setTimeout(() => setStatus(e.target.value), 100);
            }}
          >
            <option value="ALL">All</option>
            <option value="COMPLETED">Completed</option>
            <option value="PROCESSING">Processing</option>
            <option value="PENDING">Pending</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </Flex>
      </Flex>
      <THeader names={["Number", "Created", "Status", "Processed At"]} />

      <Box
        height={isMobile ? "auto" : "25rem"}
        overflow={isMobile ? "scroll" : "scroll"}
        p={1}
        my="2"
      >
        {UI}
      </Box>

      <Flex mb="3" p="1" justifyContent="space-between" alignItems="center">
        <Pagination data={Data?.queues} page={page} setPage={setPage} />
        <PerPage
          data={Data?.queues}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      </Flex>
    </Box>
  );
};

export default QueuesTable;

export const Row = ({ rowData }: any) => {
  const [isMobile] = useMediaQuery("(max-width: 699px)");
  const BG = useColorModeValue("white", "gray.700");
  return (
    <SimpleGrid
      columns={[5, 5, 5]}
      spacing="1.5rem"
      shadow="xs"
      rounded="sm"
      bg={BG}
      p={2}
      my="2"
      w={isMobile ? "50rem" : "100%"}
      pl={isMobile ? "3" : "0"}
    >
      <Flex alignItems="center" justifyContent="start">
        <Checkbox colorScheme="blue" mx="2" />
        <Text fontSize="xl" fontStyle="bold">
          {rowData?.number}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="start">
        <Text fontSize="md" ml={isMobile ? "1" : "0"}>
          {moment(rowData?.createdAt).format("MMM D YYYY, h:mm:ss a")}
        </Text>
      </Flex>

      <Flex alignItems="center" justifyContent="start">
        <Tag
          variant="solid"
          colorScheme={
            rowData?.status === "COMPLETED"
              ? "green"
              : rowData?.status === "PROCESSING"
              ? "blue"
              : rowData?.status === "PENDING"
              ? "gray"
              : rowData?.status === "CANCELLED"
              ? "red"
              : "gray"
          }
          borderRadius="full"
          ml={isMobile ? "1" : "0"}
        >
          {rowData?.status}
        </Tag>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="start"
        ml={isMobile ? "1" : "3"}
      >
        <Text fontSize="md">
          Counter: {rowData?.processedBy?.counterNumber}
        </Text>
      </Flex>
      <Flex
        my={isMobile ? 2 : 0}
        flexDirection={isMobile ? "column" : "row"}
        sx={{
          marginLeft: "-2.5rem",
        }}
      >
        <Button
          mx="1"
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          onClick={() => alert(rowData?._id)}
          size="sm"
          my={isMobile ? 2 : 0}
          px={5}
        >
          Remove
        </Button>
        <Button
          mx="1"
          leftIcon={<EditIcon />}
          onClick={() => alert(rowData?._id)}
          colorScheme="blue"
          size="sm"
          my={isMobile ? 2 : 0}
        >
          View
        </Button>
      </Flex>
    </SimpleGrid>
  );
};
