import { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
}

export default function FileUpload({
  onFilesChange,
  accept = 'image/*',
  multiple = false,
  maxSize = 5,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max size is ${maxSize}MB`);
        return false;
      }
      return true;
    });

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div>
      <div
        className={`file-upload ${dragOver ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="file-upload-icon">📁</div>
        <div className="file-upload-text">
          {multiple ? 'Drop files here or click to upload' : 'Drop file here or click to upload'}
        </div>
        <div className="file-upload-hint">
          Maximum file size: {maxSize}MB
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="file-upload-input"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
        />
      </div>

      {files.length > 0 && (
        <div className="file-preview-list">
          {files.map((file, index) => (
            <div key={index} className="file-preview">
              {file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="file-preview-image"
                />
              ) : (
                <div className="file-preview-image" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-tertiary)'
                }}>
                  📄
                </div>
              )}
              <div className="file-preview-name">{file.name}</div>
              <div className="file-preview-size">{formatFileSize(file.size)}</div>
              <button
                className="file-preview-remove"
                onClick={() => removeFile(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
