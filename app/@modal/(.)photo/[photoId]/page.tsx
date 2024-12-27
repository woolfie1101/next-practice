import { Modal } from "@/components/modal";
import PhotoDisplay from "@/components/photo";
import { getImage } from "@/data/images"
import { PhotoData } from "@/types/photo-data";

interface Props {  
  params: Promise<{ 
    photoId: string;
  }>;
}

const Photo = async ({
  params
}:Props) => {  
  const { photoId } = await params;
  const image: PhotoData = await getImage(photoId);

  if (!image?.id) {
      return (
          <h1 className="text-center">No Photo Found for that ID.</h1>
      )
  }

  return (
      <Modal>        
        <PhotoDisplay photoData={image} />
      </Modal>
      
  )
}

export default Photo