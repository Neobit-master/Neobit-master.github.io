import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '../test/test-utils';
import AstheroidDetail from './AstheroidDetail';
import { useAsteroidStore } from '../stores/asteroidStore';
import type { Asteroid } from '@/types';

// Mock wouter's useParams
vi.mock('wouter', async () => {
  const actual = await vi.importActual('wouter');
  return {
    ...actual,
    useParams: () => ({ id: '12345' }),
  };
});

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
    last_observation_date: '2023-12-31',
  },
};

describe('AstheroidDetail', () => {
  beforeEach(() => {
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

  it('shows loading state while fetching asteroid', () => {
    useAsteroidStore.setState({
      loadingDetail: true,
      fetchAsteroidById: vi.fn().mockResolvedValue(null),
    });

    render(<AstheroidDetail />);

    expect(screen.getByText('Cargando')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    useAsteroidStore.setState({
      errorDetail: 'Failed to load asteroid',
      fetchAsteroidById: vi.fn().mockResolvedValue(null),
    });

    render(<AstheroidDetail />);

    expect(screen.getByText(/error loading asteroid data/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to load asteroid/i)).toBeInTheDocument();
  });

  it('renders asteroid details when loaded', async () => {
    useAsteroidStore.setState({
      loadingDetail: false,
      fetchAsteroidById: vi.fn().mockResolvedValue(mockAsteroid),
    });

    render(<AstheroidDetail />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: '12345 Test Asteroid' })).toBeInTheDocument();
    });
  });

  it('displays asteroid hazard status', async () => {
    useAsteroidStore.setState({
      loadingDetail: false,
      fetchAsteroidById: vi.fn().mockResolvedValue(mockAsteroid),
    });

    render(<AstheroidDetail />);

    await waitFor(() => {
      expect(screen.getByText('¿Es peligroso?')).toBeInTheDocument();
      expect(screen.getByText('No')).toBeInTheDocument();
    });
  });

  it('displays estimated diameter', async () => {
    useAsteroidStore.setState({
      loadingDetail: false,
      fetchAsteroidById: vi.fn().mockResolvedValue(mockAsteroid),
    });

    render(<AstheroidDetail />);

    await waitFor(() => {
      expect(screen.getByText('Diametro Estimado Min')).toBeInTheDocument();
      expect(screen.getByText('0.10 km')).toBeInTheDocument();
      expect(screen.getByText('Diametro Estimado Max')).toBeInTheDocument();
      expect(screen.getByText('0.25 km')).toBeInTheDocument();
    });
  });

  it('displays observation dates', async () => {
    useAsteroidStore.setState({
      loadingDetail: false,
      fetchAsteroidById: vi.fn().mockResolvedValue(mockAsteroid),
    });

    render(<AstheroidDetail />);

    await waitFor(() => {
      expect(screen.getByText('Primera Observación')).toBeInTheDocument();
      expect(screen.getByText('2000-01-01')).toBeInTheDocument();
      expect(screen.getByText('Última Observación')).toBeInTheDocument();
      expect(screen.getByText('2023-12-31')).toBeInTheDocument();
    });
  });

  it('displays absolute magnitude', async () => {
    useAsteroidStore.setState({
      loadingDetail: false,
      fetchAsteroidById: vi.fn().mockResolvedValue(mockAsteroid),
    });

    render(<AstheroidDetail />);

    await waitFor(() => {
      expect(screen.getByText('Magnitud Absoluta H')).toBeInTheDocument();
      expect(screen.getByText('22.5')).toBeInTheDocument();
    });
  });

  it('renders back link to asteroids list', async () => {
    useAsteroidStore.setState({
      loadingDetail: false,
      fetchAsteroidById: vi.fn().mockResolvedValue(mockAsteroid),
    });

    render(<AstheroidDetail />);

    await waitFor(() => {
      const backLink = screen.getByRole('link', { name: /regresar/i });
      expect(backLink).toHaveAttribute('href', '/astheroids');
    });
  });

  it('shows hazardous asteroid correctly', async () => {
    const hazardousAsteroid = {
      ...mockAsteroid,
      is_potentially_hazardous_asteroid: true,
    };

    useAsteroidStore.setState({
      loadingDetail: false,
      fetchAsteroidById: vi.fn().mockResolvedValue(hazardousAsteroid),
    });

    render(<AstheroidDetail />);

    await waitFor(() => {
      expect(screen.getByText('Sí')).toBeInTheDocument();
    });
  });
});
