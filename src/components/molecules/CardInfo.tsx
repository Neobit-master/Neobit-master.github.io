import { memo } from 'react';

interface CardInfoProps {
  title?: string;
  description?: string;
}

const CardInfo = memo(({ title, description }: CardInfoProps) => {
  return (
    <div className="cardInfo">
      <h2>{title || 'Titulo'}</h2>
      <p>
        {description ||
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta nisl non quam congue lacinia. Nullam ornare mi eu elit ultricies dapibus. Aenean congue sollicitudin ante at imperdiet. Nam ac sapien et ipsum sodales porta in id sapien. Phasellus eu nulla magna. Quisque orci ex, gravida quis rutrum nec.'}
      </p>
    </div>
  );
});

CardInfo.displayName = 'CardInfo';

export default CardInfo;
