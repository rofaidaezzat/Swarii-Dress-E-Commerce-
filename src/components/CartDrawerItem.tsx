import {
  Button,
  Divider,
  Flex,
  Image,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removefromcart } from "../app/features/cartSlice";

interface Iprops {
  id: string | number;
  thumbnail: string;
  title: string;
  quantity: number;
  price: number;
}

const CartDrawerItem = ({ id, thumbnail, title, quantity, price }: Iprops) => {
  const dispatch = useDispatch();
  const removeitem = () => {
    dispatch(removefromcart(id));
  };

  const bg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.200");

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        p={3}
        mb={3}
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
        rounded="md"
        boxShadow="sm"
      >
        <Image
          src={thumbnail}
          alt={title}
          boxSize="60px"
          objectFit="cover"
          rounded="md"
          mr={3}
          w="60px"
          h="60px"
        />
        <Box flex="1">
          <Text fontSize="sm" fontWeight="bold" color={textColor} noOfLines={1}>
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Price: ${price}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Quantity: {quantity}
          </Text>
        </Box>
        <Button
          size="xs"
          variant="outline"
          colorScheme="red"
          onClick={removeitem}
          ml={3}
        >
          Remove
        </Button>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
