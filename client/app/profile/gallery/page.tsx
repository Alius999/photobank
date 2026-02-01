'use client';
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from './page.module.css';

type Photo = {
    id: number;
    photoUrl: string;
    description?: string | null;
};

type Comment = {
    id: number;
    content: string;
    photoId: number;
    authorId: number;
};

type PhotoWithComments = Photo & { comments?: Comment[] };

export default function GalleryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [activePhotoDetails, setActivePhotoDetails] = useState<PhotoWithComments | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile/photos/`, {
            method: 'GET',
            credentials: 'include',
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

    const handleOpenPhoto = (photoId: number) => {
        setSelectedPhoto(photoId);
        router.push(`${pathname}?id=${photoId}`);
    };

    const handleClosePhoto = () => {
        setSelectedPhoto(null);
        setComments([]);
        setActivePhotoDetails(null);
        router.push(pathname);
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

    const activePhoto = photos.find(p => p.id === selectedPhoto) ?? activePhotoDetails ?? null;

    return (
        <section>
            <h1>Мои фото</h1>
            <div className={styles.galleryContainer}>
                {photos.map((photo) => (
                    <button key={photo.id} 
                        className={styles.photoContainer} 
                        onClick={() => handleOpenPhoto(photo.id)}>
                        <img src={photo.photoUrl} 
                             alt={photo.description ?? 'Photo'} 
                             className={styles.thumbnailImage}
                        />
                    </button>
                ))}
            {selectedPhoto !== null && activePhoto && (
                <div className={styles.overlay} 
                     onClick={handleClosePhoto}
                     onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            handleClosePhoto();
                        }
                     }}
                >
                    <div 
                        className={styles.photoWrapper}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={activePhoto.photoUrl} 
                             alt={activePhoto.description ?? 'Photo'} 
                             className={styles.realsizeImage}
                        />
                        <div className={styles.commentsSection}>
                            {comments.map((comment) => (
                                <p className={styles.commentItem} key={comment.id}>{comment.content}</p>
                            ))}
                            <form className={styles.commentsForm} action="" onSubmit={handleCommentSubmit}>
                                <label htmlFor="comment">Комментарий</label>
                                <textarea id="comment" name="comment" />
                                <button type="submit">Отправить</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </section>
    );
}