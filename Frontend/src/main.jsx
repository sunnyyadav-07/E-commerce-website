import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/app/App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/app.store.js'
import { RouterProvider } from 'react-router'
import { router } from './app/app.route.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </Provider>
)
