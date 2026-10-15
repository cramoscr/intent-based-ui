import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
function Root() {
  const [mode,setMode] = useState(() => localStorage.getItem('ibui-theme') === 'light' ? 'light' : 'dark');
  const toggleTheme = () => setMode(previous => {
    const next = previous === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ibui-theme',next);
    return next;
  });
  const theme = createTheme({palette:{mode,background:{default:mode==='dark'?'#111111':'#eee9dd',paper:mode==='dark'?'#242424':'#f8f4e9'},text:{primary:mode==='dark'?'#f5f5f5':'#27251f',secondary:mode==='dark'?'#aaa':'#625e54'}},typography:{fontFamily:'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'},shape:{borderRadius:20}});
  return <ThemeProvider theme={theme}><CssBaseline/><App toggleTheme={toggleTheme} mode={mode}/></ThemeProvider>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><Root/></React.StrictMode>);
