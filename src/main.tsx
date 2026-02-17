import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter} from 'react-router-dom'
import { GlobalContext } from './context/context.tsx'
import { Toaster } from 'react-hot-toast'
import { ProductActionsProvider } from './context/product-actions-context.tsx'
 
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <GlobalContext>
    <ProductActionsProvider>
    <App />
    <Toaster position="top-center" />
    </ProductActionsProvider>
    </GlobalContext>
  </BrowserRouter>
)
