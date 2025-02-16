import { CSSProperties, FC } from 'react';
import { Flex, Spin } from 'antd';

const Loader: FC<{ style?: CSSProperties }> = ({ style = {} }) => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: 200,
        ...style,
      }}
    >
      <Spin size="large" />
    </Flex>
  );
};

export default Loader;
