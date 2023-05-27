import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Auth";
import { ScrollRestoration } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { MessageTopic, sendMessage } from "../ContactUtils";
import Select from "react-select";

const SendMessage = () => {
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<MessageTopic | "">("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && user.displayName) setName(user.displayName);

    if (user && user.email) setEmail(user.email);
  }, [user]);

  const clearData = () => {
    setName(user && user.displayName ? user.displayName : "");
    setEmail(user && user.email ? user.email : "");
    setTopic("");
    setMessage("");
  };

  return (
    <div className="p-8 w-full md:w-2/3">
      <h1 className="text-4xl font-bold mb-10">Get in touch</h1>
      <p className="type-1 italic">Fill out this form to send us a message</p>

      <form
        className="flex flex-col items-start"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(name, email, topic, message, clearData);
        }}
      >
        <label htmlFor="name" className="type-1 mt-5 w-full font-bold">
          Name
        </label>

        <input
          type="text"
          name="name"
          id="name"
          className={`
            border border-gray-500 rounded px-3 py-2 w-full
            xl:w-3/4 
          `}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={Boolean(user && user.displayName)}
        />

        <label htmlFor="email" className="type-1 mt-3 w-full font-bold">
          Email
        </label>

        <input
          type="text"
          name="email"
          id="email"
          className={`
            border border-gray-500 rounded px-3 py-2 w-full
            xl:w-3/4 
          `}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={Boolean(user && user.email)}
        />

        <label htmlFor="messageType" className="type-1 mt-3 w-full font-bold">
          Topic
        </label>

        <Select
          id={"messageType"}
          className={`w-full xl:w-3/4`}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: "black",
              fontSize: "1.125rem",
            }),
          }}
          options={Object.values(MessageTopic).map((topic) => ({
            value: topic,
            label: topic,
          }))}
          onChange={(e) => {
            if (e) setTopic(e.value as MessageTopic);
          }}
        />

        <label htmlFor="message" className="type-1 mt-3 mb-2 w-full font-bold">
          Message
        </label>

        <textarea
          name="message"
          id="message"
          className={`
            border border-gray-500 rounded px-3 py-2 w-full
            xl:w-3/4
          `}
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className={`
            border-teal-700 bg-teal-700 hover:bg-teal-800 text-white 
            text-xl py-2 px-6 rounded mt-5 mb-10
          `}
          type="submit"
        >
          <FontAwesomeIcon icon={faPaperPlane} /> Send
        </button>
      </form>
      <ScrollRestoration />
    </div>
  );
};
export default SendMessage;
