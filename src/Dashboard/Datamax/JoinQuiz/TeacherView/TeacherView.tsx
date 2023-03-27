import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { MySwal } from "../../../../Generic/Notify";
import { QuizDoc, Response as QuizResponse } from "../../DatamaxTypes";

interface Params {
  joinCode: string;
  quiz: QuizDoc;
}

const TeacherView = ({ joinCode, quiz }: Params) => {
  const [responses, setResponses] = useState<{ [key: string]: QuizResponse }>({});

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "datamax-active", joinCode, "responses"));
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const id = change.doc.id;
        const type = change.type;
        const data = change.doc.data() as QuizResponse;

        if (type === "added" || type === "modified") {
          setResponses((prev) => ({ ...prev, [id]: data }));
        } else if (type === "removed") {
          setResponses((prev) => {
            delete prev[id];
            return { ...prev };
          });
        }
      });
    });

    return unsub;
  }, [joinCode]);

  const handleDelete = (id: string) => () => {
    MySwal.fire({
      title: "Are you sure?",
      text: `This will permanently delete ${responses[id].name}'s response from the database.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const db = getFirestore();
        const docRef = doc(db, "datamax-active", joinCode, "responses", id);
        deleteDoc(docRef);
      }
    })
  }

  return (
    <div className="p-4 w-full lg:w-2/3">
      <h1 className="text-2xl mb-4">{quiz.template.name}</h1>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col items-center p-4 border rounded rounded-md border-black">
          <QRCode value={window.location.href} />
          <h2 className="text-xl mt-2">Join Code: {joinCode}</h2>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <h2 className="text-xl mb-2">
          Responses ({Object.keys(responses).length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(responses).map(([id, response]) => (
            <div
              key={id}
              className="relative text-center items-center py-3 border rounded rounded-md border-black"
            >
              {/* delete button */}
              <button
                className="text-xl absolute right-0 top-0 -translate-y-3 translate-x-2"
                aria-label={"delete response"}
                onClick={handleDelete(id)}
              >
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="bg-white rounded-full"
                />
              </button>
              <h3 className="text-lg">{response.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherView;
