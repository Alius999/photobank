"use client"
import styles from './page.module.css';

export default function UploadPage() {

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/photos/`, {
            method: "POST",
            credentials: "include",
            body: formData,
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Failed to upload photo");
        }
    }

    return(
        <div className={styles.uploadPage}>
            <h1 hidden>Upload</h1>
            <form className={styles.uploadForm} onSubmit={handleUpload} action="" method="POST" encType="multipart/form-data">
                <input className={styles.uploadArea} type="file" name="photo" accept="image/*" />
                <button className={styles.uploadButton} type="submit">Upload</button>
            </form>
        </div>
    )
}