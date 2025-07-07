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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useGetDashboardProductQuery } from "../../../app/services/crudDresses";
import TableProductSkeleton from "./TableProductSkeleton";
import { Iproduct } from "../../../interfaces";

import DeleteDialog from "./DeleteDialog";

const TableProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, error, isLoading } = useGetDashboardProductQuery();

  if (isLoading) return <TableProductSkeleton />;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      <Table size="sm" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Thumbnail</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th isNumeric>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((product: Iproduct) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Td>
              <Td>{product.title}</Td>
              <Td>{product.description}</Td>
              <Td isNumeric>{product.price} EGP</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit"
                    icon={<Pencil size={16} />}
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => console.log("Edit", product.id)}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<Trash size={16} />}
                    variant="ghost"
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

      {isOpen && selectedId && (
        <DeleteDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          productId={selectedId}
        />
      )}
    </>
  );
};

export default TableProduct;
