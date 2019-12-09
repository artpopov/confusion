import React from "react";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { Loading } from "./components/LoadingComponent";

const { persistor, store } = ConfigureStore();
persistor.purge();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

// var sharedBlacklist = [
//   /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
//   /website\/node_modules\/.*/,
//   /heapCapture\/bundle\.js/,
//   /.*\/__tests__\/.*/
// ];
