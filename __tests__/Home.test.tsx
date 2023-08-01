import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import '@testing-library/jest-dom';
import { PodcastFetchRepository } from '@/infrastructure/repositories/podcastRepository';
import { mockPodcasts } from './mockData';

beforeAll(() => {
  jest
    .spyOn(PodcastFetchRepository.prototype, 'getTopPodcasts')
    .mockImplementation(() => Promise.resolve(mockPodcasts));
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Home', () => {
  it('Render the loading state', async () => {
    render(<Home />);
    const el = await waitFor(() => screen.getByText('Loading...'));
    expect(el).toBeInTheDocument();
  });

  it('Render the podcasts', async () => {
    render(<Home />);
    await screen.findByText('Test Podcast 1');
    await screen.findByText('Test Podcast 2');
    await screen.findByText('Author: Test Author 1');
    await screen.findByText('Author: Test Author 2');
  });

  it('Filters podcasts by search input', async () => {
    render(<Home />);
    const input = await waitFor(() => screen.getByPlaceholderText('Filter podcasts...'));
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'podcast 1' } });

    expect(await waitFor(() => screen.getByText('Test Podcast 1'))).toBeInTheDocument();
    expect(await waitFor(() => screen.queryByText('Test Podcast 2'))).not.toBeInTheDocument();
  });
});
