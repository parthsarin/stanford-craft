import { useParams } from "react-router-dom";
import Loader from "../Generic/Loader";
import NoMatch from "../NoMatch";

const externalLinks = require('./externalLinks.json');

const ExternalLink = () => {
  const params = useParams();
  const id = params["*"];
  if (!id) return <NoMatch />;

  const link = externalLinks[id];
  if (link) {
    window.location.href = link;
    return <Loader />;
  }
  
  return <NoMatch />;
}

export default ExternalLink;