export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

export type SnackbarState = {
  open: boolean;
  message: string;
  type: "info" | "success" | "error";
};

export type ModalType = "add" | "edit" | "delete";