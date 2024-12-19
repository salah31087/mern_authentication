import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Theme, ThemePanel } from "@radix-ui/themes";
import './index.css'
import "@radix-ui/themes/styles.css";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  <Theme appearance="dark" accentColor="cyan" grayColor="gray" radius="small">
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Theme>
)
