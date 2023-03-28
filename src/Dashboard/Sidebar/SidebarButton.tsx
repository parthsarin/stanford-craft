import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  path: string,
  text: string,
  expanded: boolean,
  children: React.ReactNode,
}

const SidebarButton = ({ path, text, children, expanded }: Props) => {
  const navigate = useNavigate();
  
  // set the active link
  const loc = useLocation();
  const getActiveClass = (path: string) => {
    if (loc.pathname.startsWith(path)) return "bg-violet-600";
    return "hover:bg-violet-600";
  };
  
  return (
    <li>
      <button
        className={`w-full p-2 flex flex-row items-center ${getActiveClass(path)} rounded`}
        onClick={() => navigate(path)}
      >
        {children}
        {expanded && <p className="text-lg">{text}</p>}
      </button>
    </li>
  );
}

export default SidebarButton;