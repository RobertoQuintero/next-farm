import {  MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { IUbication } from '@/interfaces'

export const MoveGrowingPig = () => {
  const {toggleModal} = useContext(UiContext)
  const {ubications,growing_pigs,growing_pig} = useContext(FarmsContext)

  // const newUbications = () =>{
  //   const array=[] as IUbication[]
  //   for (const p of growing_pigs) {
  //     if(!growing_pigs.find(a=>a.id_ubication===p.id_ubication)){
  //         array.push(p)
  //     }
  //   }
  //   if(piglet){
  //     array.push(ubications.find(u=>u.id_ubication===piglet.id_ubication)!)
  //   }
  //   return array
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGrowingPigs>()

  const values={

  } as IGrowingPigs


  const onSubmit=async(data:IGrowingPigs)=>{
    console.log(data)
    // const ok= await post(data)
    // if(ok){
    //   toggleModal()
    // }
  }
  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Nombre'
        type="text"
        defaultValue={values.quantity}
        {...register('quantity',{
          required:'Este campo es requerido',
        })}
        
        />
        {/* <TextField
          size="small"
          label='Valor'
          fullWidth
          defaultValue={values.id_ubication}
          {...register('id_ubication')} 
          select >
          {
            arr.length
            ?arr.map(item=>(
              <MenuItem 
                key={item.id_ubication} 
                value={item.id_ubication}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <SaveButton loading={}/> */}
    </form>
  )
}
