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
}

export const useProjectUploads = create<State>((set) => ({
  uploads: [],
  setFileUploads: (fileUploads: FileUpload[]) => set(() => ({ uploads: fileUploads })),
  setFileUpload: (fileUpload: FileUpload) =>
    set((state) => {
      localStorage.setItem('uploads', JSON.stringify([fileUpload, ...state.uploads]));

      return {
        uploads: [fileUpload, ...state.uploads],
      };
    }),
  setFileUploadError: (fileId: string) =>
    set((state) => {
      const newUploads = state.uploads.map((fileUpload) =>
        fileUpload.id === fileId ? { ...fileUpload, isError: true, progress: 100 } : fileUpload,
      );

      localStorage.setItem('uploads', JSON.stringify(newUploads));

      return { uploads: newUploads };
    }),
  updateFileUploadProgress: (fileId: string, progress: number) =>
    set((state) => {
      const newUploads = state.uploads.map((fileUpload) =>
        fileUpload.id === fileId && !fileUpload.isError ? { ...fileUpload, progress } : fileUpload,
      );

      if (progress === 100) {
        localStorage.setItem(
          'uploads',
          JSON.stringify(newUploads.filter((upload) => upload.progress !== 100 && !upload.isError)),
        );
      }

      return { uploads: newUploads };
    }),
  setIsUploadedToS3: (fileId: string) =>
    set((state) => ({
      uploads: state.uploads.map((fileUpload) =>
        fileUpload.id === fileId ? { ...fileUpload, isUploadedToS3: true } : fileUpload,
      ),
    })),
  removeFileUpload: (fileId: string) =>
    set((state) => {
      const newUploads = state.uploads.filter((fileUpload) => fileUpload.id !== fileId);

      localStorage.setItem('uploads', JSON.stringify(newUploads));

      return { uploads: newUploads };
    }),
  removeUploadedFiles: () =>
    set((state) => {
      const newUploads = state.uploads.filter((upload) => !upload.isError && upload.progress !== 100);

      localStorage.setItem('uploads', JSON.stringify(newUploads));

      return { uploads: newUploads };
    }),
}));
