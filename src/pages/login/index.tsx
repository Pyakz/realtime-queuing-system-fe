import { BsFillPersonFill, BsFillUnlockFill, BsLockFill } from "react-icons/bs";

import {
  Flex,
  Box,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Image,
  useMediaQuery,
  FormControl,
  FormErrorMessage,
  Text,
  Link,
  Icon,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./_apolloMutations";
import { setAuthToken } from "../../utils/token";
import { Redirect, Link as NavLink } from "react-router-dom";
import * as Yup from "yup";
import LOGO from "../../assets/img/LOGO.png";

const Login = () => {
  const toast = useToast();
  const [Mobile420] = useMediaQuery("(max-width: 420px)");
  const [show, setShow] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [SignIn, { loading: Loading }] = useMutation(LOGIN);

  const Sumbit = async (values: any) => {
    try {
      const { data: Data } = await SignIn({
        variables: {
          username: values.username.toLowerCase(),
          password: values.password.toLowerCase(),
        },
      });
      if (!Loading && Data) {
        if (Data.login.access_token) {
          await setAuthToken(Data.login.access_token);
          setAuthenticated(true);
        }
      }
    } catch (error: any) {
      if (!toast.isActive("active-toast")) {
        toast({
          id: "active-toast",
          title: error.message,
          description: "Please, try again.",
          status: "error",
          duration: 4000,
          isClosable: true,
          variant: "solid",
        });
      }
    }
  };

  const handleClick = () => setShow(!show);
  const loginInputSchema = Yup.object({
    username: Yup.string()
      .min(2, "Must be 3 characters or more")
      .required("Username is required"),
    password: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Password is required"),
  });

  const textColor = useColorModeValue("gray.500", "gray.500");
  const ButtonColor = useColorModeValue("blue.400", "blue.400");
  const BorderColor = useColorModeValue("gray.400", "gray.400");
  const BGColor = useColorModeValue("white", "white");

  return authenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear-gradient(312deg, rgba(80,175,230,1) 50%, rgba(255,255,255,1) 50%)"
    >
      <Box
        p={8}
        shadow="lg"
        borderRadius="md"
        bg={BGColor}
        style={{
          height: Mobile420 ? "100vh" : "auto",
          width: Mobile420 ? "100vw" : "auto",
        }}
      >
        <Stack spacing={5} align="center" width="100%">
          <Image
            objectFit="cover"
            boxSize="120px"
            src={LOGO}
            style={{ margin: Mobile420 ? "2.5rem 0" : "" }}
            alt="Queue Management System"
          />

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => Sumbit(values)}
            validationSchema={loginInputSchema}
          >
            {() => (
              <Form>
                <Field name="username">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                      width="100%"
                    >
                      <InputGroup size="lg">
                        <InputLeftElement
                          pointerEvents="none"
                          children={
                            <Icon as={BsFillPersonFill} color="gray.400" />
                          }
                        />
                        <Input
                          {...field}
                          id="username"
                          placeholder="Username"
                          _placeholder={{
                            color: textColor,
                          }}
                          focusBorderColor="gray.500"
                          borderColor={BorderColor}
                          color={textColor}
                          sx={{ borderWidth: "1.7px" }}
                          _hover={{
                            borderColor: "gray.500",
                          }}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      width="100%"
                      mt="1rem"
                    >
                      <InputGroup size="lg">
                        <InputLeftElement
                          pointerEvents="none"
                          children={
                            show ? (
                              <Icon as={BsFillUnlockFill} color="gray.400" />
                            ) : (
                              <Icon as={BsLockFill} color="gray.400" />
                            )
                          }
                        />
                        <Input
                          {...field}
                          id="password"
                          placeholder="Password"
                          _placeholder={{
                            color: textColor,
                          }}
                          focusBorderColor="gray.500"
                          borderColor={BorderColor}
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          color={textColor}
                          sx={{ borderWidth: "1.7px" }}
                          _hover={{
                            borderColor: "gray.500",
                          }}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleClick}
                            colorScheme="blue"
                            color="gray.100"
                            // _hover={{
                            //   bg: ButtonColor,
                            // }}
                          >
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt="1.2rem"
                  isLoading={Loading}
                  // colorScheme={}
                  bg={ButtonColor}
                  width="100%"
                  size="md"
                  type="submit"
                  color="white"
                  _hover={{
                    bg: "blue.700",
                  }}
                  // color="white"
                  // rightIcon={<MdArrowForward />}
                >
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
        </Stack>
        <Text fontSize="md" textAlign="center" mt="3" color="gray.500">
          Develop by:
          <Link
            color="teal.500"
            href="https://www.linkedin.com/in/banguismv/"
            target="_blank"
          >
            Mark Vergel Banguis
          </Link>
        </Text>

        <Flex mt="2" justifyContent="space-between">
          <Button
            to="pendings"
            target="_blank"
            rel="noopener noreferrer"
            bg={ButtonColor}
            _hover={{
              bg: "blue.700",
            }}
            mr="1"
            w="full"
            as={NavLink}
            color="white"
          >
            Pendings
          </Button>

          <Button
            target="_blank"
            rel="noopener noreferrer"
            to="counter"
            bg={ButtonColor}
            _hover={{
              bg: "blue.700",
            }}
            ml="1"
            w="full"
            as={NavLink}
            color="white"
          >
            Counter
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
