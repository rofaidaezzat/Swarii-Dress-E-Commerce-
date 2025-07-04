import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import useSupabaseQuery from "../hooks/fetchdata";
import { Iproduct } from "../interfaces";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ProductsPage = () => {
  const { id } = useParams();

  /*------------ Fetch Data ------------ */
  const { data, isLoading, error } = useSupabaseQuery<Iproduct>({
    queryKey: ["products"],
    table: "Products",
  });

  //if i want to change title in the browser make it product store| product ${id} page
  useEffect(() => {
    document.title = `products store| product ${id} page`;
  }, []);
  if (isLoading)
    return (
      <Grid
        margin={30}
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={6}
      >
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </Grid>
    );

  console.log("data:", data, "error:", error);

  /*------------ Render Products ------------ */
  const renderProduct = Array.isArray(data)
    ? data.map((product: Iproduct) => {
        const imageUrl = product.thumbnail || "https://via.placeholder.com/150";
        return (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            URL={imageUrl}
            id={product.id}
          />
        );
      })
    : null;

  return (
    <Grid
      margin={30}
      templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
      gap={6}
    >
      {renderProduct}
    </Grid>
  );
};

export default ProductsPage;
