import PhotoDisplay from "@/components/photo";
import { getImage } from "@/data/images"
import { PhotoData } from "@/types/photo-data"

type Props = {
  params: Promise<{photoId: string;}>;
}

export default async function Photo({ params }: Props) {
  const {photoId} = await params;
  const image: PhotoData = await getImage(photoId);

  if(!image?.id){
    return (
      <h1 className="text-center">No Photo Found for that ID.</h1>
    )
  }
  return (
    <div className="mt-2 grid place-content-center">
        <PhotoDisplay photoData={image} />
    </div>
)
}