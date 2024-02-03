import { ILossReason } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { UiContext } from '@/app/context/ui/UiContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'

interface Props{
  lossReason:ILossReason
}

export const LossReasonRow = ({lossReason}:Props) => {
  const {toggleModal} = useContext(UiContext)
  const {setLossReason,setFarmAction} = useContext(FarmsContext)

  const onClick = (action:string) =>{
    setLossReason(lossReason)
    setFarmAction(action)
    toggleModal()
  };

  return (
    <div className='rowCard'>
      <div style={{display:'flex'}}>
        <p style={{width:'90px'}}>{new Date(lossReason.updated_at).toLocaleString().split(',')[0]}</p>
        <p>{lossReason.description}</p>
      </div>
      <div>
        <RowButton onClick={()=>onClick('EDIT')} label="editar"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color='red'/>
      </div>
    </div>
  )
}
