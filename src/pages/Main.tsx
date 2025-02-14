import { useEffect } from 'react';
// import ReactNgwMap from '@nextgis/react-ngw-leaflet';
import { getFeatures } from '@/api/features';
// import Book from '@/components/book/Book';
// import { districts } from '@/data/districts';
import FeaturesForm from '@/components/features/FeaturesForm';

const Main = () => {
  useEffect(() => {
    getFeatures();
  }, []);

  return (
    <div className="flex justify-content-center align-items-center">
      {/* <ul>
        {districts.map((district, index) => (
          <li key={index}>{district.name}</li>
        ))}
      </ul> */}

      <FeaturesForm />

      {/* <Book /> */}

      {/* <ReactNgwMap
        baseUrl="https://geois2.orb.ru"
        resources={[{ resource: Number(import.meta.env.VITE_GEOIS_ID), id: 'webmap', fit: true }]}
      /> */}
    </div>
  );
};

export default Main;
