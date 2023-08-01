import { Podcast, PodcastEpisode } from "@/domain/models/podcast";
import { PodcastDto, PodcastEpisodeDto } from "../dto/podcastDto";

class PodcastMapper {

  fromResponse(response: PodcastDto, podcastDescription: string | undefined): Podcast {
    const { results } = response;
      const track = results[0] ?? {};
      const episodes = results.slice(
        1,
        results.length,
      ) as PodcastEpisodeDto[];
      const podcast: Podcast = {
        artistName: track.artistName ?? '',
        image: track.artworkUrl600 ?? '',
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
  }

};

export const podcastApiMapper = new PodcastMapper();