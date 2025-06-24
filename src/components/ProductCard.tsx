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
import { Link as RouterLink } from "react-router-dom";

interface Iprops {
  title: string;
  description: string;
  price: number;
  URL: string;
}

const ProductCard = ({ title, description, price, URL }: Iprops) => {
  const { colorMode } = useColorMode();

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
          <Button
            as={RouterLink}
            to={`/products/${title}`}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
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
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
