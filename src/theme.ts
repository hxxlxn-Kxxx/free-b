"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E1B73E",
      contrastText: "#251B10",
    },
    secondary: {
      main: "#5D4426",
    },
    error: {
      main: "#D45D43",
    },
    background: {
      default: "#FFF9EF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#251B10",
      secondary: "#7A6A58",
    },
    divider: "#EFD9A2",
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily:
      '"Pretendard Variable", Pretendard, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif',
    h2: {
      fontSize: "3rem",
      lineHeight: 1.08,
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h4: {
      fontSize: "2rem",
      lineHeight: 1.15,
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h5: {
      fontSize: "1.5rem",
      lineHeight: 1.2,
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontSize: "1.125rem",
      lineHeight: 1.35,
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.95rem",
      lineHeight: 1.55,
    },
    button: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "#251B10",
          background:
            "radial-gradient(circle at top left, rgba(239, 217, 162, 0.25), transparent 24%), #FFF9EF",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          paddingInline: 18,
          borderRadius: 14,
          textTransform: "none",
        },
        contained: {
          boxShadow: "0 10px 30px rgba(225, 183, 62, 0.28)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: "#FFFCF5",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 999,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 60,
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
