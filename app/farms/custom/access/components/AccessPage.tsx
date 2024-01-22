
'use client'
import { BackButton, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PostUpdateAccess, RoleAccessRow } from '.'

const AccessPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {rolesAccess,getRolesAccess,role} = useContext(FarmsContext)

  useEffect(() => {
    getRolesAccess(role?.id_role!)
  }, [])
  


  const onAdd = async() =>{
     toggleModal()
  };

  return (
    <>
     <div className='actionCreateContainer'>
        <BackButton/>
        <div></div>
        <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
      </div>
      <div>
        {
          rolesAccess?.length
            ?rolesAccess?.map(a=><RoleAccessRow access={a} key={a.id_role_access}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        <PostUpdateAccess/>
      </AppModal>
    </>
  )
}

export default AccessPage