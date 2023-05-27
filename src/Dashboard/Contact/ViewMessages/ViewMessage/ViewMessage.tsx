import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from "../../ContactUtils";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { MySwal } from "../../../../Generic/Notify";
import Loader from "../../../../Generic/Loader/Loader";
import { UserContext } from "../../../../Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ViewMessage = () => {
  const { user } = useContext(UserContext);
  const { messageId } = useParams();
  const [message, setMessage] = useState<Message | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!messageId) return;
    if (!user) return;

    (async () => {
      const db = getFirestore();

      const docRef = doc(db, "messages", messageId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMessage({ id: docSnap.id, ...docSnap.data() } as Message);
        setDoc(docRef, { viewedBy: arrayUnion(user.uid) }, { merge: true });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Message not found",
          text: "The message you are looking for does not exist or has been deleted.",
          confirmButtonText: "Go back",
        }).then(() => navigate("/dash/contact"));
      }
    })();
  }, [messageId, user, navigate]);

  if (!message) return <Loader />;
  const dateString = message.timestamp.toDate().toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="p-8 w-full md:w-2/3">
      <h1 className="text-4xl font-bold mb-10">Message from {message.name}</h1>

      <div className="w-full type-1">
        <p>
          <b>From: </b>
          {message.name} ({message.email})
        </p>
        <p>
          <b>Subject: </b>
          {message.topic}
        </p>
        <p className="mb-5">
          <b>Date: </b>
          {dateString}
        </p>
        <pre className="whitespace-pre-wrap font-sans">{message.message}</pre>
      </div>

      <div className="flex flex-row flex-wrap justify-left space-x-4 mt-10">
        <button
          className="bg-teal-600 hover:bg-teal-800 text-white py-2 px-4 rounded"
          onClick={() => navigate("/dash/contact")}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-10" />
          Back
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={() => {
            MySwal.fire({
              icon: "warning",
              title: "Are you sure?",
              text: "You will not be able to recover this message!",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel",
            }).then((result) => {
              if (result.isConfirmed) {
                const db = getFirestore();
                const docRef = doc(db, "messages", message.id);
                setDoc(docRef, { visible: false }, { merge: true }).then(() =>
                  navigate("/dash/contact")
                );
              }
            });
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-10" />
          Delete
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => {
            // create a message variable that can be put in a url
            const msg = message.message.replace(/\n/g, "%0A");

            // open a mailto link with the subject re: {message.topic} and the body {message.message}
            window.open(
              `mailto:${message.email}?subject=Re: ${message.topic}&body=%0A%0A%0A—%0AFrom: ${message.name} (${message.email})%0ADate: ${dateString}%0A%0A${msg}`
            );
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-10" />
          Reply
        </button>
      </div>
    </div>
  );
};

export default ViewMessage;
