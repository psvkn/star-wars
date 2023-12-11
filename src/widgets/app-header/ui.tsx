import s from './header.module.css';

export const AppHeader = () => (
  <div className={s.header}>
    <img className={s.logo} src="/logo.svg" alt="App logo" />
  </div>
);
