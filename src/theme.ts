import { createTheme } from "@mui/material/styles";

const colors = {
  primaryPink: "#ac7689",
  primaryGreen: "#5D8C7A",
  primaryRed: "#d70048",
  hoverPink: "#C88B99",
  hoverGreen: "#7C9F8E",
  hoverRed: "#F13C63",
  dialogTitleColor: "#ac7689",
  backgroundColor: "#fafafa",
  iconButtonHoverColor: "rgba(233, 30, 99, 0.1)",
  snackbarBgColor: "#f5f5f5",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primaryGreen,
    },
    secondary: {
      main: colors.primaryPink,
    },
    error: {
      main: colors.primaryRed,
    },
    background: {
      default: colors.snackbarBgColor,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: "pointer",
        },
        containedPrimary: {
          backgroundColor: colors.primaryGreen,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: colors.hoverGreen,
          },
        },
        containedSecondary: {
          backgroundColor: colors.primaryPink,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: colors.hoverPink,
          },
        },
        containedError: {
          backgroundColor: colors.primaryRed,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: colors.hoverRed,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: colors.iconButtonHoverColor,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: colors.dialogTitleColor,
          padding: "16px",
          borderRadius: "8px 8px 0 0",
          fontWeight: "bold",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: colors.backgroundColor,
          padding: "20px",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  },
});

export default theme;