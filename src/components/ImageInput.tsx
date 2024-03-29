"use client";

import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import { ChangeEventHandler, DragEventHandler, InputHTMLAttributes, useRef, useState } from "react";

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function ImageInput({ name }: ImageInputProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDragingOver, setDragingOver] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const handleDrop: DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    if (input.current) {
      input.current.files = e.dataTransfer.files;
      setImage(URL.createObjectURL(input.current.files[0]));
    }
    setDragingOver(false);
  };

  return (
    <label
      onDragEnter={() => setDragingOver(true)}
      onDragLeave={() => setDragingOver(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div
        className={clsx(
          "w-[400px] min-h-[200px] bg-gray-100 flex items-center justify-center relative overflow-hidden border-solid border-5 border-default transition-colors pointer-events-none",
          {
            "text-primary-300 border-primary-300": isDragingOver,
            "text-default": !isDragingOver,
          }
        )}
      >
        <div className="flex flex-col gap-4 pointer-events-none">
          <FontAwesomeIcon className="text-3xl pointer-events-none" icon={faImage} />
          <div className="pointer-events-none">(click or drag and drop)</div>
        </div>
        {image && <Image src={image} className="absolute top-0 left-0" alt="chosen image" fill={true} />}
      </div>
      <input type="file" name={name} onChange={handleChange} hidden ref={input} />
    </label>
  );
}
