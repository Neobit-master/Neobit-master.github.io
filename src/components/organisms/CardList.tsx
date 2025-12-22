import Card from '../molecules/Card';
import type { Asteroid } from '@/types';

interface CardListProps {
  astheroids: Asteroid[];
}

const CardList = ({ astheroids }: CardListProps) => {

  return (
    <section className="cardList">
      {
        astheroids.map((astheroid) => <Card astheroid={astheroid} key={astheroid._id} />)
      }
    </section>
  );
}

export default CardList;
