import { Flex } from 'antd';
import Book from '@/components/book/Book';
import { useFeaturesStore } from '@/store/features';

const Features = () => {
  const { isLoading } = useFeaturesStore();

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <Flex
      justify="center"
      align="center"
    >
      <Book />
    </Flex>
  );
};

export default Features;
