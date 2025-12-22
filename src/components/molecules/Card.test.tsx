import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import Card from './Card';
import type { Asteroid } from '@/types';

const mockAsteroid: Asteroid = {
  id: '12345',
  name: '12345 Test Asteroid',
  absolute_magnitude_h: 22.5,
  estimated_diameter: {
    kilometers: { estimated_diameter_min: 0.1, estimated_diameter_max: 0.25678 },
    meters: { estimated_diameter_min: 100, estimated_diameter_max: 256.78 },
  },
  is_potentially_hazardous_asteroid: false,
  close_approach_data: [],
  orbital_data: {
    first_observation_date: '2000-01-01',
    last_observation_date: '2023-01-01',
  },
};

describe('Card', () => {
  it('renders asteroid name', () => {
    render(<Card astheroid={mockAsteroid} />);

    expect(screen.getByText('12345 Test Asteroid')).toBeInTheDocument();
  });

  it('renders formatted diameter', () => {
    render(<Card astheroid={mockAsteroid} />);

    expect(screen.getByText('0.26 km')).toBeInTheDocument();
  });

  it('renders "No" when asteroid is not hazardous', () => {
    render(<Card astheroid={mockAsteroid} />);

    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('renders "Sí" when asteroid is hazardous', () => {
    const hazardousAsteroid = {
      ...mockAsteroid,
      is_potentially_hazardous_asteroid: true,
    };

    render(<Card astheroid={hazardousAsteroid} />);

    expect(screen.getByText('Sí')).toBeInTheDocument();
  });

  it('renders link to asteroid detail page', () => {
    render(<Card astheroid={mockAsteroid} />);

    const link = screen.getByRole('link', { name: /ver más/i });
    expect(link).toHaveAttribute('href', '/astheroids/12345');
  });

  it('renders label titles', () => {
    render(<Card astheroid={mockAsteroid} />);

    expect(screen.getByText('Diametro maximo')).toBeInTheDocument();
    expect(screen.getByText('¿Es peligroso?')).toBeInTheDocument();
  });
});
