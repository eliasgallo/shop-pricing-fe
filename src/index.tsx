import ReactDOM from 'react-dom/client'
import App from './components/App'
import { StrictMode } from 'react'

const el = document.getElementById('root')

const root = ReactDOM.createRoot(el!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
