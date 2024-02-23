import { useContext } from "react";
import { UserContext } from "../../Auth";
import SendMessage from "./SendMessage/SendMessage";
import ViewMessages from "./ViewMessages";
import Loader from "../../Generic/Loader/Loader";
import usePageTracking from "../../Generic/usePageTracking";

const Contact = () => {
  const { user, loading } = useContext(UserContext);
  usePageTracking();
  if (loading) return <Loader />;
  if (user && user.admin) return <ViewMessages />;
  return <SendMessage />;
};
export default Contact;
