import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface IconBulletProps {
  icon: FontAwesomeIconProps["icon"];
  title: string;
  color?: string;
  children: React.ReactNode;
}

const IconBullet = ({ icon, title, children, color }: IconBulletProps) => (
  <div className="flex flex-row mb-12">
    <div>
      <FontAwesomeIcon
        icon={icon}
        size={"xl"}
        className={`rounded p-10 mt-4 ${color ? color : "bg-palo-verde-light"}`}
      />
    </div>
    <div className="ml-20">
      <h3 className="type-1 mb-0">{title}</h3>
      {children}
    </div>
  </div>
);

export default IconBullet;
