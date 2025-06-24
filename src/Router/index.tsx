import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Homepage from "../pages";

import AboutusPage from "../pages/About";
import ProductsPage from "../pages/Products";
import RootLayout from "../pages/Layout";
import LoginPage from "../pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/aboutus" element={<AboutusPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </>
  )
);
export default router;
