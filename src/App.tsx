import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Router";
import { Toaster } from "react-hot-toast";
import CartDrawer from "./components/CartDrawer";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CartDrawer />
      <Toaster />
    </>
  );
}

export default App;
