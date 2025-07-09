import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Homepage from "../pages";
import ProductsPage from "../pages/Products";
import RootLayout from "../pages/Layout";
import LoginPage from "../pages/Login";
import ProductDetailsPage from "../pages/ProductDetails";

import ProtectedRoute from "../auth/ProtectedRoute";
import cookieService from "../services/cookieService";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Dashboard/Products";
const storageKey = "accessToken";
const accessToken = cookieService.get(storageKey);
const userData = accessToken ? jwtDecode(accessToken) : null;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={!!accessToken}
              redirectPath="/login"
              data={userData}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute
              isAllowed={!!accessToken}
              redirectPath="/login"
              data={userData}
            >
              <Products />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);
export default router;
