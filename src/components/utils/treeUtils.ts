import { TreeNode } from "../TreeView/types";

export const addNodeToTree = (
  tree: Map<string, TreeNode>,
  parentId: string,
  newNode: TreeNode
): Map<string, TreeNode> => {
  const updatedTree = new Map(tree);
  const parentNode = updatedTree.get(parentId);

  if (parentNode) {
    parentNode.children = [...(parentNode.children || []), newNode];
    updatedTree.set(parentId, parentNode);
  }

  return updatedTree;
};

export const updateNodeInTree = (
  tree: Map<string, TreeNode>,
  nodeId: string,
  updatedNode: TreeNode
): Map<string, TreeNode> => {
  const updatedTree = new Map(tree);
  if (updatedTree.has(nodeId)) {
    updatedTree.set(nodeId, { ...updatedTree.get(nodeId), ...updatedNode });
  }

  updatedTree.forEach((node) => {
    if (node.children) {
      node.children = node.children.map((child) =>
        child.id === nodeId ? { ...child, ...updatedNode } : child
      );
    }
  });

  return updatedTree;
};

export const deleteNodeFromTree = (
  tree: Map<string, TreeNode>,
  nodeId: string
): Map<string, TreeNode> => {
  const updatedTree = new Map(tree);
  updatedTree.delete(nodeId);

  updatedTree.forEach((node) => {
    if (node.children) {
      node.children = node.children.filter((child) => child.id !== nodeId);
    }
  });

  return updatedTree;
};

export const findParentNode = (
  tree: Map<string, TreeNode>,
  id: string
): TreeNode | null => {
  for (const node of tree.values()) {
    if (node.children) {
      const foundChild = node.children.find((child) => child.id === id);
      if (foundChild) return node;
    }
  }
  return null;
};

export const isNodeNameUnique = (nodeName: string, parentNode: TreeNode): boolean => {
  return !(parentNode.children || []).some((child) => child.name === nodeName);
};