import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import {  IAccess, IRoleAccess } from '@/interfaces'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateAccess = () => {
  const {role,roleAccess,accessArr,farmsLoading,postRoleAccess,rolesAccess} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const {idFarm} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRoleAccess>()

  const values={
    id_role_access:roleAccess?roleAccess.id_role_access:0,
    id_role:roleAccess?roleAccess.id_role:role?.id_role,
    id_access:roleAccess?roleAccess.id_access:1,
    status:roleAccess?roleAccess.status:true,
    id_farm:roleAccess?roleAccess.id_farm:idFarm,
  } as IRoleAccess

  const newRolesAccess = () =>{
    const array=[] as IAccess[]
    for (const p of accessArr) {
      if(!rolesAccess.find(a=>a.id_access===p.id_access)){
          array.push(p)
      }
    }
    return array
  };

  const onSubmit=async(data:IRoleAccess)=>{
    data.id_role_access=values.id_role_access
    data.id_role=values.id_role
    data.status=values.status
    data.id_farm=values.id_farm

    const ok = await postRoleAccess(data)
    if(ok){
      toggleModal()
    }
  }
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          size="small"
          label='Acceso'
          fullWidth
          defaultValue={newRolesAccess()[0].id_access}
          {...register('id_access')} 
          select >
          {
            newRolesAccess().length
            ?newRolesAccess().map(item=>(
              <MenuItem 
                key={item.id_access} 
                value={item.id_access}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <Button 
          size="small"
          disabled={farmsLoading}
          type='submit' 
          fullWidth 
          variant='contained'
          >
            {
              farmsLoading
                ?  <CircularProgress size='1.5rem' />
                :'Agregar'
            }
      </Button>
    </form>
  )
}
