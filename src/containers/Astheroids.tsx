import { useEffect, useState, useRef } from 'react';
import Loading from '../components/molecules/Loading';
import CurosityFacts from '../components/molecules/CuriosityFacts';
import CardList from '../components/organisms/CardList';
import type { Asteroid } from '@/types';

const NASA_API_KEY = 'DEMO_KEY';
const NASA_API_URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse';

const Astheroids = () => {
  const [astheroids, setAstheroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState('');
  const [page, setPage] = useState(0);
  const stateAstheroidsRef = useRef<Asteroid[]>(astheroids);
  const statePageRef = useRef<number>(page);
  stateAstheroidsRef.current = astheroids;
  statePageRef.current = page;

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

  const options: IntersectionObserverInit = {
    rootMargin: '0px 0px 0px 500px'
  };

  const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        const nextPage = statePageRef.current + 1;
        setPage(nextPage);

        try {
          const response = await fetch(
            `${NASA_API_URL}?page=${nextPage}&size=10&api_key=${NASA_API_KEY}`
          );
          const body = await response.json();
          const newAsteroids = body.near_earth_objects.map(mapNasaAsteroid);

          setAstheroids(stateAstheroidsRef.current.concat(newAsteroids));
          observer.unobserve(entry.target);
          const cards = document.querySelectorAll('.card');
          const lastCard = cards[cards.length - 2];
          if (lastCard) observer.observe(lastCard);
        } catch (err) {
          setError(String(err));
        }
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `${NASA_API_URL}?page=0&size=10&api_key=${NASA_API_KEY}`
        );
        const body = await response.json();
        const asteroids = body.near_earth_objects.map(mapNasaAsteroid);

        setLoading(false);
        setAstheroids(asteroids);

        const cards = document.querySelectorAll('.card');
        const lastCard = cards[cards.length - 2];
        if (lastCard) observer.observe(lastCard);
        return lastCard;
      } catch (err) {
        setLoading(false);
        setError(String(err));
        return undefined;
      }
    }

    let lastCard: Element | undefined;
    getData().then(element => lastCard = element).catch(err => setError(String(err)));

    return () => {
      if (lastCard) observer.unobserve(lastCard);
    };
  }, []);

  return (
    <div className="astheroids">
      <CurosityFacts title="Asteroides" />
      {loading ? <Loading /> : <CardList astheroids={astheroids} />}
    </div>
  );
};

export default Astheroids;
