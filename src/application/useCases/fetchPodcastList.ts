import { TopPodcast } from "@/domain/models/topPodcast";
import { PodcastRepository } from "../repositories/podcastRepository";

export class FetchPodcastListUseCase {
    private repository: PodcastRepository;

    constructor(repository: PodcastRepository) {
        this.repository = repository;
    }

    async execute(): Promise<TopPodcast[]> {
        try {
            return await this.repository.getTopPodcasts();
        } catch(error) {
            throw new Error(`Error fetching podcast list: ${(error as Error).message}`);
        }
        
    }
}

