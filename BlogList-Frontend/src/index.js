import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Layout from './components/Layout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        {/* <Route path='/*' element={<Layout />}> */}
        <Route path='/*' element={<App />} />
        {/* </Route> */}
      </Routes>
    </Router>
  </Provider>
)
