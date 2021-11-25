import { Fragment, useState, useEffect } from "react";
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
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useMutation } from "@apollo/client";
import { CREATE_QUEUE } from "./__apolloMutations";
import { removeAuthToken } from "../../../utils/token";
import { useHistory } from "react-router";
import Joyride, { Step, ACTIONS, EVENTS, STATUS } from "react-joyride";

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
  const [manual, setManual] = useState<boolean>(true);

  const history = useHistory();
  const [createQueue, { loading: Loading }] = useMutation(CREATE_QUEUE);
  let isNotEmpty = !isEmpty(result?.name) && !isEmpty(result?.address);

  const toast = useToast();

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [run, setRun] = useState<boolean>(false);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const scannerFirstTime = localStorage.getItem("scannerFirstTime");
  useEffect(() => {
    if (Boolean(scannerFirstTime) === false && isEmpty(scannerFirstTime)) {
      onOpen();
    }
  }, [scannerFirstTime, onOpen]);

  const steps: Step[] = [
    {
      target: ".scanner-step-1",
      content:
        "This is the QR Code scanner. You can scan the existing SSCT QR code for smoother experience or",
    },
    {
      target: ".scanner-step-2",
      content: "You can also input manually the entries.",
    },
    {
      target: ".scanner-step-3",
      content:
        "After scanning the information of the person will show here in this section.",
    },
    {
      target: ".scanner-step-4",
      content: "Lastly, the logout button.",
    },
  ];

  const handleJoyrideCallback = (data: any) => {
    const { action, index, status, type } = data;
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      localStorage.setItem("scannerFirstTime", "false");
      setRun(false);
    }
  };

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
      if (!toast.isActive("active-toast")) {
        toast({
          id: "active-toast",
          description: "Invalid QR Code",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      }
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
  const textColor = useColorModeValue("black", "white");
  const colorClose = useColorModeValue("orange", "gray");
  if (isLargerThan600) {
    return (
      <Flex
        p={3}
        justifyContent="center"
        alignItems="center"
        height="90vh"
        flexDirection="column"
      >
        <Text>Scanner is available only on Mobile Devices.</Text>
        <Button
          onClick={() => {
            removeAuthToken();
            history.push("/login");
          }}
          colorScheme="blue"
          m="2"
        >
          Logout
        </Button>
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
      <Modal
        blockScrollOnMount={false}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Walkthrough</ModalHeader>
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              It seems like this is your first time here. Do you want to have a
              walkthrough on our User Interface?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mx="2"
              onClick={() => {
                setRun(true);
                onClose();
              }}
            >
              Yes
            </Button>
            <Button
              variant="ghost"
              mx="2"
              onClick={() => {
                setRun(false);
                localStorage.setItem("scannerFirstTime", "false");
                onClose();
              }}
            >
              Skip
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Joyride
        steps={steps}
        stepIndex={stepIndex}
        run={run}
        continuous
        callback={handleJoyrideCallback}
        showProgress={true}
        showSkipButton
        floaterProps={{
          autoOpen: true,
        }}
        styles={{
          options: {
            arrowColor: "white",
            backgroundColor: "white",
            overlayColor: "rgba(0, 0, 0, 0.8)",
            primaryColor: "red",
            textColor: "gray",
            width: 400,
            zIndex: 1000,
          },
        }}
      />

      {!manual && !isNotEmpty ? (
        <QrReader
          delay={delay}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
          className="scanner-step-1"
        />
      ) : (
        <Box height="35%" />
      )}

      <Box p={4} className="scanner-step-3">
        <Input
          disabled={!manual && !isNotEmpty}
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
          color={textColor}
        />
        <Input
          disabled={!manual && !isNotEmpty}
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
          color={textColor}
        />
        <Input
          disabled={!manual && !isNotEmpty}
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
          color={textColor}
        />
      </Box>

      <Flex w="full" justifyContent="space-between" alignItems="flex-end" p={2}>
        {isNotEmpty ? (
          <Fragment>
            <Button onClick={cancel} colorScheme={colorClose} w="100%" mx="2">
              Cancel
            </Button>
            <Button
              onClick={handleScanner}
              colorScheme="green"
              isLoading={Loading}
              variant="solid"
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
              w="100%"
              mx="2"
              className="scanner-step-2"
            >
              {manual ? "Scan" : "Manual"}
            </Button>
            <Button
              onClick={() => {
                removeAuthToken();
                history.push("/login");
              }}
              colorScheme="blue"
              w="100%"
              mx="2"
              className="scanner-step-4"
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
