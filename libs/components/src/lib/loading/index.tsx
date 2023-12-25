import ReactLoading from 'react-loading';
import { modeStore } from '@crypthub/store';

export const Loading: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  return (
    <ReactLoading
      color={modeStore.mode === 'light' ? '#a27b5c' : 'white'}
      type="bars"
      height={height}
      width={width}
    />
  );
};

export default Loading;
