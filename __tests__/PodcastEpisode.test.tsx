import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PodcastEpisode from '@/pages/podcast/[podcastId]/episode/[episodeId]/index';
import '@testing-library/jest-dom';
import { PodcastFetchRepository } from '@/infrastructure/repositories/podcastRepository';
import { mockPodcast, mockPodcasts } from './mockData';

type MockNextQuery = {
  query: {
    podcastId: string;
    episodeId: string;
  };
};

beforeAll(() => {
  jest
    .spyOn(PodcastFetchRepository.prototype, 'getPodcast')
    .mockImplementation((_podcastId: string) => Promise.resolve(mockPodcast));
  jest
    .spyOn(PodcastFetchRepository.prototype, 'getTopPodcasts')
    .mockImplementation(() => Promise.resolve(mockPodcasts));
});

afterAll(() => {
  jest.restoreAllMocks();
});

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

  it('Render the loading state', async () => {
    render(<PodcastEpisode />);
    expect(await waitFor(() => screen.getByText('Loading...'))).toBeInTheDocument();
  });

  it('Render the title and description', async () => {
    render(<PodcastEpisode />);
    await screen.findByText('Episode 1');
    await screen.findByText('Description 1');
  });

  it('Render the audio', async () => {
    render(<PodcastEpisode />);
    expect(await waitFor(() => screen.getByTestId('audio-source'))).toHaveAttribute(
      'src',
      'https://media-content-1',
    );
  });
});
