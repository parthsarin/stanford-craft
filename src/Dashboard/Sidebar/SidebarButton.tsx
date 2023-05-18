import "react-tippy/dist/tippy.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";

interface Props {
  path?: string,
  onClick?: () => void,
  text: string,
  children: React.ReactNode,
}

const SidebarButton = ({ path, onClick, text, children }: Props) => {
  const navigate = useNavigate();
  
  // set the active link
  const loc = useLocation();

  let activeClass = "";
  if (path && loc.pathname.startsWith(path) && path !== "/")
    activeClass = "bg-violet-600";
  else 
    activeClass = "hover:bg-violet-600";

  // if there's a path, use it, otherwise use the onClick
  if (path) onClick = () => navigate(path);
  
  return (
    <li>
      {/* @ts-ignore */}
      <Tooltip
        title={text}
        position="right"
        trigger="mouseenter"
        arrow={true}
        theme="light"
        distance={10}
      >
        <button
          className={`w-full p-2 flex flex-row items-center ${activeClass} rounded`}
          onClick={onClick}
          aria-label={text}
        >
          {children}
        </button>
      </Tooltip>
    </li>
  );
}

export default SidebarButton;
