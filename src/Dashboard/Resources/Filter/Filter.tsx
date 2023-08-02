import { useState, useEffect } from "react";
import { tagNames } from "../Resource";

interface Props {
  onUpdate: (tags: string[], count: { [key: string]: number }) => void;
}

const Filter = ({ onUpdate }: Props) => {
  const [prevTags, setPrevTags] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([""]);

  // tagCount with format {tagName: 0}
  const initTagCount: { [key: string]: number } = {};
  for (var i = 0; i < tagNames.length; i++) {
    initTagCount[tagNames[i]] = 0;
  }
  const [selectedTagsCount, setSelectedTagsCount] = useState(initTagCount);

  const handleTagSelect = (
    checked: boolean,
    tag: string,
    tagClass: string | null
  ) => {
    const isTagSelected = !checked;

    if (isTagSelected) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      if (typeof tagClass === "string") {
        let newTagCount = selectedTagsCount;
        newTagCount[tagClass] -= 1;
        setSelectedTagsCount(newTagCount);
      }
    } else {
      setSelectedTags([...selectedTags, tag]);
      if (typeof tagClass === "string") {
        let newTagCount = selectedTagsCount;
        newTagCount[tagClass] += 1;
        setSelectedTagsCount(newTagCount);
      }
    }
  };

  useEffect(() => {
    if (prevTags !== selectedTags) {
      setPrevTags(selectedTags);
      onUpdate(selectedTags, selectedTagsCount);
    }
  }, [prevTags, selectedTags, onUpdate, selectedTagsCount]);

  return (
    <>
      <h3 className="type-1 mb-3">Unit</h3>
      <ul className="mt-10 list-none pl-0">
        <li>
          <input
            type="checkbox"
            className="unit checkbox"
            value="AI & You"
            id="u2"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label htmlFor="u2" className="label inline ml-5">
            AI & You
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            className="unit checkbox"
            value="AI & Math"
            id="u3"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label htmlFor="u3" className="label inline ml-5">
            AI & Math
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            className="unit checkbox"
            value="AI & Art"
            id="u4"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label htmlFor="u4" className="label inline ml-5">
            AI & Art
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            className="unit checkbox"
            value="AI & Society"
            id="u5"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label htmlFor="u5" className="label inline ml-5">
            AI & Society
          </label>
        </li>
      </ul>
      <h3 className="type-1 mb-3 mt-20">Type</h3>
      <ul className="mt-10 list-none pl-0">
        <li>
          <input
            type="checkbox"
            className="type checkbox"
            value="Worksheet"
            id="checkbox-Worksheet"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label htmlFor="checkbox-Worksheet" className="label inline ml-5">
            Worksheet
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            className="type checkbox"
            value="Video"
            id="checkbox-Video"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label htmlFor="checkbox-Video" className="label inline ml-5">
            Video
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            className="type checkbox"
            value="Podcast"
            id="checkbox-Podcast"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label htmlFor="checkbox-Podcast" className="label inline ml-5">
            Podcast
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            className="type checkbox"
            value="Reading"
            id="checkbox-Reading"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label htmlFor="checkbox-Reading" className="label inline ml-5">
            Reading
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            className="type checkbox"
            value="Interactive"
            id="checkbox-Interactive"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label htmlFor="checkbox-Interactive" className="label inline ml-5">
            Interactive
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            className="type checkbox"
            value="Guided Exploration"
            id="checkbox-Guided Exploration"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <label
            htmlFor="checkbox-Guided Exploration"
            className="label inline ml-5"
          >
            Guided Exploration
          </label>
        </li>
      </ul>
    </>
  );
};

export default Filter;
