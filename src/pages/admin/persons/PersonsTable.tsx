import { useQuery } from "@apollo/client";
import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Tag,
  useColorModeValue,
  useMediaQuery,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import CenterSpinner from "../../../components/common/CenterSpinner";
import Pagination from "../../../components/Pagination";
import PerPage from "../../../components/Perpage";
import TableHeader from "../../../components/TableHeader";
import { FIND_MANY_PERSON } from "./_apolloQueries";
import { CSVLink } from "react-csv";
import InfoPersons from "./InfoPersons";

const PersonsTable = () => {
  const [isMobile] = useMediaQuery("(max-width: 599px)");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");

  let UI;
  const {
    data: Data,
    loading: Loading,
    error: QueryError,
  } = useQuery(FIND_MANY_PERSON, {
    variables: {
      query: {
        take: perPage,
        page: page,
        name: name.toLowerCase(),
      },
    },
  });

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
  let rowCSV = [];
  if (!Loading && Data && Data?.persons?.totalFiltered !== 0) {
    UI = Data?.persons?.results?.map((rowData: any) => (
      <Row rowData={rowData} key={rowData._id} />
    ));
    rowCSV = Data?.persons?.results?.map((person: any) => {
      return {
        name: person.name,
        address: person.address,
        phone: person.cellphoneNumber,
        counter: person.processedBy.counterNumber,
      };
    });
  }

  if (Loading && !Data && !QueryError) {
    UI = <CenterSpinner />;
  }

  if (!Loading && Data && Data?.persons?.totalFiltered === 0) {
    UI = (
      <Flex justifyContent="center" alignContent="center">
        <Text fontSize="3xl">No Data Found</Text>
      </Flex>
    );
  }

  const headers = [
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Phone", key: "phone" },
    { label: "Counter", key: "counter" },
  ];

  return (
    <Box pb={5} p={1}>
      <Flex mb="3" p="1" justifyContent="space-between" alignItems="center">
        <Flex justifyContent="center">
          <Button colorScheme="gray" size="md" rounded="sm">
            <CSVLink
              data={rowCSV}
              headers={headers}
              filename={`persons-${moment().format("MMM-D-YYYY")}`}
            >
              Download
            </CSVLink>
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
              onChange={(e: any) => {
                setTimeout(() => setName(e.target.value), 300);
              }}
            />
          </InputGroup>
        </Flex>
      </Flex>
      <TableHeader names={["Name", "Created", "Processed At"]} />

      <Box
        height={isMobile ? "auto" : "25rem"}
        overflow={isMobile ? "scroll" : "scroll"}
        p={1}
        my="2"
      >
        {UI}
      </Box>
      <Flex mb="3" p="1" justifyContent="space-between" alignItems="center">
        <Pagination data={Data?.persons} page={page} setPage={setPage} />
        <PerPage
          data={Data?.persons}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      </Flex>
    </Box>
  );
};

export default PersonsTable;

export const Row = ({ rowData }: any) => {
  const [isMobile] = useMediaQuery("(max-width: 699px)");
  const BG = useColorModeValue("white", "gray.700");

  const [selectedPerson, setSelectedPerson] = useState<string>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState<boolean>();

  const handleClick = (id: string) => {
    setSelectedPerson(id);
    setOpen(true);
    setTimeout(() => {
      onOpen();
    }, 100);
  };

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
      {open && (
        <InfoPersons
          isOpen={isOpen}
          onClose={onClose}
          selectedPerson={selectedPerson}
        />
      )}
      <Flex alignItems="center" justifyContent="start">
        {/* <Checkbox colorScheme="blue" mx="2" /> */}
        <Text fontSize="xl" fontStyle="bold" ml="2">
          {rowData?.name}
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
          Counter:
        </Text>
        <Tag
          variant="solid"
          colorScheme="gray"
          borderRadius="full"
          ml={isMobile ? "1" : "0"}
        >
          {rowData?.processedBy?.counterNumber}
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
          onClick={() => handleClick(rowData?._id)}
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
