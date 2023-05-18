import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Auth";
import { ScrollRestoration } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

enum Topic {
  Bug = "Report a bug",
  Feature = "Request a feature",
  Media = "Media inquiry",
  Partnership = "Partnership inquiry",
  Other = "Other (please specify)"
}

const Contact = () => {
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<Topic | undefined>(undefined);
  const [message, setMessage] = useState("");


  useEffect(() => {
    if (user && user.displayName)
      setName(user.displayName);
    
    if (user && user.email)
      setEmail(user.email);
  }, [user]);

  return (
    <div className="p-8 w-full md:w-2/3">
      <h1 className="text-4xl font-bold mb-10">Get in touch</h1>
      <p className="text-lg italic">Fill out this form to send us a message</p>

      <form className="flex flex-col items-start">
        <label htmlFor="name" className="text-lg mt-5 w-full font-bold">
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

        <label htmlFor="email" className="text-lg mt-3 w-full font-bold">
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
          onChange={(e) => setName(e.target.value)}
          disabled={Boolean(user && user.email)}
        />

        <label htmlFor="messageType" className="text-lg mt-3 w-full font-bold">
          Topic
        </label>

        <select
          name="messageType"
          id="messageType"
          className={`
            border border-gray-500 rounded px-3 py-2 w-full
            xl:w-3/4
          `}
          value={topic}
          onChange={(e) => setTopic(e.target.value as Topic)}
        >
          <option value={undefined}></option>
          {Object.values(Topic).map((topic) => (
            <option value={topic} key={topic}>
              {topic}
            </option>
          ))}
        </select>

        <label htmlFor="message" className="text-lg mt-3 mb-2 w-full font-bold">
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
export default Contact;