import { useContext } from "react";
import { UserContext } from "../../Auth";
import SendMessage from "./SendMessage/SendMessage";
import ViewMessages from "./ViewMessages";

const Contact = () => {
  const { user } = useContext(UserContext);

  if (user && user.admin) return <ViewMessages />;
  return <SendMessage />;
};
export default Contact;