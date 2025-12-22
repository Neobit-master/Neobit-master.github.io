import { create } from 'zustand';
import type { Asteroid } from '@/types';

const NASA_API_KEY = 'DEMO_KEY';
const NASA_API_URL = 'https://api.nasa.gov/neo/rest/v1/neo';

const USER_FRIENDLY_ERROR = 'No pudimos cargar los asteroides. Por favor, intenta de nuevo más tarde.';
const USER_FRIENDLY_ERROR_DETAIL = 'No pudimos cargar la información del asteroide. Por favor, intenta de nuevo más tarde.';

const getErrorMessage = (err: unknown, userFriendlyMessage: string): string => {
  if (import.meta.env.DEV) {
    return String(err);
  }
  return userFriendlyMessage;
};

interface AsteroidState {
  asteroids: Asteroid[];
  asteroidCache: Record<string, Asteroid>;
  page: number;
  loading: boolean;
  loadingDetail: boolean;
  error: string | null;
  errorDetail: string | null;

  fetchAsteroids: () => Promise<void>;
  fetchMoreAsteroids: () => Promise<void>;
  fetchAsteroidById: (id: string) => Promise<Asteroid | null>;
  clearError: () => void;
}

const mapNasaAsteroid = (neo: Asteroid): Asteroid => ({
  id: neo.id,
  name: neo.name,
  absolute_magnitude_h: neo.absolute_magnitude_h,
  estimated_diameter: neo.estimated_diameter,
  orbital_data: neo.orbital_data || {
    first_observation_date: 'N/A',
    last_observation_date: 'N/A',
  },
  is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
  close_approach_data: neo.close_approach_data,
});

export const useAsteroidStore = create<AsteroidState>((set, get) => ({
  asteroids: [],
  asteroidCache: {},
  page: 0,
  loading: false,
  loadingDetail: false,
  error: null,
  errorDetail: null,

  fetchAsteroids: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(
        `${NASA_API_URL}/browse?page=0&size=10&api_key=${NASA_API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. NASA API limits requests with DEMO_KEY.');
        }
        throw new Error('Failed to fetch asteroids');
      }

      const body = await response.json();
      const asteroids = body.near_earth_objects.map(mapNasaAsteroid);

      // Cache all fetched asteroids
      const cache: Record<string, Asteroid> = {};
      for (const asteroid of asteroids) {
        cache[asteroid.id] = asteroid;
      }

      set({
        asteroids,
        asteroidCache: { ...get().asteroidCache, ...cache },
        page: 0,
        loading: false,
      });
    } catch (err) {
      console.error('Asteroid fetch error:', err);
      set({ error: getErrorMessage(err, USER_FRIENDLY_ERROR), loading: false });
    }
  },

  fetchMoreAsteroids: async () => {
    const { page, asteroids, asteroidCache } = get();
    const nextPage = page + 1;

    try {
      const response = await fetch(
        `${NASA_API_URL}/browse?page=${nextPage}&size=10&api_key=${NASA_API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. NASA API limits requests with DEMO_KEY.');
        }
        throw new Error('Failed to fetch more asteroids');
      }

      const body = await response.json();
      const newAsteroids = body.near_earth_objects.map(mapNasaAsteroid);

      // Cache new asteroids
      const cache: Record<string, Asteroid> = {};
      for (const asteroid of newAsteroids) {
        cache[asteroid.id] = asteroid;
      }

      set({
        asteroids: [...asteroids, ...newAsteroids],
        asteroidCache: { ...asteroidCache, ...cache },
        page: nextPage,
      });
    } catch (err) {
      console.error('Asteroid fetch more error:', err);
      set({ error: getErrorMessage(err, USER_FRIENDLY_ERROR) });
    }
  },

  fetchAsteroidById: async (id: string) => {
    const { asteroidCache } = get();

    // Return cached asteroid if available
    if (asteroidCache[id]) {
      return asteroidCache[id];
    }

    set({ loadingDetail: true, errorDetail: null });

    try {
      const response = await fetch(
        `${NASA_API_URL}/${id}?api_key=${NASA_API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. NASA API limits requests with DEMO_KEY.');
        }
        throw new Error('Asteroid not found');
      }

      const neo = await response.json();
      const asteroid = mapNasaAsteroid(neo);

      // Cache the asteroid
      set({
        asteroidCache: { ...get().asteroidCache, [id]: asteroid },
        loadingDetail: false,
      });

      return asteroid;
    } catch (err) {
      console.error('Asteroid detail fetch error:', err);
      set({ errorDetail: getErrorMessage(err, USER_FRIENDLY_ERROR_DETAIL), loadingDetail: false });
      return null;
    }
  },

  clearError: () => set({ error: null, errorDetail: null }),
}));
