import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/pages/index';
import '@testing-library/jest-dom';
import { useFetchPodcasts } from '@/infrastructure/ui/hooks/useFetchPodcasts';

jest.mock('@/infrastructure/ui/hooks/useFetchPodcasts');

const mockPodcasts = [
  {
    id: '1',
    title: 'Test Podcast 1',
    author: 'Test Author 1',
  },
  {
    id: '2',
    title: 'Test Podcast 2',
    author: 'Test Author 2',
  },
];

describe('Home', () => {
  it('Render the loading state', () => {
    (useFetchPodcasts as jest.Mock).mockReturnValue({
      podcast: null,
      loading: true,
    });

    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Render the podcasts', async () => {
    (useFetchPodcasts as jest.Mock).mockReturnValue({
      podcasts: mockPodcasts,
      loading: false,
    });

    render(<Home />);
    await screen.findByText('Test Podcast 1');
    await screen.findByText('Test Podcast 2');
    await screen.findByText('Author: Test Author 1');
    await screen.findByText('Author: Test Author 2');
  });

  it('Render the error state', () => {
    (useFetchPodcasts as jest.Mock).mockReturnValue({
      podcasts: null,
      loading: false,
    });

    render(<Home />);
    expect(screen.getByText('There was a mistake..')).toBeInTheDocument();
  });

  it('Filters podcasts by search input', async () => {
    (useFetchPodcasts as jest.Mock).mockReturnValue({
      loading: false,
      podcasts: mockPodcasts,
    });

    render(<Home />);

    const input = screen.getByPlaceholderText('Filter podcasts...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'podcast 1' } });

    expect(screen.getByText('Test Podcast 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Podcast 2')).not.toBeInTheDocument();
  });
});
