import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

const TableProductSkeleton = () => {
  const rows = new Array(5).fill(0); // 5 صفوف مؤقتة
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Table
      size="md"
      variant="simple"
      colorScheme="teal"
      bg={bg}
      boxShadow="lg"
      borderRadius="lg"
      overflow="hidden"
    >
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
        {rows.map((_, i) => (
          <Tr key={i}>
            <Td>
              <Skeleton height="10px" width="30px" />
            </Td>
            <Td>
              <SkeletonCircle size="10" />
            </Td>
            <Td>
              <Skeleton height="10px" width="80px" />
            </Td>
            <Td>
              <SkeletonText noOfLines={2} spacing="2" />
            </Td>
            <Td isNumeric>
              <Skeleton height="10px" width="40px" />
            </Td>
            <Td>
              <HStack spacing={2}>
                <Skeleton height="30px" width="30px" rounded="md" />
                <Skeleton height="30px" width="30px" rounded="md" />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableProductSkeleton;
