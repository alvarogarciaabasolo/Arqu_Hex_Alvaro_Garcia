import React from 'react';
import { render, screen } from '@testing-library/react';
import PodcastEpisode from '@/pages/podcast/[podcastId]/episode/[episodeId]/index';
import '@testing-library/jest-dom';
import { useFetchPodcast } from '@/application/useCases/useFetchPodcast';

jest.mock('@/application/useCases/useFetchPodcast');

const mockPodcast = {
  id: '1535809341',
  title: 'Test Podcast',
  episodes: [
    {
      id: 1,
      title: 'Episode 1',
      description: 'Description 1',
      mediaContent: 'https://media-content-1',
    },
    {
      id: 2,
      title: 'Episode 2',
      description: 'Description 2',
      mediaContent: 'https://media-content-2',
    },
  ],
};

type MockNextQuery = {
  query: {
    podcastId: string;
    episodeId: string;
  };
};

describe('PodcastEpisode', () => {
  let useRouterMock: any;

  beforeAll(() => {
    useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
  });

  beforeEach(() => {
    useRouterMock.mockReturnValue({
      query: { podcastId: '1535809341', episodeId: '1' },
    } as MockNextQuery);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Render the loading state', () => {
    (useFetchPodcast as jest.Mock).mockReturnValue({
      podcast: null,
      loading: true,
    });

    render(<PodcastEpisode />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Renders the error state', () => {
    (useFetchPodcast as jest.Mock).mockReturnValue({
      podcast: null,
      loading: false,
    });

    render(<PodcastEpisode />);
    expect(screen.getByText('There was a mistake.')).toBeInTheDocument();
  });

  it('Render the title and description', async () => {
    (useFetchPodcast as jest.Mock).mockReturnValue({
      podcast: mockPodcast,
      loading: false,
    });

    render(<PodcastEpisode />);
    await screen.findByText('Episode 1');
    await screen.findByText('Description 1');
  });

  it('Render the audio', async () => {
    (useFetchPodcast as jest.Mock).mockReturnValue({
      podcast: mockPodcast,
      loading: false,
    });

    render(<PodcastEpisode />);
    expect(screen.getByTestId('audio-source')).toHaveAttribute(
      'src',
      'https://media-content-1',
    );
  });
});
