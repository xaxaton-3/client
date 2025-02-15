import { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Card,
  message,
  Upload,
  type UploadFile,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import { districts, districtsMap } from '@/data/districts';
import { FeatureParams } from '@/types/features';
import { formatDate } from '@/utils/date';
import { getAIText } from '@/api/text';
import { useFeaturesStore } from '@/store/features';

interface FormValues {
  district: string;
  name: string;
  birthDate: Dayjs;
  deathDate: Dayjs;
  info: string;
  location: string;
  rewards: string;
  files: UploadFile[];
}

const locations = [
  'Великая отечественная война',
  'Боевые действия в Афганистане',
  'Вооруженный конфликт в Чеченской Республике и на прилегающих к ней территориях Российской Федерации',
  'Выполнение специальных задач на территории Сирийской Арабской Республики',
  'Выполнение специальных задач на территории Таджикистана, Ингушетии, в Грузино-Абхазских событиях',
  'Специальная военная операция на Украине',
];

const FeaturesForm = () => {
  const [form] = Form.useForm();
  const featuresStore = useFeaturesStore();
  const [isAILoading, setIsAILoading] = useState(false);
  const [messageApi] = message.useMessage();

  const onFinish = async (values: FormValues) => {
    console.log(values);

    const district = districtsMap[values.district];

    const params: FeatureParams = {
      extensions: {
        attachment: null,
        description: null,
      },
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

    await featuresStore.createFeature(
      params,
      values.files?.map((file) => file.originFileObj!) || [],
    );

    console.log(params);
  };

  const onAIClick = async () => {
    const info = form.getFieldValue('info');
    if (!info) {
      messageApi.open({
        type: 'error',
        content: 'Введите информацию!',
      });
      return;
    }
    setIsAILoading(true);
    try {
      const { text } = await getAIText(info);
      form.setFieldValue('info', text);
    } catch (error) {
    } finally {
      setIsAILoading(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Card style={{ maxWidth: 500, margin: '16px auto' }}>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          name="district"
          label="Муниципальное образование"
          rules={[
            { required: true, message: 'Пожалуйста введите выберите муниципальное образование!' },
          ]}
        >
          <Select placeholder="Выберите муниципальное образование">
            {districts.map((district) => (
              <Select.Option
                key={district.name}
                value={district.name}
              >
                {district.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="ФИО"
          rules={[{ required: true, message: 'Пожалуйста введите ФИО!' }]}
        >
          <Input placeholder="Введите ФИО" />
        </Form.Item>

        <Form.Item
          name="birthDate"
          label="Дата рождения"
          rules={[{ required: true, message: 'Пожалуйста выберите дату!' }]}
        >
          <DatePicker placeholder="Выберите дату" />
        </Form.Item>

        <Form.Item
          name="deathDate"
          label="Дата смерти"
          rules={[{ required: true, message: 'Пожалуйста выберите дату!' }]}
        >
          <DatePicker placeholder="Выберите дату" />
        </Form.Item>

        <Form.Item
          name="info"
          label="Информация"
          rules={[{ required: true, message: 'Пожалуйста введите информацию!' }]}
        >
          <Input.TextArea
            placeholder="Введите информацию"
            disabled={isAILoading}
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={isAILoading}
            onClick={onAIClick}
          >
            Форматировать текст с помощью ИИ
          </Button>
        </Form.Item>

        <Form.Item
          name="location"
          label="Место боевых действий"
          rules={[{ required: true, message: 'Пожалуйста выберите место боевых действий!' }]}
        >
          <Select placeholder="Выберите место боевых действий">
            {locations.map((location) => (
              <Select.Option
                key={location}
                value={location}
              >
                {location}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="rewards"
          label="Награды"
          rules={[{ required: true, message: 'Пожалуйста введите награды!' }]}
        >
          <Input placeholder="Введите награды" />
        </Form.Item>

        <Form.Item
          label="Фотографии"
          name="files"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            accept="image/*"
          >
            <button
              style={{ border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={featuresStore.isLoading}
          >
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FeaturesForm;
