import { Podcast } from '@/domain/models/podcast';
import { podcastRepository } from '@/infrastructure/repositories/podcastRepository';
import { useState, useEffect, useCallback } from 'react';

const toPodcastStorageKey = (podcastId: string) => `podcast:${podcastId}`;
const toPodcastUpdatedAtStorageKey = (podcastId: string) =>
  `podcastUpdatedAt:${podcastId}`;

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
    if (!podcastId) return;
    // Check if podcasts are already stored in localStorage
    const storedPodcasts = localStorage.getItem(toPodcastStorageKey(podcastId));
    const storedDate = Number(
      localStorage.getItem(toPodcastUpdatedAtStorageKey(podcastId)),
    );
    // If the podcasts have already been stored and no more than one day has passed, retrieve them from localStorage.
    if (storedPodcasts && storedDate && Date.now() - storedDate < 86400000) {
      setPodcast(JSON.parse(storedPodcasts));
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const _podcast = await podcastRepository.getPodcast(podcastId);
      setPodcast(_podcast);
      localStorage.setItem(
        toPodcastStorageKey(podcastId),
        JSON.stringify(_podcast),
      );
      localStorage.setItem(
        toPodcastUpdatedAtStorageKey(podcastId),
        String(Date.now()),
      );
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
