import { ChangeEvent } from "react";

interface Props {
  onChange: (checked: boolean) => void;
  checked?: boolean;
  label?: string;
}

const Switch = ({ onChange, checked, label }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    onChange(checked);
  };

  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={handleChange}
        />
        <div className="w-36 h-20 bg-black-30 rounded-full peer peer-focus:ring-4 peer-focus:ring-foggy-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-14 after:w-14 after:transition-all peer-checked:bg-digital-blue"></div>
        <span className="ml-6 relative bottom-2 text-black-90">
          <small>{label}</small>
        </span>
      </label>
    </>
  );
};

export { Switch };
