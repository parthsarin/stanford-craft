import { useState, useEffect } from 'react';

interface Props {
  onUpdate: (tags: string[], count: {'unit': number, 'type': number}) => void;
}

let prevTags = [''];

const Filter = ({ onUpdate }: Props) => {
  const [selectedTags, setSelectedTags] = useState(['']);
  const [selectedTagsCount, setSelectedTagsCount] = useState({'unit': 0, 'type': 0})

  const handleTagSelect = (tag: string, tagClass: string|null) => {
    const isTagSelected = selectedTags.includes(tag);

    if (isTagSelected) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      if (tagClass === 'unit' || tagClass === 'type') {
        let newTagCount = selectedTagsCount;
        newTagCount[tagClass] -= 1;
        setSelectedTagsCount(newTagCount);
      }
    } else {
      setSelectedTags([...selectedTags, tag]);
      if (tagClass === 'unit' || tagClass === 'type') {
        let newTagCount = selectedTagsCount;
        newTagCount[tagClass] += 1;
        setSelectedTagsCount(newTagCount);
      }
    }
  };

  useEffect(() => {
    if (prevTags !== selectedTags) {
      prevTags = selectedTags;
      onUpdate(selectedTags, selectedTagsCount);
    }
  });

  return (
    <ul className="mt-4">
      <h3 className="text-1xl font-bold mb-3">Unit</h3>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="unit form-checkbox h-5 w-5 text-gray-600" value="Unit 2: AI & You"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Unit 2: AI & You</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="unit form-checkbox h-5 w-5 text-gray-600" value="Unit 3: AI & Math"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Unit 3: AI & Math</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="unit form-checkbox h-5 w-5 text-gray-600" value="Unit 4: AI & Art"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Unit 4: AI & Art</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="unit form-checkbox h-5 w-5 text-gray-600" value="Unit 5: AI & Society"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Unit 5: AI & Society</span>
        </label>
      </li>

      <h3 className="text-1xl font-bold mb-3 mt-3">Type</h3>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="type form-checkbox h-5 w-5 text-gray-600" value="Worksheet"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Worksheet</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="type form-checkbox h-5 w-5 text-gray-600" value="Video"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Video</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="type form-checkbox h-5 w-5 text-gray-600" value="Podcast"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Podcast</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="type form-checkbox h-5 w-5 text-gray-600" value="Reading"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Reading</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="type form-checkbox h-5 w-5 text-gray-600" value="Interactive"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Interactive</span>
        </label>
      </li>
      <li>
        <label className="inline-flex items-center">
          <input type="checkbox" className="type form-checkbox h-5 w-5 text-gray-600" value="Guided Exploration"
          onChange={(e) => handleTagSelect(e.target.value, e.target.classList.item(0))}/>
          <span className="ml-2 text-gray-700">Guided Exploration</span>
        </label>
      </li>
  </ul>
    
  ) 
};

export default Filter;