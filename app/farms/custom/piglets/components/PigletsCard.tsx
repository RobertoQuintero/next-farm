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
  const {setFarmAction,setPiglet} = useContext(FarmsContext)
  const router= useRouter()

  const onClick = (action:string) =>{
    setPiglet(piglet)
    if(action==='GO'){
      Cookies.set('piglet',JSON.stringify(piglet))
      router.push('/farms/custom/history_piglets')
    }else{
      setFarmAction(action)
      toggleModal()
    }
  };

  return (
    <div className={`rowCard ${print&&'odd'}`} style={{fontSize:'14px'}}>
      <div style={{display:'flex'}}>
        <p style={{width:'100px'}}>{new Date(piglet.created_at).toLocaleString().split(',')[0]}</p>
        <p style={{width:'50px'}}>{piglet.days}</p>
        <p style={{width:'100px'}}>{piglet.ubication}</p>
        <p style={{width:'70px'}}>{piglet.quantity}</p>
        <p style={{width:'70px'}}>{piglet.stage}</p>
      </div>
      <div style={{display:print?'none':'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('GO')} label="ver"/>
        <RowButton onClick={()=>onClick('CLOSE')} label="cerrar"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color='red'/>
      </div>
    </div>
  )
}
