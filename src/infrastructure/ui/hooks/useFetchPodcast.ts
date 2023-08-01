import { FetchPodcastDetailUseCase } from '@/application/useCases/fetchPodcastDetail';
import { Podcast } from '@/domain/models/podcast';
import { PodcastFetchRepository } from '@/infrastructure/repositories/podcastRepository';
import { CacheService } from '@/infrastructure/services/cacheService';
import { useState, useEffect, useCallback } from 'react';

interface Props {
  podcastId?: string;
}

export const useFetchPodcast = ({
  podcastId,
}: Props): {
  podcast: Podcast | null;
  loading: boolean | null;
} => {
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const fetchPodcast = useCallback(async () => {
    try {
      if (!podcastId) return;
      setLoading(true);
      const fetchPodcastUseCase = new FetchPodcastDetailUseCase(
        new PodcastFetchRepository(),
        new CacheService(),
      );
      const _podcast = await fetchPodcastUseCase.execute(podcastId);
      setPodcast(_podcast);
    } catch (err) {
      console.trace(err);
    } finally {
      setLoading(false);
    }
  }, [podcastId]);

  useEffect(() => {
    fetchPodcast();
  }, [fetchPodcast]);

  return { podcast, loading };
};
