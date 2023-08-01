import { TopPodcast } from "@/domain/models/topPodcast";

export class FilterPodcastsUseCase {
    private podcasts: TopPodcast[]

    constructor(podcasts: TopPodcast[]) {
        this.podcasts = podcasts;
    }

    execute(filter: string): TopPodcast[] {
        try {
            return this.podcasts.filter(
                (podcast) =>
                    podcast.title.toLowerCase().includes(filter) ||
                    podcast.author.toLowerCase().includes(filter),
            );
        } catch(error) {
            return this.podcasts;
        } 
    }
}
