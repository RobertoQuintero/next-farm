import { IGrowingPigs } from '@/interfaces/growing_pigs'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'
import { useRouter } from 'next/navigation'

interface Props{
  growingPig:IGrowingPigs;
  print:boolean;
}

export const GrowingPigCard = ({growingPig,print}:Props) => {
  const {setFarmAction,setGrowingPig,growing_pigs} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const router=useRouter()

  const onClick =(action:string) =>{
     setFarmAction(action)
     setGrowingPig(growingPig)
     if(action==='GO'){
      router.push('/farms/custom/history_growing_pigs')
      return
     }
     toggleModal()
  };

  return (
    <div className={`rowCard ${print&&'odd'}`}>
      <div className="pigData">
        <p>{new Date(growingPig.start_date).toLocaleString().split(',')[0]}</p>
        <p>{new Date(growingPig.exit_date).toLocaleString().split(',')[0]}</p>
        <p style={{width:'130px'}}>{growingPig.ubication}</p>
        <p onClick={()=>growing_pigs.length>1?onClick('MOVE'):{}} className='underlined'>{growingPig.quantity}</p>
        <p>{growingPig.average_weight}</p>
        <p className='underlined' onClick={()=>onClick('STAGE')}>{growingPig.pig_stage}</p>
      </div>
      <div style={{display:print?'none':'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('GO')} label="ver"/>
        <RowButton onClick={()=>onClick('CLOSE')} label="termina"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color='red'/>
      </div>
    </div>
  )
}
