import axios from 'axios';
import {
  usePostAssetsMultipartComplete,
  usePostAssetsMultipartStart,
  usePostAssetsMultipartUrl,
  usePostAssetsUrl,
} from '../services/hooks';
import { FileUpload } from './useProjectUploads';

const CHUNK_SIZE = 20 * 1024 * 1024;
const MULTIPART_UPLOAD_THRESHOLD = 10 * 1024 * 1024;

interface UploadFileData {
  clientId: string;
  file: File;
}

interface UploadFileOptions {
  onSuccess: (data: { key: string; fileId: string }) => void;
  onError: (type?: 'user') => void;
  onSettled?: () => void;
  onProgressChange?: (progress: number) => void;
}

interface Props {
  projectId: string;
}

export const useMultipartUpload = ({ projectId }: Props) => {
  const { mutateAsync: getPresignedUrl } = usePostAssetsUrl();

  const { mutateAsync: startMultipartUpload } = usePostAssetsMultipartStart();
  const { mutateAsync: getMultipartPresignedUrl } = usePostAssetsMultipartUrl();
  const { mutateAsync: completeMultipartUpload } = usePostAssetsMultipartComplete();

  const uploadFile = async ({ file }: UploadFileData, onProgressChange?: (progress: number) => void) => {
    const { url, key, fileId } = await getPresignedUrl({
      requestBody: { fileName: file.name, contentType: file.type, projectId },
    });

    await axios.put(url, file, {
      headers: { 'Content-Type': file.type },
      onUploadProgress: (event) => {
        if (event.total) {
          onProgressChange?.(Math.round((event.loaded * 100) / event.total));
        }
      },
    });

    return { key, fileId };
  };

  const uploadFileInChunks = async (
    { file, clientId }: UploadFileData,
    onProgressChange?: (progress: number) => void,
  ) => {
    const { uploadId, fileId, key } = await startMultipartUpload({
      requestBody: { fileName: file.name, contentType: file.type, projectId },
    });

    const chunksCount = Math.ceil(file.size / CHUNK_SIZE);
    const uploadedParts: any[] = [];

    for (let partNumber = 1; partNumber <= chunksCount; partNumber++) {
      const failedFileUploads = JSON.parse(localStorage.getItem('failedFileUploads') ?? '[]') as FileUpload[];

      if (failedFileUploads.find((upload) => upload.id === clientId)) {
        throw new Error();
      }

      const start = (partNumber - 1) * CHUNK_SIZE;
      const end = Math.min(partNumber * CHUNK_SIZE, file.size);
      const blob = file.slice(start, end);

      const { url } = await getMultipartPresignedUrl({ requestBody: { key, partNumber, uploadId } });

      const res = await axios.put(url, blob, {
        headers: { 'Content-Type': file.type },
        onUploadProgress: (event) => {
          if (event.total) {
            const progress = (event.loaded * 100) / event.total;
            onProgressChange?.(Math.round((uploadedParts.length * 100 + progress) / chunksCount));
          }
        },
      });

      uploadedParts.push({
        ETag: res.headers.etag,
        PartNumber: partNumber,
      });
    }

    await completeMultipartUpload({ requestBody: { key, uploadId, parts: uploadedParts } });

    return { fileId, key };
  };

  return (
    { file, clientId }: UploadFileData,
    { onSuccess, onError, onSettled, onProgressChange }: UploadFileOptions,
  ) => {
    let isError = false;
    const uploadFn = file.size < MULTIPART_UPLOAD_THRESHOLD ? uploadFile : uploadFileInChunks;

    uploadFn({ file, clientId }, onProgressChange)
      .then((data) => {
        if (!isError) {
          onSuccess(data);
        }
      })
      .catch(() => {
        if (!isError) {
          onError();
        }
      })
      .finally(() => {
        if (!isError) {
          onSettled?.();
        }
      });

    return () => {
      isError = true;
      onError('user');
    };
  };
};
