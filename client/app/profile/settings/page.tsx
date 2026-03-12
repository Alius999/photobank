'use client';

import { useState } from 'react';
import styles from '../page.module.css';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (!currentPassword || !newPassword) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        },
      );

      if (!res.ok) {
        const text = await res.text();
        setError(text || 'Failed to change password.');
      } else {
        setMessage('Password has been successfully updated.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Settings</h1>
      <div className={styles.profileCard}>
        <form onSubmit={handleSubmit} className={styles.settingsForm}>
          <p className={styles.settingsLabel}>
            <strong>Current password:</strong>
          </p>
          <input
            type="password"
            className={styles.settingsInput}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
          <p className={styles.settingsLabel}>
            <strong>New password:</strong>
          </p>
          <input
            type="password"
            className={styles.settingsInput}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <p className={styles.settingsLabel}>
            <strong>Confirm new password:</strong>
          </p>
          <input
            type="password"
            className={styles.settingsInput}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat new password"
          />
          <button
            type="submit"
            disabled={loading}
            className={styles.settingsButton}
          >
            {loading ? 'Saving...' : 'Change password'}
          </button>
        </form>
        {message && (
          <p style={{ marginTop: '10px', color: '#16a34a' }}>{message}</p>
        )}
        {error && (
          <p style={{ marginTop: '10px', color: '#dc2626' }}>{error}</p>
        )}
      </div>
    </section>
  );
}