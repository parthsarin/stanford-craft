import { MySwal } from "../../../Generic/Notify";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

async function checkInstance(joinCode) {
  const db = getFirestore();
  const docRef = doc(db, "prompty", joinCode);
  const docSnap = await getDoc(docRef);
  let data = docSnap.data();
  console.log(data);
  if (data !== undefined) {
    return true;
  } else {
    return false;
  }
}

const PromptyInitialize = () => {
  const navigate = useNavigate();
  const joinPrompty = () => {
    MySwal.fire({
      title: "Join a game",
      input: "text",
      inputLabel: "Enter the game code",
      inputPlaceholder: "ABCDEF",
      inputAttributes: {
        autocapitalize: "on",
      },
      showCancelButton: true,
      confirmButtonText: "Join",
      showLoaderOnConfirm: true,
      inputValidator: async (value) => {
        let validator = await checkInstance(value);
        console.log(validator);
        if (validator === true) {
          localStorage.setItem("promptyGameCode", value);
          navigate("/dash/prompty/" + value);
        } else {
          return "Code Invalid!";
        }
      },
    });
  };

  return (
    <>
      <p>New Game</p>
      <button
        className="mt-5 bg-red-600 hover:bg-red-700 disabled:bg-red-400  text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          joinPrompty();
        }}
      >
        Start Prompty
      </button>
    </>
  );
};

export default PromptyInitialize;
