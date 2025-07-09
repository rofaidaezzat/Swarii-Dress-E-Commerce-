import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  IconButton,
  HStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormHelperText,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import {
  useGetDashboardProductQuery,
  useUpdateDashboardProductMutation,
} from "../../../app/services/crudDresses";
import TableProductSkeleton from "./TableProductSkeleton";
import { Iproduct } from "../../../interfaces";

import DeleteDialog from "./DeleteDialog";
import UpdateModal from "./UpdateModal";

const TableProduct = () => {
  const bg = useColorModeValue("white", "gray.800"); // ✅ فوق
  const hoverBg = useColorModeValue("gray.50", "gray.700"); // ✅ أضفتيه فوق
  const Bg = useColorModeValue("teal.100", "teal.900");
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Iproduct | null>(null);

  const { data, error, isLoading } = useGetDashboardProductQuery();
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateDashboardProductMutation();

  if (isLoading) return <TableProductSkeleton />;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      <Box w="100%" overflowX={{ base: "auto", md: "visible" }}>
        <Table
          size="md"
          variant="simple"
          colorScheme="teal"
          bg={bg}
          boxShadow="lg"
          borderRadius="lg"
          overflow="hidden"
        >
          <Thead bg={Bg}>
            <Tr>
              <Th fontSize="sm">Id</Th>
              <Th fontSize="sm">Thumbnail</Th>
              <Th fontSize="sm">Title</Th>
              <Th fontSize="sm">Description</Th>
              <Th fontSize="sm" isNumeric>
                Price
              </Th>
              <Th fontSize="sm">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((product: Iproduct) => (
              <Tr
                key={product.id}
                _hover={{
                  bg: { hoverBg },
                  transition: "0.2s",
                }}
              >
                <Td fontSize="sm" fontWeight="medium">
                  {product.id}
                </Td>
                <Td>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    boxSize="45px"
                    objectFit="cover"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                  />
                </Td>
                <Td fontSize="sm">{product.title}</Td>
                <Td fontSize="sm" maxW="250px" isTruncated>
                  {product.description}
                </Td>
                <Td fontSize="sm" isNumeric>
                  {product.price} EGP
                </Td>
                <Td>
                  <HStack spacing={1}>
                    <IconButton
                      aria-label="Edit"
                      icon={<Pencil size={16} />}
                      variant="solid"
                      size="sm"
                      colorScheme="blue"
                      onClick={() => {
                        setSelectedId(product.id);
                        setFormData(product);
                        setIsUpdateOpen(true);
                      }}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<Trash size={16} />}
                      variant="solid"
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        setSelectedId(product.id);
                        setIsOpen(true);
                      }}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {isOpen && selectedId && (
        <DeleteDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          productId={selectedId}
        />
      )}

      {isUpdateOpen && formData && (
        <UpdateModal
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          title="Update Product"
          txtOk="Update"
          txtcancel="Cancel"
        >
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <FormHelperText>Product title</FormHelperText>

            <FormLabel>Description</FormLabel>
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <FormHelperText>Product description</FormHelperText>

            <FormLabel>Thumbnail</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // Optional: preview image
                const reader = new FileReader();
                reader.onloadend = () => {
                  // Just for preview or temporary storage
                  setFormData((prev) => ({
                    ...prev!,
                    thumbnail: reader.result as string, // base64
                  }));
                };
                reader.readAsDataURL(file);
              }}
            />

            {formData.thumbnail && (
              <Image
                src={formData.thumbnail}
                alt="Preview"
                boxSize="100px"
                mt={2}
                objectFit="cover"
                borderRadius="md"
              />
            )}
            <FormHelperText>Upload product thumbnail</FormHelperText>

            <FormLabel>Price</FormLabel>
            <NumberInput
              min={0}
              value={formData.price}
              onChange={(valueString) =>
                setFormData({ ...formData, price: Number(valueString) })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Button
              mt={4}
              colorScheme="blue"
              isLoading={isUpdating}
              onClick={async () => {
                if (formData && selectedId) {
                  await updateProduct({
                    id: selectedId,
                    body: {
                      title: formData.title,
                      description: formData.description,
                      thumbnail: formData.thumbnail,
                      price: formData.price,
                    },
                  });

                  setIsUpdateOpen(false);
                }
              }}
            >
              Update
            </Button>
          </FormControl>
        </UpdateModal>
      )}
    </>
  );
};

export default TableProduct;
