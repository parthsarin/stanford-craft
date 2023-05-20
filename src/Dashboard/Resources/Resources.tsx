import { useState, useContext } from "react";
import { Resource, matchResource, filterResource, tagNames } from "./Resource";
import ResourceCard from "./ResourceCard/ResourceCard";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { MessageTopic, sendMessage } from "../Contact/ContactUtils";
import { UserContext } from "../../Auth";
import { MySwal } from "../../Generic/Notify";

const defaultResources = require("./resources.json") as Resource[];

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>(defaultResources);
  const [searchString, setSearchString] = useState("");
  const [selectedTags, setSelectedTags] = useState([""]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // tagCount with format {tagName: 0}
  const initTagCount: { [key: string]: number } = {};
  for (var i = 0; i < tagNames.length; i++) {
    initTagCount[tagNames[i]] = 0;
  }
  const [selectedTagsCount, setSelectedTagsCount] = useState({});

  const handleSearch = (search: string) => {
    let filteredResources = defaultResources.filter((resource) =>
      matchResource(resource, search)
    );
    filteredResources = filteredResources.filter((resource) =>
      filterResource(resource, selectedTags, selectedTagsCount)
    );
    setSearchString(search);
    setResources(filteredResources);
  };

  const handleFilter = (tags: string[], count: { [key: string]: number }) => {
    let filteredResources = defaultResources.filter((resource) =>
      filterResource(resource, tags, count)
    );
    filteredResources = filteredResources.filter((resource) =>
      matchResource(resource, searchString)
    );
    setSelectedTags(tags);
    setSelectedTagsCount(count);
    setResources(filteredResources);
  };

  return (
    <div className="flex-1 p-8">
      <h1 className="text-4xl font-bold mb-10">Resources</h1>
      <div
        className={`
        rounded border border-black bg-orange-200 mb-10 px-4 py-3
        flex flex-row space-x-4 items-center
        `}
      >
        <div className="flex-col hidden md:flex">
          <FontAwesomeIcon icon={faWarning} className="text-2xl" />
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">These resources are in progress</h2>
          <p className="text-lg">
            Many of these resources are currently being developed and more will
            be added soon. If you have any feedback or questions, you can reach
            out to the CRAFT team through our{" "}
            <button
              className="text-blue-500 hover:text-blue-700 hover:underline"
              onClick={() => navigate("/dash/contact")}
            >
              contact form
            </button>
            .
          </p>
        </div>
      </div>
      <div className="lg:flex p-0 gap-6">
        <div className="mb-6 lg:mb-0 lg:w-1/5 p-5 bg-violet-300 rounded-md">
          <h2 className="text-2xl font-bold mb-3">Search</h2>
          <SearchBar onUpdate={handleSearch} />

          <h2 className="text-2xl font-bold mt-3 mb-3">Filter</h2>
          <Filter onUpdate={handleFilter} />
        </div>

        {resources.length === 0 ? (
          <div className="lg:w-4/5">
            <h2 className="text-2xl font-bold mb-3">
              Not finding what you're looking for?
            </h2>
            <p className="text-lg">
              We're continuously adding more resources. Add your request using
              our{" "}
              <button
                className="text-blue-500 hover:text-blue-700 hover:underline"
                onClick={() => navigate("/dash/contact")}
              >
                contact form
              </button>{" "}
              or click this button to log your search query and we'll try to
              find a resource for you:
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-3"
              onClick={async () => {
                if (!user || !user.email) {
                  MySwal.fire({
                    icon: "info",
                    title: "Add more information?",
                    text: "Would you like to add your email address to your request?",
                    input: "email",
                    inputPlaceholder: "Email address",
                    showCancelButton: true,
                    confirmButtonText: "Yes, add my email",
                    cancelButtonText: "No, send it without my email",
                  })
                    .then((result) => {
                      if (result.isConfirmed) {
                        return result.value;
                      } else {
                        return null;
                      }
                    })
                    .then((email) => {
                      if (email) {
                        sendMessage(
                          user && user.displayName ? user.displayName : "",
                          email,
                          MessageTopic.Feature,
                          `This message was triggered by a resource search for "${searchString}", which didn't yield any results`,
                          () => {}
                        );
                      } else {
                        sendMessage(
                          user && user.displayName ? user.displayName : "",
                          "",
                          MessageTopic.Feature,
                          `This message was triggered by a resource search for "${searchString}", which didn't yield any results`,
                          () => {}
                        );
                      }
                    });
                  return;
                }

                sendMessage(
                  user && user.displayName ? user.displayName : "",
                  user && user.email ? user.email : "",
                  MessageTopic.Feature,
                  `This message was triggered by a resource search for "${searchString}", which didn't yield any results`,
                  () => {}
                );
              }}
            >
              I'd like a resource for "{searchString}"
            </button>
          </div>
        ) : (
          <div className="lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <ResourceCard
                key={i}
                resource={resource}
                data-tags={resource.tags}
              />
            ))}
          </div>
        )}
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Resources;
