import { IGrowingPigs } from '@/interfaces/growing_pigs'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'

interface Props{
  growingPig:IGrowingPigs;
  print:boolean;
}

export const GrowingPigCard = ({growingPig,print}:Props) => {
  const {setFarmAction,setGrowingPig} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)

  const onClick =(action:string) =>{
     setFarmAction(action)
     setGrowingPig(growingPig)
     toggleModal()
  };

  return (
    <div className={`rowCard ${print&&'odd'}`}>
      <div className="pigData">
        <p>{new Date(growingPig.start_date).toLocaleString().split(',')[0]}</p>
        <p>{new Date(growingPig.exit_date).toLocaleString().split(',')[0]}</p>
        <p>{growingPig.ubication}</p>
        <p>{growingPig.quantity}</p>
        <p>{growingPig.average_weight}</p>
        <p className='underlined' onClick={()=>onClick('STAGE')}>{growingPig.pig_stage}</p>
      </div>
      <div style={{display:print?'none':'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('CLOSE')} label="cerrar"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color='red'/>
      </div>
    </div>
  )
}
