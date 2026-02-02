import { create } from 'zustand';

import { ProjectFileBodyDto } from '../services/types';

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
  uploadsQueue: [
    string,
    {
      id: string;
      requestBody: ProjectFileBodyDto;
    },
  ][];
  setFileUploadError: (fileId: string) => void;
  setFileUpload: (file: FileUpload) => void;
  setFileUploads: (files: FileUpload[]) => void;
  updateFileUploadProgress: (fileId: string, progress: number) => void;
  setIsUploadedToS3: (fileId: string) => void;
  removeFileUpload: (fileId: string) => void;
  removeUploadedFiles: () => void;
  addItemToUploadQueue: (id: string, payload: { id: string; requestBody: ProjectFileBodyDto }) => void;
  removeItemFromUploadQueue: (id: string) => void;
}

export const useProjectUploads = create<State>((set) => ({
  uploads: [],
  uploadsQueue: [],
  setFileUploads: (fileUploads: FileUpload[]) => set(() => ({ uploads: fileUploads })),
  setFileUpload: (fileUpload: FileUpload) =>
    set((state) => {
      localStorage.setItem('uploads', JSON.stringify([fileUpload, ...state.uploads]));

      return {
        ...state,
        uploads: [fileUpload, ...state.uploads],
      };
    }),
  setFileUploadError: (fileId: string) =>
    set((state) => {
      const newUploads = state.uploads.map((fileUpload) =>
        fileUpload.id === fileId ? { ...fileUpload, isError: true, progress: 100 } : fileUpload,
      );

      localStorage.setItem('uploads', JSON.stringify(newUploads));

      return { ...state, uploads: newUploads };
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

      return { ...state, uploads: newUploads };
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

      return { ...state, uploads: newUploads };
    }),
  removeUploadedFiles: () =>
    set((state) => {
      const newUploads = state.uploads.filter((upload) => !upload.isError && upload.progress !== 100);

      localStorage.setItem('uploads', JSON.stringify(newUploads));

      return { ...state, uploads: newUploads };
    }),
  addItemToUploadQueue: (id: string, payload: { id: string; requestBody: ProjectFileBodyDto }) =>
    set((state) => {
      const newUploadsQueue = [
        ...state.uploadsQueue,
        [id, payload] as [string, { id: string; requestBody: ProjectFileBodyDto }],
      ];

      return { ...state, uploadsQueue: newUploadsQueue };
    }),
  removeItemFromUploadQueue: (id: string) =>
    set((state) => {
      const newUploadsQueue = state.uploadsQueue.filter(([uploadId]) => uploadId !== id);

      return { ...state, uploadsQueue: newUploadsQueue };
    }),
}));
