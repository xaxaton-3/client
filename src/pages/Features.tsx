import { useEffect, useMemo, useState } from 'react';
import { Flex, Select, Spin } from 'antd';
import Book from '@/components/book/Book';
import { useFeaturesStore } from '@/store/features';
import { locations } from '@/data/locations';

const Features = () => {
  const featuresStore = useFeaturesStore();
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    featuresStore.getFeatures();
  }, []);

  const features = useMemo(() => {
    const filteredFeatures = location
      ? featuresStore.features.filter((feature) => feature.fields.kontrakt === location)
      : featuresStore.features;
    return filteredFeatures.sort((a, b) => a.fields.fio.localeCompare(b.fields.fio));
  }, [location, featuresStore.features]);

  if (featuresStore.isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Flex
      justify="center"
      align="center"
      vertical
      gap={24}
    >
      <Select
        value={location}
        onChange={setLocation}
        placeholder="Выберите место боевых действий"
        allowClear
      >
        {locations.map((location) => (
          <Select.Option
            key={location}
            value={location}
          >
            {location}
          </Select.Option>
        ))}
      </Select>

      <Book features={features} />
    </Flex>
  );
};

export default Features;
