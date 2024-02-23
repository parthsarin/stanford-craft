import { Outlet, ScrollRestoration, useOutlet } from "react-router-dom";
import SelectQuiz from "./SelectQuiz";
import usePageTracking from "../../Generic/usePageTracking";

const Analyze = () => {
  const outlet = useOutlet();
  usePageTracking();
  
  return (
    <div className="p-20">
      <h1 className="mb-10">Analyze</h1>
      <p>Analyze data generated with these resources</p>
      {outlet ? <Outlet /> : <SelectQuiz />}
      <ScrollRestoration />
    </div>
  );
};

export default Analyze;
