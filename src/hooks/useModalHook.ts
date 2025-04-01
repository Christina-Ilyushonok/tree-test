import { useState } from "react";
import { TreeNode } from "../components/TreeView/types";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [newNodeName, setNewNodeName] = useState("");

  const openModal = (type: "add" | "edit" | "delete", node: TreeNode) => {
    setSelectedNode(node);
    setNewNodeName(type === "edit" ? node.name : "");
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewNodeName("");
  };

  return {
    isModalOpen,
    modalType,
    selectedNode,
    newNodeName,
    openModal,
    closeModal,
    setNewNodeName,
  };
};