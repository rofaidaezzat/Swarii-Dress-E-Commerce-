import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // redux toolkit
  <Provider store={store}>
    {/* react query */}
    <QueryClientProvider client={queryClient}>
      {/* chakra ui */}
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </Provider>
);
