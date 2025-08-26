import React from 'react'
import ReactDom from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { ThemeProvider } from './providers/theme.provider.tsx'
import { router } from './routes/index.tsx'

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
