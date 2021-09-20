import { Flex } from "@chakra-ui/react";

const FullScreenSpinner = () => {
  return (
    <Flex
      color="white"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <span className="loader"></span>
    </Flex>
  );
};

export default FullScreenSpinner;
