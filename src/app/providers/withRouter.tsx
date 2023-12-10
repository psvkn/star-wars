import { Suspense, type ComponentType } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from 'shared/ui/loader';

export const withRouter =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) =>
    (
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Component {...props} />
        </Suspense>
      </BrowserRouter>
    );
