import {  MenuItem, TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useState } from 'react'
import { UiContext } from '@/app/context/ui/UiContext'
import { DatePickerElement, SaveButton } from '@/app/components'
import { IBirth, IPig } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { AuthContext } from '@/app/context/auth/AuthContext'
import { addZero, buildDateReverse } from '@/utils'


export const UpdateConfirmForm = () => {
  const {toggleModal} = useContext(UiContext)
  const {user} = useContext(AuthContext)
  const {birth,birthTypes,farmsLoading,postPig,pig,postBirth,createTasksToDo,farmAction} = useContext(FarmsContext)
  const [comment, setComment] = useState('')
  const [birthType, setBirthType] = useState(birthTypes[0].id_birth_type)
  const [date, setDate] = useState<Date | null>(new Date(buildDateReverse(birth?.confirm_date! as string)))

  const onSubmit=async(e:SyntheticEvent)=>{
    e.preventDefault()

    const newBirth={
      ...birth,
      id_birth_type:birthType,
      comment,
      confirm_date:addZero(date!),
      id_user_confirm:user?.id_user!,
    } as IBirth
    
    const is_normal=Number(newBirth.id_birth_type)===1
    
    if(farmAction==='PREGNED' &&is_normal){
      newBirth.is_positive=true
    }
    const newPig={
      ...pig,
      id_pig_stage:is_normal?farmAction==='PREGNED'?5:4:2
    } as IPig

    Promise.all([
      postPig(newPig),
      postBirth(newBirth),
      is_normal&& createTasksToDo({id_pig:newPig.id_pig,id_pig_stage:newPig.id_pig_stage,id_user:user?.id_user!,id_lot_piglets:0,id_farm:newPig.id_farm,added_date:newBirth.confirm_date as string})
    ])
      .then(res=>{
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
        fullWidth
        label='Comentarios'
        type="text"
        value={comment}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          setComment(e.target.value)
        }}
        />
        <TextField
          size="small"
          label='Tipo'
          fullWidth
          value={birthType}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          setBirthType(+e.target.value)
        }}
          select >
          {
            birthTypes.length
            ?birthTypes.map(item=>(
              <MenuItem 
                key={item.id_birth_type} 
                value={item.id_birth_type}>
                {item.description}
              </MenuItem>
            ))
            :<div></div>
          }
        </TextField>
        <div style={{display:'flex',justifyContent:'flex-end', gap:'.5rem'}}>
          <p style={{fontSize:'14px',padding:'.5rem 0 0 0'}}>Fecha confirma</p>
          <DatePickerElement date={date} setDate={setDate}/>
        </div>
        <SaveButton loading={farmsLoading}/>
    </form>
  )
}
