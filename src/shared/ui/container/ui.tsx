import type { FC, ReactNode } from 'react';

import s from './container.module.css';

type ContainerProps = {
  children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};
