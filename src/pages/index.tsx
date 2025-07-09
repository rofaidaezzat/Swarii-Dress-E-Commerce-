"use client";

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { FiShoppingCart, FiUsers, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

// Wrappers
const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionVStack = motion(VStack);
const MotionImage = motion(Image);

export default function Homepage() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "#181a20")}
      minH="100vh"
      py={10}
      overflow="hidden"
    >
      <Container maxW={"7xl"}>
        {/* Hero Section */}
        <MotionStack
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "teal.400",
                  zIndex: -1,
                }}
              >
                Welcome to
              </Text>
              <br />
              <Text as={"span"} color={"teal.400"}>
                E-Commerce Platform
              </Text>
            </Heading>
            <Text
              color={useColorModeValue("gray.600", "gray.300")}
              fontSize={{ base: "md", md: "lg" }}
            >
              Manage your products, users, and orders with ease. Powerful tools
              for modern online stores.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"teal"}
                bg={"teal.400"}
                _hover={{ bg: "teal.500" }}
              >
                Get Started
              </Button>
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                leftIcon={<PlayIcon h={4} w={4} color={"gray.300"} />}
              >
                How It Works
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={-1}
              color={useColorModeValue("teal.50", "teal.700")}
            />
            <MotionBox
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              position={"relative"}
              height={"300px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <IconButton
                aria-label={"Play Button"}
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                icon={<PlayIcon w={12} h={12} />}
                size={"lg"}
                color={"white"}
                position={"absolute"}
                left={"50%"}
                top={"50%"}
                transform={"translateX(-50%) translateY(-50%)"}
              />
              <MotionImage
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={
                  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                }
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </MotionBox>
          </Flex>
        </MotionStack>

        {/* Features Section */}
        <Box mt={20}>
          <Heading
            as="h2"
            size="xl"
            mb={8}
            textAlign="center"
            color="teal.300"
            fontWeight={700}
          >
            Why Choose Our Platform?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <AnimatedFeatureCard
              icon={FiShoppingCart}
              title="Easy Product Management"
              description="Add, edit, and organize your products with a user-friendly interface."
            />
            <AnimatedFeatureCard
              icon={FiUsers}
              title="User & Order Control"
              description="Manage users and track orders efficiently with real-time updates."
            />
            <AnimatedFeatureCard
              icon={FiTrendingUp}
              title="Analytics & Growth"
              description="Get insights and analytics to help your business grow."
            />
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}

// Feature Card with Animation
const AnimatedFeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <MotionVStack
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    bg={useColorModeValue("white", "#23263a")}
    p={8}
    borderRadius="xl"
    boxShadow="lg"
    align="center"
    spacing={4}
    _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
  >
    <Flex
      w={16}
      h={16}
      align="center"
      justify="center"
      borderRadius="full"
      bgGradient="linear(to-br, teal.400, blue.400)"
      color="white"
      fontSize="2xl"
      mb={2}
    >
      <Icon as={icon} boxSize={8} />
    </Flex>
    <Text
      fontWeight="bold"
      fontSize="xl"
      color={useColorModeValue("teal.600", "teal.200")}
    >
      {title}
    </Text>
    <Text color={useColorModeValue("gray.600", "gray.300")}>{description}</Text>
  </MotionVStack>
);

// Blob and PlayIcon remain the same

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
