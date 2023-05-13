import { MySwal } from "../../../Generic/Notify";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../Auth";
import { signIn } from "../../../Auth";

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
  const { user } = useContext(UserContext);

  const validateAndJoinPrompty = () => {
    if (user) {
      joinPrompty();
      return;
    }

    // otherwise, open a modal to sign in
    MySwal.fire({
      title: "Please sign in to continue",
      backdrop: true,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: `Sign in with Google`,
      confirmButtonColor: "#4285f4",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (!result.isConfirmed) return;
      signIn().then(() => joinPrompty());
    });
  };
  function createUserPromptyInstance(joinCode, uid, displayName) {
    const db = getFirestore();
    let docRef = doc(db, "prompty", joinCode, "instances", uid);
    setDoc(docRef, { displayName: displayName }, { merge: true });
  }
  const joinPrompty = () => {
    MySwal.fire({
      title: "Start Prompty",
      input: "text",
      inputLabel: "Enter the Prompty code",
      inputPlaceholder: "071295",
      inputAttributes: {
        autocapitalize: "on",
      },
      showCancelButton: true,
      confirmButtonText: "Join",
      showLoaderOnConfirm: true,
      inputValidator: async (value) => {
        let validator = await checkInstance(value);
        if (validator === true) {
          createUserPromptyInstance(value, user.uid, user.displayName);
          navigate("/dash/prompty/" + value);
        } else {
          return "Code Invalid!";
        }
      },
    });
  };

  return (
    <>
      <p>Experience and analyze prompting with Prompty!</p>
      <button
        className="mt-5 bg-red-600 hover:bg-red-700 disabled:bg-red-400  text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          validateAndJoinPrompty();
        }}
      >
        Start Prompty
      </button>
    </>
  );
};

export default PromptyInitialize;
