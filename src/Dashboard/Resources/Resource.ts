interface Resource {
  title: string;
  description: string;
  img: string;
  subLinks: ResourceSubLink[];
  tags: {
    unit: string[],
    type: string[],
    misc: string[]};
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

    const { title, description, subLinks, tags} = resource;
    const names = subLinks.map((subLink) => subLink.name);

    let allTags: string[] = []
    for (const [key, value] of Object.entries(tags)) {
      allTags = allTags.concat(value)
    }

    const all = [title, description, ...names, ...allTags].join(' ').toLowerCase();

    if (!token.test(all)) return false;
  }

  return true;
}

const filterResource = (resource: Resource, selectedTags: string[], count: {[key: string]: number}): boolean => {
  // TODO: change to tags
  const {tags} = resource;
  //const tags = unitTags.concat(typeTags, miscTags)

  if (selectedTags.length === 1) {
    return true;
  }
  
  // build true false
  for (const [key, value] of Object.entries(tags)) {
    if (key !== 'misc') {
      let validCard = (value.some(item => selectedTags.includes(item)) || count[key] === 0)
      if (!validCard) {
        return false
      }
    }
  }

  return true;
}

export type { Resource, ResourceSubLink };
export { matchResource, filterResource };