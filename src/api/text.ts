import { api } from '@/core/api';

export const getAIText = async (text: string) => {
  const { data } = await api.post<{ text: string }>('/unsafe/airefactor/text/', { text });
  return data;
};
