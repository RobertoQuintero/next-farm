'use client'

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { lightTheme } from "./theme";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";


export function ThemeRegistry({children}:{
  children:React.ReactNode
}) {
  
  return (
    <NextAppDirEmotionCacheProvider options={{key:'mui'}}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  
  );
}