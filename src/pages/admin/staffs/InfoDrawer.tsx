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
import { Spinner, Flex, Avatar, Text, Box } from "@chakra-ui/react";
import { Fragment } from "react";
import { FIND_USER } from "./_apolloQueries";

const InfoDrawer = (props: any) => {
  const { isOpen, onClose, selectedStaff } = props;

  const {
    data: Data,
    loading: Loading,
    error: QueryError,
  } = useQuery(FIND_USER, {
    variables: {
      id: selectedStaff,
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
              {Data?.user?.username}
            </DrawerHeader>
            <Flex justifyContent="center" alignItems="center">
              <Avatar
                name={Data?.user?.username}
                // src="https://bit.ly/dan-abramov"
                size="lg"
              />
            </Flex>
            <DrawerBody>
              <Box my="2">
                <Text>Username</Text>
                <Input
                  placeholder={selectedStaff}
                  disabled={true}
                  value={Data?.user?.username}
                  color="blue"
                  fontWeight="bold"
                  fontSize="1.5rem"
                />
              </Box>

              <Box my="2">
                <Text>Counter</Text>
                <Input
                  placeholder={selectedStaff}
                  disabled={true}
                  value={Data?.user?.counterNumber}
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

export default InfoDrawer;
