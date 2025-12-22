interface GalleryImage {
  _id: string;
  image: string;
}

interface ImagesProps {
  images: GalleryImage[];
}

const Images = ({ images }: ImagesProps) => (
  <div className="gallery">
    {images.map(image => (
      <div className="imgContainer" key={image._id}>
        <img src={`http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/public/images/${image.image}`} />
      </div>
    ))}
  </div>
);

export default Images;