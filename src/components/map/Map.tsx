// import { useEffect } from 'react';
// import styles from './Map.module.scss';
// import { useUserStore } from '@/store/user';
// import { useLogsStore } from '@/store/logs';

// const Map = () => {
//   const userStore = useUserStore();
//   const logsStore = useLogsStore();

//   useEffect(() => {
//     if (userStore.user) {
//       logsStore.createLog({
//         user: userStore.user.id,
//         log: 'Просмотр карты',
//       });
//     }
//   }, [userStore.user]);

//   return (
//     <iframe
//       className={styles.map}
//       src="https://geois2.orb.ru/resource/8899/display/tiny?base=basemap_0&lon=57.0861&lat=53.6199&angle=0&zoom=7&styles=8803%2C7986%2C7975%2C2092&linkMainMap=true&events=false&panel=none&controls=&panels="
//     />
//   );
// };

// export default Map;
import { useEffect, useMemo, useRef, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import { useFeaturesStore } from '@/store/features';
import { Select } from 'antd';
import { locations } from '@/data/locations';
import { districtsWithNormalCoordsMap } from '@/data/districts';
import { getImageUrl } from '@/utils/image';
import { Feature as IFeature } from '@/types/features';
import { useUserStore } from '@/store/user';
import { useLogsStore } from '@/store/logs';

const MapComponent = () => {
  const userStore = useUserStore();
  const logsStore = useLogsStore();
  const featuresStore = useFeaturesStore();
  const [location, setLocation] = useState<string | null>(null);
  const [popupContent, setPopupContent] = useState('');
  const [_counter, setCounter] = useState<Record<string, number>>({});

  useEffect(() => {
    if (userStore.user) {
      logsStore.createLog({
        user: userStore.user.id,
        log: 'Просмотр карты',
      });
    }
  }, [userStore.user]);

  useEffect(() => {
    featuresStore.getFeatures();
  }, []);

  const features = useMemo(() => {
    const filteredFeatures = location
      ? featuresStore.features.filter((feature) => feature.fields.kontrakt === location)
      : featuresStore.features;
    return filteredFeatures.sort((a, b) => a.fields.fio.localeCompare(b.fields.fio));
  }, [location, featuresStore.features]);

  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const vectorSourceRef = useRef(new VectorSource()); // Создаем источник данных для маркеров

  useEffect(() => {
    removeAllMarkers();
    setCounter({});

    features.forEach((f) => {
      const district = districtsWithNormalCoordsMap[f.fields.n_raion];

      setCounter((counter) => {
        const addition = counter[district.name] || 0;

        // Создаем маркер
        const marker = new Feature({
          geometry: new Point(fromLonLat([district.longitude + addition * 0.1, district.latitude])), // Координаты Москвы
        });

        const markerStyle = new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: f.extensions.attachment?.length
              ? `${getImageUrl(f.id, f.extensions.attachment[0].id)}?size=64x64`
              : 'https://openlayers.org/en/latest/examples/data/icon.png', // URL иконки маркера
          }),
        });

        marker.setStyle(markerStyle);

        // Добавляем данные объекта в маркер
        marker.setProperties({
          ...f, // Сохраняем все данные объекта в маркере
        });

        // Добавляем маркер в источник данных
        vectorSourceRef.current.addFeature(marker);

        return {
          ...counter,
          [district.name]: addition ? addition + 1 : 1,
        };
      });
    });
  }, [features]);

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current, // Используем ref для источника данных
    });

    // Создаем карту
    const map = new Map({
      // @ts-ignore
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([55.097, 51.768205]),
        zoom: 10,
      }),
    });

    // Создаем попап
    const popup = new Overlay({
      // @ts-ignore
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    map.addOverlay(popup);

    // Обработчик клика на маркер
    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        // @ts-ignore
        const coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);

        // Получаем данные из маркера
        const markerData = feature.getProperties() as IFeature;
        setPopupContent(`
          <span>${markerData.fields.fio}</span>
          <span>${markerData.fields.years}</span>
          <span>${markerData.fields.kontrakt}</span>
          <span>${markerData.fields.nagrads}</span>
        `);
        setPopupVisible(true);
      } else {
        setPopupVisible(false);
      }
    });

    // Обработчик изменения позиции курсора
    map.on('pointermove', (event) => {
      const pixel = map.getEventPixel(event.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    return () => map.setTarget(undefined);
  }, []);

  // Функция для удаления всех маркеров
  const removeAllMarkers = () => {
    vectorSourceRef.current.clear(); // Очищаем источник данных
  };

  return (
    <div style={{ width: '100%' }}>
      <Select
        style={{ marginBottom: 16 }}
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

      <div
        ref={mapRef}
        style={{ width: '100%', height: '600px' }}
      />
      <div
        ref={popupRef}
        style={{
          display: popupVisible ? 'flex' : 'none',
          flexDirection: 'column',
          gap: 8,
          position: 'absolute',
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: '0 0 20px #000',
          minWidth: 200,
        }}
        dangerouslySetInnerHTML={{ __html: popupContent }} // Отображаем HTML-контент попапа
      />
    </div>
  );
};

export default MapComponent;
