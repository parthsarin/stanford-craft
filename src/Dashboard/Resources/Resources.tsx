import { useState } from "react";
import { Resource, matchResource } from "./Resource";
import ResourceCard from "./ResourceCard/ResourceCard";
import SearchBar from "./SearchBar";

const defaultResources: Resource[] = [
  {
    title: "Squid Model",
    description: "A model for understanding AI",
    img: require("../../img/resources/squid-model.png"),
    subLinks: [
      {
        url: "https://www.npr.org/transcripts/660168325",
        name: "Podcast",
      },
      {
        url: "https://docs.google.com/presentation/d/1nXczmIFcxCLnscFAj_XQyjbDm2Ze9qZ66kwsDRXNLmQ/edit#slide=id.p",
        name: "Worksheet",
      },
      {
        url: "https://docs.google.com/document/d/17wKvHiUO0tWavwE5N8esn1GZEWfJTpoo7NxVcRpMOds/edit#bookmark=id.uek0uo6wl3z5",
        name: "Curriculum",
      },
    ],
    tags: ["Unit 2", "podcast", "worksheet"],
  },
  {
    title: "Consensual Doxxing",
    description:
      'Explore the question "What data is available about me online?" with consensual doxxing. Watch TikTok creator @notkahnjunior explain how she found how old someone was by Googling about them and since then, people have been asking her to find their birthdays. In this activity, students will explore how she does that.',
    img: require("../../img/resources/doxxing.png"),
    subLinks: [
      {
        url: "/link/u2l3/cdoxx-intro.mp4",
        name: "Video",
      },
      {
        url: "https://docs.google.com/presentation/d/1-nTWaRxu5CcavXLECDQ9h9xsjzBoe4SvNnRhreQkkAU/edit",
        name: "Worksheet",
      },
      {
        url: "https://docs.google.com/document/d/17wKvHiUO0tWavwE5N8esn1GZEWfJTpoo7NxVcRpMOds/edit#bookmark=id.waii72s3q7a4",
        name: "Curriculum",
      },
    ],
    tags: ["Unit 2", "video", "worksheet", "guided exploration"],
  },
  {
    title: "2022 Internet Health Report",
    description: "Description of the Internet Health Report",
    img: require("../../img/resources/internet-health.png"),
    subLinks: [
      {
        url: "https://2022.internethealthreport.org/facts/",
        name: "Reading",
      },
      {
        url: "https://docs.google.com/presentation/d/1-nTWaRxu5CcavXLECDQ9h9xsjzBoe4SvNnRhreQkkAU/edit",
        name: "Worksheet",
      },
      {
        url: "https://docs.google.com/document/d/17wKvHiUO0tWavwE5N8esn1GZEWfJTpoo7NxVcRpMOds/edit#bookmark=id.uek0uo6wl3z5",
        name: "Curriculum",
      },
    ],
    tags: ["Unit 2", "reading", "worksheet"],
  },
  {
    title: "Sentiment Analysis Hands-On",
    description: "In this example, we have a collection of reviews from the movie rating site IMDB. Each review has the (lowercase) text that the critic left and a tag indicating whether it is positive or negative. You can enter a word and the notebook will calculate its sentiment based on the data provided above.",
    img: require("../../img/resources/sentiment-analysis.png"),
    subLinks: [
      {
        url: "https://observablehq.com/@craft/sentiment-analysis-example",
        name: "Notebook",
      },
      {
        url: "https://docs.google.com/presentation/d/18XQZmqr23Ps2ZwPwHvnYZSSHVv7enZ46G1qarKX2oMs/edit",
        name: "Worksheet",
      },
      {
        url: "https://docs.google.com/document/d/1lbF25Q6_I45NRSWzFW3ZbcIkTJ7zAfs638HOGthMK0A/edit#",
        name: "Curriculum",
      },
    ],
    tags: ["Unit 3", "hands-on", "worksheet"],
  },
];

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>(defaultResources);

  const handleSearch = (search: string) => {
    const filteredResources = defaultResources.filter(
      (resource) => matchResource(resource, search)
    );
    setResources(filteredResources);
  };


  return (
    <div className="flex-1 p-4">
      <SearchBar onUpdate={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {
          resources.map((resource, i) => (
            <ResourceCard key={i} resource={resource} />
          ))
        }
      </div>
     
    </div>
  )
}

export default Resources;
