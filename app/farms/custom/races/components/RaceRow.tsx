import { IRace } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'

interface Props{
  race:IRace
}

export const RaceRow = ({race}:Props) => {
  const {setFarmAction,setRace} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick = (action:string) =>{
     setFarmAction(action)
     setRace(race)
     toggleModal()
  };

  return (
    <div className='rowCard'>
      <p>{race.description}</p>
      <div style={{display:'flex',alignItems:'center', gap:'.5rem'}}>
        <RowButton onClick={()=>onClick('EDIT')} label="Editar"/>
        <RowButton onClick={()=>onClick('DELETE')} label="Borrar" color='red'/>
      </div>
    </div>
  )
}
