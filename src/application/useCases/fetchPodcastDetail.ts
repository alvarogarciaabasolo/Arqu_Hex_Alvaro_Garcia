import { PodcastRepository } from "@/domain/repositories/podcastRepository";
import { Podcast } from "@/domain/models/podcast";
import { CacheService } from '@/domain/services/cacheService';

export class FetchPodcastDetailUseCase {
    private repository: PodcastRepository;
    
    private cacheService: CacheService;

    constructor(repository: PodcastRepository, cacheService: CacheService) {
        this.repository = repository;
        this.cacheService = cacheService;
    }

    async execute(podcastId: string): Promise<Podcast> {
        try {
            const cacheKey = `podcast:${podcastId}`;
            const cached = this.cacheService.get(cacheKey); 
            if (cached) {
                return JSON.parse(cached);
            }
            const podcast = await this.repository.getPodcast(podcastId);
            this.cacheService.save(cacheKey, JSON.stringify(podcast));
            return podcast;
        } catch(error) {
            throw new Error(`Error fetching podcast: ${(error as Error).message}`);
        }
        
    }
}

