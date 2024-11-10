import { IStallion } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
import { UiContext } from '@/app/context/ui/UiContext'

interface Props{
  stallion:IStallion
}

export const StallionRow = ({stallion}:Props) => {
  const {setFarmAction,setStallion} = useContext(FarmsContext)
  const {toggleModal} = useContext(UiContext)
  const onClick = (action:string) =>{
    setFarmAction(action)
    setStallion(stallion)
    toggleModal()
  };
  
  return (
    <div className='rowCard'>
      <div style={{display:'flex',fontSize:'14px'}}>
        <p style={{width:'100px',wordWrap:'break-word'}}>{stallion.name.replaceAll('/',' / ')}</p>
        <p style={{width:'100px'}}>{stallion.total_alive}</p>
        <p style={{width:'100px'}}>{stallion.total_effective}</p>
        <p style={{width:'100px'}}>{stallion.false_charge}</p>
        <p style={{width:'100px'}}>{stallion.is_mix?'Mezcla':'Normal'}</p>

      </div>
      <div>
      <div style={{display:'flex', gap:'.2rem',paddingRight:'.5rem'}}>
        <RowButton onClick={()=>onClick('EDIT')} label="editar"/>
        <RowButton onClick={()=>onClick('DELETE')} label="borrar" color='red'/>
      </div>
      </div>
    </div>
  )
}
