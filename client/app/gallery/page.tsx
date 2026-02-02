'use client';
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from './page.module.css';
import Link from "next/link";
import { resolvePhotoUrl } from "@/lib/api";

type Author = {
    id: number;
    email: string;
    nickname?: string | null;
}

type Photo = {
    id: number;
    photoUrl: string;
    description?: string | null;
    author?: Author;
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

export default function GalleryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [activePhotoDetails, setActivePhotoDetails] = useState<PhotoWithComments | null>(null);
    const handleClosePhoto = () => {
        setSelectedPhoto(null);
        setComments([]);
        setActivePhotoDetails(null);
        router.push(pathname);
    };

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
            method: 'GET',
            credentials: 'include',
          })
          .then(response => {
            if (response.ok) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
          }})
          .catch (() => setIsAuth(false));

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/photos/`, {
            method: 'GET',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch photos');
            }
            return response.json();
        })
        .then((data) => {
            setPhotos(data);
        })
        .catch((error) => {
            console.error("Error fetching photos", error);
        })
    }, []);

    useEffect(() => {
        const idParam = searchParams.get('id');
        if (idParam) {
            const parsed = Number(idParam);
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
            console.error("Error fetching photo", error);
            handleClosePhoto();
        })
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
        }
    }, [selectedPhoto]);

    // Используем activePhotoDetails если есть (там полные данные с автором), иначе ищем в photos
    const activePhoto = activePhotoDetails ?? photos.find(p => p.id === selectedPhoto) ?? null;

    const handleOpenPhoto = (photoId: number) => {
        setSelectedPhoto(photoId);
        router.push(`${pathname}?id=${photoId}`);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            setComments((prev) => [...prev, data])
            console.log(data);
        } else {
            console.error("Failed to submit comment");
        }

        form.comment.value = '';
    }

    const thisPhotoComments = comments.filter(comment => Number(comment.photoId) === activePhoto?.id);


    return (
        <>
            <h1>Photos</h1>
            <section className={styles.galleryContainer}>
                {photos.map((photo) => (
                    <button key={photo.id} 
                        className={styles.photoContainer} 
                        onClick={() => handleOpenPhoto(photo.id)}>
                        <img src={resolvePhotoUrl(photo.photoUrl)} 
                             alt={photo.description ?? 'Photo'} 
                             className={styles.thumbnailImage}
                        />
                    {/* <p>{photo.author.email}</p> */}

                    </button>
                ))}
            {selectedPhoto !== null && (
                <div className={styles.overlay} 
                     onClick={() => handleClosePhoto()}
                     onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            handleClosePhoto();
                        }
                     }}
                >
                    {activePhoto && (
                        <div key={activePhoto.id} 
                            onClick={(e) => e.stopPropagation()}
                            className={styles.photoWrapper} >
                            <img src={resolvePhotoUrl(activePhoto.photoUrl)} 
                                 alt={activePhoto.description ?? 'Photo'} 
                                 className={styles.realsizeImage}
                            />
                            <div className={styles.commentsSection}>
                                {activePhoto.author && (
                                    <div className={styles.authorInfo}>
                                        <p><strong>Автор:</strong> {activePhoto.author.nickname || activePhoto.author.email}</p>
                                    </div>
                                )}
                                {thisPhotoComments.map((comment) => (
                                    <p className={styles.commentItem} key={comment.id}>{comment.content}</p>
                                ))}
                                {isAuth === null || isAuth === false ? (
                                    <p>Please, <Link href="/login">LogIn</Link> to leave your comment</p>
                                ) : (
                                    <form className={styles.commentsForm} action="" onSubmit={handleCommentSubmit}>
                                        <label htmlFor="comment">Комментарий</label>
                                        <textarea id="comment" name="comment" />
                                        <button type="submit">Отправить</button>
                                    </form>
                                )}
                            </div>
                        </div>    
                    )}
                </div>
            )}
            </section>
        </>
    );
}