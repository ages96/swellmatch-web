// Import necessary libraries and dependencies.
import React, { useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import fileIcon from "../public/assets/file.svg";
import { FormItems } from "@/app/page";

// Define props for the MyDropzoneComponent.
interface Props {
  files: File[];
  base64files:object[];
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errorMessage:string;
}

// MyDropzoneComponent component for file uploading.
const MyDropzoneComponent: React.FC<Props> = ({ files, updateForm,base64files,errorMessage }) => {

  const [newFiles, setFiles] = useState<File[]>([]);

  // Handles the drop event when files are dropped into the dropzone.
  const handleDrop = (acceptedFiles: File[], _fileRejections: FileRejection[]) => {

    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string; // Get the base64 data
        let objectFile = {
          name:file.name,
          size:file.size,
          base64:base64Data,
        }
        base64files.push(objectFile)
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    });
    
    const newFiles = [...files, ...acceptedFiles];
    updateForm({ base64files: base64files });
    setFiles(newFiles);
    let elements = document.getElementsByClassName("validation-file-upload") as HTMLCollectionOf<HTMLElement>;
    
    // Mengubah tampilan setiap elemen menjadi "none" untuk menyembunyikannya
    for(var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  };

  // Handles the remove event when a file is removed from the dropzone.
  const handleRemove = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      // Remove the file from base64files array
      const updatedBase64Files = base64files.filter((_, i) => i !== index);
      updateForm({ base64files: updatedBase64Files });
      
      // Remove the file from files array
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
  };

  // Formats file size to a readable format.
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  return (
    <div>
      {/* File upload label */}
      <label className='brief-input-file' htmlFor="fileInput">Help us verify your identity by uploading a photo of your ID/KTP or Passport</label>

      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500" style={{paddingBottom: "20px",marginTop: "-30px"}}>{errorMessage}</div>
      )}

      {/* Dropzone area */}
      {(newFiles.length == 0 && base64files.length==0) && (
        <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div className='container-dropzone' {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} id="fileInput" />
            <p className='desc-input-file'>Drag and drop</p>
            <p className='desc-input-file2'>or select files from device max. 2MB</p>
            <p className='desc-input-file3'>Upload</p>
          </div>
        )}
        </Dropzone>
      )}

      {/* Preview of uploaded files */}
      {(newFiles.length>0 || base64files.length == 0) && (
        <div>
          <ul className="preview-files">
            {newFiles.map((file:any, index) => (
              <li key={file.name} style={{height: "73px",padding: "20px",background: "#232323"}}>
                <div className="flex flex-col gap-3 md:flex-row md:gap-5 pb-4">
                  <div className="flex flex-col col-span-2">                 
                    <img height={30} src={fileIcon.src} alt="file icon"/>
                  </div>
                  <div className="flex flex-col gap-2 w-full col-span-10">
                    <p className="entry-upload-name">{file.name}</p>
                    <p className="entry-upload-size">{formatFileSize(file.size)}</p>
                  </div>
                  <div className="flex flex-col col-span-1">
                  {/* Button to remove file */}
                  <button
                    className="remove-input-button"
                    onClick={(e) => handleRemove(index, e)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <path d="M12 4.5L4 12.5" stroke="#E60202" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4 4.5L12 12.5" stroke="#E60202" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                    
                  </div>
                </div>

              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Preview of uploaded files (base64 format) */}
      {(newFiles.length == 0 && base64files.length > 0) && (
        <div>
          <ul className="preview-files">
            {base64files.map((file:any, index) => (
              <li key={file.name} style={{height: "73px",padding: "20px",background: "#232323"}}>
                <div className="flex flex-col gap-3 md:flex-row md:gap-5 pb-4">
                  <div className="flex flex-col col-span-2">                 
                    <img height={30} src={fileIcon.src} alt="file icon"/>
                  </div>
                  <div className="flex flex-col gap-2 w-full col-span-10">
                    <p className="entry-upload-name">{file.name}</p>
                    <p className="entry-upload-size">{formatFileSize(file.size)}</p>
                  </div>
                  <div className="flex flex-col col-span-1">
                  {/* Button to remove file */}
                  <button
                    className="remove-input-button"
                    onClick={(e) => handleRemove(index, e)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <path d="M12 4.5L4 12.5" stroke="#E60202" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4 4.5L12 12.5" stroke="#E60202" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                    
                  </div>
                </div>

              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Styles for the dropzone area.
const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default MyDropzoneComponent;