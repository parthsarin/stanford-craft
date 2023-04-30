import { Outlet, useOutlet } from "react-router-dom";
import SelectQuiz from "./SelectQuiz";

const Analyze = () => {
  const outlet = useOutlet();

  return (
    <div className=" p-8">
      <h1 className="text-4xl font-bold mb-10">Analyze</h1>
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