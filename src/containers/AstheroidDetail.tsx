import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import CardDetail from '../components/organisms/CardDetail';
import Loading from '../components/molecules/Loading';
import { useAsteroidStore } from '../stores/asteroidStore';
import type { Asteroid } from '@/types';

const AstheroidDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchAsteroidById, loadingDetail, errorDetail } = useAsteroidStore();
  const [asteroid, setAsteroid] = useState<Asteroid | null>(null);

  useEffect(() => {
    const loadAsteroid = async () => {
      if (id) {
        const data = await fetchAsteroidById(id);
        setAsteroid(data);
      }
    };

    loadAsteroid();
  }, [id, fetchAsteroidById]);

  if (errorDetail) {
    return (
      <div className="astheroidDetail">
        <p>Error loading asteroid data: {errorDetail}</p>
      </div>
    );
  }

  return (
    <div className="astheroidDetail">
      {loadingDetail || !asteroid ? <Loading /> : <CardDetail astheroid={asteroid} />}
    </div>
  );
};

export default AstheroidDetail;
