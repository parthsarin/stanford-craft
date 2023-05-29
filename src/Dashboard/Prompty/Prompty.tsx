import { ScrollRestoration } from "react-router-dom";
import PromptyInitialize from "./components/PromptyInitialize.js";

const Prompty = () => {
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
