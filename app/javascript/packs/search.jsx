import React from 'react'
import ReactDOM from 'react-dom'
import Search from '../components/search'

const App = () => (
  <div>
    <Search />
  </div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})