import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { removefromcart } from "../app/features/cartSlice";

interface Iprops {
  id: number;
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
  return (
    <>
      <Flex
        alignItems="center"
        mb={3}
        py={2}
        border={"1px solid white"}
        key={id}
      >
        <Image
          src={thumbnail}
          alt={title}
          w={"60px"}
          h={"60px"}
          rounded={"full"}
          objectFit={"cover"}
          mr={5}
        />
        <Stack>
          <Text fontSize={"sm"}>title: {title}</Text>
          <Text fontSize={"sm"} ml={3}>
            Price :${price}
          </Text>
          <Text fontSize={"sm"}>Quantity :{quantity}</Text>
          <Button
            size={"xs"}
            w="full"
            variant={"outline"}
            colorScheme={"red"}
            onClick={removeitem}
          >
            Remove
          </Button>
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
