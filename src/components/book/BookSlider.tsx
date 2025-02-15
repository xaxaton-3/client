import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FeatureAttachment } from '@/types/features';
import styles from './Book.module.scss';
import { Flex } from 'antd';

const getImageUrl = (featureId: number, attachmentId: number) => {
  const baseUrl = import.meta.env.VITE_GEOIS_API_URL;
  const resourceId = import.meta.env.VITE_GEOIS_ID;
  return `${baseUrl}/resource/${resourceId}/feature/${featureId}/attachment/${attachmentId}/image`;
};

const BookSlider: FC<{
  featureId: number;
  attachments: FeatureAttachment[];
}> = ({ featureId, attachments }) => {
  const [realIndex, setRealIndex] = useState(0);

  return (
    <>
      <Flex justify="center">
        <img
          className={styles.avatar}
          src={getImageUrl(featureId, attachments[realIndex]?.id)}
        />
      </Flex>

      {attachments.length > 1 && (
        <Swiper
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={4}
          loop
          onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
        >
          {attachments.map((attachment) => (
            <SwiperSlide key={attachment.id}>
              <img
                className={styles.image}
                src={getImageUrl(featureId, attachment.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default BookSlider;
