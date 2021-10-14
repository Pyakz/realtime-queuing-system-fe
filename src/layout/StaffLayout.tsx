import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { FiChevronDown, FiMoon, FiSun } from "react-icons/fi";
import { removeAuthToken } from "../utils/token";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";

const StaffLayout = (props: any) => {
  const { auth } = useAuth();
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Fragment>
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
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            // marginRight={3}
          />
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
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
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
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
