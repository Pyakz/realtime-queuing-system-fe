import { useState } from "react";
import QrReader from "react-qr-reader";

import {
  Box,
  useToast,
  Button,
  Flex,
  Text,
  useMediaQuery,
  useColorModeValue,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import { CREATE_QUEUE } from "./__apolloMutations";
import { removeAuthToken } from "../../../utils/token";
import { useHistory } from "react-router";

type Scanned = {
  name: string;
  address: string;
  cellphoneNumber: string;
};
const Scanner = () => {
  const [delay, setDelay] = useState<number>();
  const [isOpen, setOpen] = useState<boolean>();
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  const history = useHistory();
  const [createQueue, { loading: Loading }] = useMutation(CREATE_QUEUE);

  const [result, setResult] = useState<Scanned>();
  const toast = useToast();

  const handleScan = (data: any) => {
    const scannedData = {
      name: data?.split("|")[0],
      address: `${data?.split("|")[1]}, ${data?.split("|")[2]?.split("@")[1]}`,
      cellphoneNumber: data?.split("|")[7],
    };
    if (!isEmpty(scannedData.name) && !isEmpty(data?.split("|")[1])) {
      setOpen(true);
      setResult(scannedData);
      setDelay(3000);
    } else {
      setOpen(false);
    }
  };
  const handleError = (err: any) => {
    if (!toast.isActive("active-toast")) {
      toast({
        id: "active-toast",
        description: "Invalid QR Code",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const handleScanner = async () => {
    if (!result) {
      if (!toast.isActive("active-toast")) {
        toast({
          id: "active-toast",
          description: "Invalid QR Code",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      }
    } else {
      await createQueue({
        variables: {
          body: {
            name: result.name,
            address: result.address,
            cellphoneNumber: result.cellphoneNumber,
          },
        },
      });
    }

    if (!Loading) {
      setOpen(false);
      toast({
        description: "Queue, Sucessfuly created.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const colorClose = useColorModeValue("orange", "gray");
  if (isLargerThan600) {
    return (
      <Flex p={3} justifyContent="center" alignItems="center" height="90vh">
        <Text>Scanner is available only on Mobile Devices.</Text>
      </Flex>
    );
  }
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      {!isOpen && (
        <QrReader
          delay={delay}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "100%", marginTop: "3rem" }}
        />
      )}
      {isOpen ? (
        <Flex p={3} justifyContent="center" alignItems="center" height="50vh">
          <Box p={2}>
            <p>Name: {result?.name}</p>
            <p>Address: {result?.address}</p>
            <p>CP Number: {result?.cellphoneNumber}</p>
          </Box>
        </Flex>
      ) : (
        <Flex p={3} justifyContent="center">
          <Text>
            Invalid QR Code or Scanner. Please scan the code properly.
          </Text>
        </Flex>
      )}
      {isOpen ? (
        <Flex p={3} justifyContent="center">
          <Button
            onClick={() => setOpen(false)}
            colorScheme={colorClose}
            mx="2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleScanner}
            colorScheme="blue"
            mx="2"
            isLoading={Loading}
          >
            Create
          </Button>
        </Flex>
      ) : (
        <Flex w="100%" mt="8" justifyContent="center">
          <Button
            onClick={() => setOpen((prev) => !prev)}
            colorScheme={colorClose}
            m="3"
            rounded="full"
          >
            {isOpen ? "Open " : "Close "}
          </Button>
          <Button
            onClick={() => {
              removeAuthToken();
              history.push("/login");
            }}
            colorScheme="blue"
            m="3"
            rounded="full"
          >
            Logout
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Scanner;
