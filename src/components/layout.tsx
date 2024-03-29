import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Router, useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ApiClient from "../lib/apiClient";
import { useChoseWorkspace } from "../store/choseWorkspace";
import { useMe } from "../store/me";
import { useColorMode } from "../store/styles/color_mode";
import Spinner from "./parts/spinner";
import { Sidebar } from "./sidebar";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [me, setMe] = useRecoilState(useMe);
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  const choseWorkspace = useRecoilValue(useChoseWorkspace);
  const colorMode = useRecoilValue(useColorMode);
  const [redirecting, setRedirecting] = React.useState<boolean>(false);

  React.useEffect(() => {
    Router.events.on("routeChangeStart", () => setRedirecting(true));
    Router.events.on("routeChangeComplete", () => setRedirecting(false));
    Router.events.on("routeChangeError", () => setRedirecting(false));
    return () => {
      Router.events.off("routeChangeStart", () => setRedirecting(true));
      Router.events.off("routeChangeComplete", () => setRedirecting(false));
      Router.events.off("routeChangeError", () => setRedirecting(false));
    };
  });

  const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
  useIsomorphicLayoutEffect(() => {
    setIsDarkMode(colorMode === "dark");
  }, [colorMode]);

  React.useEffect(() => {
    const authExclusionPath = ["/sign-in"];
    const pathname = router.pathname;
    if (!authExclusionPath.includes(pathname)) {
      if (!me || me.id === null) {
        router.push("/sign-in");
      }
      authenticatedAccount();
    }
  }, []);

  const authenticatedAccount = () => {
    ApiClient(me.apiToken)
      .apiWorkspaceIdMeGet(choseWorkspace.workspaceId)
      .then((res) => {
        setMe(res.data);
      })
      .catch(() => {
        enqueueSnackbar("エラーが発生しました", { variant: "error" });
        router.push("/sign-in");
      });
  };

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: isDarkMode ? "dark" : "light" } })}>
      <CssBaseline />
      <Sidebar>{redirecting ? <Spinner /> : children}</Sidebar>
    </ThemeProvider>
  );
};

// @ts-ignore
export default Layout;
