import { Podcast } from '@/domain/models/podcast';
import { TopPodcast } from '@/domain/models/topPodcast';

export const mockPodcasts = [
  {
    id: '1535809341',
    title: 'Test Podcast 1',
    author: 'Test Author 1',
  },
  {
    id: '2',
    title: 'Test Podcast 2',
    author: 'Test Author 2',
  },
] as TopPodcast[];

export const mockPodcast = {
  id: '1535809341',
  title: 'Test Podcast',
  episodes: [
    {
      id: 1,
      title: 'Episode 1',
      pubDate: '2021-01-01T00:00:00.000Z',
      duration: 3600,
      description: 'Description 1',
      mediaContent: 'https://media-content-1',
    },
    {
      id: 2,
      title: 'Episode 2',
      pubDate: '2021-01-08T00:00:00.000Z',
      duration: 1800,
      description: 'Description 2',
      mediaContent: 'https://media-content-2',
    },
  ],
  
} as any as Podcast;
