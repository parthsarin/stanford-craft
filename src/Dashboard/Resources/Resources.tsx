import { useState, useContext } from "react";
import { Resource, matchResource, filterResource, tagNames } from "./Resource";
import ResourceCard from "./ResourceCard/ResourceCard";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { UserContext } from "../../Auth";
import { MySwal } from "../../Generic/Notify";
import {
  arrayUnion,
  doc,
  getFirestore,
  increment,
  setDoc,
} from "firebase/firestore";

import usePageTracking from "../../Generic/usePageTracking";

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

  const handleRequestResource = (name: string | null, email: string | null) => {
    // should we add personal information?
    let personalInfo = {};
    if (!name) name = user && user.displayName ? user.displayName : "";
    if (!email) email = user && user.email ? user.email : "";

    if (name || email) {
      personalInfo = {
        requestedBy: arrayUnion({ name, email }),
      };
    }

    // update the database
    const db = getFirestore();
    setDoc(
      doc(db, "requestResource", searchString),
      {
        numRequests: increment(1),
        ...personalInfo,
      },
      { merge: true }
    )
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Resource requested!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
        });
      })
      .catch((e) => {
        console.log(e);
        MySwal.fire({
          icon: "error",
          title: "Message failed to send",
          text: "Please try again later",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
        });
      });
  };

  usePageTracking();
  
  return (
    <div className="flex-1 p-20">
      <h1 className="mb-20 mt-0">Resources</h1>
      <div
        className={`
        rounded border border-black bg-poppy/40 text-black mb-20 px-20 py-15
        flex flex-row space-x-0 md:space-x-20 items-center
        `}
      >
        <div className="flex-col hidden md:flex">
          <FontAwesomeIcon icon={faWarning} className="type-4" />
        </div>
        <div className="flex flex-col">
          <h2 className="type-1 mb-0">These resources are in progress</h2>
          <p className="mb-0">
            Many of these resources are currently being developed and more will
            be added soon. If you have any feedback or questions, you can reach
            out to the CRAFT team through our{" "}
            <button
              className="btn-link"
              onClick={() => navigate("/dash/contact")}
            >
              contact form
            </button>
            .
          </p>
        </div>
      </div>
      <div className="lg:flex p-0 gap-lg mt-20">
        <div className="lg:w-1/5">
          <div className="sticky top-6">
            <div className="mb-12 lg:mb-0 p-20 bg-plum/40 rounded">
              <h2 className="type-2 mb-10">Search</h2>
              <SearchBar onUpdate={handleSearch} />

              <h2 className="type-2 mt-30 mb-10">Filter</h2>
              <Filter onUpdate={handleFilter} />
            </div>
          </div>
        </div>

        {resources.length === 0 ? (
          <div className="lg:w-4/5">
            <h2 className="type-1">Not finding what you're looking for?</h2>
            <p>
              We're continuously adding more resources. Add your request using
              our{" "}
              <button
                className="btn-link"
                onClick={() => navigate("/dash/contact")}
              >
                contact form
              </button>{" "}
              or click this button to log your search query and we'll try to
              find a resource for you:
            </p>
            <button
              className="button"
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
                    .then((email) => handleRequestResource(null, email));
                  return;
                }

                handleRequestResource(null, null);
              }}
            >
              I'd like a resource for "{searchString}"
            </button>
          </div>
        ) : (
          <div className="lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-lg">
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
