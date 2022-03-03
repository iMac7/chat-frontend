import reactdom from 'react-dom'
import {
    BrowserRouter,
    BrowserRouter as Router,
    Switch,
    useLocation
  } from "react-router-dom";
import './index.css'
import Homepage from './Homepage'

reactdom.render(
<BrowserRouter><Homepage/></BrowserRouter>    
, document.querySelector('#root'))
