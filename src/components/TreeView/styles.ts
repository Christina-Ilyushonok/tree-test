import theme from "../../theme";

export const styles = {
  container: {
    minHeight: 352,
    minWidth: 250,
    padding: "20px",
    borderRadius: "8px",
  },
  nodeLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    color: "#333",
  },
  nodeActions: {
    marginLeft: 10,
    display: "flex",
    color: "#9b9b9b",
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  editButton: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  dialogTitle: {
    color: theme.palette.primary.main,
    padding: "16px",
    borderRadius: "8px 8px 0 0",
    fontWeight: "bold",
  },
  dialogContent: {
    backgroundColor: theme.palette.background.default,
    padding: "20px",
  },
  dialogActions: {
    padding: "10px 20px",
  },
  textField: {
    marginBottom: "20px",
  },
  addIcon: {
    color: theme.palette.primary.main,
  },
  editIcon: {
    color: theme.palette.secondary.main,
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
  iconButton: {
    // "&:hover": {
    //   backgroundColor: theme.palette.iconButtonHoverColor
    // },
  },
};