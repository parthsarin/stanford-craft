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

export type { Resource, ResourceSubLink };