import LabelCard from './LabelCard';
import { Link } from 'wouter';
import { astheroidManifest } from '../manifests/astheroidManifest.json';
import type { Asteroid } from '@/types';

interface CardProps {
  astheroid?: Asteroid;
}

const Card = ({ astheroid = astheroidManifest as unknown as Asteroid }: CardProps) => {
  const {
    id,
    name,
    is_potentially_hazardous_asteroid,
    estimated_diameter: {
      kilometers: { estimated_diameter_max },
    },
  } = astheroid;

  const formattedDiameter = Number.parseFloat(String(estimated_diameter_max)).toFixed(2);

  return (
    <div className="card">
      <div className="card-astheroid"></div>
      <h4>{name || 'Name of Asteroid'}</h4>
      <LabelCard
        title="Diametro maximo"
        description={formattedDiameter ? `${formattedDiameter} km` : '421.520 km'}
      />
      <LabelCard
        title="¿Es peligroso?"
        description={is_potentially_hazardous_asteroid ? 'Sí' : 'No'}
      />
      <Link to={`/astheroids/${id}`} className="button-secondaryGray">
        Ver más
      </Link>
    </div>
  );
};

export default Card;
