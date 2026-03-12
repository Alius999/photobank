"use client"
import { useEffect, useState } from 'react';
import styles from './page.module.css';

type Album = {
    id: number;
    name: string;
    description?: string | null;
};

export default function UploadPage() {

    const [isSuccess, setIsSuccess] = useState(false);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSuccess(false);
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/photos/`, {
            method: "POST",
            credentials: "include",
            body: formData,
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setIsSuccess(true);
            (e.target as HTMLFormElement).reset();
        } else {
            console.error("Failed to upload photo");
        }
    }

    const [albums, setAlbums] = useState<Album[]>([]);
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/`, {
        method: 'GET',
        credentials: 'include',
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        return response.json();
      })
      .then((data: Album[]) => setAlbums(data))
      .catch((error) => {
        console.error('Error fetching albums', error);
      });
    }, []);


    return(
        <div className={styles.uploadPage}>
            <h1 hidden>Upload</h1>
            <form className={styles.uploadForm} onSubmit={handleUpload} action="" method="POST" encType="multipart/form-data">
                <input
                    className={styles.uploadArea}
                    type="file"
                    name="photos"
                    accept="image/*"
                    multiple
                />
                <label htmlFor="album" className={styles.albumLabel}>Select Album Below</label>
                <select name="album" id="album" className={styles.albumSelect}>
                    {albums.map((album) => (
                        <option key={album.id} value={album.id}>{album.name}</option>
                    ))}
                </select>
                <button className={styles.uploadButton} type="submit">Upload</button>
            </form>
            {isSuccess && (
                <p className={styles.successMessage}>
                    Фотографии успешно загружены.
                </p>
            )}
        </div>
    )
}