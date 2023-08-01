import { PodcastRepository } from '@/domain/repositories/podcastRepository';
import { Podcast } from '@/domain/models/podcast';
import { podcastApiMapper } from './mappers/podcastApiMapper';
import {
  TopPodcastsResponse,
  topPodcastApiMapper,
} from './mappers/topPodcastsApiMapper';
import { TopPodcast } from '@/domain/models/topPodcast';
import { PodcastDto, PodcastEpisodeDto } from './dto/podcastDto';

export class PodcastFetchRepository implements PodcastRepository {
  async getPodcast(podcastId: string): Promise<Podcast> {
    const url = this.allOriginUrl(
      encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`,
      ),
    );
    const resp = await fetch(url);
    const data: PodcastDto = await resp.json();
    const episodes = data.results.slice(
      1,
      data.results.length,
    ) as PodcastEpisodeDto[];
    let podcastDescription: string | undefined;
    if (episodes.length) {
      podcastDescription = await this.getPodcastDescription(
        episodes[0].feedUrl,
      );
    }
    return podcastApiMapper.fromResponse(data, podcastDescription);
  }

  async getTopPodcasts(): Promise<TopPodcast[]> {
    const resp = await fetch(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
    );
    const data: TopPodcastsResponse = await resp.json();
    return topPodcastApiMapper.fromResponse(data);
  }

  private async getPodcastDescription(
    feedUrl: string,
  ): Promise<string | undefined> {
    try {
      const url = this.allOriginUrl(feedUrl);
      const resp = await fetch(url);
      const data = await resp.text();
      const parsedData = new window.DOMParser().parseFromString(
        data ?? '',
        'text/xml',
      );
      return parsedData.querySelector('description')?.textContent ?? '';
    } catch (err) {
      console.trace(err);
      return '';
    }
  }

  private allOriginUrl(url: string): string {
    return `https://api.allorigins.win/raw?url=${url}`;
  }
}
