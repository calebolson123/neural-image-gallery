import ImageListItem from '@mui/material/ImageListItem';
import { GalleryImage } from '../hooks/loadGallery';

type CardProps = {
    galleryImage: GalleryImage;
}

export default function Card({ galleryImage }: CardProps): JSX.Element {
  return (
    <ImageListItem key={galleryImage.id}>
        <img
            src={`${galleryImage.file.replace('minio', 'localhost')}`} // This is a hack to unblock development for sake of this exercise, likely need to make config fix in docker-compose
            alt={galleryImage.caption}
            loading="lazy"
        />
        <p>{galleryImage.caption}</p>
    </ImageListItem>
  );
}