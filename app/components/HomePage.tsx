'use client'
import React, { useContext } from 'react'
import styles from '../page.module.css'
import { AuthContext } from '../context/auth/AuthContext'
const HomePage = () => {
  const {user,logged} = useContext(AuthContext)
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.imageContainer}></div>
      </div>
      {
        logged?user?.is_active?<></>:(<p 
          style={{
            textAlign:'center',
            padding:'1rem',
            fontWeight:'bold',
            color:'green'
            }}>
          Comunicate con el administrador
          </p>):<></>
      }
        
    </div>
  )
}

export default HomePage