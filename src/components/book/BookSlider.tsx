import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FeatureAttachment } from '@/types/features';
import styles from './Book.module.scss';
import { Flex } from 'antd';
import { getImageUrl } from '@/utils/image';

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
