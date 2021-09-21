import { Flex, useColorModeValue } from "@chakra-ui/react";

const FullScreenSpinner = () => {
  const BG = useColorModeValue("white", "white");
  return (
    <Flex
      color="white"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundColor: BG,
      }}
    >
      <span className="loader"></span>
    </Flex>
  );
};

export default FullScreenSpinner;
