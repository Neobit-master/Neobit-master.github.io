import { useEffect, useState, useRef } from 'react';
import Images from '../components/molecules/Images';
import Loading from '../components/molecules/Loading';

interface GalleryImage {
  _id: string;
  image: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState('');
  const [skip, setSkip] = useState(0);
  const stateImagesRef = useRef<GalleryImage[]>(images);
  const stateSkipRef = useRef<number>(skip);
  stateImagesRef.current = images;
  stateSkipRef.current = skip;

  const options: IntersectionObserverInit = {
    rootMargin: '0px 0px 400px 0px'
  };
  const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        setSkip(stateSkipRef.current + 12);
        const response = await fetch('http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `{
              getNeos(first: 12, skip: ${stateSkipRef.current + 12}) {
                _id,
                image
              }
            }`
          })
        });
        const body = await response.json();

        setImages(stateImagesRef.current.concat(body.data.getNeos));
        observer.unobserve(entry.target);
        const images = document.querySelectorAll('.imgContainer');
        const lastImage = images[images.length - 1];
        observer.observe(lastImage);
      }
    })
  }

  const observer = new IntersectionObserver(handleIntersection, options);

  useEffect(() => {
    async function getImages() {
      const response = await fetch('http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `{
              getNeos(first: 12, skip: ${stateSkipRef.current}) {
                _id,
                image
              }
            }`
        })
      });
      const body = await response.json();
      setLoading(false);
      setImages(body.data.getNeos);
      const images = document.querySelectorAll('.imgContainer');
      const lastImage = images[images.length - 1];
      observer.observe(lastImage);
      return lastImage;
    };
    let lastImage: Element | undefined;
    getImages().then(element => lastImage = element).catch(err => setError(String(err)));
    return () => {
      if (lastImage) observer.unobserve(lastImage);
    }
  }, []);
  return (
    <>
      {loading ? <Loading /> : <Images images={images} />}
    </>
  );
};

export default Gallery;