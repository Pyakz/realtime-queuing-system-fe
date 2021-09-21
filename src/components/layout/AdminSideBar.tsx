import { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { FiMenu, FiSun, FiChevronDown, FiMoon } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Routes from "../../routes/routes";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { removeAuthToken } from "../../utils/token";

export default function AdminSideBar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { auth } = useAuth();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.700")}
      borderRight="1px"
      borderRightColor={useColorModeValue("white", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      shadow="sm"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Queue System
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {Routes.map(
        (link) =>
          link?.role?.includes(auth?.role || "") && (
            <NavItem key={link.name} icon={link.icon} path={link.path}>
              {link.name}
            </NavItem>
          )
      )}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string;
}
const NavItem = ({ path, icon, children }: NavItemProps) => {
  return (
    <NavLink
      to={path}
      style={{ textDecoration: "none" }}
      activeClassName="sidebar_active"
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        rounded="sm"
        // borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.600",
          color: "white",
          transition: ".3s",
        }}
        sx={{ my: 2 }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { auth } = useAuth();
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.700")}
      borderBottomColor={useColorModeValue("", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      shadow="sm"
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
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
        <Flex alignItems={"center"}>
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
        </Flex>
      </HStack>
    </Flex>
  );
};
