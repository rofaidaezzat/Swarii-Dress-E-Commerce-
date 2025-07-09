import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import InternetConnectionProvider from "./Provider/InternetConnectionProvider.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // react query
  <QueryClientProvider client={queryClient}>
    {/* redux toolkit */}
    <Provider store={store}>
      {/* if no internet connection */}
      <InternetConnectionProvider>
        {/* chakra ui */}
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </InternetConnectionProvider>
    </Provider>
  </QueryClientProvider>
);
