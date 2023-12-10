import compose from 'compose-function';
import { withTheme } from './withTheme';
import { withRouter } from './withRouter';

export const withProviders = compose(withTheme, withRouter);
