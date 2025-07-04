import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, selectLogin } from "../app/features/loginslice";
import toast from "react-hot-toast";
import cookieService from "../services/cookieService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const loginState = useSelector(selectLogin);
  const [toastShown, setToastShown] = useState(false);
  const navigate = useNavigate();
  /*-----------Handler----------- */
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.email && !user.password) {
      setEmail(true);
      setPassword(true);
      return;
    }
    if (!user.email) {
      setEmail(true);
    }
    if (!user.password) {
      setPassword(true);
    }
    setEmail(false);
    setPassword(false);
    setToastShown(false);
    dispatch(userLogin({ email: user.email, password: user.password }) as any);
  };
  useEffect(() => {
    if (loginState.data && !toastShown) {
      toast.success("Login successful!");
      setToastShown(true);
      console.log(cookieService.get("accessToken"));
      navigate("/");
      window.location.reload();
    }
    if (loginState.error && !toastShown) {
      toast.error(loginState.error);
      setToastShown(true);
      
    }
  }, [loginState.data, loginState.error, toastShown, navigate]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as={"form"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            {/* Email */}
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                isInvalid={email}
                type="email"
                value={user.email}
                onChange={onChangeHandler}
                name={"email"}
              />
              {email ? (
                <FormHelperText color={"red"}>Email is required</FormHelperText>
              ) : null}
            </FormControl>
            {/* Password */}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  isInvalid={password}
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={onChangeHandler}
                  name={"password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {password ? (
                <FormHelperText color={"red"}>
                  Password is required
                </FormHelperText>
              ) : null}
            </FormControl>
            {/* checkBox */}
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={email || password ? "red" : "blue.400"}
                color={"white"}
                _hover={{
                  bg: email || password ? "red.300" : "blue.600",
                }}
                type="submit"
                isLoading={loginState.loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
