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
import { useState } from "react";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  /*-----------Handler----------- */
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // لمنع إعادة تحميل الصفحة

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
    console.log(user);
    try {
      // 2-fulfilled(sucsses)optional
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      console.log(resData);
    } catch (error) {}
    if (status === 200) {
      toast.success("You will navigate to the Home page after 2 seconds ", {
        position: "bottom-center",
        duration: 1500,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
      //store jwt come from login in local storage
      localStorage.setItem("loggedInUser", JSON.stringify(resData));

      setTimeout(() => {
        location.replace("/");
      }, 2000);
    }
  };
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
