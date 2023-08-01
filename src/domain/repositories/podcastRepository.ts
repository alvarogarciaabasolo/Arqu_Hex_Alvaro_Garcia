import { Podcast } from "../models/podcast";
import { TopPodcast } from "../models/topPodcast";

export interface PodcastRepository {
    getPodcast(podcastId: string): Promise<Podcast>;
    getTopPodcasts(): Promise<TopPodcast[]>;
}