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
  
  const regex = new RegExp(tokens.join('|'), 'gim');

  const { title, description, subLinks, tags } = resource;
  const names = subLinks.map((subLink) => subLink.name);
  const all = [title, description, ...names, ...tags].join(' ').toLowerCase();

  return regex.test(all);
}

export type { Resource, ResourceSubLink };
export { matchResource };