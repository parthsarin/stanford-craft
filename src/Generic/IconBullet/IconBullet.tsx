import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

interface IconBulletProps {
  icon: FontAwesomeIconProps['icon'];
  title: string;
  color?: string;
  children: React.ReactNode;
}

const IconBullet = ({ icon, title, children, color }: IconBulletProps) => (
  <div className="flex flex-row mb-4">
    <div><FontAwesomeIcon icon={icon} size={'xl'} className={`rounded-lg p-3 ${color ? color : 'bg-emerald-300'}`} /></div>
    <div className="px-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  </div>
);

export default IconBullet;