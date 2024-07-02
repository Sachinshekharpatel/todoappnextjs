import { Provider } from "react-redux";
import store from "@/components/redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <h1>Header Todo</h1>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
