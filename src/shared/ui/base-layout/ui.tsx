import { Layout } from 'antd';
import { type ReactNode, type FC } from 'react';

import s from './styles.module.css';
import { Container } from '../container';

type BaseLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

export const BaseLayout: FC<BaseLayoutProps> = ({ children, header }) => (
  <Layout className={s.root}>
    <Layout.Header>{header}</Layout.Header>
    <Layout.Content>
      <Container>{children}</Container>
    </Layout.Content>
  </Layout>
);
