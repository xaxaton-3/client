import { Button, DatePicker, Form, Input, Select, Card } from 'antd';
import { Dayjs } from 'dayjs';
import { districts, districtsMap } from '@/data/districts';
import { FeatureParams } from '@/types/features';
import { formatDate } from '@/utils/date';

interface FormValues {
  district: string;
  name: string;
  birthDate: Dayjs;
  deathDate: Dayjs;
  info: string;
  location: string;
  rewards: string;
}

const FeaturesForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
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

    console.log(params);
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
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="Место боевых действий"
          rules={[{ required: true, message: 'Пожалуйста введите место боевых действий!' }]}
        >
          <Input placeholder="Введите место боевых действий" />
        </Form.Item>

        <Form.Item
          name="rewards"
          label="Награды"
          rules={[{ required: true, message: 'Пожалуйста введите награды!' }]}
        >
          <Input placeholder="Введите награды" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FeaturesForm;
