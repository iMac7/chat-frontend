import React from 'react'
import { useParams } from 'react-router-dom'
import './replies.css'

function Replies() {
    const {id} = useParams()

  return (
    <div className='replies'>
        Replies - {id}
    </div>
  )
}

export default Replies