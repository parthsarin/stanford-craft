import PromptyConsole from "./PromptyConsole/PromptyConsole";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Generic/Loader";
import { MySwal } from "../../../Generic/Notify";
import { useContext } from "react";
import { UserContext } from "../../../Auth";
import { signIn } from "../../../Auth";

function createUserPromptyInstance(joinCode, uid, displayName) {
  const db = getFirestore();
  let docRef = doc(db, "prompty", joinCode, "instances", uid);
  setDoc(docRef, { displayName: displayName }, { merge: true });
}

const PlayPrompty = () => {
  const { user, loading } = useContext(UserContext);
  const { joinCode } = useParams();
  const navigate = useNavigate();
  const [promptyData, setPromptyData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!joinCode) return;
    (async () => {
      const db = getFirestore();
      const docRef = doc(db, "prompty", joinCode);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data !== undefined) {
        setPromptyData(data);
        setPageLoading(false);
      } else {
        setError("Wrong Prompty Code!");
      }
    })();
  }, [joinCode]);

  useEffect(() => {
    if (!loading) {
      if (user === null) {
        MySwal.fire({
          title: "Please sign in to play Prompty!",
          backdrop: true,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: `Sign in with Google`,
          confirmButtonColor: "#4285f4",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            signIn().then(() => {});
          } else {
            navigate("/dash/prompty");
          }
        });
      }
      if (user) {
        createUserPromptyInstance(joinCode, user.uid, user.displayName);
      }
    }
  }, [joinCode, user, loading, navigate]);

  if (error) {
    MySwal.fire({
      title: "Error",
      text: error,
      icon: "error",
    }).then(() => navigate("/dash/prompty"));
    return null;
  }
  if (pageLoading || !joinCode || !promptyData || !user) return <Loader />;
  return (
    <>
      <PromptyConsole instanceCode={joinCode} identifier={user.uid} />
    </>
  );
};

export default PlayPrompty;
