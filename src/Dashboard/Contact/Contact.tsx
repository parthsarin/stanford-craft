import { useContext } from "react";
import { UserContext } from "../../Auth";
import SendMessage from "./SendMessage/SendMessage";
import ViewMessages from "./ViewMessages";
import Loader from "../../Generic/Loader/Loader";

const Contact = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Loader />;
  if (user && user.admin) return <ViewMessages />;
  return <SendMessage />;
};
export default Contact;
