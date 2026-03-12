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
      fontSize: "2.125rem",
      lineHeight: 1.15,
      fontWeight: 800,
      letterSpacing: "-0.045em",
    },
    h4: {
      fontSize: "1.625rem",
      lineHeight: 1.2,
      fontWeight: 800,
      letterSpacing: "-0.035em",
    },
    h5: {
      fontSize: "1.25rem",
      lineHeight: 1.3,
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h6: {
      fontSize: "1rem",
      lineHeight: 1.4,
      fontWeight: 700,
      letterSpacing: "-0.015em",
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
