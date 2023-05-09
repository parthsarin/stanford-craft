import { getFunctions, httpsCallable } from "firebase/functions";
import { useState } from "react";

async function apiCall(prompt) {
  const functions = getFunctions();
  const callOpenAi = httpsCallable(functions, "generateAiResponse");
  return await callOpenAi(prompt);
}

const PromptyGenerator = () => {
  let temp = { text: "" };
  const [res, setRes] = useState(temp);
  function generateFromAi(prompt) {
    setRes({ text: "Loading. Please wait..." });
    async function callOpenAi() {
      let res = await apiCall(prompt);
      return res;
    }
    callOpenAi().then((res) => {
      console.log(res);
      let obj = { text: res.data.response };
      setRes(obj);
    });
  }
  return (
    <>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-10">Prompty</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            generateFromAi("How to celebrate life?");
          }}
        >
          How to celebrate life?
        </button>
        <p className="text-lg italic">{res.text}</p>
      </div>
    </>
  );
};

export default PromptyGenerator;
