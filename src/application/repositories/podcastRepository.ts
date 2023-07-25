import { Podcast } from "../../domain/models/podcast";
import { TopPodcast } from "../../domain/models/topPodcast";

export interface PodcastRepository {
    getPodcast(podcastId: string): Promise<Podcast>;
    getTopPodcasts(): Promise<TopPodcast[]>;
}