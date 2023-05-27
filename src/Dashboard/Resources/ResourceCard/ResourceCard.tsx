import "./ResourceCard.css";
import { Resource } from "../Resource";

interface Props {
  resource: Resource;
}

const ResourceCard = ({ resource }: Props) => {
  const { title, description, img, subLinks, tags } = resource;
  let allTags: string[] = [];
  for (const entry of Object.entries(tags)) {
    allTags = allTags.concat(entry[1]);
  }

  return (
    <div className="flex flex-col shadow-2xl overflow-hidden rounded-md justify-start p-4 bg-white">
      <div className="p-3">
        <h2 className="type-1 font-bold text-gray-700">{title}</h2>
        <p className="text-gray-700 type-0">{description}</p>
        <ul className="list-disc ml-5 mt-2">
          {subLinks.map((subLink) => (
            <li key={subLink.url}>
              <a
                className="text-digital-blue hover:text-digital-blue-dark hover:underline"
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
      <div className="p-3">
        {allTags.map((tag) => (
          <span key={tag} className="resource-tags">
            {tag}
          </span>
        ))}
      </div>

      <img className="p-5 w-full h-64 object-cover mt-auto " src={img} alt="" />
    </div>
  );
};

export default ResourceCard;
