import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useAsteroidStore } from './asteroidStore';

const originalFetch = global.fetch;

const mockAsteroid = {
  id: '12345',
  name: '12345 Test Asteroid',
  absolute_magnitude_h: 22.5,
  estimated_diameter: {
    kilometers: { estimated_diameter_min: 0.1, estimated_diameter_max: 0.2 },
    meters: { estimated_diameter_min: 100, estimated_diameter_max: 200 },
  },
  is_potentially_hazardous_asteroid: false,
  close_approach_data: [],
  orbital_data: {
    first_observation_date: '2000-01-01',
    last_observation_date: '2023-01-01',
  },
};

const mockApiResponse = {
  near_earth_objects: [mockAsteroid],
};

describe('asteroidStore', () => {
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
    // Reset fetch mock
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;
  });

  describe('fetchAsteroids', () => {
    it('should fetch asteroids and update state', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      await useAsteroidStore.getState().fetchAsteroids();

      const state = useAsteroidStore.getState();
      expect(state.asteroids).toHaveLength(1);
      expect(state.asteroids[0].id).toBe('12345');
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should cache fetched asteroids', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      await useAsteroidStore.getState().fetchAsteroids();

      const state = useAsteroidStore.getState();
      expect(state.asteroidCache['12345']).toBeDefined();
      expect(state.asteroidCache['12345'].name).toBe('12345 Test Asteroid');
    });

    it('should handle fetch errors', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await useAsteroidStore.getState().fetchAsteroids();

      const state = useAsteroidStore.getState();
      expect(state.asteroids).toHaveLength(0);
      expect(state.loading).toBe(false);
      expect(state.error).not.toBeNull();
    });

    it('should handle rate limit errors', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 429,
      });

      await useAsteroidStore.getState().fetchAsteroids();

      const state = useAsteroidStore.getState();
      expect(state.error).toContain('Rate limit');
    });
  });

  describe('fetchMoreAsteroids', () => {
    it('should append new asteroids to existing list', async () => {
      // Set initial state with one asteroid
      useAsteroidStore.setState({
        asteroids: [mockAsteroid],
        page: 0,
      });

      const newAsteroid = { ...mockAsteroid, id: '67890', name: '67890 Another Asteroid' };
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ near_earth_objects: [newAsteroid] }),
      });

      await useAsteroidStore.getState().fetchMoreAsteroids();

      const state = useAsteroidStore.getState();
      expect(state.asteroids).toHaveLength(2);
      expect(state.page).toBe(1);
    });
  });

  describe('fetchAsteroidById', () => {
    it('should return cached asteroid if available', async () => {
      useAsteroidStore.setState({
        asteroidCache: { '12345': mockAsteroid },
      });

      const result = await useAsteroidStore.getState().fetchAsteroidById('12345');

      expect(result).toEqual(mockAsteroid);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should fetch asteroid if not in cache', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockAsteroid),
      });

      const result = await useAsteroidStore.getState().fetchAsteroidById('12345');

      expect(result?.id).toBe('12345');
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should cache fetched asteroid', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockAsteroid),
      });

      await useAsteroidStore.getState().fetchAsteroidById('12345');

      const state = useAsteroidStore.getState();
      expect(state.asteroidCache['12345']).toBeDefined();
    });

    it('should return null on error', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await useAsteroidStore.getState().fetchAsteroidById('99999');

      expect(result).toBeNull();
      expect(useAsteroidStore.getState().errorDetail).not.toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear both error and errorDetail', () => {
      useAsteroidStore.setState({
        error: 'Some error',
        errorDetail: 'Some detail error',
      });

      useAsteroidStore.getState().clearError();

      const state = useAsteroidStore.getState();
      expect(state.error).toBeNull();
      expect(state.errorDetail).toBeNull();
    });
  });
});
