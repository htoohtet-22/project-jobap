import { createTheme } from '@mui/material/styles';

/**
 * Material Design 3 inspired theme: Google's blue/green/yellow/red palette,
 * Roboto/Google Sans typography, rounded 12px corners, soft elevation.
 */

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        
        primary: {
          main: '#1a73e8',
          light: '#4c94ee',
          dark: '#1558b0',
          contrastText: '#ffffff',
        },
        
        secondary: {
          main: '#34a853',
          light: '#5bb974',
          dark: '#188038',
          contrastText: '#ffffff',
        },
        
        error: { 
          main: '#ea4335',
          light: '#ea4335',
          dark: '#b31412',
        },
        
        warning: { 
          main: '#fbbc04',
          light: '#fbbc04',
          dark: '#e37400',
          contrastText: '#202124',
        },
        
        success: {
          main: '#1e8e3e',
          light: '#34a853',
          dark: '#137333',
        },
        
        info: {
          main: '#1a73e8',
          light: '#4285f4',
          dark: '#185abc',
        },
        
        background: {
          default: '#f8f9fa',
          paper: '#ffffff',
        },
        
        text: {
          primary: '#202124',
          secondary: '#5f6368',
          disabled: '#9aa0a6',
        },
        
        divider: '#dadce0',
        
        action: {
          active: '#5f6368',
          hover: 'rgba(60, 64, 67, 0.08)',
          selected: 'rgba(26, 115, 232, 0.12)',
          disabled: 'rgba(60, 64, 67, 0.38)',
          disabledBackground: 'rgba(60, 64, 67, 0.08)',
          focus: 'rgba(26, 115, 232, 0.12)',
        },
      },
    },

    dark: {
      palette: {
        mode: 'dark',
        
        primary: {
          main: '#8ab4f8',
          light: '#aecbfa',
          dark: '#669df6',
          contrastText: '#202124',
        },

        secondary: {
          main: '#81c995',
          light: '#a8dab5',
          dark: '#5bb974',
          contrastText: '#202124',
        },

        error: {
          main: '#f28b82',
          light: '#f6aea9',
          dark: '#c5221f',
        },

        warning: {
          main: '#fdd663',
          light: '#fde293',
          dark: '#f9ab00',
          contrastText: '#202124',
        },

        success: {
          main: '#81c995',
          light: '#a8dab5',
          dark: '#5bb974',
        },

        info: {
          main: '#8ab4f8',
          light: '#aecbfa',
          dark: '#669df6',
        },

        background: {
          default: '#202124',
          paper: '#292a2d',
        },

        text: {
          primary: '#e8eaed',
          secondary: '#bdc1c6',
          disabled: '#80868b',
        },

        divider: '#3c4043',

        action: {
          active: '#bdc1c6',
          hover: 'rgba(232, 234, 237, 0.08)',
          selected: 'rgba(138, 180, 248, 0.16)',
          disabled: 'rgba(232, 234, 237, 0.30)',
          disabledBackground: 'rgba(232, 234, 237, 0.12)',
          focus: 'rgba(138, 180, 248, 0.16)',
        },
      }
    }
  },

  shape: {
    borderRadius: 12,
  },
  
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },

    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },

    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.3,
    },

    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.35,
    },

    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },

    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.45,
    },

    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },

    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.45,
    },

    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },

    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          minHeight: '100dvh',
        },

        '*': {
          boxSizing: 'border-box',
        },

        '::selection': {
          backgroundColor: 'rgba(26, 115, 232, 0.20)',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 24,
          minHeight: 40,
          padding: '8px 20px',
          fontWeight: 500,
        },

        contained: {
          boxShadow: 'none',

          '&:hover': {
            boxShadow:
              '0 1px 2px rgba(60, 64, 67, 0.30), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
          },
        },

        outlined: {
          borderColor: 'divider',

          '&:hover': {
            borderColor: 'primary.main',
          },
        },

        text: {
          '&:hover': {
            backgroundColor: 'rgba(26, 115, 232, 0.08)',
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '50%',

          '&:hover': {
            backgroundColor: 'rgba(60, 64, 67, 0.08)',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
        },

        elevation1: {
          boxShadow:
            '0 1px 2px rgba(60, 64, 67, 0.15), 0 1px 3px 1px rgba(60, 64, 67, 0.10)',
        },

        elevation2: {
          boxShadow:
            '0 1px 3px rgba(60, 64, 67, 0.20), 0 4px 8px 3px rgba(60, 64, 67, 0.10)',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
          boxShadow:
            '0 1px 2px rgba(60, 64, 67, 0.15), 0 1px 3px 1px rgba(60, 64, 67, 0.10)',
          transition:
            'box-shadow 150ms ease, transform 150ms ease, border-color 150ms ease',

          '&:hover': {
            boxShadow:
              '0 1px 3px rgba(60, 64, 67, 0.20), 0 4px 8px 3px rgba(60, 64, 67, 0.10)',
          },

          /*
           * Dark mode adjustments.
           */
          '& .MuiCardContent-root': {
            backgroundImage: 'none',
          },
        },
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 1px 2px rgba(60, 64, 67, 0.20)',
          borderBottom: '1px',
          borderColor: 'divider',
          borderRadius: 0,
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'text.secondary',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
            borderWidth: 2,
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'text.secondary',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },

        outlined: {
          borderColor: 'divider',
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: 4,
          borderRadius: 12,
          backgroundImage: 'none',
          boxShadow:
            '0 2px 6px rgba(60, 64, 67, 0.20), 0 4px 12px rgba(60, 64, 67, 0.15)',
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 40,
          borderRadius: 8,
          margin: '2px 6px',

          '&.Mui-selected': {
            backgroundColor: 'rgba(26, 115, 232, 0.10)',
          },

          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(26, 115, 232, 0.14)',
          },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,

          '&.Mui-selected': {
            backgroundColor: 'rgba(26, 115, 232, 0.10)',
          },

          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(26, 115, 232, 0.14)',
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          minWidth: 72,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 6,
          fontSize: '0.75rem',
          padding: '6px 8px',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'divider',
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 44,
          height: 28,
          padding: 0,
        },

        switchBase: {
          padding: 2,

          '&.Mui-checked': {
            transform: 'translateX(16px)',
          },
        },

        thumb: {
          width: 24,
          height: 24,
        },

        track: {
          borderRadius: 14,
          opacity: 1,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'divider',
        },
      },
    },
  },
});

export default theme;