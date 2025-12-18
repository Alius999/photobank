import Link from "next/link";
import styles from './layout.module.css';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='grid grid-cols-[200px_1fr]'>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navListItem}>
                        <Link href="/profile">Profile</Link>
                    </li>
                    <li className={styles.navListItem}>
                        <Link href="/profile/upload">Upload Photo</Link>
                    </li>
                    <li className={styles.navListItem}>
                        <Link href="/profile/gallery">My Photos</Link>
                    </li>
                    <li className={styles.navListItem}>
                        <Link href="/profile/albums">My Albums</Link>
                    </li>
                    <li className={styles.navListItem}>
                        <Link href="/profile/settings">Settings</Link>
                    </li>
                </ul>
            </nav>
            {children}
        </main>
    )
}