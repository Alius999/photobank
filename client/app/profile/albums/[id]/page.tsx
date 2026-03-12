'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { resolvePhotoUrl } from '@/lib/api';

type Author = {
  id: number;
  email: string;
  nickname?: string | null;
};

type AlbumRef = { id: number; name: string } | null;

type Photo = {
  id: number;
  photoUrl: string;
  description?: string | null;
  author?: Author;
  album?: AlbumRef;
};

type PhotoWithComments = Photo & {
  comments?: Comment[];
  author?: Author;
};

type Comment = {
  id: number;
  content: string;
  photoId: number;
  authorId: number;
};

type Album = {
  id: number;
  name: string;
  description?: string | null;
  photos: Photo[];
};

export default function AlbumPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [activePhotoDetails, setActivePhotoDetails] =
    useState<PhotoWithComments | null>(null);
  const [relatedPhotos, setRelatedPhotos] = useState<Photo[]>([]);

  const handleClosePhoto = () => {
    setSelectedPhoto(null);
    setComments([]);
    setActivePhotoDetails(null);
    setRelatedPhotos([]);
    router.push(pathname);
  };

  useEffect(() => {
    if (!params?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/${params.id}`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch album');
        return res.json();
      })
      .then((data: Album) => {
        setAlbum(data);
        setPhotos(data.photos || []);
      })
      .catch(console.error);
  }, [params?.id]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch(() => setIsAuth(false));
  }, []);

  useEffect(() => {
    const photoIdParam = searchParams.get('photoId');
    if (photoIdParam) {
      const parsed = Number(photoIdParam);
      if (!Number.isNaN(parsed)) {
        setSelectedPhoto(parsed);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedPhoto === null) {
      setComments([]);
      setActivePhotoDetails(null);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/photos/${selectedPhoto}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch photo');
        }
        return response.json();
      })
      .then((data: PhotoWithComments) => {
        setActivePhotoDetails(data);
        setComments(data.comments ?? []);
      })
      .catch((error) => {
        console.error('Error fetching photo', error);
        handleClosePhoto();
      });
  }, [selectedPhoto]);

  useEffect(() => {
    if (!selectedPhoto) {
      setRelatedPhotos([]);
      return;
    }
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/photos/related/${selectedPhoto}`,
      { method: 'GET' },
    )
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Photo[]) =>
        setRelatedPhotos(Array.isArray(data) ? data : []),
      )
      .catch(() => setRelatedPhotos([]));
  }, [selectedPhoto]);

  useEffect(() => {
    if (selectedPhoto !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClosePhoto();
      }
    };
    document.addEventListener('keydown', handler);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [selectedPhoto]);

  const activePhoto =
    activePhotoDetails ?? photos.find((p) => p.id === selectedPhoto) ?? null;

  const handleOpenPhoto = (photoId: number) => {
    setSelectedPhoto(photoId);
    router.push(`${pathname}?photoId=${photoId}`);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const comment = form.comment.value;
    if (comment.trim() === '') {
      return;
    }
    const formData = {
      content: comment,
      photoId: activePhoto?.id,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      const data = await response.json();
      setComments((prev) => [...prev, data]);
    } else {
      console.error('Failed to submit comment');
    }

    form.comment.value = '';
  };

  const thisPhotoComments = comments.filter(
    (comment) => Number(comment.photoId) === activePhoto?.id,
  );
  const orderedComments = [...thisPhotoComments].sort((a, b) => b.id - a.id);

  if (!album) return <p>Loading...</p>;

  return (
    <>
      <section>
        <h1>{album.name}</h1>
        {album.description && <p>{album.description}</p>}
        <section className={styles.galleryContainer}>
          {photos.map((photo) => (
            <button
              key={photo.id}
              className={styles.photoContainer}
              onClick={() => handleOpenPhoto(photo.id)}
            >
              <img
                src={resolvePhotoUrl(photo.photoUrl)}
                alt={photo.description ?? 'Photo'}
                className={styles.thumbnailImage}
              />
            </button>
          ))}
          {photos.length === 0 && <p>No photos in this album yet</p>}

          {selectedPhoto !== null && (
            <div
              className={styles.overlay}
              onClick={() => handleClosePhoto()}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleClosePhoto();
                }
              }}
            >
              {activePhoto && (
                <div
                  key={activePhoto.id}
                  onClick={(e) => e.stopPropagation()}
                  className={styles.photoWrapper}
                >
                  <img
                    src={resolvePhotoUrl(activePhoto.photoUrl)}
                    alt={activePhoto.description ?? 'Photo'}
                    className={styles.realsizeImage}
                  />
                  <div className={styles.commentsSection}>
                    {activePhoto.author && (
                      <div className={styles.authorInfo}>
                        <p>
                          <strong>Автор:</strong>{' '}
                          {activePhoto.author.nickname ||
                            activePhoto.author.email}
                        </p>
                      </div>
                    )}
                    {relatedPhotos.length > 0 && (
                      <div className={styles.relatedSection}>
                        <p className={styles.relatedTitle}>
                          {activePhoto.album?.name
                            ? <>По тегу «{activePhoto.album.name}»</>
                            : 'Похожие фотографии'}
                        </p>
                        <div className={styles.relatedGrid}>
                          {relatedPhotos.map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              className={styles.relatedThumb}
                              onClick={() => handleOpenPhoto(p.id)}
                            >
                              <img
                                src={resolvePhotoUrl(p.photoUrl)}
                                alt={p.description ?? 'Photo'}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {isAuth === null || isAuth === false ? (
                      <p>
                        Please, <Link href="/login">LogIn</Link> to leave your
                        comment
                      </p>
                    ) : (
                      <form
                        className={styles.commentsForm}
                        action=""
                        onSubmit={handleCommentSubmit}
                      >
                        <label htmlFor="comment">Комментарий</label>
                        <textarea id="comment" name="comment" />
                        <button type="submit">Отправить</button>
                      </form>
                    )}
                    <div className={styles.commentsList}>
                      {orderedComments.map((comment) => (
                        <p className={styles.commentItem} key={comment.id}>
                          {comment.content}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </section>
    </>
  );
}