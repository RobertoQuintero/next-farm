'use client'
import { EmptyPage, LoadingComponent } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { RoleCard } from './RoleCard'
import { FarmsContext } from '@/app/context/farms/FarmsContext'

const RolesPage = () => {
  const {farmsLoading,setError,roles} = useContext(FarmsContext)
  const {toggleModal,isModalOpen} = useContext(UiContext)

  if(farmsLoading && !isModalOpen){
    return <LoadingComponent/>
  }
  const onAdd = async() =>{
      setError(undefined)
     toggleModal()
  };


  return (
    <>
      <div className='actionCreateContainer'>
        <div></div>
        {/* <Button
          size='small'
          variant='contained'
          color='success'
          onClick={onAdd}
        >
          Nuevo</Button> */}
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

