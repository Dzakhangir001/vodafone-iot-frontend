import { StoryDecorator } from '@storybook/vue';
import { defaults } from 'lodash';
import { isDef } from '@/util/lang';

export const FRAME = 'frame-decorator';

export interface FrameOptions {
  spacing: number;
  size: number;
  color: string;
}

const DEFAULT_OPTIONS: FrameOptions = {
  spacing: 20,
  size: 20,
  color: 'rgba(0, 0, 0, 0.1)',
};

export default function frame(
  globalOptions: Partial<FrameOptions> & { enabled?: boolean } = { enabled: false },
): StoryDecorator {
  const { enabled, ...rest } = globalOptions;
  const options = defaults(rest, DEFAULT_OPTIONS);

  function normalizeOptions(frame: boolean | Partial<FrameOptions>): FrameOptions | undefined {
    if (!isDef(frame)) {
      return enabled ? options : undefined;
    }

    if (frame === true) {
      return options;
    }

    if (frame === false) {
      return undefined;
    }

    return defaults({ ...frame }, options);
  }

  return (story, { parameters }: any) => {
    const frame = normalizeOptions(parameters[FRAME]);
    if (!frame) {
      return story();
    }

    const { spacing, size, color } = frame;

    return {
      template: `<div style="margin: ${spacing}px; border: ${size}px solid ${color};"><story></story></div>`,
    };
  };
}
