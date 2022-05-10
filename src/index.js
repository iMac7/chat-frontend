import reactdom from 'react-dom'
import {
    BrowserRouter,
    BrowserRouter as Router,
    Switch,
    useLocation
  } from "react-router-dom";
import './index.css'
import App from './App'

reactdom.render(
<BrowserRouter><App/></BrowserRouter>    
, document.querySelector('#root'))
