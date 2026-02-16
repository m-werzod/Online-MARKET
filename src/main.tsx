import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter} from 'react-router-dom'
import { GlobalContext } from './context/context.tsx'
import { Toaster } from 'react-hot-toast'
 
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <GlobalContext>
    <App />
    <Toaster position="top-center" />
    </GlobalContext>
  </BrowserRouter>
)
