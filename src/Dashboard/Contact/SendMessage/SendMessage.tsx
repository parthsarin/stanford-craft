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
  const [topic, setTopic] = useState<MessageTopic | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && user.displayName) setName(user.displayName);

    if (user && user.email) setEmail(user.email);
  }, [user]);

  const clearData = () => {
    setName(user && user.displayName ? user.displayName : "");
    setEmail(user && user.email ? user.email : "");
    setTopic(null);
    setMessage("");
  };

  return (
    <div className="p-20 w-full md:w-2/3">
      <h1 className="mb-0">Get in touch</h1>
      <p className="italic">Fill out this form to send us a message</p>

      <form
        className="flex flex-col items-start"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(name, email, topic, message, clearData);
        }}
      >
        <label htmlFor="name" className="mt-10 w-full font-bold">
          Name
        </label>

        <input
          type="text"
          name="name"
          id="name"
          className={`input w-full xl:w-3/4`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={Boolean(user && user.displayName)}
        />

        <label htmlFor="email" className="mt-10 w-full font-bold">
          Email
        </label>

        <input
          type="text"
          name="email"
          id="email"
          className={`input w-full xl:w-3/4 `}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={Boolean(user && user.email)}
        />

        <label htmlFor="messageType" className="mt-10 w-full font-bold">
          Topic
        </label>

        <Select
          id={"messageType"}
          className={`w-full xl:w-3/4 select-container`}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: "1.8rem",
              lineHeight: "1.3",
              borderRadius: 0,
              borderColor: "#6b7280",
              "&:hover": {
                borderColor: "#6b7280",
              },
            }),
          }}
          options={Object.values(MessageTopic).map((topic) => ({
            value: topic,
            label: topic,
          }))}
          onChange={(e) => {
            if (e) setTopic(e.value as MessageTopic);
          }}
          value={topic ? { value: topic, label: topic } : null}
        />

        <label htmlFor="message" className="mt-10 w-full font-bold">
          Message
        </label>

        <textarea
          name="message"
          id="message"
          className={`input w-full xl:w-3/4`}
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className={`button mt-20`} type="submit">
          <FontAwesomeIcon icon={faPaperPlane} className="mr-10" />
          <span>Send</span>
        </button>
      </form>
      <ScrollRestoration />
    </div>
  );
};
export default SendMessage;
