import { Flex, Spinner } from "@chakra-ui/react";

const CenterSpinner = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" p={1}>
      <Spinner />
    </Flex>
  );
};

export default CenterSpinner;
