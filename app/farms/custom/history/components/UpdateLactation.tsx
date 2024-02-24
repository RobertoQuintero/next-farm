
import {  MenuItem, TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useState } from 'react'
import { UiContext } from '@/app/context/ui/UiContext'
import { SaveButton } from '@/app/components'
import { IBirth, IPig } from '@/interfaces'
import { FarmsContext } from '@/app/context/farms/FarmsContext'

export const UpdateLactation = () => {
  const {toggleModal} = useContext(UiContext)
  const {pig,pigStages,farmsLoading,postPig,births,postBirth} = useContext(FarmsContext)
  const [pigStage, setPigStage] = useState(pig?.id_pig_stage)

  const stages= pigStages.filter(p=>p.id_pig_type===3&&p.id_pig_stage===2||p.id_pig_stage===6)

  const onSubmit=async(e:SyntheticEvent)=>{
    e.preventDefault()
    const newPig={
      ...pig,
      id_pig_stage:pigStage
    } as IPig
    if(newPig.id_pig_stage===6){
      toggleModal()
      return
    }

    const newBirth={
      ...births[births.length-1],
      closed:true
    } as IBirth

    Promise.all([
      postPig(newPig),
      postBirth(newBirth)
    ])
    .then(resp=>{
      toggleModal()
    })
    
  }

  return (
    <form className='Form' onSubmit={onSubmit}>
      
        <TextField
          size="small"
          label='Valor'
          fullWidth
          value={pigStage}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setPigStage(+e.target.value)
          }} 
          select >
          {
            stages.length
            ?stages.map(item=>(
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
