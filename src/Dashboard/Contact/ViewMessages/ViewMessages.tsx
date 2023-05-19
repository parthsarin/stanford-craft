import { useCallback, useContext, useEffect, useState } from "react";
import { Message } from "../ContactUtils";
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  endBefore,
  getDocs,
  getFirestore,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { UserContext } from "../../../Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NUM_PER_PAGE = 10;

const ViewMessages = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [firstVisible, setFirstVisible] =
    useState<QueryDocumentSnapshot | null>(null);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(
    null
  );
  const [page, setPage] = useState(1);

  const updateMessages = useCallback(
    async (q: Query<DocumentData>) => {
      const docs = await getDocs(q);
      setMessages(
        docs.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message))
      );
      setLastVisible(docs.docs[docs.docs.length - 1]);
      setFirstVisible(docs.docs[0]);
    },
    [setMessages, setLastVisible, setFirstVisible]
  );

  useEffect(() => {
    const db = getFirestore();

    updateMessages(
      query(
        collection(db, "messages"),
        where("visible", "==", true),
        orderBy("timestamp", "desc"),
        limit(NUM_PER_PAGE)
      )
    );
  }, [updateMessages]);

  const nextPage = () => {
    if (!lastVisible) return;

    const db = getFirestore();

    updateMessages(
      query(
        collection(db, "messages"),
        where("visible", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastVisible),
        limit(NUM_PER_PAGE)
      )
    );
    setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (!firstVisible) return;

    const db = getFirestore();

    updateMessages(
      query(
        collection(db, "messages"),
        where("visible", "==", true),
        orderBy("timestamp", "desc"),
        endBefore(firstVisible),
        limitToLast(NUM_PER_PAGE)
      )
    );
    setPage((p) => p - 1);
  };

  return (
    <div className="p-8 w-full md:w-2/3">
      <h1 className="text-4xl font-bold mb-10">Messages</h1>

      <table className="table-auto w-full">
        <thead className="uppercase bg-gray-100">
          <tr>
            <th></th>
            <th className="text-left px-6 py-3">Name</th>
            <th className="text-left px-6 py-3">Email</th>
            <th className="text-left px-6 py-3">Topic</th>
            <th className="text-left px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr
              key={message.id}
              className="bg-white border-b cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => navigate(`/dash/contact/view/${message.id}`)}
            >
              <td className="px-3 text-right text-xs">
                {user && !message.viewedBy.includes(user.uid) && (
                  <FontAwesomeIcon icon={faCircle} className="text-blue-600" />
                )}
              </td>
              <td className="px-6 py-4">{message.name}</td>
              <td className="px-6 py-4">{message.email}</td>
              <td className="px-6 py-4">{message.topic}</td>
              <td className="px-6 py-4">
                {message.timestamp.toDate().toLocaleString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-around items-center mt-3">
        <button
          className={`
            ${page === 1 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"} 
            text-white py-2 px-4 rounded
          `}
          onClick={prevPage}
          disabled={page === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          Previous
        </button>
        <p className="text-center">Page {page}</p>
        <button
          className={`
          ${
            messages.length < NUM_PER_PAGE
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-700"
          } 
          text-white py-2 px-4 rounded
          `}
          onClick={nextPage}
          disabled={messages.length < NUM_PER_PAGE}
        >
          Next
          <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ViewMessages;
