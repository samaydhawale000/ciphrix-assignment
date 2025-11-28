import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
    const navigate = useNavigate()
  return (
    <div onClick={()=>{
        navigate(-1)
    }}>
      Back
    </div>
  )
}
