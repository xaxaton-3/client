import { Card } from 'antd';
import { CSSProperties, FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren<{ style?: CSSProperties }>> = ({ children, style = {} }) => {
  return <Card style={{ maxWidth: 500, margin: '0 auto', ...style }}>{children}</Card>;
};

export default Container;
