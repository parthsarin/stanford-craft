import { Outlet, useOutlet } from "react-router-dom";
import SelectQuiz from "./SelectQuiz";

const Analyze = () => {
  const outlet = useOutlet();

  return (
    <div className="p-4">
      <h1 className="text-2xl">Analyze</h1>
      <p className="text-lg italic">
        Analyze data generated with these resources or upload your own CSV file
      </p>
      {
        outlet
        ? <Outlet />
        : <SelectQuiz />
      }
    </div>
  ); 
}

export default Analyze;