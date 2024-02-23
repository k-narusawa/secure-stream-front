import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Header from "~/components/common/Header";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
