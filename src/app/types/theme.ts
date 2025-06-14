import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#121212',      // ✅ Dark background
      paper: '#1e1e1e',         // ✅ Optional: dark paper surface
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})
