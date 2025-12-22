import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../test/test-utils';
import Astheroids from './Astheroids';
import { useAsteroidStore } from '../stores/asteroidStore';
import type { Asteroid } from '@/types';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

const mockAsteroid: Asteroid = {
  id: '12345',
  name: '12345 Test Asteroid',
  absolute_magnitude_h: 22.5,
  estimated_diameter: {
    kilometers: { estimated_diameter_min: 0.1, estimated_diameter_max: 0.25 },
    meters: { estimated_diameter_min: 100, estimated_diameter_max: 250 },
  },
  is_potentially_hazardous_asteroid: false,
  close_approach_data: [],
  orbital_data: {
    first_observation_date: '2000-01-01',
    last_observation_date: '2023-01-01',
  },
};

describe('Astheroids', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAsteroidStore.setState({
      asteroids: [],
      asteroidCache: {},
      page: 0,
      loading: false,
      loadingDetail: false,
      error: null,
      errorDetail: null,
    });
  });

  it('shows loading state when fetching asteroids', () => {
    useAsteroidStore.setState({ loading: true });

    render(<Astheroids />);

    expect(screen.getByText('Cargando')).toBeInTheDocument();
  });

  it('renders asteroid cards when data is loaded', () => {
    useAsteroidStore.setState({
      asteroids: [mockAsteroid],
      loading: false,
    });

    render(<Astheroids />);

    expect(screen.getByText('12345 Test Asteroid')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', () => {
    useAsteroidStore.setState({
      error: 'Failed to fetch asteroids',
      loading: false,
      fetchAsteroids: vi.fn(), // Prevent actual fetch on mount
    });

    render(<Astheroids />);

    expect(screen.getByText('Failed to fetch asteroids')).toBeInTheDocument();
  });

  it('shows retry button when error occurs', () => {
    useAsteroidStore.setState({
      error: 'Failed to fetch asteroids',
      loading: false,
      fetchAsteroids: vi.fn(), // Prevent actual fetch on mount
    });

    render(<Astheroids />);

    expect(screen.getByRole('button', { name: /reintentar/i })).toBeInTheDocument();
  });

  it('calls fetchAsteroids on retry button click', async () => {
    const mockFetchAsteroids = vi.fn();
    const mockClearError = vi.fn();

    useAsteroidStore.setState({
      error: 'Failed to fetch asteroids',
      loading: false,
      fetchAsteroids: mockFetchAsteroids,
      clearError: mockClearError,
    });

    render(<Astheroids />);

    const retryButton = screen.getByRole('button', { name: /reintentar/i });
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(mockClearError).toHaveBeenCalled();
      expect(mockFetchAsteroids).toHaveBeenCalled();
    });
  });

  it('renders multiple asteroid cards', () => {
    const asteroids = [
      mockAsteroid,
      { ...mockAsteroid, id: '67890', name: '67890 Another Asteroid' },
      { ...mockAsteroid, id: '11111', name: '11111 Third Asteroid' },
    ];

    useAsteroidStore.setState({
      asteroids,
      loading: false,
    });

    render(<Astheroids />);

    expect(screen.getByText('12345 Test Asteroid')).toBeInTheDocument();
    expect(screen.getByText('67890 Another Asteroid')).toBeInTheDocument();
    expect(screen.getByText('11111 Third Asteroid')).toBeInTheDocument();
  });

  it('renders page title', () => {
    useAsteroidStore.setState({
      asteroids: [mockAsteroid],
      loading: false,
    });

    render(<Astheroids />);

    expect(screen.getByText('Asteroides')).toBeInTheDocument();
  });
});
