import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IPig } from '@/interfaces'
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"

export const PostUpdatePig = () => {
  const {idFarm} = useContext(AuthContext)
  const {toggleModal} = useContext(UiContext)
  const {farmsLoading,ubications,pigTypes,races,stages,pig,postPig} = useContext(FarmsContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPig>()

  const values={
    id_pig:pig?pig.id_pig:0,
    id_pig_type:pig?pig.id_pig_type:pigTypes[2].id_pig_type,
    id_ubication:pig?pig.id_ubication:ubications[0].id_ubication,
    id_race:pig?pig.id_race:races[0].id_race,
    code:pig?pig.code:'',
    start_date:pig?new Date(pig.start_date):new Date(),
    visible:pig?pig.visible:true,
    id_farm:pig?pig.id_farm:idFarm,
    id_stage:pig?pig.id_stage:stages[8].id_stage,
    status:pig?pig.status:true,
  } as IPig

  const [pigType, setPigType] = useState(values.id_pig_type)


  const onSubmit=async(data:IPig)=>{
    // console.log(stages)
    // return
    data.id_pig=values.id_pig
    data.status=values.status
    data.id_farm=values.id_farm
    data.start_date=values.start_date
    data.visible=values.visible
    data.id_pig_type=pigType
    const ok=await postPig(data)
    if(ok){
      toggleModal()
    }
  }


  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      {/* <FilterableList data={inputProps}/> */}
      <TextField 
        size="small"
        fullWidth
        label='Código'
        type="text"
        defaultValue={values.code}
        {...register('code',{
          required:'Este campo es requerido',
        })}
        error={!!errors.code}
        helperText={errors.code?.message}
        />
        <TextField
          size="small"
          label='Tipo'
          fullWidth
          value={pigType}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPigType(+event.target.value);
          }}
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
        <TextField
          size="small"
          label='Etapa'
          fullWidth
          defaultValue={values.id_stage}
          {...register('id_stage')} 
          select >
          {
            stages.length
            ?stages.filter(p=>p.id_pig_type===pigType).map(item=>(
              <MenuItem 
                key={item.id_stage} 
                value={item.id_stage}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <TextField
          size="small"
          label='Ubicación'
          fullWidth
          defaultValue={values.id_ubication}
          {...register('id_ubication')} 
          select >
          {
            ubications.length
            ?ubications.map(item=>(
              <MenuItem 
                key={item.id_ubication} 
                value={item.id_ubication}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <TextField
          size="small"
          label='Raza'
          fullWidth
          defaultValue={values.id_race}
          {...register('id_race')} 
          select >
          {
            races.length
            ?races.map(item=>(
              <MenuItem 
                key={item.id_race} 
                value={item.id_race}>
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
