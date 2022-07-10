import { AppProps } from "next/app";
import "../styles/global.css";

// Here you can import global styles, etc.
function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
