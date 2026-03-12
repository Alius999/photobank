'use client';

import { useEffect, useState } from "react";
import styles from './page.module.css';

type Profile = {
  id: number;
  email: string;
  nickname?: string | null;
  createdAt: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        return res.json();
      })
      .then((data: Profile) => {
        setProfile(data);
      })
      .catch(() => {
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>Вы не авторизованы.</p>;
  }

  const formattedDate = new Date(profile.createdAt).toLocaleDateString();

  return (
    <div className={styles.profilePage}>
      <h1 hidden>Profile</h1>
      <div className={styles.profileCard}>
        <p>
          <strong>Your Login:</strong>{" "}
          {profile.nickname || profile.email}
        </p>
        <p>
          <strong>Your Email:</strong>{" "}
          {profile.email}
        </p>
        <p>
          <strong>Join Date:</strong>{" "}
          {formattedDate}
        </p>
      </div>
    </div>
  );
}