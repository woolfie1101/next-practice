import { PhotoList } from "@/components/photo/photo-list";
import { getImages } from "@/data/images";

export default async function Photo() {
  const images = await getImages();
  return <PhotoList images={images} />;
}
