import styles from './Map.module.scss';

const Map = () => {
  return (
    <iframe
      className={styles.map}
      src="https://geois2.orb.ru/resource/8899/display/tiny?base=basemap_0&lon=57.0861&lat=53.6199&angle=0&zoom=7&styles=8803%2C7986%2C7975%2C2092&linkMainMap=true&events=false&panel=none&controls=&panels="
    />
  );
};

export default Map;
