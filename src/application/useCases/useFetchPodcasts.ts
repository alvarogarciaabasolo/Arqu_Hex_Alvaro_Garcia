import { TopPodcast } from '@/domain/models/topPodcast';
import { podcastRepository } from '@/infrastructure/repositories/podcastRepository';
import { useState, useEffect } from 'react';

export const useFetchPodcasts = (): {
  podcasts: TopPodcast[];
  loading: boolean;
} => {
  const [podcasts, setPodcasts] = useState<TopPodcast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPodcasts = async () => {
    // Check if podcasts are already stored in localStorage
    const storedPodcasts = localStorage.getItem('podcasts');
    const storedDate = Number(localStorage.getItem('podcastsUpdatedAt'));
    // If the podcasts have already been stored and no more than one day has passed, retrieve them from localStorage.
    if (storedPodcasts && storedDate && Date.now() - storedDate < 86400000) {
      setPodcasts(JSON.parse(storedPodcasts));
      return;
    }
    // Make request to get the updated list of podcasts.
    setLoading(true);
    try {
      const topPodcast = await podcastRepository.getTopPodcasts();
      setPodcasts(topPodcast);
      localStorage.setItem('podcasts', JSON.stringify(topPodcast));
      localStorage.setItem('podcastsUpdatedAt', String(Date.now()));
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
