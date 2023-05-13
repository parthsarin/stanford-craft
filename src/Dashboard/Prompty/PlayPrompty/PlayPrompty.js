import PromptyConsole from "./PromptyConsole/PromptyConsole";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Generic/Loader";
import { MySwal } from "../../../Generic/Notify";
import { useContext } from "react";
import { UserContext } from "../../../Auth";

const PlayPrompty = () => {
  const { user } = useContext(UserContext);
  const { joinCode } = useParams();
  const navigate = useNavigate();
  const [promptyData, setPromptyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(user);
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
      <PromptyConsole
        instanceCode={joinCode}
        identifier={user.uid}
        instruction={promptyData.instruction}
        limit={promptyData.tryLimit}
        helpInstructions={promptyData.helpText}
      />
    </>
  );
};

export default PlayPrompty;
