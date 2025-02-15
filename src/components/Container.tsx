import { Card } from 'antd';
import { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <Card style={{ maxWidth: 500, margin: '0 auto' }}>{children}</Card>;
};

export default Container;
