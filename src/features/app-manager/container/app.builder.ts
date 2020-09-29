import { NodeType } from '@/types/iot-portal';
import { option } from '@/util/container';
import { APPS } from '@core/container';
import icon from '../assets/apps/manager.svg?vue';

export const APP_MANAGER = 'APP_MANAGER';

export default option(APPS, async () => {
  return {
    name: APP_MANAGER,
    link: {
      to: { name: 'AppManager' },
      icon,
    },
    types: [NodeType.DIRECTORY, NodeType.PROPERTY, NodeType.FLOOR, NodeType.APARTMENT],
    generateNodeLocation({ type, id }, params) {
      return type === NodeType.DIRECTORY ? undefined : { name: 'Node', params: { ...params, nodeId: id } };
    },
  };
});
