import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Text,
} from "@chakra-ui/react";

const PerPage = ({ perPage, setPerPage, data }: any) => {
  return (
    <Flex flexDirection="column">
      <NumberInput
        size="md"
        w="9rem"
        defaultValue={perPage}
        onChange={(valueString) => setPerPage(Number(valueString))}
        min={0}
      >
        <NumberInputField placeholder={`${perPage} rows`} rounded="sm" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text fontSize="sm" color="gray" ml="1">
        Showing {perPage === 0 ? data?.total : perPage} / {data?.total} row
      </Text>
    </Flex>
  );
};

export default PerPage;
