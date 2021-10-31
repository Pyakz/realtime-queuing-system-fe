import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
  Button,
  useColorMode,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Fragment, useState, useEffect } from "react";
import { FiChevronDown, FiMoon, FiSun } from "react-icons/fi";
import { removeAuthToken } from "../utils/token";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import Joyride, { Step, ACTIONS, EVENTS, STATUS } from "react-joyride";
import { isEmpty } from "lodash";

const StaffLayout = (props: any) => {
  const { auth } = useAuth();
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [run, setRun] = useState<boolean>(false);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const staffFirstTime = localStorage.getItem("staffFirstTime");
  useEffect(() => {
    if (Boolean(staffFirstTime) === false && isEmpty(staffFirstTime)) {
      onOpen();
    }
  }, [staffFirstTime, onOpen]);
  const steps: Step[] = [
    {
      target: ".step-1",
      content: "This is your current ticket/queue processing at the moment. ",
    },
    {
      target: ".step-2",
      content: "You can either cancel a ticket or",
    },
    {
      target: ".step-3",
      content: "if transaction is successful then proceed to the next ticket.",
    },
    {
      target: ".step-4",
      content: "You can also see your previous transaction and their statuses.",
    },
    {
      target: ".step-5",
      content:
        "You can also choose between dark and light mode for the UI theme.",
    },
    {
      target: ".step-6",
      content:
        "Last but not the least, you can click the avatar for signing out.",
    },
  ];
  const handleJoyrideCallback = (data: any) => {
    const { action, index, status, type } = data;
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      localStorage.setItem("staffFirstTime", "false");
      setRun(false);
    }
  };
  return (
    <Fragment>
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
                localStorage.setItem("staffFirstTime", "false");
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
      <Flex
        shadow="sm"
        justifyContent="space-between"
        alignItems="center"
        px="4"
      >
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Queue System
        </Text>

        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="md"
            sx={{ mr: "2" }}
            variant="solid"
            aria-label="open menu"
            onClick={toggleColorMode}
            className="step-5"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          />
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack className="step-6">
                <Avatar size={"sm"} src={"https://banguismv.me/img/Kobe.png"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text
                    fontSize="sm"
                    color={useColorModeValue("gray.600", "gray.100")}
                  >
                    {auth?.username || " "}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={useColorModeValue("gray.600", "gray.100")}
                  >
                    {auth?.role || " "}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.700")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem
                onClick={() => {
                  console.log("Logout");
                  removeAuthToken();
                  history.push("/");
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
      <Container maxW="container.xl">{props.children}</Container>
    </Fragment>
  );
};

export default StaffLayout;
