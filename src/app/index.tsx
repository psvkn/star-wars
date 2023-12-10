import { AppHeader } from 'widgets/app-header';
import { BaseLayout } from 'shared/ui/base-layout';

import { withProviders } from './providers';
import './styles/index.css';
import { Routing } from 'pages';

const App = () => {
  return (
    <BaseLayout header={<AppHeader />}>
      <Routing />
    </BaseLayout>
  );
};

export default withProviders(App);
