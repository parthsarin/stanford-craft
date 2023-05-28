import "react-tippy/dist/tippy.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";

interface Props {
  path?: string;
  onClick?: () => void;
  text: string;
  children: React.ReactNode;
}

const SidebarButton = ({ path, onClick, text, children }: Props) => {
  const navigate = useNavigate();

  // set the active link
  const loc = useLocation();

  let activeClass = "";
  if (path && loc.pathname.startsWith(path) && path !== "/")
    activeClass = "bg-plum-light";
  else activeClass = "hover:bg-plum-light";

  // if there's a path, use it, otherwise use the onClick
  if (path) onClick = () => navigate(path);

  return (
    <li className="mb-0">
      {/* @ts-ignore */}
      <Tooltip
        title={text}
        position="right"
        trigger="mouseenter"
        arrow={true}
        theme="light"
        distance={15}
      >
        <button
          className={`w-full p-10 flex flex-row items-center ${activeClass} rounded`}
          onClick={onClick}
          aria-label={text}
        >
          {children}
        </button>
      </Tooltip>
    </li>
  );
};

export default SidebarButton;
