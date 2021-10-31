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
import moment from "moment";
import { Fragment } from "react";
import { FIND_PERSON } from "./_apolloQueries";

const InfoPersons = (props: any) => {
  const { isOpen, onClose, selectedPerson } = props;
  console.log(selectedPerson);
  const { data: Data, loading: Loading } = useQuery(FIND_PERSON, {
    variables: {
      id: selectedPerson,
    },
  });
  if (!Loading) {
    console.log(Data);
  }
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
            <DrawerHeader textAlign="center">{Data?.person?.name}</DrawerHeader>

            <DrawerBody>
              <Box my="2">
                <Text>Name</Text>
                <Input
                  disabled={true}
                  value={Data?.person?.name}
                  color="blue"
                  fontWeight="bold"
                  fontSize="1.5rem"
                />
              </Box>
              <Box my="2">
                <Text>Address</Text>
                <Input
                  disabled={true}
                  value={Data?.person?.address}
                  color="blue"
                  fontWeight="bold"
                  fontSize="1.5rem"
                />
              </Box>
              <Box my="2">
                <Text>Cellphone Number</Text>
                <Input
                  disabled={true}
                  value={Data?.person?.cellphoneNumber}
                  color="blue"
                  fontWeight="bold"
                  fontSize="1.5rem"
                />
              </Box>

              <Box my="2">
                <Text>Processed Date</Text>
                <Input
                  disabled={true}
                  value={moment(Data?.person?.processedAt).format(
                    "M/D/YYYY, h:mm a"
                  )}
                  color="blue"
                  fontWeight="bold"
                  fontSize="1.5rem"
                />
              </Box>

              {/* 
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
              </Box> */}
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

export default InfoPersons;
