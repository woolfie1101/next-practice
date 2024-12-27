import PhotoDisplay from "."
import { PhotoData } from "@/types/photo-data"

interface Props {
  images: PhotoData[]
}

export const PhotoList = ({
  images
}: Props) => {
  if (!images?.length) {
    return <h1>No Images to Display</h1>
  }

  return (
    <div className="flex flex-col items-center gap-8 pb-8">
      {images.map(image => (
        <PhotoDisplay key={image.id} photoData={image} />
      ))}
    </div>
  )
}