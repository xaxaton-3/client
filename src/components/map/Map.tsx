import { useEffect } from 'react';
import styles from './Map.module.scss';
import { useUserStore } from '@/store/user';
import { useLogsStore } from '@/store/logs';

const Map = () => {
  const userStore = useUserStore();
  const logsStore = useLogsStore();

  useEffect(() => {
    if (userStore.user) {
      logsStore.createLog({
        user: userStore.user.id,
        log: 'Просмотр карты',
      });
    }
  }, [userStore.user]);

  return (
    <iframe
      className={styles.map}
      src="https://geois2.orb.ru/resource/8899/display/tiny?base=basemap_0&lon=57.0861&lat=53.6199&angle=0&zoom=7&styles=8803%2C7986%2C7975%2C2092&linkMainMap=true&events=false&panel=none&controls=&panels="
    />
  );
};

export default Map;
