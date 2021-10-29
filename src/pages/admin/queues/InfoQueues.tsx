import { useQuery } from "@apollo/client";
import { Input } from "@chakra-ui/input";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/modal";
import { Spinner, Flex, Text, Box } from "@chakra-ui/react";
import { Fragment } from "react";
import { FIND_QUEUE } from "./_apolloQueries";

const InfoQueues = (props: any) => {
  const { isOpen, onClose, selectedQueue } = props;

  const {
    data: Data,
    loading: Loading,
    error: QueryError,
  } = useQuery(FIND_QUEUE, {
    variables: {
      id: selectedQueue,
    },
  });

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {Loading ? (
          <Flex h="100vh" justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        ) : (
          <Fragment>
            <DrawerHeader textAlign="center">
              {Data?.queue?.number}
            </DrawerHeader>

            <DrawerBody>
              <Box my="2">
                <Text>Number</Text>
                <Input
                  disabled={true}
                  value={Data?.queue?.number}
                  color="blue"
                  fontWeight="bold"
                  fontSize="1.5rem"
                />
              </Box>

              <Box my="2">
                <Text>Counter</Text>
                <Input
                  disabled={true}
                  value={Data?.queue?.processedBy?.counterNumber}
                  color="blue"
                  fontWeight="bold"
                  fontSize="1.5rem"
                />
              </Box>

              <Box my="2">
                <Text>Person</Text>
                <Input
                  disabled={true}
                  value={Data?.queue?.person?.name}
                  color="blue"
                  fontWeight="bold"
                  fontSize="1.5rem"
                />
              </Box>
            </DrawerBody>

            {/* <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter> */}
          </Fragment>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default InfoQueues;
