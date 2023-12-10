import { ConfigProvider, theme, type ThemeConfig } from 'antd';
import { type ComponentType } from 'react';

const config: ThemeConfig = {
  token: {},
  algorithm: [theme.darkAlgorithm],
};

export const withTheme =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) =>
    (
      <ConfigProvider theme={config}>
        <Component {...props} />
      </ConfigProvider>
    );
