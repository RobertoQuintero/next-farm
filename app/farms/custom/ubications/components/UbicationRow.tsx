import { IUbication } from '@/interfaces'
import React, { useContext } from 'react'
import { RowButton } from '../../components'
import { UiContext } from '@/app/context/ui/UiContext'
import { FarmsContext } from '@/app/context/farms/FarmsContext'
interface Props{
  ubication:IUbication
}
export const UbicationRow = ({ubication}:Props) => {
  const {toggleModal} = useContext(UiContext)
  const {setUbication,setFarmAction} = useContext(FarmsContext)

  const onClick = (action:string) =>{
    setUbication(ubication)
     setFarmAction(action)
     toggleModal()
  };

  return (
    <div className='rowCard'>
      <div className='ubicationRow'>
        <p>{new Date(ubication.updated_at).toLocaleString().split(',')[0]}</p>
        <p>{ubication.pig_type}</p>
        <p>{ubication.description}</p>
      </div>
      <div style={{display:'flex',alignItems:'center', gap:'.5rem'}}>
      <RowButton onClick={()=>onClick('OPEN')} label="ver"/>
      <RowButton onClick={()=>onClick('DELETE')} label="Borrar" color='red'/>
      </div>
    </div>
  )
}
