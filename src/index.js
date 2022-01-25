import reactdom from 'react-dom'
import './index.css'
import Homepage from './Homepage'
import SignUp from './Auth/SignUp'


reactdom.render(<SignUp/>, document.querySelector('#root'))
