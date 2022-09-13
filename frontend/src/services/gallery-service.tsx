const endpoint = `http://localhost:8000/api/gallery/`; // TODO: this should probably be an injected var

// GET all images in gallery
export const getGallery = async () => {
    const response = await fetch(endpoint);
    return response.json();
};

// POST images to server
export const uploadImages = async (files: any) => {
    const data = new FormData();
    for (const file of files) {
        data.append('file', file, file.name);
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
    });
    return response.json();
};

// DELETE image by id
export const deleteImage = async (id: number) => {
    const response = await fetch(`${endpoint}${id}`, {
        method: 'DELETE',
    });
    return response.status;
};