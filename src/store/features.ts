import { create } from 'zustand';
import {
  createAttachment,
  createFeature,
  getFeatures,
  updateFeature,
  removeFeature,
} from '@/api/features';
import { FeatureParams, Feature } from '@/types/features';
import { RequestMeta } from '@/types/requests';

interface FeaturesStore {
  features: Feature[];
  isLoading: boolean;
  getFeatures: () => Promise<void>;
  createFeature: (params: FeatureParams, attachments: RequestMeta['attachments']) => Promise<void>;
  updateFeature: (id: number, params: FeatureParams) => Promise<void>;
  removeFeature: (id: number, callback?: () => void) => Promise<void>;
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
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  createFeature: async (params, attachments) => {
    set({ isLoading: true });
    try {
      const feature = await createFeature(params);

      if (attachments.length) {
        const attachmentsPromises = attachments.map((attachment) => {
          return createAttachment(feature.id, {
            file_upload: {
              id: attachment.id,
              size: attachment.size,
            },
            mime_type: attachment.mime_type,
            name: attachment.name,
            size: attachment.size,
          });
        });

        await Promise.all(attachmentsPromises);
      }

      const features = await getFeatures();
      set({ features });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateFeature: async (id, params) => {
    set({ isLoading: true });
    try {
      await updateFeature(id, params);
      const features = await getFeatures();
      set({ features });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  removeFeature: async (id, callback) => {
    set({ isLoading: true });
    try {
      await removeFeature([{ id }]);
      set((state) => ({ features: state.features.filter((feature) => feature.id !== id) }));
      callback?.();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
