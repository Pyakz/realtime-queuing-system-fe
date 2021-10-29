import { SimpleGrid, useColorModeValue, Flex, Text } from "@chakra-ui/react";

const TableHeader = ({ names }: any) => {
  const BG = useColorModeValue("white", "gray.700");
  const TextColor = useColorModeValue("gray.500", "gray.300");
  return (
    <SimpleGrid
      columns={[5, 5, 5]}
      spacing="15px"
      shadow="xs"
      rounded="sm"
      p={2}
      mx="1"
      bg={BG}
      color={TextColor}
    >
      {names.map((name: string, index: number) => (
        <Flex key={name}>
          {/* {index === 0 && <Checkbox colorScheme="blue" mr="2" />} */}

          <Text fontSize="md" fontWeight="bold" ml="2">
            {name}
          </Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default TableHeader;
