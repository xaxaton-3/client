import Map from '@/components/map/Map';
import { Flex } from 'antd';
// import ReactNgwMap from '@nextgis/react-ngw-leaflet';
// import Book from '@/components/book/Book';
// import { districts } from '@/data/districts';
// import FeaturesForm from '@/components/features/FeaturesForm';

const Main = () => {
  return (
    <Flex
      justify="center"
      align="center"
    >
      {/* <ul>
        {districts.map((district, index) => (
          <li key={index}>{district.name}</li>
        ))}
      </ul> */}

      {/* <FeaturesForm /> */}

      {/* <ReactNgwMap
        baseUrl="https://geois2.orb.ru"
        resources={[{ resource: Number(import.meta.env.VITE_GEOIS_ID), id: 'webmap', fit: true }]}
        auth={{
          login: import.meta.env.VITE_GEOIS_USERNAME,
          password: import.meta.env.VITE_GEOIS_PASSWORD,
        }}
      /> */}

      <Map />
    </Flex>
  );
};

export default Main;
