/**
 * Получить базовый URL API
 */
export function apiBase(): string {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  // Убираем завершающий слэш, если есть
  return base.replace(/\/$/, '');
}

/**
 * Преобразовать относительный путь фото в полный URL
 * @param photoUrl - Относительный путь (например, /uploads/photos/file.jpg) или полный URL
 */
export function resolvePhotoUrl(photoUrl: string | null | undefined): string {
  if (!photoUrl) {
    return '';
  }

  // Если это уже полный URL (начинается с http:// или https://), возвращаем как есть
  if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
    return photoUrl;
  }

  // Если это относительный путь, добавляем базовый URL API
  const base = apiBase();
  // Убираем начальный слэш из photoUrl, если есть, чтобы избежать двойных слэшей
  const cleanPath = photoUrl.startsWith('/') ? photoUrl : `/${photoUrl}`;
  
  return `${base}${cleanPath}`;
}

