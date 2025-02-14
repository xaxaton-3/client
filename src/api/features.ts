import { geoisApi } from '@/core/api';
import { Feature } from '@/types/features';

const FEATURES_BASE_URL = `/resource/${import.meta.env.VITE_GEOIS_ID}/feature`;

export const createFeature = async (feature: Feature) => {
  const { data } = await geoisApi.post<{ id: number }>(`${FEATURES_BASE_URL}/`, feature);
  return data;
};

export const uploadFile = async (params: { file: File; name: string }) => {
  const { data } = await geoisApi.post<{
    upload_meta: [
      {
        id: string;
        size: number;
        name: string;
        mime_type: string;
      },
    ];
  }>('/component/file_upload', params);
  return data;
};

export const createAttachment = async (attachment: {
  name: string;
  size: number;
  mime_type: string;
  file_upload: {
    id: string;
    size: number;
  };
}) => {
  const { data } = await geoisApi.post<{ id: number }>(
    `${FEATURES_BASE_URL}/attachment/`,
    attachment,
  );
  return data;
};

export const getFeatures = async () => {
  const { data } = await geoisApi.get<Feature[]>(`${FEATURES_BASE_URL}/`);
  return data;
};
