import { APPS } from '@/features/core/container';
import { NodeType } from '@/types/iot-portal';
import { option } from '@/util/container';
import icon from '../assets/apps/wifi.svg?vue';

export const APP_WIFI = 'APP_WIFI';

export default option(APPS, async () => {
  return {
    name: APP_WIFI,
    label: 'WiFi App',
    link: {
      to: { name: 'AppWifi' },
      icon,
    },
    types: [NodeType.DIRECTORY, NodeType.PROPERTY],
    generateNodeLocation({ type, id }, params) {
      return type === NodeType.DIRECTORY || type === NodeType.PROPERTY
        ? { name: 'AppWifiNodeView', params: { ...params, nodeId: id } }
        : undefined;
    },
  };
});
