import {  MenuItem, TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useState } from 'react'
import { UiContext } from '@/app/context/ui/UiContext'
import { DatePickerElement, SaveButton } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { addZero, buildDate } from '@/utils'
import { AuthContext } from '@/app/context/auth/AuthContext'

export const UpdateCrossingForm = () => {
  const {toggleModal} = useContext(UiContext)
  const {user} = useContext(AuthContext)
  const {stallions,farmsLoading,pig,postCrossingDate,fertilizatinTypes,createTasksToDo} = useContext(FarmsContext)
  const [idStallion, setIdStallion] = useState(stallions[0].id_stallion)
  const [fertilizationType, setFertilizationType] = useState(fertilizatinTypes[0].id_fertilization_type)
  const [date, setDate] = useState<Date | null>(new Date())  

  const onSubmit=async(e:SyntheticEvent)=>{
    e.preventDefault()

    const data= {
      crossing_date:addZero(new Date(buildDate(date!))),
      id_stallion:idStallion,
      id_pig:pig?.id_pig,
      id_user:user?.id_user,
      id_fertilization_type:fertilizationType
    } as {id_stallion:number,crossing_date:string,id_pig:number,id_user:number,id_fertilization_type:number}
 
    Promise.all([
      postCrossingDate(data),
      createTasksToDo({id_pig:pig?.id_pig!,id_pig_stage:3,id_user:user?.id_user!,id_lot_piglets:0,id_farm:pig?.id_farm!,
        added_date:data.crossing_date})
    ]).then(resp=>{
      toggleModal()
    })
    .catch(error=>{
      console.log({error})
    })

  }

  return (
    <form className='Form' onSubmit={onSubmit}>
        <TextField
          size="small"
          label='Semental'
          fullWidth
          value={idStallion}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setIdStallion(+e.target.value)
          }}
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
          label='Tipo'
          fullWidth
          value={fertilizationType}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setFertilizationType(+e.target.value)
          }}
          select >
          {
            fertilizatinTypes.length
            ?fertilizatinTypes.map(item=>(
              <MenuItem 
                key={item.id_fertilization_type} 
                value={item.id_fertilization_type}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
          <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha monta</p>
          <DatePickerElement date={date} setDate={setDate}/>
        </div>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
