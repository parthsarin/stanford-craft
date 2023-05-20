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
    <ul className="mt-4">
      <h3 className="text-1xl font-bold mb-3">Unit</h3>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="unit form-checkbox h-5 w-5 text-gray-600"
            value="Unit 2: AI & You"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Unit 2: AI & You</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="unit form-checkbox h-5 w-5 text-gray-600"
            value="Unit 3: AI & Math"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Unit 3: AI & Math</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="unit form-checkbox h-5 w-5 text-gray-600"
            value="Unit 4: AI & Art"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Unit 4: AI & Art</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="unit form-checkbox h-5 w-5 text-gray-600"
            value="Unit 5: AI & Society"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Unit 5: AI & Society</span>
        </label>
      </li>

      <h3 className="text-1xl font-bold mb-3 mt-3">Type</h3>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="type form-checkbox h-5 w-5 text-gray-600"
            value="Worksheet"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Worksheet</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="type form-checkbox h-5 w-5 text-gray-600"
            value="Video"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Video</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="type form-checkbox h-5 w-5 text-gray-600"
            value="Podcast"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Podcast</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="type form-checkbox h-5 w-5 text-gray-600"
            value="Reading"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Reading</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="type form-checkbox h-5 w-5 text-gray-600"
            value="Interactive"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Interactive</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="type form-checkbox h-5 w-5 text-gray-600"
            value="Guided Exploration"
            onChange={(e) =>
              handleTagSelect(
                e.currentTarget.checked,
                e.target.value,
                e.target.classList.item(0)
              )
            }
          />
          <span className="ml-2 text-gray-700">Guided Exploration</span>
        </label>
      </li>
    </ul>
  );
};

export default Filter;
