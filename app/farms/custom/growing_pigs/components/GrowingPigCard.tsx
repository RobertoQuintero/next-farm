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
  const {setFarmAction,setGrowingPig,growing_pigs,setPiglet,setPig} = useContext(FarmsContext)
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

  const onLoss = () =>{
   setPig(undefined)
   setPiglet(undefined)
    setGrowingPig(growingPig)
     setFarmAction('LOSS')
     toggleModal()
  };

  return (
    <div className={`rowCard ${print&&'odd'}`}>
      <div className="pigData">
        <p style={{width:'80px'}}>{new Date(growingPig.start_date).toLocaleString().split(',')[0]}</p>
        <p style={{width:'80px'}}>{new Date(growingPig.exit_date).toLocaleString().split(',')[0]}</p>
        <p style={{width:'130px'}}>{growingPig.ubication}</p>
        <p style={{width:'80px'}} onClick={()=>growing_pigs.length>1?onClick('MOVE'):{}} className='underlined'>{growingPig.quantity}</p>
        <p style={{width:'80px'}}>{growingPig.average_weight}</p>
        <p style={{width:'90px'}} className='underlined' onClick={()=>onClick('STAGE')}>{growingPig.pig_stage}</p>
        <p style={{width:'90px',textAlign:'center',cursor:'pointer'}} onClick={onLoss}>-</p>
      </div>
      <div style={{display:print?'none':'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('GO')} label="ver"/>
        <RowButton onClick={()=>onClick('CLOSE')} label="termina"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color='red'/>
      </div>
    </div>
  )
}
