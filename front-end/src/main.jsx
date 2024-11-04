import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from './components/ui/toaster';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChatArea from './components/pages/ChatArea';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <App>
        <div className="flex-1 flex items-center justify-center" > Select a chat to start messaging</div>
      </App>
  },
  {
    path: "/chat/:id",
    element:
      <App>
        <ChatArea />
      </App>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
