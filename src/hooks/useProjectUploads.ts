import { create } from 'zustand';

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  projectId: string;
  folderId?: string;
  previewUrl?: string;
  isUploadedToS3?: boolean;
  isError?: boolean;
  cancelUpload: () => void;
}

interface State {
  uploads: FileUpload[];
  setFileUploadError: (fileId: string) => void;
  setFileUpload: (file: FileUpload) => void;
  setFileUploads: (files: FileUpload[]) => void;
  updateFileUploadProgress: (fileId: string, progress: number) => void;
  setIsUploadedToS3: (fileId: string) => void;
  removeFileUpload: (fileId: string) => void;
  removeUploadedFiles: () => void;
  reset: () => void;
}

export const useProjectUploads = create<State>((set) => ({
  uploads: [],
  setFileUpload: (fileUpload: FileUpload) =>
    set((state) => ({
      uploads: [fileUpload, ...state.uploads],
    })),
  setFileUploads: (fileUploads: FileUpload[]) => set(() => ({ uploads: fileUploads })),
  setFileUploadError: (fileId: string) =>
    set((state) => {
      const newUploads = state.uploads.map((fileUpload) =>
        fileUpload.id === fileId ? { ...fileUpload, isError: true, progress: 100 } : fileUpload,
      );

      localStorage.setItem('failedFileUploads', JSON.stringify(newUploads.filter((upload) => upload.isError)));

      return {
        uploads: newUploads,
      };
    }),
  updateFileUploadProgress: (fileId: string, progress: number) =>
    set((state) => ({
      uploads: state.uploads.map((fileUpload) =>
        fileUpload.id === fileId && !fileUpload.isError ? { ...fileUpload, progress } : fileUpload,
      ),
    })),
  setIsUploadedToS3: (fileId: string) =>
    set((state) => ({
      uploads: state.uploads.map((fileUpload) =>
        fileUpload.id === fileId ? { ...fileUpload, isUploadedToS3: true } : fileUpload,
      ),
    })),
  removeFileUpload: (fileId: string) =>
    set((state) => {
      const newUploads = state.uploads.filter((fileUpload) => fileUpload.id !== fileId);

      localStorage.setItem('failedFileUploads', JSON.stringify(newUploads.filter((upload) => upload.isError)));

      return {
        uploads: newUploads,
      };
    }),
  removeUploadedFiles: () =>
    set((state) => {
      const newUploads = state.uploads.filter((upload) => !upload.isError && upload.progress !== 100);

      localStorage.setItem('failedFileUploads', JSON.stringify(newUploads.filter((upload) => upload.isError)));

      return {
        uploads: newUploads,
      };
    }),
  reset: () => set((state) => ({ uploads: [] })),
}));
