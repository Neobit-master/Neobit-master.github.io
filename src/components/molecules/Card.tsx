import { memo } from 'react';
import LabelCard from './LabelCard';
import { Link } from 'wouter';
import { astheroidManifest } from '../manifests/astheroidManifest.json';
import type { Asteroid } from '@/types';

interface CardProps {
  astheroid?: Asteroid;
}

const Card = memo(({ astheroid = astheroidManifest as unknown as Asteroid }: CardProps) => {
  const {
    id,
    name,
    is_potentially_hazardous_asteroid,
    estimated_diameter: {
      kilometers: { estimated_diameter_max },
    },
  } = astheroid;

  const formattedDiameter = Number.parseFloat(String(estimated_diameter_max)).toFixed(2);
  const headingId = `asteroid-${id}`;

  return (
    <article className="card" aria-labelledby={headingId}>
      <div className="card-astheroid" aria-hidden="true"></div>
      <h3 id={headingId}>{name || 'Name of Asteroid'}</h3>
      <LabelCard
        title="Diametro maximo"
        description={formattedDiameter ? `${formattedDiameter} km` : '421.520 km'}
      />
      <LabelCard
        title="¿Es peligroso?"
        description={is_potentially_hazardous_asteroid ? 'Sí' : 'No'}
      />
      <Link
        to={`/astheroids/${id}`}
        className="button-secondaryGray"
        aria-label={`Ver más detalles de ${name}`}
      >
        Ver más
      </Link>
    </article>
  );
});

Card.displayName = 'Card';

export default Card;
