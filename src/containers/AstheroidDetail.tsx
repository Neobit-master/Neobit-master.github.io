import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import CardDetail from '../components/organisms/CardDetail';
import Loading from '../components/molecules/Loading';
import type { Asteroid } from '@/types';

const AstheroidDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [astheroid, setAstheroid] = useState<Asteroid | null>(null);
  const [loading, setLoading] = useState(true);
  const [_error, _setError] = useState('');
  useEffect(() => {
    async function getData() {
      const response = await fetch('http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `{
              getNeo(id: "${id}") {
                _id,
                name,
                image,
                is_potentially_hazardous_asteroid,
                absolute_magnitude_h,
                estimated_diameter {
                  kilometers {
                    estimated_diameter_min,
                    estimated_diameter_max
                  }
                },
                orbital_data {
                  first_observation_date,
                  last_observation_date
                }
              }
            }`
        })
      });
      const body = await response.json();
      setAstheroid(body.data.getNeo);
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <div className="astheroidDetail">
      {loading || !astheroid ? <Loading /> : <CardDetail astheroid={astheroid} />}
    </div>
  );
};

export default AstheroidDetail;