interface Props {
  url: string,
  name: string,
  children: React.ReactNode
}

const Funder = ({ url, name, children }: Props) => (
  <div
    className="flex flex-col rounded-md border border-black items-center justify-center p-4 cursor-pointer"
    aria-label={name}
    tabIndex={0}
    role="button"
    onClick={() =>
      window.open(url, "_blank")
    }
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        window.open(url, "_blank");
      }
    }}
  >
    {children}
  </div>
);

export default Funder;