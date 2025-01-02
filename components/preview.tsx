"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill-new/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  // const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), {ssr: false}),[]);
  const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <p>로딩중</p>,
  });

  return <ReactQuill theme="bubble" value={value} readOnly />;
};
