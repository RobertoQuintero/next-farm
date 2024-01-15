'use client'
import { EmptyPage, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { UsersContext } from '@/app/context/users/UsersContext'
import { Button } from '@mui/material'
import styles from '../../users.module.css'
import React, { useContext, useEffect } from 'react'
import { RoleCard } from './RoleCard'

const RolesPage = () => {
  const {idCompany} = useContext(AuthContext)
  const {userLoading,setError,roles} = useContext(UsersContext)
  const {toggleModal,isModalOpen} = useContext(UiContext)

  useEffect(() => {
    // getJobPositions(idCompany!)
  }, [])
  
  if(userLoading && !isModalOpen){
    return <LoadingComponent/>
  }
  const onAdd = async() =>{
      setError(undefined)
    //  setUser(undefined)
    //  setAction(undefined)
     toggleModal()
  };


  return (
    <>
      <div className={styles.onAdd}>
        <Button
          size='small'
          variant='contained'
          color='success'
          onClick={onAdd}
        >
          Nuevo</Button>
      </div>
      <div style={{paddingTop:'1rem'}}>
          {
            roles.length
              ?roles.map(r=><RoleCard role={r} key={r.id_role}/>)
              : <EmptyPage/>
          }
      </div>
      <AppModal>
       <p>hola</p>
        {
          // actionString==='EDIT' && <PostUpdateUser/>
        }
        {
          // !actionString && <PostUpdateUser/>
        }
      </AppModal>
    </>
  )
}

export default RolesPage