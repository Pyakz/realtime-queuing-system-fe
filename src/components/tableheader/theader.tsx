import {
  SimpleGrid,
  useColorModeValue,
  Flex,
  Checkbox,
  Text,
} from "@chakra-ui/react";

const THeader = ({ names }: any) => {
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
          {index === 0 && <Checkbox colorScheme="blue" mr="2" />}

          <Text fontSize="md" fontWeight="bold">
            {name}
          </Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default THeader;
