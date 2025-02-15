import { create } from 'zustand';
import { getFeatures } from '@/api/features';
import { FeatureParams, Feature } from '@/types/features';

interface FeaturesStore {
  features: Feature[];
  isLoading: boolean;
  getFeatures: () => Promise<void>;
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
  createFeature: async (params: FeatureParams) => {
    set({ isLoading: true });
    try {
      console.log(params);
      // await createFeature(params)
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
}));
