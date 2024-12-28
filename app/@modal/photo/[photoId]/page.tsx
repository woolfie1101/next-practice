import { Modal } from "@/components/modal";
import PhotoDisplay from "@/components/photo";
import { getImage } from "@/data/images";
import { PhotoData } from "@/types/photo-data";

type Props = {
  params: {
    photoId: string;
  };
};

export default async function Photo({ params: { photoId } }: Props) {
  const image: PhotoData = await getImage(photoId);

  if (!image?.id) {
    return <h1 className="text-center">No Photo Found for that ID.</h1>;
  }

  return (
    <Modal>
      <PhotoDisplay photoData={image} />
    </Modal>
  );
}
