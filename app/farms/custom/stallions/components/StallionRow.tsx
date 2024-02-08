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
      <div style={{display:'flex',gap:'.5rem'}}>
        <p>{stallion.name}</p>
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
