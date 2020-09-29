import { APPS } from '@/features/core/container';
import { NodeType } from '@/types/iot-portal';
import { option } from '@/util/container';
import icon from '../assets/apps/smoke-detector.svg?vue';

export const APP_SMOKE_DETECTOR = 'APP_SMOKE_DETECTOR';

export default option(APPS, async () => {
  return {
    name: APP_SMOKE_DETECTOR,
    label: 'Rauchwarnmelder App',
    link: {
      to: { name: 'AppSmokeDetector' },
      icon,
    },
    types: [NodeType.DIRECTORY, NodeType.PROPERTY, NodeType.FLOOR],
    generateNodeLocation({ type, id }, params) {
      return type === NodeType.DIRECTORY
        ? undefined
        : { name: 'AppSmokeDetectorNode', params: { ...params, nodeId: id } };
    },
  };
});
