import { Fragment, useState } from "react";
import QrReader from "react-qr-reader";

import {
  Box,
  useToast,
  Button,
  Flex,
  Text,
  useMediaQuery,
  useColorModeValue,
  Input,
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
  const [delay, setDelay] = useState<number>(3000);
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [result, setResult] = useState<Scanned>({
    name: "",
    address: "",
    cellphoneNumber: "",
  });
  const [manual, setManual] = useState<boolean>();

  const history = useHistory();
  const [createQueue, { loading: Loading }] = useMutation(CREATE_QUEUE);
  let isNotEmpty = !isEmpty(result?.name) && !isEmpty(result?.address);

  const toast = useToast();

  const handleScan = (data: any) => {
    const scannedData = {
      name: data?.split("|")[0],
      address: `${data?.split("|")[1]}, ${data?.split("|")[2]?.split("@")[1]}`,
      cellphoneNumber: data?.split("|")[7],
    };
    if (!isEmpty(scannedData.name) && !isEmpty(data?.split("|")[1])) {
      setResult(scannedData);
      setDelay(3000);
      toast.closeAll();
    } else {
      // if (!toast.isActive("active-toast")) {
      //   toast({
      //     id: "active-toast",
      //     description: "Invalid QR Code",
      //     status: "warning",
      //     duration: 1000,
      //     isClosable: true,
      //     position: "top",
      //   });
      // }
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
        position: "top",
      });
    }
  };
  const handleScanner = async () => {
    if (!isNotEmpty) {
      if (!toast.isActive("active-toast")) {
        toast({
          id: "active-toast",
          description: "Invalid QR Code",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } else {
      await createQueue({
        variables: {
          body: {
            name: result?.name,
            address: result?.address,
            cellphoneNumber: result?.cellphoneNumber,
          },
        },
      });
      if (!Loading) {
        setResult({
          name: "",
          address: "",
          cellphoneNumber: "",
        });
        toast({
          description: "Queue, Sucessfuly created.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setManual(false);
      }
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

  const cancel = () => {
    setManual(false);
    setResult({
      name: "",
      address: "",
      cellphoneNumber: "",
    });
  };
  return (
    <Flex
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      h="100vh"
    >
      {!manual && !isNotEmpty ? (
        <QrReader
          delay={delay}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      ) : (
        <Box bg="red" height="100%" />
      )}

      <Box p={4}>
        <Input
          disabled={!manual}
          variant="outline"
          placeholder="Name"
          shadow="sm"
          focusBorderColor="cyan.400"
          value={result?.name}
          onChange={(e) => {
            setResult((prev: any) => {
              return { ...prev, name: e.target.value };
            });
          }}
          color="black"
        />
        <Input
          disabled={!manual}
          variant="outline"
          shadow="sm"
          focusBorderColor="cyan.400"
          placeholder="Address"
          value={result?.address}
          onChange={(e) => {
            setResult((prev: any) => {
              return { ...prev, address: e.target.value };
            });
          }}
          my="2"
          color="black"
        />
        <Input
          disabled={!manual}
          variant="outline"
          shadow="sm"
          focusBorderColor="cyan.400"
          placeholder="Cellphone #"
          value={result?.cellphoneNumber}
          onChange={(e) => {
            setResult((prev: any) => {
              return { ...prev, cellphoneNumber: e.target.value };
            });
          }}
          color="black"
        />
      </Box>

      <Flex
        w="full"
        justifyContent="center"
        alignItems="flex-end"
        p={2}
        h="100%"
      >
        {isNotEmpty ? (
          <Fragment>
            <Button
              onClick={cancel}
              colorScheme={colorClose}
              d="block"
              w="100%"
              mx="2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleScanner}
              colorScheme="green"
              isLoading={Loading}
              d="block"
              w="100%"
              mx="2"
            >
              Create
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              onClick={() => {
                setManual((prev) => !prev);
                setResult({
                  name: "",
                  address: "",
                  cellphoneNumber: "",
                });
              }}
              colorScheme={colorClose}
              d="block"
              w="100%"
              mx="2"
            >
              {manual ? "Scan" : "Manual"}
            </Button>
            <Button
              onClick={() => {
                removeAuthToken();
                history.push("/login");
              }}
              colorScheme="blue"
              d="block"
              w="100%"
              mx="2"
            >
              Logout
            </Button>
          </Fragment>
        )}
      </Flex>
    </Flex>
  );
};

export default Scanner;
