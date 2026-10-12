import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
const theme = createTheme({palette:{mode:'dark',background:{default:'#111111',paper:'#242424'},text:{primary:'#f5f5f5',secondary:'#999999'}},typography:{fontFamily:'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'},shape:{borderRadius:20}});
createRoot(document.getElementById('root')).render(<React.StrictMode><ThemeProvider theme={theme}><CssBaseline/><App/></ThemeProvider></React.StrictMode>);
