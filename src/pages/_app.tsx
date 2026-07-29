import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import Toaster from "@components/ui/toast/toaster";
// import { ReactQueryDevtools } from "@tanstack/react-query/devtools";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";

import "@fontsource/satisfy";

// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/untitled-ui.css";
import "@styles/rc-drawer.css";
import { getDirection } from "@utils/get-direction";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function Noop({ children }: React.PropsWithChildren<{}>) {
  return <>{children}</>;
}

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = (Component as any).Layout || Noop;

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity duration-300">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xl font-bold text-black uppercase select-none animate-pulse">
              MAHARA
            </span>
            <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
      )}
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        <QueryClientProvider client={queryClientRef.current}>
          {/* @ts-ignore */}
          <HydrationBoundary state={pageProps.dehydratedState}>
            {/* @ts-ignore */}
            <ManagedUIContext>
              <Layout pageProps={pageProps}>
                <DefaultSeo />
                <Component {...pageProps} key={router.route} />
                <Toaster />
              </Layout>
              <ManagedModal />
              <ManagedDrawer />
            </ManagedUIContext>
          </HydrationBoundary>
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </AnimatePresence>
    </div>
  );
};

export default appWithTranslation(CustomApp);
