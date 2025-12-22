export interface Asteroid {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  orbital_data: {
    first_observation_date: string;
    last_observation_date: string;
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data?: {
    close_approach_date?: string;
    epoch_date_close_approach?: number;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }[];
}

export interface AsteroidImage {
  src: string;
  alt?: string;
}
