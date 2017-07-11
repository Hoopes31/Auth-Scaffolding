import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(<BrowserRouter><Router/></BrowserRouter>, document.getElementById('root'));