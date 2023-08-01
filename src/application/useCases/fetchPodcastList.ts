import { TopPodcast } from "@/domain/models/topPodcast";
import { PodcastRepository } from "@/domain/repositories/podcastRepository";
import { CacheService } from "@/domain/services/cacheService";

export class FetchPodcastListUseCase {
    private repository: PodcastRepository;

    private cacheService: CacheService;

    constructor(repository: PodcastRepository, cacheService: CacheService) {
        this.repository = repository;
        this.cacheService = cacheService;
    }

    async execute(): Promise<TopPodcast[]> {
        try {
            const cacheKey = 'podcasts';
            const cached = this.cacheService.get(cacheKey);
            if (cached) {
                return JSON.parse(cached);
            }
            const podcasts = await this.repository.getTopPodcasts();
            this.cacheService.save(cacheKey, JSON.stringify(podcasts));
            return podcasts;
        } catch(error) {
            throw new Error(`Error fetching podcast list: ${(error as Error).message}`);
        }
        
    }
}

