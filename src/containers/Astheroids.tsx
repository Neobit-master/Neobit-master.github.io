import { useEffect, useRef } from 'react';
import Loading from '../components/molecules/Loading';
import CurosityFacts from '../components/molecules/CuriosityFacts';
import CardList from '../components/organisms/CardList';
import { useAsteroidStore } from '../stores/asteroidStore';

const Astheroids = () => {
  const { asteroids, loading, error, fetchAsteroids, fetchMoreAsteroids, clearError } = useAsteroidStore();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const options: IntersectionObserverInit = {
    rootMargin: '0px 0px 0px 500px',
  };

  const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await fetchMoreAsteroids();
        observer.unobserve(entry.target);

        // Observe the new last card
        const cards = document.querySelectorAll('.card');
        const lastCard = cards[cards.length - 2];
        if (lastCard) observer.observe(lastCard);
      }
    });
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, options);

    const loadData = async () => {
      await fetchAsteroids();
    };

    loadData();

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!loading && asteroids.length > 0 && observerRef.current) {
      const cards = document.querySelectorAll('.card');
      const lastCard = cards[cards.length - 2];
      if (lastCard) {
        observerRef.current.observe(lastCard);
      }
    }
  }, [loading, asteroids.length]);

  const handleRetry = () => {
    clearError();
    fetchAsteroids();
  };

  return (
    <div className="astheroids">
      <CurosityFacts title="Asteroides" />
      {loading && asteroids.length === 0 ? (
        <Loading />
      ) : error && asteroids.length === 0 ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={handleRetry} className="button-primaryWhite">
            Reintentar
          </button>
        </div>
      ) : (
        <CardList astheroids={asteroids} />
      )}
    </div>
  );
};

export default Astheroids;
