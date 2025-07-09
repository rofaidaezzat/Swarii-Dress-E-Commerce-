"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Image,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import cookieService from "../services/cookieService";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { selectcart } from "../app/features/cartSlice";
import { onOpenCartDrawer } from "../app/features/globalSlice";

const Links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Products", path: "/products" },
];

const NavLink = ({ name, path }: { name: string; path: string }) => {
  return (
    <Box
      as={Link}
      to={path}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {name}
    </Box>
  );
};

interface JwtPayload {
  email?: string;
  sub?: string;
  // أضف أي حقول أخرى متوقعة من التوكن
}

const storageKey = "accessToken";
const accessToken = cookieService.get(storageKey);
const userData = accessToken ? jwtDecode<JwtPayload>(accessToken) : null;

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { CartProduct } = useSelector(selectcart);
  const dispatch = useDispatch();
  const onOpenCart = () => dispatch(onOpenCartDrawer());
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* شعار الموقع */}
        <HStack spacing={8} alignItems={"center"}>
          <Link to="/">
            <Image
              src="/logo.png"
              alt="logo.png"
              w={"100px"}
              h={"80px"}
            />
          </Link>
          {/* زر القائمة للجوال */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            size="md"
          />
          {/* روابط الداشبورد تظهر فقط في الشاشات الكبيرة */}
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} name={link.name} path={link.path} />
            ))}
          </HStack>
        </HStack>

        {/* القائمة الجانبية */}
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Stack direction={"row"} spacing={7}>
            {/* زر تبديل وضع اللون */}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button onClick={onOpenCart}>Cart({CartProduct.length})</Button>
            {/* قائمة المستخدم أو زر تسجيل الدخول */}
            {userData ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://ui-avatars.com/api/?name=User"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://ui-avatars.com/api/?name=User"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{userData.email || userData.sub || "User"}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem
                    onClick={() => {
                      cookieService.remove(storageKey);
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Stack>
        </Flex>
      </Flex>
      {/* Drawer للروابط في الجوال */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            <Stack spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} name={link.name} path={link.path} />
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
