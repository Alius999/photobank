'use client';
import styles from './Header.module.css'
import Link from "next/link";
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
    }})
    .catch (() => setIsAuthorized(false));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    setIsAuthorized(false);
    router.push('/login');
}

  return (
    <header className='flex justify-between items-center w-7xl mx-auto h-auto bg-violet-400 py-8 px-16'>
        <h1 hidden>Это главная страница</h1>
        <Link href='/' className='text-2xl font-bold'>
            Главная страница
        </Link>
        <nav>
            <ul className="flex gap-4">
                <li className={styles.navItem}><Link href="/">MainPage</Link></li>
                <li className={styles.navItem}><Link href="/about">About Us</Link></li>
                <li className={styles.navItem}><Link href="/gallery">PhotoBank</Link></li>
                <li className={styles.navItem}><Link href="/profile">Profile</Link></li>
            </ul>
        </nav>
        <div className='flex items-center gap-4'>
          {isAuthorized === null ? (
            null
          ) : isAuthorized ? (
            <button className={styles.logoutBtn} onClick={handleLogout}>LogOut</button>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>LogIn</Link>
              <Link href="/registration" className={styles.registerBtn}>Registration</Link>
            </>
          )}
        </div>
    </header>
  )
}

// flex items-center justify-between