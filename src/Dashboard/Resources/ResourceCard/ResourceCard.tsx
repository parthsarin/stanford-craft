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
    <div className="flex flex-col shadow-xl overflow-hidden rounded justify-start p-20 bg-white">
      <div className="p-3">
        <h2 className="type-1 font-bold">{title}</h2>
        <p className="text-black-70">{description}</p>
        <ul className="list-disc ml-5 mt-2 mb-20">
          {subLinks.map((subLink) => (
            <li key={subLink.url} className="m-0">
              <a href={subLink.url} target="_blank" rel="noreferrer">
                {subLink.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5">
        {allTags.map((tag) => (
          <span key={tag} className="resource-tags">
            {tag}
          </span>
        ))}
      </div>

      <img className="p-5 w-full h-64 object-cover mt-auto" src={img} alt="" />
    </div>
  );
};

export default ResourceCard;
