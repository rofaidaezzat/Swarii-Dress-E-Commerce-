import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const InternetConnectionProvider = ({ children }: Props) => {
  const toast = useToast();
  const [isOnline, setIsOnline] = useState(true);
  const toastIdRef = useRef<string | number>(""); // أو 0

  useEffect(() => {
    if (!isOnline) {
      toastIdRef.current = toast({
        title: "No internet connection",
        description: "Please check your internet connection",
        status: "warning",
        duration: null,
        isClosable: true,
      });
    } else {
      toast.close(toastIdRef.current);
    }
  }, [isOnline]);

  const close = () => {
    toast.closeAll();
  };

  const addToast = () => {
    toastIdRef.current = toast({
      title: "No internet connection",
      description: "Please check your internet connection",
      status: "warning",
      duration: null,
      isClosable: true,
    });
  };

  const handleOnline = () => {
    setIsOnline(true);
    close();
  };

  const handleOffline = () => {
    setIsOnline(false);
    addToast();
  };

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{children}</>;
};

export default InternetConnectionProvider;
