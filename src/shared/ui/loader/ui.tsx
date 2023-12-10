import { Spin } from 'antd';

import s from './loader.module.css';

export const Loader = () => (
  <div className={s.root}>
    <Spin size="large" delay={300} />
  </div>
);
