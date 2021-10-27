import React, { useState } from "react";
import QrReader from "react-qr-reader";

import { Box, useToast, Button, Flex, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import { CREATE_QUEUE } from "./__apolloMutations";

type Scanned = {
  name: string;
  address: string;
  cellphoneNumber: string;
};
const Scanner = () => {
  const [delay, setDelay] = useState<number>();
  const [isValid, setIsValid] = useState<boolean>();

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
      setIsValid(true);
      setResult(scannedData);
      setDelay(3000);
    } else {
      setIsValid(false);
    }
  };
  const handleError = (err: any) => {
    console.error(err);
  };

  const handleScanner = async () => {
    if (!result) {
      toast({
        title: "Error, Something Happened.",
        description: "QR is invalid",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });
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
      setIsValid(false);
      toast({
        description: "Queue, Sucessfuly created.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <div style={{ height: "70vh" }}>
      {!isValid && (
        <QrReader
          delay={delay}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "100%" }}
        />
      )}

      {isValid ? (
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
      {isValid && (
        <Flex p={3} justifyContent="center">
          <Button onClick={() => setIsValid(false)} colorScheme="red" mx="2">
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
      )}
    </div>
  );
};

export default Scanner;
