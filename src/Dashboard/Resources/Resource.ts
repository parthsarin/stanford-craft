interface Resource {
  title: string;
  description: string;
  img: string;
  subLinks: ResourceSubLink[];
  tags: string[];
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

    const { title, description, subLinks, tags } = resource;
    const names = subLinks.map((subLink) => subLink.name);
    const all = [title, description, ...names, ...tags].join(' ').toLowerCase();

    if (!token.test(all)) return false;
  }

  return true;
}

const filterResource = (resource: Resource, selectedTags: string[]): boolean => {
  const {tags } = resource;

  if (selectedTags.length == 1) {
    return true;
  }

  return tags.some(item => selectedTags.includes(item))
}

export type { Resource, ResourceSubLink };
export { matchResource, filterResource };