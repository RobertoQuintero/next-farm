import { IStage } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'

interface Props{
  stage:IStage
}

export const StageRow = ({stage}:Props) => {
  const {setStage,setFarmAction} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = async(action:string) =>{
     setFarmAction(action)
     setStage(stage)
     toggleModal()
  };

  return (
    <div className='rowCard' style={{fontSize:'14px'}}>
      <div style={{display:'flex'}}>
        <p style={{width:'150px'}}>{stage.description}</p>
        <p style={{width:'100px'}}>
          {
            stage.max_weight
              ?`${stage.min_weight} a ${stage.max_weight} Kg`
              :``
          }
          </p>
          <p style={{width:'100px'}}>{stage.food_amount.toFixed(3)} kg</p>
      </div>
      <div>
      <RowButton onClick={()=>onClick('EDIT')} label="Editar"/>
      <RowButton onClick={()=>onClick('FORM')} label="Fórmula"/>
      </div>
    </div>
  )
}
