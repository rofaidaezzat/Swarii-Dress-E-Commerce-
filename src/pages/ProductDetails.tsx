import { useParams, useNavigate } from "react-router-dom";
import useSupabaseQuery from "../hooks/fetchdata";
import { Iproduct } from "../interfaces";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { useEffect } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  // Fetch all products and filter by id
  const { data, isLoading, error } = useSupabaseQuery<Iproduct>({
    queryKey: ["products"],
    table: "Products",
  });

  useEffect(() => {
    document.title = `products store | product ${id} details`;
  }, [id]);

  if (isLoading) return <ProductCardSkeleton />;
  if (error || !data)
    return (
      <Box textAlign="center" mt={10}>
        <p>Product not found.</p>
        <Button mt={4} onClick={goBack}>
          Go Back
        </Button>
      </Box>
    );

  // Find the product by id (id from params is string)
  const product = data.find((p) => String(p.id) === String(id));
  if (!product)
    return (
      <Box textAlign="center" mt={10}>
        <p>Product not found.</p>
        <Button mt={4} onClick={goBack}>
          Go Back
        </Button>
      </Box>
    );

  const imageUrl = product.thumbnail || "https://via.placeholder.com/150";

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minH="80vh">
      <IconButton
        aria-label="Go back"
        icon={<ArrowBackIcon />}
        onClick={goBack}
        alignSelf="flex-start"
        mb={4}
        mt={4}
        size="lg"
        variant="ghost"
      />
      <ProductCard
        title={product.title}
        description={product.description}
        price={product.price}
        URL={imageUrl}
        id={product.id}
        showAddToCart={true}
      />
    </Box>
  );
};

export default ProductDetailsPage;
