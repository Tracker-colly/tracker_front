import React, { useEffect, useState } from "react";

import Routerlist from "./router/Router";

import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-quill/dist/quill.snow.css";
import "swiper/css";
import "./css/animations.css";
import "./css/common.css";
import "./css/layout.css";

import { ToastContainer } from "react-toastify";
import { useLoading } from "./zustand/store";
import Loader from "./components/Loader";
import { Tooltip } from "react-tooltip";

function App() {
  const { isLoading } = useLoading();
  /* 빌드시 주석해제 */
  console = {};
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};

  return (
    <>
      <Routerlist />

      <ToastContainer
        position="bottom-center"
        theme="dark"
        autoClose={1500}
        closeOnClick={true}
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable
      />

      <Loader isLoading={isLoading} />
    </>
  );
}

export default App;
