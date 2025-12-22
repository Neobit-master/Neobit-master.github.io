import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import CardDetail from '../components/organisms/CardDetail';
import Loading from '../components/molecules/Loading';
import type { Asteroid } from '@/types';

const NASA_API_KEY = 'DEMO_KEY';

const AstheroidDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [astheroid, setAstheroid] = useState<Asteroid | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${NASA_API_KEY}`
        );

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Rate limit exceeded. NASA API limits requests with DEMO_KEY.');
          }
          throw new Error('Asteroid not found');
        }

        const neo = await response.json();

        const asteroid: Asteroid = {
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
        };

        setAstheroid(asteroid);
        setLoading(false);
      } catch (err) {
        setError(String(err));
        setLoading(false);
      }
    }

    if (id) {
      getData();
    }
  }, [id]);

  if (error) {
    return (
      <div className="astheroidDetail">
        <p>Error loading asteroid data: {error}</p>
      </div>
    );
  }

  return (
    <div className="astheroidDetail">
      {loading || !astheroid ? <Loading /> : <CardDetail astheroid={astheroid} />}
    </div>
  );
};

export default AstheroidDetail;
