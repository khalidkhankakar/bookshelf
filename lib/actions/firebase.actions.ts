import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

type UploadFileResponse = {
    downloadURL: string | null;
    progress: number;
  };
  

export const uploadFile = (
    file: File,
    onProgress: (progress: number) => void,
    onComplete: (response: UploadFileResponse) => void,
    onError: (error: Error) => void
  ) => {
    const storageRef = ref(storage, `books/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress); // Call the progress callback
      },
      (error) => {
        console.error("Error uploading file:", error);
        onError(error); // Call the error callback
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        onComplete({ downloadURL: url, progress: 100 }); // Call the complete callback
      }
    );
  };