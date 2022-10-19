import { extraArgument } from '../../store/store';
import { AppDispatch } from './app-dispatch';
import { RootState } from './root-state';

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
};
