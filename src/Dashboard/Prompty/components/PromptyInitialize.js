import { MySwal } from "../../../Generic/Notify";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          navigate("/dash/prompty/" + value);
        } else {
          return "Invalid Code";
        }
      },
    });
  };

  return (
    <>
      <p>Experience and analyze prompting with Prompty</p>
      <button className="btn-digital-red mr-10" onClick={() => joinPrompty()}>
        <FontAwesomeIcon icon={faPlus} className="mr-10" />
        <span>Start Prompty</span>
      </button>
    </>
  );
};

export default PromptyInitialize;
