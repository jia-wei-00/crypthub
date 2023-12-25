import ReactLoading from 'react-loading';
import { modeStore } from '@crypthub/store';
import { observer } from 'mobx-react-lite';

export const Loading: React.FC<{ height: number; width: number }> = observer(
  ({ height, width }) => {
    return (
      <ReactLoading
        color={modeStore.mode === 'light' ? '#a27b5c' : 'white'}
        type="bars"
        height={height}
        width={width}
      />
    );
  }
);
