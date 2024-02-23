import { ScrollRestoration } from "react-router-dom";
import PromptyInitialize from "./components/PromptyInitialize.js";
import usePageTracking from "../../Generic/usePageTracking";

const Prompty = () => {
  usePageTracking();
  return (
    <>
      <div className="p-20">
        <h1 className="text-4xl font-bold mb-10">Prompty</h1>
        <PromptyInitialize />
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Prompty;
