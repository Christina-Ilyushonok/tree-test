import React, { useState, useEffect } from "react";
import ModalComponent from "../ModalComponent";
import { Box, TextField, IconButton, Typography, Snackbar, Alert } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import AddIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { addNode, deleteNode, getTree, renameNode } from "../../services/treeAPI";
import { addNodeToTree, deleteNodeFromTree, findParentNode, isNodeNameUnique, updateNodeInTree } from "../utils/treeUtils";
import { useModal } from "../../hooks/useModalHook";
import { v4 as uuidv4 } from 'uuid';
import { TreeNode, SnackbarState } from "./types";
import { treeConfig } from "../../config/configAPI";
import { styles } from "./styles";

const TreeView: React.FC = () => {
  const treeName = treeConfig.TREE_NAME;

  const { isModalOpen, modalType, selectedNode, newNodeName, openModal, closeModal, setNewNodeName } = useModal();
  const [treeData, setTreeData] = useState<Map<string, TreeNode>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: "", type: "info" });

  useEffect(() => {
    fetchTree();
  }, []);

  const fetchTree = async (): Promise<void> => {
    setLoading(true);
    try {
      const fetchedTree = await getTree(treeName);
      setTreeData(transformTreeToMap(fetchedTree));
    } catch {
      setSnackbar({ open: true, message: "Error fetching tree data", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const transformTreeToMap = (tree: TreeNode | null): Map<string, TreeNode> => {
    const map = new Map<string, TreeNode>();
    if (tree) {
      map.set(tree.id, tree);
      if (tree.children) {
        tree.children.forEach((child) => {
          const childMap = transformTreeToMap(child);
          childMap.forEach((node) => map.set(node.id, node));
        });
      }
    }
    return map;
  };

  const handleConfirm = async (): Promise<void> => {
    try {
      if (modalType === "edit") await handleEditNode();
      if (modalType === "add") await handleAddNode();
      if (modalType === "delete") await handleDeleteNode();
      fetchTree();
      closeModal();
    } catch {
      setSnackbar({ open: true, message: `Error in ${modalType}`, type: "error" });
    }
  };

  const handleDeleteNode = async (): Promise<void> => {
    if (!selectedNode) return;
    if (selectedNode.children?.length) {
      setSnackbar({ open: true, message: "You have to delete all children nodes first", type: "error" });
      return;
    }
    await deleteNode(treeName, selectedNode.id);
    setTreeData((prev) => deleteNodeFromTree(prev, selectedNode.id));
    setSnackbar({ open: true, message: "Node deleted successfully!", type: "success" });
  };

  const handleEditNode = async (): Promise<void> => {
    if (!selectedNode || !newNodeName.trim()) return;

    const parentNode = findParentNode(treeData, selectedNode.id);
    if (!parentNode) {
      setSnackbar({ open: true, message: "Parent node not found", type: "error" });
      return;
    }

    if (!isNodeNameUnique(newNodeName, parentNode)) {
      setSnackbar({ open: true, message: "Node name is not unique", type: "error" });
      return;
    }
    await renameNode(treeName, selectedNode.id, newNodeName);
    setTreeData((prev) => updateNodeInTree(prev, selectedNode.id, { ...selectedNode, name: newNodeName }));
    setSnackbar({ open: true, message: "Node renamed successfully!", type: "success" });
  };

  const handleAddNode = async (): Promise<void> => {
    if (!selectedNode || !newNodeName.trim()) return;
    const newNode: TreeNode = { id: uuidv4(), name: newNodeName, children: [] };
    console.log('newNode', newNode)
    await addNode(treeName, selectedNode.id, newNodeName);
    setTreeData((prev) => addNodeToTree(prev, selectedNode.id, newNode));
    setSnackbar({ open: true, message: "Node added successfully!", type: "success" });
  };

  const handleCloseSnackbar = (): void => setSnackbar((prev) => ({ ...prev, open: false }));

  const NodeActions = ({ node, isRoot }: { node: TreeNode; isRoot: boolean }) => (
    <div style={styles.nodeActions}>
      <IconButton onClick={(e) => { e.stopPropagation(); openModal("add", node); }} sx={styles.iconButton}>
        <AddIcon sx={styles.addIcon} />
      </IconButton>
      {!isRoot && (
        <>
          <IconButton onClick={(e) => { e.stopPropagation(); openModal("edit", node); }} sx={styles.iconButton}>
            <EditIcon sx={styles.editIcon} />
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); openModal("delete", node); }} sx={styles.iconButton}>
            <DeleteIcon sx={styles.deleteIcon} />
          </IconButton>
        </>
      )}
    </div>
  );

  const transformTreeData = (node: TreeNode, isRoot: boolean = false): React.ReactNode => {
    const label = (
      <div style={styles.nodeLabel}>
        {node.name}
        <NodeActions node={node} isRoot={isRoot} />
      </div>
    );

    return (
      <TreeItem key={node.id} itemId={node.id} label={label}>
        {node.children?.map((child) => transformTreeData(child))}
      </TreeItem>
    );
  };

  return (
    <Box sx={styles.container}>
      {loading && <Typography>Loading...</Typography>}
      <SimpleTreeView>
        {treeData.size > 0 && transformTreeData(Array.from(treeData.values())[0], true)}
      </SimpleTreeView>
      <ModalComponent
        open={isModalOpen}
        onClose={closeModal}
        title={modalType === "delete" ? `Delete Node: ${selectedNode?.name}` : modalType === "add" ? "Add Node" : "Rename Node"}
        confirmText={modalType === "delete" ? "Delete" : "Confirm"}
        cancelText="Cancel"
        onConfirm={handleConfirm}
      >
        {modalType !== "delete" && (
          <TextField
            label="Node Name"
            variant="outlined"
            fullWidth
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
          />
        )}
      </ModalComponent>
      <Snackbar open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.type}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TreeView;