export default interface NodeTreeNode {
  id: string;
  type: string;
  name: string;
  open: boolean;
  children?: NodeTreeNode[];
}

export const ON_NODE_CLICK = Symbol('NODE_TREE_BAR');
export const FILTER_NODES = Symbol('FILTER_NODES');
export const IS_ACTIVE_NODE = Symbol('IS_ACTIVE_NODE');
