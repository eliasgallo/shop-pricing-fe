import { createRoot } from 'react-dom/client'
import App from './components/App'
import { StrictMode } from 'react'
import './translations/i18n'

const el = document.getElementById('root')

const root = createRoot(el!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
