import { Podcast, PodcastEpisode, PodcastTrack } from "@/domain/models/podcast";

export interface PodcastResponse {
  resultCount: number;
  results: [PodcastTrack, ...PodcastEpisodeResponse[]];
}

export interface PodcastEpisodeResponse {
    artistIds: string[];
    artworkUrl160: string | undefined;
    artworkUrl60: string | undefined;
    artworkUrl600: string | undefined;
    closedCaptioning: string;
    collectionId: number;
    collectionName: string;
    collectionViewUrl: string;
    contentAdvisoryRating: string;
    country: string;
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

export const podcastApiAdapter = {
  fromResponse(response: PodcastResponse, podcastDescription: string | undefined): Podcast {
    const { results } = response;
      const track = results[0] ?? {};
      const episodes = results.slice(
        1,
        results.length,
      ) as PodcastEpisodeResponse[];
      const podcast: Podcast = {
        artistName: track.artistName ?? '',
        artworkUrl100: track.artworkUrl100 ?? '',
        artworkUrl600: track.artworkUrl600 ?? '',
        collectionId: track.collectionId ?? 0,
        collectionName: track.collectionName,
        description: podcastDescription,
        episodes: episodes.map(
          (episode) =>
            ({
              id: episode?.trackId ?? '',
              title: episode?.trackName ?? '',
              description: episode?.shortDescription
                ? episode?.shortDescription
                : episode?.description ?? '',
              pubDate: episode?.releaseDate ?? '',
              duration: episode?.trackTimeMillis ?? '',
              mediaContent: episode?.episodeUrl ?? '',
            } as PodcastEpisode),
        ),
      };
    return podcast;
  },
};
