export interface Podcast {
  artistName: string;
  artworkUrl100: string;
  artworkUrl600?: string;
  collectionId: number;
  collectionName: string;
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

export interface PodcastTrack {
  artistName: string;
  artworkUrl100: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl600: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionHdPrice: number;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  country: string;
  currency: string;
  feedUrl: string;
  genreIds: string[];
  genres: string[];
  kind: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}

