import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IRoleAccess } from '@/interfaces'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
interface Props{
  access:IRoleAccess
}
export const RoleAccessRow = ({access}:Props) => {
  const {setFarmAction,setRoleAccess} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = (action:string) =>{
    setFarmAction(action)
    setRoleAccess(access)
    toggleModal()
  };

  return (
    <div className='rowCard'>
      <p>{access.name}</p>
      <Button 
          size="small"
          color='error'
          onClick={()=>onClick('DELETE')}  
         >
         Borrar
        </Button>
    </div>
  )
}
