import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Podcast from '@/pages/podcast/[podcastId]/index';
import '@testing-library/jest-dom';
import { PodcastFetchRepository } from '@/infrastructure/repositories/podcastRepository';
import { mockPodcast, mockPodcasts } from './mockData';

type MockNextQuery = {
  query: {
    podcastId: string;
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

describe('Podcast', () => {
  let useRouterMock: any;

  beforeAll(() => {
    useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
  });

  beforeEach(() => {
    useRouterMock.mockReturnValue({
      query: { podcastId: '1535809341' },
    } as MockNextQuery);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Render the loading state', async () => {
    render(<Podcast />);
    expect(
      await waitFor(() => screen.getByText('Loading...')),
    ).toBeInTheDocument();
  });

  it('Render the episodes of the podcast', async () => {
    render(<Podcast />);
    expect(
      await waitFor(() => screen.getByTestId('1535809341')),
    ).toBeInTheDocument();
    await screen.findByText('Episode 1');
    await screen.findByText('Episode 2');
  });

  it('Renders the PodcastCard image.', async () => {
    render(<Podcast />);
    expect(
      await waitFor(() => screen.getByAltText('Podcast Cover Art')),
    ).toBeInTheDocument();
  });
});
