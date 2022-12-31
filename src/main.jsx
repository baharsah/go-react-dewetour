import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient ,  QueryClientProvider } from 'react-query'
// import { UserContextProvider } from './context/userProvider'
import { UserContextProvider } from './components/context/userProvider'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';


// TODO: sdsdsd


const client = new QueryClient()




ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
        <App />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </UserContextProvider>
  </React.StrictMode>
)
