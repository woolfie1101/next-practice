"use server";

import { PhotoData } from "@/types/photo-data";

export const getImages = async () => {
  const response = await fetch('http://localhost:3500/images', { cache: 'no-store' })
  const photoData: PhotoData[] = await response.json()
  return photoData 
}
 