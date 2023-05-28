interface Props {
  url?: string;
  children: React.ReactNode;
}

const Citation = ({ url, children }: Props) => (
  <li className="pl-6 -indent-30 mt-2">
    {children}{" "}
    {url && (
      <a rel="noreferrer" target="_blank" href={url}>
        {url}
      </a>
    )}
  </li>
);

export default Citation;
