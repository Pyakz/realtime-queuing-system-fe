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
} from "@chakra-ui/react";
import moment from "moment";
import CenterSpinner from "../../../components/common/CenterSpinner";

const QueuesTable = ({ data }: any) => {
  let UI;
  const [isMobile] = useMediaQuery("(max-width: 599px)");

  if (!data) {
    UI = <CenterSpinner />;
  }
  if (data && data?.totalFiltered !== 0) {
    UI = data?.results?.map((rowData: any) => <Row rowData={rowData} />);
  }
  if (data && data?.totalFiltered === 0) {
    UI = <h1>No Data Found</h1>;
  }
  return (
    <Box pb={5} p={1}>
      {!isMobile && <THeaders />}
      <Box
        height={isMobile ? "auto" : "70vh"}
        overflowY={isMobile ? "auto" : "scroll"}
        p={1}
      >
        {UI}
      </Box>
    </Box>
  );
};

export default QueuesTable;

export const THeaders = () => {
  const BG = useColorModeValue("white", "gray.700");
  const TextColor = useColorModeValue("gray.500", "gray.300");

  return (
    <SimpleGrid
      columns={[1, 2, 5]}
      spacing="15px"
      shadow="xs"
      rounded="sm"
      p={2}
      bg={BG}
      color={TextColor}
      mb="2"
    >
      <Flex px={1}>
        <Text fontSize="md" fontWeight="bold">
          Number
        </Text>
      </Flex>
      <Flex px={1}>
        <Text fontSize="md" fontWeight="bold">
          Created
        </Text>
      </Flex>
      <Flex px={1}>
        <Text fontSize="md" fontWeight="bold">
          Status
        </Text>
      </Flex>
      <Flex px={1}>
        <Text fontSize="md" fontWeight="bold">
          Processed At
        </Text>
      </Flex>
    </SimpleGrid>
  );
};
export const Row = ({ rowData }: any) => {
  const [isMobile] = useMediaQuery("(max-width: 699px)");
  const BG = useColorModeValue("white", "gray.700");
  return (
    <SimpleGrid
      columns={[1, 2, 5]}
      spacing="1.5rem"
      shadow="xs"
      rounded="sm"
      bg={BG}
      p={2}
      my="2"
      pl={isMobile ? "3" : "0"}
    >
      <Flex alignItems="center" justifyContent="start">
        <Checkbox colorScheme="blue" mx="2" />
        <Text fontSize="xl" fontStyle="bold">
          {isMobile && "Number: "} {rowData?.number}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="start">
        <Text fontSize="md" ml={isMobile ? "1" : "0"}>
          {isMobile && "Created: "}
          {moment(rowData?.createdAt).format("MMM D YYYY, h:mm:ss a")}
        </Text>
      </Flex>

      <Flex alignItems="center" justifyContent="start">
        {isMobile && (
          <Text fontSize="md" ml={isMobile ? "1" : "0"}>
            Status:
          </Text>
        )}
        <Tag
          variant="solid"
          colorScheme="green"
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
          {isMobile && "Processed At: "}
          {rowData?.processedBy?.counterNumber}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="start"
        my={isMobile ? 2 : 0}
        flexDirection={isMobile ? "column" : "row"}
      >
        <Button
          mx="1"
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          onClick={() => alert(rowData?._id)}
          size="sm"
          my={isMobile ? 2 : 0}
          w={isMobile ? "100%" : "100%"}
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
          w={isMobile ? "100%" : "100%"}
        >
          View
        </Button>
      </Flex>
    </SimpleGrid>
  );
};
