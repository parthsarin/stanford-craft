import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";


const Resource = () => {
  const navigate = useNavigate();
  const { resourceID } = useParams();
  
  return (
	<div className="p-20 w-full md:w-2/3">
	  <h1 className="mb-20">Resource ID: {resourceID}</h1>
	  {resourceID}
	</div>
  );
};

export default Resource;
