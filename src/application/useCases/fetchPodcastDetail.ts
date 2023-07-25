import { PodcastRepository } from "../repositories/podcastRepository";
import { Podcast } from "@/domain/models/podcast";

export class FetchPodcastDetailUseCase {
    private repository: PodcastRepository;

    constructor(repository: PodcastRepository) {
        this.repository = repository;
    }

    async execute(podcastId: string): Promise<Podcast> {
        try {
            return await this.repository.getPodcast(podcastId);
        } catch(error) {
            throw new Error(`Error fetching podcast: ${(error as Error).message}`);
        }
        
    }
}

