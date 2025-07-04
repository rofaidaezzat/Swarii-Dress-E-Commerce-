import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { onCloseCartDrawer, selectglobal } from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clearcart, selectcart } from "../app/features/cartSlice";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isOpenCartDrawer } = useSelector(selectglobal);
  const { CartProduct } = useSelector(selectcart);
  const onClose = () => dispatch(onCloseCartDrawer());
  const clearItem = () => dispatch(clearcart());
  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpenCartDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Shopping Cart</DrawerHeader>
        <DrawerBody>
          {CartProduct.length ? (
            CartProduct.map((item) => (
              <CartDrawerItem key={item.id} {...item} />
            ))
          ) : (
            <p>Cart is empty</p>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button
            variant="outline"
            colorScheme="red"
            mr={3}
            onClick={clearItem}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
