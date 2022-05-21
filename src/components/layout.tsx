import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import * as React from "react";
import { useRecoilState } from "recoil";
import useAuthenticatedAccount from "../api/me";
import UserContext from "../context/userContext";
import { useColorMode } from "../store/styles/color_mode";
import Sidebar from "./sidebar";
import Spinner from "./spinner";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [colorMode, ] = useRecoilState(useColorMode);
  const [user, setUser] = useState<User | null>(null);
  const theme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  const { loading, error, response } = useAuthenticatedAccount();
  if (loading) return <Spinner />;

  const pathname = router.pathname;
  if (pathname !== "/signUp" && pathname !== "/signIn") {
    if (error) {
      router.push("/signIn");
      return <Spinner />;
    }
  }

  const userContextValue = {
    user: user,
    setUser: setUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      <ThemeProvider theme={theme}>
        <Sidebar>{children}</Sidebar>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

// @ts-ignore
export default Layout;
