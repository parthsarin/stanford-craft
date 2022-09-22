import { MoonLoader } from "react-spinners";

const Loader = () => (
  <div className="z-50 w-full h-full absolute top-0 left-0">
    <div className="flex justify-center items-center w-full h-full bg-white/50">
      <MoonLoader size={80} />
    </div>
  </div>
);

export default Loader;