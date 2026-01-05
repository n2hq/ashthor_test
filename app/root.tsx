import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import type { HeadersFunction, LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import { useEffect, useState } from "react";
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";
import { SliderProvider } from "./context/SliderContext";
import { AddPhotoDialogProvider } from "./context/AddPhotoDialogContext";
import { EditPhotoDialogProvider } from "./context/EditPhotoDialogContext";
import { AddVideoDialogProvider } from "./context/AddVideoDialogContext";
import { VideoSliderProvider } from "./context/VideoSliderContext";
import EditVideoDialog from "./routes/web/account/portfolio/business/videos/videos/EditVideoDialog";
import { EditVideoDialogProvider } from "./context/EditVideoDialogContext";
import { OnlineStatusProvider } from "./context/OnlineStatusContext";
import { OperationProvider } from "./context/OperationContext";
import { CustomNetworkError, isNetworkError, NetworkErrorBoundary } from "./components/utils/NetworkErrorBoundary";
import LoadingMessage from "./components/content/LoadingMessage";
import { WriteReviewAltProvider } from "./context/WriteReviewAltContext";
import { ShareDialogProvider } from "./context/ShareDialogContext";


export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];


export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    "Surrogate-Control": "no-store",
  };
};


export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation()
  const [hydrated, setHydrated] = useState(false);

  const error = useRouteError();



  const loading = navigation.state !== "idle" || !hydrated;


  useEffect(() => {
    if (loading) {
      setHydrated(true);
    }
  }, [loading]);

  if (isNetworkError(error) || error instanceof CustomNetworkError) {
    return <NetworkErrorBoundary />;
  }

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            {error.status} {error.statusText}
          </h1>
          <p className="mt-4 text-xl">{error.data}</p>
        </div>
      </div>
    );
  }

  useEffect(() => {


    NProgress.start()

    const holdWait = async () => {
      await new Promise((resolve) => setTimeout(resolve, 13000));
    }

    if (navigation) {
      if (navigation.state !== "loading") {
        NProgress.done();

      }
    }
  }, [navigation])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bycetlogo.png?v=3" type="image/png" />
        {
          import.meta.env.VITE_ENV === "prod" && (
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              crossOrigin="anonymous"
            ></script>
          )}
        <Meta />
        <Links />
      </head>
      <body>

        {loading && <LoadingMessage loading={loading} />}
        <NotificationProvider>
          <OperationProvider>
            <VideoSliderProvider>
              <SliderProvider>
                <EditVideoDialogProvider>
                  <EditPhotoDialogProvider>
                    <AddPhotoDialogProvider>
                      <AddVideoDialogProvider>
                        <AuthProvider>
                          <OnlineStatusProvider>
                            <WriteReviewAltProvider>
                              <ShareDialogProvider>
                                {children}
                              </ShareDialogProvider>
                            </WriteReviewAltProvider>

                          </OnlineStatusProvider>
                        </AuthProvider>
                      </AddVideoDialogProvider>
                    </AddPhotoDialogProvider>
                  </EditPhotoDialogProvider>
                </EditVideoDialogProvider>
              </SliderProvider>
            </VideoSliderProvider>
          </OperationProvider>
        </NotificationProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

