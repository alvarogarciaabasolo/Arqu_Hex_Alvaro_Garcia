export interface PodcastDto {
  resultCount: number;
  results: [PodcastTrackDto, ...PodcastEpisodeDto[]];
}

export interface PodcastEpisodeDto {
  artistIds: string[];
  artworkUrl60: string | undefined;
  artworkUrl600: string | undefined;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  description: string;
  episodeContentType: string;
  episodeFileExtension: string;
  episodeGuid: string;
  episodeUrl: string;
  feedUrl: string;
  genres: [
    {
      name: string;
      id: string;
    },
  ];
  kind: string;
  previewUrl: string | undefined;
  releaseDate: string;
  shortDescription: string;
  trackId: number;
  trackName: string;
  trackTimeMillis: number | undefined;
  trackViewUrl: string;
  wrapperType: string;
}

export interface PodcastTrackDto {
  artistName: string;
  artworkUrl600: string;
  collectionHdPrice: number;
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  feedUrl: string;
  genres: string[];
  kind: string;
  releaseDate: string;
  trackId: number;
  trackName: string;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}
