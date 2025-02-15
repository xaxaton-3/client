import { FC, useState, useEffect, PropsWithChildren } from 'react';
import { Button, DatePicker, Form, Input, Select, message, Upload, type UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import { districts } from '@/data/districts';
import { getAIText } from '@/api/text';
import { locations } from '@/data/locations';
import Container from '../Container';

export interface FeaturesFormValues {
  district: string;
  name: string;
  birthDate: Dayjs;
  deathDate: Dayjs;
  info: string;
  location: string;
  rewards: string;
  files: UploadFile[];
}

const FeaturesForm: FC<
  PropsWithChildren<{
    initialValues?: FeaturesFormValues;
    isLoading?: boolean;
    withUpload?: boolean;
    onSubmit: (values: FeaturesFormValues) => void;
  }>
> = ({ initialValues, isLoading, withUpload = true, children, onSubmit }) => {
  const [form] = Form.useForm();
  const [isAILoading, setIsAILoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, []);

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
      throw error;
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
    <Container>
      {contextHolder}

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onSubmit}
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

        {withUpload && (
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
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Отправить
          </Button>
        </Form.Item>

        {children}
      </Form>
    </Container>
  );
};

export default FeaturesForm;
