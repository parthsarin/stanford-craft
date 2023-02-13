import "./ResourceCard.css";
import { Resource } from '../Resource';

interface Props {
  resource: Resource;
}

const ResourceCard = ({ resource }: Props) => {
  const { title, description, img, subLinks, tags } = resource;
  return (
    <div className="flex flex-col shadow-lg overflow-hidden rounded-md">
      <img className="w-full" src={img} alt="" />
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-700">{title}</h2>
        <p className="text-gray-700 text-sm">{description}</p>
        <ul className="list-disc ml-5 mt-2">
          {subLinks.map((subLink) => (
            <li key={subLink.url}>
              <a
                className="text-blue-500 hover:text-blue-700 hover:underline"
                href={subLink.url}
                target="_blank"
                rel="noreferrer"
              >
                {subLink.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1"></div>
      <div className="p-3">
        {
          tags.map((tag) => (
            <span key={tag} className="resource-tags">{tag}</span>
          ))
        }
      </div>
    </div>
  );
};

export default ResourceCard;