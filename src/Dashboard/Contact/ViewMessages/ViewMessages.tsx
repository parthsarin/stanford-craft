import { useCallback, useContext, useEffect, useState } from "react";
import { Message } from "../ContactUtils";
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  endBefore,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserContext } from "../../../Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
  faEnvelope,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";

const NUM_PER_PAGE = 10;

const ViewMessages = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [numMessages, setNumMessages] = useState(0);
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

    // get the number of messages
    getCountFromServer(
      query(
        collection(db, "messages"),
        where("visible", "==", true),
        orderBy("timestamp", "desc")
      )
    )
      .then((snapshot) => snapshot.data().count)
      .then(setNumMessages);
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
    <div className="p-20 w-full md:w-2/3">
      <h1 className="mb-20">Messages</h1>

      <table className="table-auto w-full">
        <thead className="uppercase bg-black-10">
          <tr>
            <th></th>
            <th className="text-left px-20 py-10">Name</th>
            <th className="text-left px-20 py-10">Email</th>
            <th className="text-left px-20 py-10">Topic</th>
            <th className="text-left px-20 py-10">Date</th>
            <th className="text-left px-20 py-10"></th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr
              key={message.id}
              className="bg-white border-b cursor-pointer hover:bg-black-20 transition-colors"
              onClick={() => navigate(`/dash/contact/view/${message.id}`)}
            >
              <td className="px-3 text-right text-xs">
                {user && !message.viewedBy.includes(user.uid) && (
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-digital-blue"
                  />
                )}
              </td>
              <td className="px-20 py-10">{message.name}</td>
              <td className="px-20 py-10">{message.email}</td>
              <td className="px-20 py-10">{message.topic}</td>
              <td className="px-20 py-10">
                {message.timestamp.toDate().toLocaleString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-20 py-10">
                {user && message.viewedBy.includes(user.uid) && (
                  // @ts-ignore
                  <Tooltip
                    title="Mark as unread"
                    position="right"
                    trigger="mouseenter"
                    arrow={true}
                    theme="light"
                    distance={10}
                  >
                    <button
                      className="text-digital-blue type-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        const db = getFirestore();
                        updateDoc(doc(db, "messages", message.id), {
                          viewedBy: arrayRemove(user.uid),
                        });

                        setMessages((m) =>
                          m.map((msg) =>
                            msg.id === message.id
                              ? { ...msg, viewedBy: [] }
                              : msg
                          )
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </button>
                  </Tooltip>
                )}
                {user && !message.viewedBy.includes(user.uid) && (
                  // @ts-ignore
                  <Tooltip
                    title="Mark as read"
                    position="right"
                    trigger="mouseenter"
                    arrow={true}
                    theme="light"
                    distance={10}
                  >
                    <button
                      className="text-digital-blue type-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        const db = getFirestore();
                        updateDoc(doc(db, "messages", message.id), {
                          viewedBy: arrayUnion(user.uid),
                        });

                        setMessages((m) =>
                          m.map((msg) =>
                            msg.id === message.id
                              ? { ...msg, viewedBy: [user.uid] }
                              : msg
                          )
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faEnvelopeOpen} />
                    </button>
                  </Tooltip>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row justify-around items-center mt-10">
        <button
          className={`
            ${
              page === 1 &&
              "bg-black-40 hover:bg-black-40 hover:no-underline cursor-default"
            } 
            button
          `}
          onClick={prevPage}
          disabled={page === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-10" />
          Previous
        </button>
        <span className="text-center">
          Page {page} / {Math.ceil(numMessages / NUM_PER_PAGE)}
        </span>
        <button
          className={`
          ${page == Math.ceil(numMessages / NUM_PER_PAGE) ? "bg-black-40" : ""} 
          button
          `}
          onClick={nextPage}
          disabled={page == Math.ceil(numMessages / NUM_PER_PAGE)}
        >
          Next
          <FontAwesomeIcon icon={faChevronRight} className="ml-10" />
        </button>
      </div>
      <div className="flex flex-row justify-around items-center mt-20">
        <button
          className={`
            bg-digital-blue hover:bg-digital-blue-dark hover:underline
            text-white py-10 px-20
          `}
          onClick={() => {
            if (!user) return;
            const db = getFirestore();
            messages.forEach((message) => {
              updateDoc(doc(db, "messages", message.id), {
                viewedBy: arrayUnion(user.uid),
              });
            });

            setMessages((m) =>
              m.map((message) => ({
                ...message,
                viewedBy: [...message.viewedBy, user.uid],
              }))
            );
          }}
        >
          <FontAwesomeIcon icon={faEnvelopeOpen} className="mr-10" />
          Mark all as read
        </button>
        <button
          className={`
            bg-digital-blue hover:bg-digital-blue-dark hover:underline
            text-white py-10 px-20
          `}
          onClick={() => {
            if (!user) return;
            const db = getFirestore();
            messages.forEach((message) => {
              updateDoc(doc(db, "messages", message.id), {
                viewedBy: arrayRemove(user.uid),
              });
            });

            setMessages((m) =>
              m.map((message) => ({ ...message, viewedBy: [] }))
            );
          }}
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-10" />
          Mark all as unread
        </button>
      </div>
    </div>
  );
};

export default ViewMessages;
