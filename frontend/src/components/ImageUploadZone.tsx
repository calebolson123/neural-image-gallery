import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { GalleryImage } from '../hooks/loadGallery';
import { uploadImages } from '../services/gallery-service';

type ImageUploadZoneProps = {
    setGallery: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
}

/**
 * Dropzone for handling image upload
 */
export default function ImageUploadZone({ setGallery }: ImageUploadZoneProps): JSX.Element {

    // On drop/select immediately upload files.
    // Note: server-side was configured to return updated gallery,
    // so here we immediately call setGallery w/ updated list
    const onDrop = useCallback(async (files: any) => { // TODO: get whatever type this is
        const updatedGallery: GalleryImage[] = await uploadImages(files);
        setGallery(updatedGallery)
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
    <div {...getRootProps({className: 'dropzone'})} className='customDropZone'>
        <input {...getInputProps()} />
        {
        isDragActive ?
            <p>Drop images here,</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
    </div>
    )
}