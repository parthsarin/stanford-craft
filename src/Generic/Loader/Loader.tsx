import { MoonLoader } from "react-spinners";

const Loader = () => (
  <div className="z-50 w-full h-full fixed top-0 left-0 bg-white/50">
    <div className="flex justify-center items-center w-full h-full">
      <MoonLoader size={80} />
    </div>
  </div>
);

interface LoaderInlineProps {
  size?: number;
}
const LoaderInline = ({ size = 40 }: LoaderInlineProps) => (
  <div className="flex justify-center items-center w-full">
    <MoonLoader size={size} />
  </div>
)

export default Loader;
export { LoaderInline };