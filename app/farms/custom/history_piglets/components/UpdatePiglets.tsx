import {   MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IPiglets } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { addZero } from '@/utils'

export const UpdatePiglets = () => {
  const {toggleModal} = useContext(UiContext)
  const {piglet,farmsLoading,postPiglets,pigStages,createTasksToDo} = useContext(FarmsContext)
  const {user} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPiglets>()

  const values={
    ...piglet
  } as IPiglets

  

  const onSubmit=async(data:IPiglets)=>{

    const newPiglet={...piglet,...data} as IPiglets
    if(+newPiglet.id_pig_stage===pigStages.filter(p=>p.id_pig_type===1)[0].id_pig_stage){
      toggleModal()
      return
    }
    // console.log(addZero(new Date(piglet?.created_at!)))
    // console.log(newPiglet)
    // return
    Promise.all([
      postPiglets(newPiglet),
      createTasksToDo({id_pig:0,id_pig_stage:newPiglet.id_pig_stage,id_user:user?.id_user!,id_lot_piglets:newPiglet.id_lot_piglets,id_farm:newPiglet.id_farm,added_date:addZero(new Date(piglet?.created_at!))})
    ]).then(res=>{
      toggleModal()
      })

  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          size="small"
          label='Etapa'
          fullWidth
          defaultValue={values.id_pig_stage}
          {...register('id_pig_stage')} 
          select >
          {
            pigStages.length
            ?pigStages.filter(p=>p.id_pig_type===1).map(item=>(
              <MenuItem 
                key={item.id_pig_stage} 
                value={item.id_pig_stage}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}



