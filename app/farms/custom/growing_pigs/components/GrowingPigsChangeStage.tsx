import { SaveButton } from '@/app/components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { IGrowingPigs } from '@/interfaces/growing_pigs'
import { MenuItem, TextField } from '@mui/material'
import React, { SyntheticEvent, useContext, useState } from 'react'

export const GrowingPigsChangeStage = () => {
  const {toggleModal} = useContext(UiContext)
  const {growing_pig,pigStages,farmsLoading,postGrowingPigs} = useContext(FarmsContext)
  const [stage, setStage] = useState(growing_pig?.id_pig_stage)

  const onSubmit = async(e:SyntheticEvent) =>{
    e.preventDefault()
    if(growing_pig?.id_pig_stage===Number(stage)){
      toggleModal()
      return
    }
    const growing={
      ...growing_pig,
      id_pig_stage:stage
     } as IGrowingPigs

     const ok= await postGrowingPigs(growing)
     if(ok){
      toggleModal()
     }
  };

  return (
    <form className='Form' style={{width:'270px'}} onSubmit={onSubmit}>
      <TextField
          size="small"
          label='Etapa'
          value={stage}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setStage(+e.target.value)
          }}
          select >
          {
            pigStages.length
            ?pigStages.filter(p=>p.id_pig_type===2).map(item=>(
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
