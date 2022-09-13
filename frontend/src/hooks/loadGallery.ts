import {useState, useEffect} from 'react';
import { getGallery } from '../services/gallery-service';

export type GalleryImage = {
    id: number;
    caption: string;
    file: string;
};

type UseGalleryReturnType = [
    GalleryImage[],
    boolean,
    React.Dispatch<React.SetStateAction<GalleryImage[]>>
];

/**
 * Custom hook for handling loading gallery images
 */
const useGallery = (): UseGalleryReturnType => {
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setLoading(true);
                const galleryImages: GalleryImage[] = await getGallery();
                setGallery(galleryImages);
                setLoading(false);
            } catch (err) {
                console.warn("Something went wrong fetching the gallery...", err);
                setLoading(false);
            }
        }

        fetchGallery();
    }, []);

    return [gallery, loading, setGallery]
}

export default useGallery;