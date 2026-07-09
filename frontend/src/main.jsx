import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css'
import './i18n';
import App from './App.jsx'
import OfflineOverlay from './shared/components/OfflineOverlay.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <OfflineOverlay />
    </Provider>
  </StrictMode>,
)
