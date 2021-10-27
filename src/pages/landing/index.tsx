import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      bg="gray.200"
    >
      <Box className="landing" p="2" m="2">
        <Box
          className="landing_div1"
          p="4"
          bg="gray.100"
          shadow="sm"
          m="2"
          rounded="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link to="login">
            <Text fontSize="5xl" textAlign="center" fontWeight="bold">
              LOGIN
            </Text>
          </Link>
        </Box>
        <Box
          className="landing_div2"
          p="4"
          bg="gray.100"
          shadow="sm"
          m="2"
          rounded="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link to="counter">
            <Text fontSize="5xl" textAlign="center" fontWeight="bold">
              COUNTER
            </Text>
          </Link>
        </Box>
        <Box
          className="landing_div3"
          p="4"
          bg="gray.100"
          shadow="sm"
          m="2"
          rounded="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link to="pendings">
            <Text fontSize="5xl" textAlign="center" fontWeight="bold">
              PENDINGS
            </Text>
          </Link>
        </Box>
        <Box
          className="landing_div4"
          p="4"
          bg="gray.100"
          shadow="sm"
          m="2"
          rounded="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link to="scanner">
            <Text fontSize="5xl" textAlign="center" fontWeight="bold">
              SCANNER
            </Text>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default Landing;
