'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import styles from './page.module.css';
import { resolvePhotoUrl } from "@/lib/api";

type Album = {
  id: number;
  name: string;
  description?: string | null;
  photos: Photo[];
};

type Photo = {
  id: number;
  photoUrl: string | null;
  description: string | null;
  createdAt: string;
};

export default function AlbumsPage() {

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

    const handleCreateAlbum = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const description = (formData.get('description') as string) || undefined;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description }),
        });
        if (response.ok) {
          if (response.ok) {
            const data = await response.json();
            const albumWithPhotos = { ...data, photos: data.photos ?? [] };
            setAlbums((prev) => [...prev, albumWithPhotos]);
          }
        } else {
            console.error('Failed to create album');
        }
    }
  
    return (
        <section>
            <h1>My Albums</h1>
            <ul className={styles.albumList}>
                {albums.map((album) => {

                    const sortedPhotos = [...album.photos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    const previewPhotos = sortedPhotos.slice(0,2);

                    return (
                    <li key={album.id} className={styles.albumItem}>
                      <Link className={styles.albumLink} 
                            key={album.id} 
                            href={`/profile/albums/${album.id}`}>
                            {previewPhotos.map((photo) => (
                                <img key={photo.id} src={resolvePhotoUrl(photo.photoUrl)} alt={photo.description ?? 'Photo'} />
                            ))}
                            {previewPhotos.length === 0 && <p>No photos in this album yet</p>}
                      </Link>
                      <p className={styles.albumName}>{album.name}</p> 
                      <p className={styles.albumDescription}>{album.description}</p>
                    </li>
                    )
                })}
                {albums.length === 0 && <p>You had not add any album yet</p>}
            </ul>
            <form onSubmit={handleCreateAlbum} action="" className={styles.albumForm}>
                <input type="text" name="name" placeholder="Album Name" />
                <textarea name="description" placeholder="Album Description"></textarea>
                <button type="submit">Create Album</button>
            </form>
        </section>
    )
}