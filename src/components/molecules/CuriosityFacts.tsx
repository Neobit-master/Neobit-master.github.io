import { texts } from '../manifests/curiosityFactsManifest.json';

const useRandom = (textArray: string[]): string => {
  const randomNumber = Math.floor(Math.random() * textArray.length);
  return textArray[randomNumber];
};

interface CuriosityFactsProps {
  title?: string;
}

const CurosityFacts = ({ title }: CuriosityFactsProps) => {
  const text = useRandom(texts);
  return (
    <div className="curiosityFacts">
      <h1>{title || 'Titulo'}</h1>
      <p>
        {text ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dolore delectus libero repellendus cumque, ipsam incidunt animi quam impedit id possimus pariatur, et officiis labore non distinctio rem, magnam doloremque?'}
      </p>
    </div>
  );
};

export default CurosityFacts;
