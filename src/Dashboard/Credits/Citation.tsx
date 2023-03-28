interface Props {
  url?: string;
  children: React.ReactNode;
}

const Citation = ({ url, children }: Props) => (
  <li className="pl-6 -indent-6 mt-2">
    {children}{" "}
    {url && (<a
      className="text-blue-500 hover:text-blue-700 hover:underline"
      rel="noreferrer"
      target="_blank"
      href={url}
    >
      {url}
    </a>)}
  </li>
);

export default Citation;