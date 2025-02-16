import { FC, useMemo, useState } from 'react';
import { Button, Modal } from 'antd';
import { Feature, FeatureParams } from '@/types/features';
import { EditOutlined } from '@ant-design/icons';
import FeaturesForm, { FeaturesFormValues } from './FeaturesForm';
import { useFeaturesStore } from '@/store/features';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { districtsMap } from '@/data/districts';
import { formatDate } from '@/utils/date';

dayjs.extend(customParseFormat);

interface Props {
  feature: Feature;
}

const EditFeaturesModal: FC<Props> = ({ feature }) => {
  const featuresStore = useFeaturesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onUpdate = (values: FeaturesFormValues) => {
    const district = districtsMap[values.district];

    const params: FeatureParams = {
      extensions: feature.extensions,
      fields: {
        n_raion: district.name,
        fio: values.name,
        years: `${formatDate(values.birthDate)} – ${formatDate(values.deathDate)}`,
        info: values.info,
        kontrakt: values.location,
        nagrads: values.rewards,
      },
      geom: `POINT (${district.latitude} ${district.longitude})`,
    };

    featuresStore.updateFeature(feature.id, params).then(() => {
      setIsModalOpen(false);
    });
  };

  const initialValues = useMemo<FeaturesFormValues>(
    () => ({
      name: feature.fields.fio,
      birthDate: dayjs(feature.fields.years.split(' – ')[0], 'DD.MM.YYYY'),
      deathDate: dayjs(feature.fields.years.split(' – ')[1], 'DD.MM.YYYY'),
      district: feature.fields.n_raion,
      info: feature.fields.info,
      location: feature.fields.kontrakt,
      rewards: feature.fields.nagrads,
      files: [],
    }),
    [feature, isModalOpen],
  );

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <EditOutlined />
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <FeaturesForm
          initialValues={initialValues}
          isLoading={featuresStore.isLoading}
          withUpload={false}
          onSubmit={onUpdate}
        />
      </Modal>
    </>
  );
};

export default EditFeaturesModal;
