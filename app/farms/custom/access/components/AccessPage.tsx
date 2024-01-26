
'use client'
import { AccessErrorComponent, BackButton, DeleteComponent, EmptyPage } from '@/app/components'
import AppModal from '@/app/components/AppModal'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { Button } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PostUpdateAccess, RoleAccessRow } from '.'
import { IRoleAccess } from '@/interfaces'
import { AuthContext } from '@/app/context/auth/AuthContext'

const AccessPage = () => {
  const {toggleModal} = useContext(UiContext)
  const {rolesAccess,getRolesAccess,role,setFarmAction,farmAction,farmsError,farmsLoading,postRoleAccess,roleAccess,setRoleAccess,accessArr} = useContext(FarmsContext)
  const {accessError} = useContext(AuthContext)

  useEffect(() => {
    getRolesAccess(role?.id_role!)
  }, [])
  
  const onAdd = () =>{
    setRoleAccess(undefined)
    setFarmAction(undefined)
    toggleModal()
  };

  const onDelete = async() =>{
    const newAccess={...roleAccess,status:false} as IRoleAccess
     const ok= await postRoleAccess(newAccess)
     if(ok){
      toggleModal()
     }
  };

  return (
    <>
     <div className='actionCreateContainer'>
        <BackButton/>
        <AccessErrorComponent/>
        {
          accessArr.length > rolesAccess.length &&!accessError && <Button 
          onClick={onAdd}
          variant='contained' 
          color='success'
          size='small'>Nuevo</Button>
        }
      </div>
      <div>
        {
          rolesAccess?.filter(r=>r.status).length
            ?rolesAccess?.filter(r=>r.status).map(a=><RoleAccessRow access={a} key={a.id_role_access}/>)
            :<EmptyPage/>
        }
      </div>
      <AppModal>
        {
          farmAction?<DeleteComponent onDelete={onDelete} loading={farmsLoading} error={farmsError} />:<PostUpdateAccess/>
        }
      </AppModal>
    </>
  )
}

export default AccessPage