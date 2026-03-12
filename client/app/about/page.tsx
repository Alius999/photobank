import Link from "next/link";

export default function AboutUs() {
  return (
    <section>
      <h1>About PhotoBank</h1>
      <p>
        PhotoBank is a simple place to collect, organize, and discover
        photography from people all over the world. We focus on clean layouts,
        fast loading, and a distraction‑free viewing experience.
      </p>
      <p>
        Our goal is to make it easy for anyone to upload images, group them
        into albums, and share them with friends or clients. Whether you are a
        professional photographer or just love taking pictures on your phone,
        PhotoBank helps you keep everything in one place.
      </p>
      <p>
        All photos are displayed in an adaptive gallery, so they look good on
        large monitors and on mobile devices. You can open any image, see
        detailed information, recommended photos by tag, and leave comments to
        share your thoughts.
      </p>
      <p>
        To explore public content, just go to our{" "}
        <Link href="/gallery" style={{ color: "#a78bfa" }}>
          Gallery
        </Link>
        , where you will find photos from different albums and users.
      </p>
      <p>
        If you want to create your own albums, you can{" "}
        <Link href="/registration" style={{ color: "#a78bfa" }}>
          register
        </Link>{" "}
        a new account in a couple of seconds. We only ask for the minimum
        information needed to keep your profile safe.
      </p>
      <p>
        After registration, you can{" "}
        <Link href="/login" style={{ color: "#a78bfa" }}>
          log in
        </Link>{" "}
        and access the Profile section, where you manage your personal photos,
        albums, and account settings.
      </p>
      <p>
        Inside your profile you can upload multiple images at once, assign them
        to albums, and later browse your own gallery of memories. Albums help
        you group photos by topic, event, or client project.
      </p>
      <p>
        We also support simple social interaction: you can leave comments under
        photos and read feedback from other users. This makes PhotoBank not
        only a storage, but also a small community around visual stories.
      </p>
      <p>
        The project is evolving step by step. We carefully improve the design,
        add new features, and pay attention to performance so that the
        experience stays smooth even with many images.
      </p>
      <p>
        We believe that every photo has a story. PhotoBank gives you a calm,
        organized space to store these stories and return to them at any time.
      </p>
      <p>
        If you have ideas how to make PhotoBank better, feel free to share
        them. For now, you can start by visiting the{" "}
        <Link href="/gallery" style={{ color: "#a78bfa" }}>
          Gallery
        </Link>
        , creating your first album, and filling it with images that matter to
        you.
      </p>
    </section>
  );
}