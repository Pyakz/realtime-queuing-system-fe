import { useQuery } from "@apollo/client";
import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Tag,
  useColorModeValue,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import CenterSpinner from "../../../components/common/CenterSpinner";
import TablePagination from "../../../components/Pagination";
import PerPage from "../../../components/Perpage";
import THeader from "../../../components/TableHeader";
import { FIND_MANY_USERS } from "./_apolloQueries";

export enum ROLE_ENUM {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
}

const StaffTable = () => {
  const [isMobile] = useMediaQuery("(max-width: 599px)");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");

  let UI;
  const {
    data: Data,
    loading: Loading,
    error: QueryError,
  } = useQuery(FIND_MANY_USERS, {
    variables: {
      query: {
        role: ROLE_ENUM.STAFF,
        take: perPage,
        page: page,
        name: name.toLowerCase(),
      },
    },
  });

  if (!Loading && QueryError) {
    return (
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

  if (!Loading && Data && Data?.users?.totalFiltered !== 0) {
    UI = Data?.users?.results?.map((rowData: any) => (
      <Row rowData={rowData} key={rowData._id} />
    ));
  }

  if (Loading && !Data && !QueryError) {
    UI = <CenterSpinner />;
  }

  if (!Loading && Data && Data?.users?.totalFiltered === 0) {
    UI = (
      <Flex justifyContent="center" alignContent="center">
        <Text fontSize="3xl">No Data Found</Text>
      </Flex>
    );
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
          <InputGroup w="15rem" justifySelf="flex-end" mx="2">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="e.g: marky"
              rounded="sm"
              size="md"
              onChange={(e: any) => setName(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Flex>
      <THeader names={["Full Name", "Created", "Counter #"]} />

      <Box
        height={isMobile ? "auto" : "25rem"}
        overflow={isMobile ? "scroll" : "scroll"}
        p={1}
        my="2"
      >
        {UI}
      </Box>
      <Flex mb="3" p="1" justifyContent="space-between" alignItems="center">
        <TablePagination data={Data?.users} page={page} setPage={setPage} />
        <PerPage data={Data?.users} perPage={perPage} setPerPage={setPerPage} />
      </Flex>
    </Box>
  );
};

export default StaffTable;

export const Row = ({ rowData }: any) => {
  const [isMobile] = useMediaQuery("(max-width: 699px)");
  const BG = useColorModeValue("white", "gray.700");
  return (
    <SimpleGrid
      columns={[4, 4, 4]}
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
          {rowData?.username}
        </Text>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="start"
        style={{
          marginLeft: "-3rem",
        }}
      >
        <Text fontSize="md" ml={isMobile ? "1" : "0"}>
          {moment(rowData?.createdAt).format("MMM D YYYY, h:mm:ss a")}
        </Text>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="start"
        style={{
          marginLeft: "-4rem",
        }}
      >
        <Text fontSize="md" sx={{ mr: "2" }}>
          Counter: {rowData?.processedBy?.counterNumber}
        </Text>
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
          {rowData?.counterNumber}
        </Tag>
      </Flex>

      <Flex
        my={isMobile ? 2 : 0}
        flexDirection={isMobile ? "column" : "row"}
        style={{
          marginLeft: "-4rem",
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
