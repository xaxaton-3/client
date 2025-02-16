export const getImageUrl = (featureId: number, attachmentId: number) => {
  const baseUrl = import.meta.env.VITE_GEOIS_API_URL;
  const resourceId = import.meta.env.VITE_GEOIS_ID;
  return `${baseUrl}/resource/${resourceId}/feature/${featureId}/attachment/${attachmentId}/image`;
};
