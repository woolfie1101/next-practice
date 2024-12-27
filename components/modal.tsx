"use client";

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  route?: string;
}

export const Modal = ({
  children,
  route
}: ModalProps) => {

  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  },[])
  const onOpenChange = () => {
    if(route) {
      router.push(route);
      return;
    }
    router.back();
    return;
  }


  if(!isMounted){
    return null;
  }
  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={onOpenChange}
    >
      <DialogTitle></DialogTitle>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}