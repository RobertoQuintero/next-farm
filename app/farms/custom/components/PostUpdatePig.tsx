import { DatePickerElement, SaveButton } from '@/app/components'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IPig } from '@/interfaces'
import {  MenuItem, TextField } from '@mui/material'
import React, { useContext, useState} from 'react'
import { useForm } from "react-hook-form"

export const PostUpdatePig = () => {
  const {idFarm} = useContext(AuthContext)
  const {toggleModal} = useContext(UiContext)
  const {farmsLoading,ubications,races,pig,postPig,stallions,getCode,code,weightTypes} = useContext(FarmsContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPig>()

  const values={
    id_pig:pig?pig.id_pig:0,
    id_pig_type:3,
    id_ubication:pig?pig.id_ubication:ubications[0]?.id_ubication,
    id_race:pig?pig.id_race:races[0]?.id_race,
    code:pig?pig.code:code,
    added_date:pig?new Date(pig.added_date):new Date(),
    visible:pig?pig.visible:true,
    id_farm:pig?pig.id_farm:idFarm,
    status:pig?pig.status:true,
    id_stallion:pig?pig.id_stallion:stallions[0].id_stallion,
    id_weight_type:pig?pig.id_weight_type:weightTypes[1].id_weight_type
  } as IPig

  const [addedDate, setAddedDate] = useState<Date | null>(new Date(values.added_date))
  const [newCode, setNewCode] = useState(values.code)
  const [submit, setSubmit] = useState(false)

  const onSubmit=async(data:IPig)=>{
    data.id_pig=values.id_pig
    data.status=values.status
    data.id_farm=values.id_farm
    data.added_date=values.added_date
    data.visible=values.visible
    data.id_pig_type=values.id_pig_type
    data.created_at=new Date()
    data.id_stage_type=pig?pig?.id_stage_type!:9
    data.code=newCode
    setSubmit(true)
    const ok=await postPig(data)
    if(ok){
      toggleModal()
      setSubmit(false)
      getCode()
    }
  }

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)}>
      {
        pig
        ?<></>
        :<TextField 
        size="small"
        fullWidth
        label='Código'
        type="text"
        value={newCode}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          setNewCode(e.target.value)
        }}
        error={!newCode?.length&&submit}
        helperText={!newCode?.length&&submit&&'Es obligatorio'}
        />
      }
        <TextField
          size="small"
          label='Padre'
          fullWidth
          defaultValue={values.id_stallion}
            {...register('id_stallion')} 
          select >
          {
            stallions.length
            ?stallions.map(item=>(
              <MenuItem 
                key={item.id_stallion} 
                value={item.id_stallion}>
                {item.name}
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
        <TextField
          size="small"
          label='Peso'
          fullWidth
          defaultValue={values.id_weight_type}
          {...register('id_weight_type')} 
          select >
          {
            weightTypes.length
            ?weightTypes.map(item=>(
              <MenuItem 
                key={item.id_weight_type} 
                value={item.id_weight_type}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        {
          pig
            ?<></>
            :<div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
                <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha ingreso</p>
              <DatePickerElement date={addedDate} setDate={setAddedDate}/>
              </div>
        }
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
