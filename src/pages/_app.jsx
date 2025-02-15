import "@/styles/globals.css";
import Footer from "../components/Landing/Footer";
import { StateProvider } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReducers";
import Navbar from "@/components/Landing/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Fiverr</title>
      </Head>
      <div className="relative flex flex-col h-auto justify-between">
        <Navbar />
      </div>
      <div className="mb-auto w-full mx-auto">
        <Component {...pageProps} />;
      </div>
      <Footer />
    </StateProvider>
  );
}
