import { IAnswer } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'

interface Props{
  answer:IAnswer
}

export const AnswerRow = ({answer}:Props) => {
  const {setFarmAction,setAnswer} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = (action:string) =>{
    setFarmAction(action)
    setAnswer(answer)
    toggleModal()   
  };

  return (
    <div style={{display:'flex',justifyContent:'space-between'}} className='hover' >
      <p>{answer.description}</p>
      <div style={{display:'flex'}}>
        <RowButton onClick={()=>onClick('EDIT-ANSWER')} label="editar"/>
        <RowButton onClick={()=>onClick('DELETE-ANSWER')} label="borrar" color="red"/>
      </div>
    </div>
  )
}
