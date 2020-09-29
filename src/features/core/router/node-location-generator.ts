import { RawLocation } from 'vue-router';
import { NodeLocationGeneratorFragment } from './__generated__/NodeLocationGeneratorFragment';

export type NodeLocationGeneratorFragment = NodeLocationGeneratorFragment;
export type NodeLocationGenerator = (
  node: NodeLocationGeneratorFragment,
  params?: Record<string, any>,
) => RawLocation | undefined;
