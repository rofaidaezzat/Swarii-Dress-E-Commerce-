import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { addtocart } from "../app/features/cartSlice";

interface Iprops {
  title: string;
  description: string;
  price: number;
  URL: string;
  id?: string | number;
  showAddToCart?: boolean;
}

const ProductCard = ({
  title,
  description,
  price,
  URL,
  id,
  showAddToCart,
}: Iprops) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const Addtocart = () => {
    dispatch(addtocart({ title, description, price, URL, id }));
  };
  return (
    <Card border={"1px solid white"} bg={"none"}>
      <CardBody>
        <Image
          src={URL}
          alt={title}
          borderRadius="50%"
          width={150}
          height={150}
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"}>
            {title}
          </Heading>
          <Text textAlign={"center"} fontSize={"md"}>
            {description}
          </Text>
          <Text color="purple.500" fontSize="2xl" textAlign={"center"}>
            ${price}
          </Text>
          {showAddToCart ? (
            <Button
              bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
              bgGradient="linear(to-r, teal.500, blue.500)"
              size={"xl"}
              variant="outline"
              border={"none"}
              py={5}
              overflow={"hidden"}
              w={"full"}
              _hover={{
                bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
                color: colorMode === "light" ? "white" : "#9f7aea",
                border: "transparent",
              }}
              mt={6}
              textTransform={"uppercase"}
              onClick={Addtocart}
            >
              ADD TO CART
            </Button>
          ) : (
            <Button
              as={RouterLink}
              to={id ? `/products/${id}` : "#"}
              bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
              bgGradient="linear(to-r, teal.500, blue.500)"
              size={"xl"}
              variant="outline"
              border={"none"}
              py={5}
              overflow={"hidden"}
              w={"full"}
              _hover={{
                // bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
                color: colorMode === "light" ? "white" : "#9f7aea",
                border: "transparent",
              }}
              mt={6}
              textTransform={"uppercase"}
            >
              View Details
            </Button>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
