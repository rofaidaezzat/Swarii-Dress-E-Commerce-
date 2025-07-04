import toast from "react-hot-toast";

export interface CartItemType {
  id: string | number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export const AddShippingToCart = (
  cartItem: Omit<CartItemType, "quantity">,
  shoppingCart: CartItemType[]
): CartItemType[] => {
  const existingCartItem = shoppingCart.find((item) => item.id === cartItem.id);
  if (existingCartItem) {
    toast.success(`${cartItem.title} added to cart`);
    return shoppingCart.map((item) =>
      item.id === cartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...shoppingCart, { ...cartItem, quantity: 1 }];
  }
};