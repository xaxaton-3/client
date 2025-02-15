import { useEffect } from 'react';
import { useFeaturesStore } from '@/store/features';

const Features = () => {
  const features = useFeaturesStore((state) => state.features);
  const isLoading = useFeaturesStore((state) => state.isLoading);
  const getFeatures = useFeaturesStore((state) => state.getFeatures);

  useEffect(() => {
    getFeatures();
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <ul>
      {features.map((feature) => (
        <li key={feature.id}>{JSON.stringify(feature)}</li>
      ))}
    </ul>
  );
};

export default Features;
