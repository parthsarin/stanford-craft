import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState } from "react";
import { MySwal } from "../../../Generic/Notify";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { UserContext } from "../../../Auth";
import Loader from "../../../Generic/Loader";

interface PhotoSelectorProps {
  onPhotoSelected: (photoUrl: string) => void;
  className: string;
}

const PhotoSelector = ({ className, onPhotoSelected }: PhotoSelectorProps) => {
  const { user } = useContext(UserContext);
  const suppressEvent = (e: React.DragEvent | React.MouseEvent ) => {
    e.preventDefault();
    e.stopPropagation();
  }
  
  const selectorRef = useRef<HTMLButtonElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [dragTarget, setDragTarget] = useState<HTMLButtonElement | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handlePhoto = async (file: File) => {
    // TODO: crop the file
    // check file size
    const size = Math.round(file.size / 1024);
    if (size > 2048) {
      MySwal.fire({
        icon: "error",
        title: "File too large",
        text: "The file you selected is too large. Please select a file that is less than 2MB.",
      });
      return;
    }

    // check image dimensions
    const img = new Image();
    const isSquare = await new Promise((resolve, reject) => {
      img.onload = () => {
        resolve(img.width === img.height);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
    if (!isSquare) {
      MySwal.fire({
        icon: "error",
        title: "Image not square",
        text: "The image you selected is not square. Please select a square image.",
      });
      return;
    }

    // upload the file to the user's storage bucket
    if (!user) return;
    setLoading(true);
    const ext = file.name.split(".").pop();
    const storage = getStorage();
    const storageRef = ref(storage, `profiles/${user.uid}/profile.${ext}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref)
      .then(url => {
        setLoading(false);
        onPhotoSelected(url)
      })
      .catch(err => {
        setLoading(false);
        MySwal.fire({
          icon: "error",
          title: "Error uploading photo",
          text: err.message,
        });
      });
    })
  };

  return (
    <>
      {isLoading && <Loader />}
      <input ref={hiddenInputRef} type="file" className="hidden" onChange={(e) => {
        if (e.target.files) {
          handlePhoto(e.target.files[0]);
        }
      }} />
      <button
        className={`${className} flex justify-center items-center 
         border border-dashed border-4 z-50
         hover:bg-slate-200/25 text-center`}
        ref={selectorRef}
        tabIndex={0}
        onDragOver={suppressEvent}
        onDragEnter={(e) => {
          suppressEvent(e);
          if (selectorRef.current && !dragTarget) {
            selectorRef.current.classList!.add("bg-slate-200/25");
            setDragTarget(e.currentTarget);
          }
        }}
        onDragLeave={(e) => {
          suppressEvent(e);
          if (selectorRef.current && dragTarget === e.currentTarget) {
            selectorRef.current.classList!.remove("bg-slate-200/25");
            setDragTarget(null);
          }
        }}
        onDrop={(e) => {
          suppressEvent(e);
          const files = e.dataTransfer.files;
          if (files.length > 0) {
            handlePhoto(files[0]);
          }
          setDragTarget(null);
          if (selectorRef.current) {
            selectorRef.current.classList!.remove("bg-slate-200/25");
          }
        }}
        onClick={(e) => {
          suppressEvent(e);
          if (hiddenInputRef.current) {
            hiddenInputRef.current.click();
          }
        }}
      >
        <div className="flex flex-col justify-center align-middle">
          <FontAwesomeIcon icon={faUpload} size={"4x"} />
        </div>
      </button>
    </>
  );
}

export default PhotoSelector;