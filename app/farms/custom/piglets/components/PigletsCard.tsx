import { IPiglets } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { useUi } from '@/app/context/ui/useUi'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface Props{
  piglet:IPiglets;
  print:boolean;
}

export const PigletsCard = ({piglet,print}:Props) => {
  const {toggleModal}= useUi()
  const {setFarmAction,setPiglet,setPig,setGrowingPig} = useContext(FarmsContext)
  const router= useRouter()

  const onClick = (action:string) =>{
    setPiglet(piglet)
    setPig(undefined)
    if(action==='GO'){
      Cookies.set('piglet',JSON.stringify(piglet))
      router.push('/farms/custom/history_piglets')
    }else{
      setFarmAction(action)
      toggleModal()
    }
  };

  const onLoss = () =>{
    setPig(undefined)
    setGrowingPig(undefined)
     setPiglet(piglet)
     setFarmAction('LOSS')
     toggleModal()
  };

  return (
    <div className={`rowCard ${print&&'odd'}`} style={{fontSize:'14px'}}>
      <div style={{display:'flex'}}>
        <p style={{width:'100px'}}>{new Date(piglet.created_at).toLocaleString().split(',')[0]}</p>
        <p style={{width:'50px'}}>{piglet.days}</p>
        <p style={{width:'100px'}}>{piglet.ubication}</p>
        <p onClick={()=>onClick('EDIT')}  style={{width:'70px'}} className='underlined'>{piglet.quantity}</p>
        <p style={{width:'70px'}}>{piglet.stage}</p>
        <p style={{width:'70px',textAlign:'center',cursor:'pointer'}} onClick={onLoss}>-</p>
      </div>
      <div style={{display:print?'none':'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('GO')} label="ver"/>
        <RowButton onClick={()=>onClick('CLOSE')} label="termina"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color='red'/>
      </div>
    </div>
  )
}
