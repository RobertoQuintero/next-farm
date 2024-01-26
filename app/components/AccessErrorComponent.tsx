import { useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext'

export const AccessErrorComponent = () => {
  const {accessError} = useContext(AuthContext)
  return (
    <p style={{
      color:'red',
      fontSize:'14px',
      position:'absolute',
      top:'50%',
      right:'50%',
      transform:'translate(50%,-50%)'
    }}>{accessError}</p>
  )
}
