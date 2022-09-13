import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import { GalleryImage } from '../hooks/loadGallery';
import Card from './Card';
import { deleteImage, getGallery } from '../services/gallery-service';

type GalleryProps = {
    gallery: GalleryImage[];
    setGallery: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
}

/**
 * Component which renders gallery images
 */
export default function Gallery({ gallery, setGallery }: GalleryProps): JSX.Element {

  // Delete selected image & update state if successful
  const handleDelete = async (id: number) => {
    const status = await deleteImage(id);
    if(status == 204) {
      const updatedGallery = await getGallery();
      setGallery(updatedGallery);
    }
  };

  return (
    <ImageList cols={3}>
      {gallery.map((galleryImage) => (
        <div key={galleryImage.id} onClick={() => handleDelete(galleryImage.id)}>
          <Card galleryImage={galleryImage}/>
        </div>
      ))}
    </ImageList>
  );
}