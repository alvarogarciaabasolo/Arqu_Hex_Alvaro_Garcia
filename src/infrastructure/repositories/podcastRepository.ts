import { Podcast } from "@/domain/models/podcast";
import { PodcastRepository } from "@/domain/repositories/podcastRepository";
import { PodcastEpisodeResponse, PodcastResponse, podcastApiAdapter } from "../adapters/podcastApiAdapter";
import { TopPodcastsResponse, topPodcastApiAdapter } from "../adapters/topPodcastsApiAdapter";
import { TopPodcast } from "@/domain/models/topPodcast";

class Repository implements PodcastRepository {
    async getPodcast(podcastId: string): Promise<Podcast> {
        const url = this.allOriginUrl(encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`,
        ));
        const resp = await fetch(url);
        const data: PodcastResponse = await resp.json();
        const episodes = data.results.slice(
            1,
            data.results.length,
          ) as PodcastEpisodeResponse[];
        let podcastDescription: string | undefined;
        if (episodes.length) {
            podcastDescription = await this.getPodcastDescription(episodes[0].feedUrl);
        }
        return podcastApiAdapter.fromResponse(data, podcastDescription);
    }

    async getTopPodcasts(): Promise<TopPodcast[]> {
        const resp = await fetch(
            'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
        );
        const data: TopPodcastsResponse = await resp.json();
        return topPodcastApiAdapter.fromResponse(data);
    }

    private async getPodcastDescription(feedUrl: string): Promise<string | undefined> {
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

export const podcastRepository = new Repository();