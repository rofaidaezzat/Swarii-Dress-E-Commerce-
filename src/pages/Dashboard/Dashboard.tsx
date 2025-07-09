import {
  Box,
  Flex,
  Text,
  Avatar,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Button,
  HStack,
  Badge,
  Tooltip,
  VStack,
  Divider,
} from "@chakra-ui/react";
import {
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiPlus,
  FiBarChart2,
  FiUserPlus,
  FiBell,
} from "react-icons/fi";

const Dashboard = () => {
  const bg = useColorModeValue("gray.50", "#181a20");
  const cardBg = useColorModeValue("white", "#23263a");
  const textMuted = useColorModeValue("gray.600", "gray.400");
  const text = useColorModeValue("gray.50", "gray.800");
  const tex = useColorModeValue("gray.100", "gray.700");

  return (
    <Box bg={bg} minH="100vh" p={[2, 4]}>
      {/* Header */}
      <Box mb={4} mt={2} textAlign={{ base: "center", md: "left" }}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="teal.300"
          letterSpacing="tight"
        >
          🛍️ Admin Dashboard - E-Commerce
        </Text>
        <Text mt={1} color={textMuted} fontSize="md">
          Manage your products, users, and orders all in one place.
        </Text>
      </Box>

      {/* Welcome Card */}
      <Flex
        bgGradient="linear(to-r, teal.500, blue.500)"
        p={6}
        borderRadius="xl"
        alignItems="center"
        color="white"
        boxShadow="lg"
        mb={10}
        direction={{ base: "column", sm: "row" }}
        gap={4}
      >
        <Avatar
          size="lg"
          name="Justina Clark"
          src="https://ui-avatars.com/api/?name=Justina+Clark"
          mr={{ base: 0, sm: 6 }}
          mb={{ base: 2, sm: 0 }}
        />
        <Box textAlign={{ base: "center", sm: "left" }}>
          <Text fontSize="xl" fontWeight="bold">
            Welcome, Justina Clark{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </Text>
          <Text fontSize="sm">You are logged in as Admin</Text>
        </Box>
      </Flex>

      {/* Statistics */}
      <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={8}>
        <StatCard
          icon={FiBox}
          value="120"
          label="Products"
          bgColor="teal.500"
        />
        <StatCard
          icon={FiUsers}
          value="45"
          label="Users"
          bgColor="purple.500"
        />
        <StatCard
          icon={FiShoppingCart}
          value="230"
          label="Orders"
          bgColor="orange.400"
        />
      </SimpleGrid>

      {/* Quick Actions Section */}
      <Box mb={10}>
        <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.200">
          Quick Actions
        </Text>
        <HStack spacing={4} flexWrap="wrap">
          <Tooltip label="Add a new product" hasArrow>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="teal"
              variant="solid"
              size="lg"
              boxShadow="md"
            >
              Add Product
            </Button>
          </Tooltip>
          <Tooltip label="View sales reports" hasArrow>
            <Button
              leftIcon={<FiBarChart2 />}
              colorScheme="blue"
              variant="outline"
              size="lg"
              boxShadow="md"
            >
              View Reports
            </Button>
          </Tooltip>
          <Tooltip label="Add a new user" hasArrow>
            <Button
              leftIcon={<FiUserPlus />}
              colorScheme="purple"
              variant="outline"
              size="lg"
              boxShadow="md"
            >
              Add User
            </Button>
          </Tooltip>
        </HStack>
      </Box>

      {/* Latest Orders Section */}
      <Box mt={10} mb={10}>
        <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.200">
          🧾 Latest Orders
        </Text>
        <Box bg={cardBg} borderRadius="lg" overflow="hidden" boxShadow="md">
          {/* Header Row */}
          <Flex
            p={4}
            bg={useColorModeValue("gray.100", "gray.700")}
            fontWeight="bold"
            fontSize="md"
            color={useColorModeValue("gray.700", "gray.200")}
          >
            <Box flex="1">Order ID</Box>
            <Box flex="2">Customer</Box>
            <Box flex="1">Amount</Box>
            <Box flex="1">Status</Box>
          </Flex>
          {/* Order Rows */}
          {[
            { id: "#1234", name: "Ahmed", total: "$350", status: "Completed" },
            { id: "#1235", name: "Sarah", total: "$150", status: "Pending" },
            {
              id: "#1236",
              name: "Mohamed",
              total: "$520",
              status: "Completed",
            },
          ].map((order) => (
            <Flex
              key={order.id}
              p={4}
              align="center"
              _hover={{ bg: { text } }}
              borderTop="1px solid"
              borderColor={tex}
              fontSize="md"
            >
              <Box flex="1">{order.id}</Box>
              <Box flex="2">{order.name}</Box>
              <Box flex="1">{order.total}</Box>
              <Box flex="1">
                <Badge
                  colorScheme={
                    order.status === "Completed" ? "green" : "yellow"
                  }
                  variant={order.status === "Completed" ? "solid" : "subtle"}
                  fontSize="0.9em"
                  px={3}
                  py={1}
                  borderRadius="md"
                >
                  {order.status}
                </Badge>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>

      {/* Recent Activity Section */}
      <Box mb={10}>
        <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.200">
          <Icon as={FiBell} mr={2} /> Recent Activity
        </Text>
        <Box bg={cardBg} borderRadius="lg" boxShadow="md" p={6}>
          <VStack
            align="stretch"
            spacing={4}
            divider={
              <Divider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <ActivityItem
              user="Justina Clark"
              action="added a new product"
              time="2 mins ago"
            />
            <ActivityItem
              user="Sarah"
              action="updated an order status"
              time="10 mins ago"
            />
            <ActivityItem
              user="Mohamed"
              action="created a new user account"
              time="1 hour ago"
            />
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

const StatCard = ({
  icon,
  value,
  label,
  bgColor,
}: {
  icon: any;
  value: string;
  label: string;
  bgColor: string;
}) => {
  return (
    <Box
      bg={useColorModeValue("white", "#23263a")}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      textAlign="center"
      transition="0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
    >
      <Flex
        w={12}
        h={12}
        mx="auto"
        align="center"
        justify="center"
        borderRadius="full"
        bg={bgColor}
        color="white"
        mb={4}
      >
        <Icon as={icon} boxSize={6} />
      </Flex>
      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
      <Text color="gray.400">{label}</Text>
    </Box>
  );
};

const ActivityItem = ({
  user,
  action,
  time,
}: {
  user: string;
  action: string;
  time: string;
}) => (
  <Flex align="center" justify="space-between">
    <Box>
      <Text as="span" fontWeight="bold" color="teal.400">
        {user}
      </Text>{" "}
      <Text as="span" color="gray.300">
        {action}
      </Text>
    </Box>
    <Text color="gray.500" fontSize="sm">
      {time}
    </Text>
  </Flex>
);

export default Dashboard;
