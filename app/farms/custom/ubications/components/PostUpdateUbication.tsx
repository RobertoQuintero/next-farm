import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IUbication } from '@/interfaces'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdateUbication = () => {
  const {ubication,pigTypes,farmsLoading,idFarm,postUbication} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUbication>()

  const values={
    id_ubication:ubication?ubication.id_ubication:0,
    id_pig_type:ubication?ubication.id_pig_type:'3',
    description:ubication?ubication.description:'',
    status:ubication?ubication.status:true,
    id_farm:ubication?ubication.id_farm:Number(localStorage.getItem('id_farm'))
  } as IUbication


  const onSubmit=async(data:IUbication)=>{
    const date = new Date()
    data.id_ubication=values.id_ubication
    data.updated_at=date
    data.created_at=date
    data.status=values.status
    data.id_farm=values.id_farm
    console.log(data)
    // return

    const ok= await postUbication(data)
    if(ok){
      toggleModal()
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        size="small"
        fullWidth
        label='Descripción'
        type="text"
        defaultValue={values.description}
        {...register('description',{
          required:'Este campo es requerido',
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
        />
        <TextField
          size="small"
          label='Tipo'
          fullWidth
          defaultValue={values.id_pig_type}
          {...register('id_pig_type')} 
          select >
          {
            pigTypes.length
            ?pigTypes.map(item=>(
              <MenuItem 
                key={item.id_pig_type} 
                value={item.id_pig_type}>
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
                :'Guardar'
            }
      </Button>
    </form>
  )
}
