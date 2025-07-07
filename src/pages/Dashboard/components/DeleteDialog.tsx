"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDeleteDashboardProductMutation } from "../../../app/services/crudDresses";

const DeleteDialog = ({ isOpen, onClose, productId }: {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}) => {
  const cancelRef = useRef(null);
  const [deleteProduct, { isLoading }] = useDeleteDashboardProductMutation();

  const handleDelete = async () => {
    await deleteProduct(productId);
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Deletion
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this item? This action cannot be undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              ml={3}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteDialog;
