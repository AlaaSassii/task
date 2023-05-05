import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CandidateJobsContextProvider } from './context/Values'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CandidateJobsContextProvider>
    <App />
    </CandidateJobsContextProvider>
  </React.StrictMode>,
)
