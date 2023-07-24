import { TopPodcast } from '@/domain/models/topPodcast';

interface PodcastEntry {
  id: {
    attributes: {
      ['im:id']: string;
      label: string;
    };
    label: string;
  };
  link: {
    attributes: {
      type: string;
      href: string;
      rel: string;
    };
  };
  ['im:name']: {
    label: string;
  };
  ['im:artist']: {
    label: string;
    attributes: { href: string };
  };
  ['im:image']: {
    attributes: { height: string };
    label: string;
  }[];
}

export interface TopPodcastsResponse {
  feed: {
    author: {
      name: { label: string };
      url: { label: string };
    };
    entry: PodcastEntry[];
    icon: { label: string };
    id: { label: string };
    link: {
      attributes: {
        href: string;
        rel: string;
        type: string;
      };
    };
    rights: { label: string };
    title: { label: string };
    updated: { label: string };
  };
}

export const topPodcastApiAdapter = {
  fromResponse(response: TopPodcastsResponse): TopPodcast[] {
    const entries = response.feed.entry;
    if (!entries) {
      return [];
    }
    return entries.map((entry) => ({
      id: entry.id.attributes['im:id'],
      title: entry['im:name'].label,
      author: entry['im:artist'].label,
      image: entry['im:image'][2].label,
      url: entry.link.attributes.href,
    }));
  },
};
