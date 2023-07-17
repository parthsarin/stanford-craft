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
  <div className="flex flex-col px-20 text-center bg-foggy-light">
    <div className="my-30">
      <FontAwesomeIcon
        icon={icon}
        size={"xl"}
        className={`rounded p-10 mt-4`}
      />
    </div>
    <div>
      <h3 className="type-1 mb-20">{title}</h3>
      {children}
    </div>
  </div>
);

export default IconBullet;
