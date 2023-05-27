interface Props {
  url?: string;
  children: React.ReactNode;
}

const Citation = ({ url, children }: Props) => (
  <li className="pl-6 -indent-6 mt-2">
    {children}{" "}
    {url && (
      <a
        className="text-digital-blue hover:text-digital-blue-dark hover:underline"
        rel="noreferrer"
        target="_blank"
        href={url}
      >
        {url}
      </a>
    )}
  </li>
);

export default Citation;
