interface Resource {
  title: string;
  description: string;
  img: string;
  subLinks: ResourceSubLink[];
  unitTags: string[];
  typeTags: string[];
  miscTags: string[];
  rating?: number;
}

interface ResourceSubLink {
  name: string;
  url: string;
}

const matchResource = (resource: Resource, query: string): boolean => {
  const tokens = query
                  .toLowerCase()
                  .split(' ')
                  .filter((t) => t.trim() !== '');
  
  // we can return to this (below) or some semantic option later
  // query = query.toLowerCase();
  // query = '.*' + query.split('').join('.*') + '.*';
  
  for (let i = 0; i < tokens.length; i++) {
    const token = new RegExp(tokens[i]);

    const { title, description, subLinks, unitTags, typeTags, miscTags } = resource;
    const names = subLinks.map((subLink) => subLink.name);
    const all = [title, description, ...names, ...unitTags, typeTags, miscTags].join(' ').toLowerCase();

    if (!token.test(all)) return false;
  }

  return true;
}

const filterResource = (resource: Resource, selectedTags: string[], count: {'unit': number, 'type': number}): boolean => {
  const {unitTags, typeTags } = resource;
  //const tags = unitTags.concat(typeTags, miscTags)

  if (selectedTags.length === 1) {
    return true;
  }
  
  return (
    (unitTags.some(item => selectedTags.includes(item)) || count['unit'] === 0) &&
    (typeTags.some(item => selectedTags.includes(item)) || count['type'] === 0)
  )
}

export type { Resource, ResourceSubLink };
export { matchResource, filterResource };