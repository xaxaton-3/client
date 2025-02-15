import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { createAttachment, createFeature, getFeatures, uploadFile } from '@/api/features';
import { FeatureParams, Feature } from '@/types/features';

interface FeaturesStore {
  features: Feature[];
  isLoading: boolean;
  getFeatures: () => Promise<void>;
  createFeature: (params: FeatureParams, files: File[]) => Promise<void>;
}

export const useFeaturesStore = create<FeaturesStore>((set) => ({
  features: [],
  isLoading: false,
  getFeatures: async () => {
    set({ isLoading: true });
    try {
      const features = await getFeatures();
      set({ features });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
  createFeature: async (params, files) => {
    set({ isLoading: true });
    try {
      const feature = await createFeature(params);

      if (files.length) {
        const filesPromises = files.map((file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('name', `${uuidv4()}-${file.name}`);
          return uploadFile(data);
        });

        const attachments = await Promise.all(filesPromises);

        const attachmentsPromises = attachments.map((attachment) => {
          const [data] = attachment.upload_meta;
          return createAttachment(feature.id, {
            name: data.name,
            size: data.size,
            mime_type: data.mime_type,
            file_upload: {
              id: data.id,
              size: data.size,
            },
          });
        });

        await Promise.all(attachmentsPromises);

        const features = await getFeatures();
        set({ features });
      }
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
}));
