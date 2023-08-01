import { FetchPodcastListUseCase } from '@/application/useCases/fetchPodcastList';
import { TopPodcast } from '@/domain/models/topPodcast';
import { PodcastFetchRepository } from '@/infrastructure/repositories/podcastRepository';
import { CacheService } from '@/infrastructure/services/cacheService';
import { useState, useEffect } from 'react';

export const useFetchPodcasts = (): {
  podcasts: TopPodcast[];
  loading: boolean;
} => {
  const [podcasts, setPodcasts] = useState<TopPodcast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const fetchPodcastsUseCase = new FetchPodcastListUseCase(
        new PodcastFetchRepository(),
        new CacheService(),
      );
      const topPodcast = await fetchPodcastsUseCase.execute();
      setPodcasts(topPodcast);
    } catch (err) {
      console.trace(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  return { podcasts, loading };
};
