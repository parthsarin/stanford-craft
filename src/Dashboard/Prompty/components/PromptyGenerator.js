import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

async function apiCall(prompt) {
  const functions = getFunctions();
  const callOpenAi = httpsCallable(functions, "generateAiResponse");
  return await callOpenAi(prompt);
}

const PromptyGenerator = () => {
  let temp = { text: "Hello Hello" };
  const [res, setRes] = useState(temp);
  useEffect(() => {
    console.log("Effect;");
    setRes({ text: "Loaded" });
    async function fetchData() {
      let res = await apiCall("How to celebrate life?");
      console.log(res.data.response);
      let obj = { text: res.data.response };
      setRes(obj);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-10">Prompty</h1>
        <p className="text-lg italic">{res.text}</p>
      </div>
    </>
  );
};

export default PromptyGenerator;
