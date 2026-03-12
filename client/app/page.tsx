'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { resolvePhotoUrl } from "@/lib/api";

type Photo = {
  id: number;
  photoUrl: string;
  description?: string | null;
};

type Album = {
  id: number;
  name: string;
  photos: Photo[];
};

export default function Home() {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/public/random`)
        .then((res) => (res.ok ? res.json() : []))
        .then((data: Album[]) => setAlbums(Array.isArray(data) ? data : []))
        .catch(() => setAlbums([]));
    }, []);

    return (
        <section>
          <h1 hidden>Главная страница</h1>
          <p>
            Welcome to our PhotoBank Main Page!
            <br />
            Here you can find a lot of beautiful photos and videos.
            <br />
            Discover incredible moments and share your inspiration
            {" "}
            with others by{" "}
            <Link href="/profile/albums" className="text-[#a78bfa]">
              creating
            </Link>{" "}
            your own photo albums.
          </p>

          {albums.length > 0 && (
            <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {albums.map((album) => (
                <article key={album.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <h2 className="mb-3 text-lg font-semibold">
                    <Link
                      href={`/albums/${album.id}`}
                      className="text-[#a78bfa] hover:underline"
                    >
                      {album.name}
                    </Link>
                  </h2>
                  <div className="grid grid-cols-2 grid-rows-2 gap-2">
                    {album.photos.slice(0, 4).map((photo) => (
                      <div
                        key={photo.id}
                        className="w-full h-28 md:h-40 overflow-hidden rounded-md"
                      >
                        <img
                          src={resolvePhotoUrl(photo.photoUrl)}
                          alt={photo.description ?? "Photo"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </section>
          )}
        </section>
    );
}
