import { create } from 'zustand';

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  previewUrl?: string;
  isError?: boolean;
}

interface State {
  uploads: FileUpload[];
  setFileUploadError: (fileId: string) => void;
  setFileUpload: (file: FileUpload) => void;
  updateFileUploadProgress: (fileId: string, progress: number) => void;
}

export const useProjectUploads = create<State>((set) => ({
  uploads: [],
  setFileUpload: (fileUpload: FileUpload) =>
    set((state) => ({
      uploads: [fileUpload, ...state.uploads],
    })),
  setFileUploadError: (fileId: string) =>
    set((state) => ({
      uploads: state.uploads.map((fileUpload) =>
        fileUpload.id === fileId ? { ...fileUpload, isError: true, progress: 100 } : fileUpload,
      ),
    })),
  updateFileUploadProgress: (fileId: string, progress: number) =>
    set((state) => ({
      uploads: state.uploads.map((fileUpload) => (fileUpload.id === fileId ? { ...fileUpload, progress } : fileUpload)),
    })),
}));
