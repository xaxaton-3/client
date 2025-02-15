import styles from './Map.module.scss';

const Map = () => {
  return (
    <iframe
      className={styles.map}
      src="https://geois2.orb.ru/resource/8899/display/tiny?base=basemap_0&lon=56.5256&lat=52.4178&angle=0&zoom=9&styles=8803%2C2092&linkMainMap=true&events=false&panel=none&controls=&panels="
    />
  );
};

export default Map;
