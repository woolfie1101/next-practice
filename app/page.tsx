import PhotoDisplay from "@/components/photo";
import { getImages } from "@/data/images";

export default async function Home() {
  const images = await getImages();

  if (!images?.length) {
    return <h1>No Images to Display</h1>;
  }

  return (
    <main className="flex flex-col items-center gap-8 pb-8">
      {images.map((image) => (
        <PhotoDisplay key={image.id} photoData={image} />
      ))}
    </main>
  );
}
