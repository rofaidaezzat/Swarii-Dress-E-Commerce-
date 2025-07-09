import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Iprops {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  txtOk: string;
  txtcancel: string;
  title: string;
}

function UpdateModal({
  isOpen,
  onClose,
  children,
  txtOk,
  txtcancel,
  title,
}: Iprops) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {txtcancel}
          </Button>
          <Button variant="ghost">{txtOk}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateModal;
