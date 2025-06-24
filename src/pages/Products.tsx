import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import useCustomQuery from "../hooks/fetchdata";
import { Iproduct } from "../interfaces";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
//import { useNavigate, useParams } from "react-router-dom";
//import { useEffect } from "react";

const ProductsPage = () => {
  //const { id } = useParams();
  //   const navigate = useNavigate();
  /*------------ Fetch Data ------------ */
  const { data, isLoading } = useCustomQuery({
    queryKey: ["products"],
    url: `/products?populate=thumbnail`,
  });
  // ga back to product
  //const goBack = () => navigate(-1);
  //if i want to change title in the browser make it product store| product ${id} page
  //   useEffect(() => {
  //     document.title = `products store| product ${id} page`;
  //   }, []);
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

  /*------------ Render Products ------------ */
  const renderProduct = data?.map((product: Iproduct) => {
    const imageUrl = product.thumbnail?.formats?.thumbnail?.url
      ? `http://localhost:1337${product.thumbnail.formats.thumbnail.url}`
      : "https://via.placeholder.com/150";
    return (
      <ProductCard
        key={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        URL={imageUrl}
      />
    );
  });

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
