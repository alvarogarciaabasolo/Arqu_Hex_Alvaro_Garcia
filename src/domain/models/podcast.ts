export interface Podcast {
  artistName: string;
  collectionName: string;
  image?: string;
  description?: string;
  episodes: PodcastEpisode[];
}

export interface PodcastEpisode {
  description: string;
  duration: number;
  id: number;
  mediaContent: string;
  pubDate: string;
  title: string;
}