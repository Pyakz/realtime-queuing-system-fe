import { useMutation, useQuery } from "@apollo/client";
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
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import moment from "moment";
import { useRef, useState } from "react";
import CenterSpinner from "../../../components/common/CenterSpinner";
import Pagination from "../../../components/Pagination";
import PerPage from "../../../components/Perpage";
import THeader from "../../../components/TableHeader";
import InfoDrawer from "./InfoDrawer";
import { FIND_MANY_USERS } from "./_apolloQueries";
import { CREATE_USER } from "./__apolloMutations";

export enum ROLE_ENUM {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  SCANNER = "SCANNER",
}

const StaffTable = () => {
  const [isMobile] = useMediaQuery("(max-width: 599px)");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<ROLE_ENUM>(ROLE_ENUM.STAFF);
  const [createUser, { loading: NewUserLoading }] = useMutation(CREATE_USER);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<any>();
  const finalRef = useRef<any>();
  let UI;
  const {
    data: Data,
    loading: Loading,
    error: QueryError,
    refetch,
  } = useQuery(FIND_MANY_USERS, {
    variables: {
      query: {
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
  const handleCreaterUser = async () => {
    //     NewUserLoading
    // NewUserError
    if (isEmpty(username) || isEmpty(password)) {
      if (!toast.isActive("active-toast")) {
        toast({
          id: "active-toast",
          title: "Username or Password is required",
          status: "warning",
          duration: 3000,
          isClosable: true,
          variant: "solid",
        });
      }
    } else {
      try {
        await createUser({ variables: { body: { username, password, role } } });
        onClose();
        refetch();
        setUsername("");
        setPassword("");
      } catch (error: any) {
        if (!toast.isActive("active-toast")) {
          toast({
            id: "active-toast",
            title: error?.message,
            description: "Please, try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
            variant: "solid",
          });
        }
      }
    }
  };

  return (
    <Box pb={5} p={1} ref={finalRef}>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Username"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormLabel mt={4}>Role</FormLabel>

            <Select
              defaultValue="STAFF"
              value={role}
              onChange={(e: any) => setRole(e.target.value)}
            >
              <option value={ROLE_ENUM.STAFF}>Staff</option>
              <option value={ROLE_ENUM.ADMIN}>Admin</option>
              <option value={ROLE_ENUM.SCANNER}>Scanner</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreaterUser}
              isLoading={NewUserLoading}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex mb="3" p="1" justifyContent="space-between" alignItems="center">
        <Button shadow="sm" onClick={onOpen}>
          Create
        </Button>

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
              onChange={(e: any) =>
                setTimeout(() => setName(e.target.value), 300)
              }
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
        <Pagination data={Data?.users} page={page} setPage={setPage} />
        <PerPage data={Data?.users} perPage={perPage} setPerPage={setPerPage} />
      </Flex>
    </Box>
  );
};

export default StaffTable;

export const Row = ({ rowData }: any) => {
  const [selectedStaff, setSelectedStaff] = useState<string>();
  const [open, setOpen] = useState<boolean>();

  const [isMobile] = useMediaQuery("(max-width: 699px)");
  const BG = useColorModeValue("white", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (id: string) => {
    setSelectedStaff(id);
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
        <InfoDrawer
          isOpen={isOpen}
          onClose={onClose}
          selectedStaff={selectedStaff}
        />
      )}

      <Flex alignItems="center" justifyContent="start">
        {/* <Checkbox colorScheme="blue" mx="2" /> */}
        <Text fontSize="xl" fontStyle="bold" ml="2">
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
          colorScheme="blue"
          size="sm"
          my={isMobile ? 2 : 0}
          onClick={() => handleClick(rowData?._id)}
        >
          View
        </Button>
      </Flex>
    </SimpleGrid>
  );
};
