import PromptyConsole from "./PromptyConsole/PromptyConsole";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Generic/Loader";
import { MySwal } from "../../../Generic/Notify";
import { useForm } from "react-hook-form";

const PlayPrompty = () => {
  const { joinCode } = useParams();
  const navigate = useNavigate();
  const [promptyData, setPromptyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nickname, setNickname] = useState("");
  const [identifier, setIdentifier] = useState("");

  const SetUser = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    let errorArr = Object.values(errors);
    function saveUser(data) {
      const db = getFirestore();
      let docRef = doc(db, "prompty", joinCode, "instances", data.email);
      setDoc(docRef, { nickname: data.name }, { merge: true });
      setNickname(data.name);
      setIdentifier(data.email);
    }
    return (
      <>
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-10">Prompty</h1>
          <form onSubmit={handleSubmit(saveUser)}>
            <label
              htmlFor="name"
              className="block mt-4 mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              className="block p-2.5 w-96 rounded border-solid border-2 border-gray-300"
              {...register("name", {
                required: { value: true, message: "Name not entered!" },
                maxLength: {
                  value: 80,
                  message: "Name should be less than 80 characters!",
                },
              })}
            />
            <label
              htmlFor="email"
              className="block mt-4 mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              className="block p-2.5 w-96 rounded border-solid border-2 border-gray-300"
              {...register("email", {
                required: { value: true, message: "Email not entered!" },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid Email Address",
                },
              })}
            />
            <ul className="list-disc list-outside ml-6 mt-2 text-red-500">
              {errorArr.map((error, i) => {
                return (
                  <>
                    <li key={i}>{error.message}</li>
                  </>
                );
              })}
            </ul>
            <input
              className="mt-5 bg-red-600 hover:bg-red-700 disabled:bg-red-400  text-white font-bold py-2 px-4 rounded"
              type="submit"
            />
          </form>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (!joinCode) return;
    (async () => {
      const db = getFirestore();
      const docRef = doc(db, "prompty", joinCode);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      console.log(data);
      if (data !== undefined) {
        setPromptyData(data);
        setLoading(false);
      } else {
        setError("Wrong Prompty Code!");
      }
    })();
  }, [joinCode]);
  if (error) {
    MySwal.fire({
      title: "Error",
      text: error,
      icon: "error",
    }).then(() => navigate("/dash/prompty"));
    return null;
  }
  if (loading || !joinCode || !promptyData) return <Loader />;
  return (
    <>
      {nickname === "" && identifier === "" ? (
        <SetUser />
      ) : (
        <PromptyConsole
          instanceCode={joinCode}
          identifier={identifier}
          instruction={promptyData.instruction}
          limit={promptyData.tryLimit}
          helpInstructions={promptyData.helpText}
        />
      )}
    </>
  );
};

export default PlayPrompty;
