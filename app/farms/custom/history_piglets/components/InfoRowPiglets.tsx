import React, { useContext} from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material';
import { AccordionElement } from '@/app/components';
import { useUi } from '@/app/context/ui/useUi';
import styles from './piglets.module.css'

export const InfoRowPiglets = () => {
  const {setFarmAction,piglet,setPiglet,setPig,setGrowingPig} = useContext(FarmsContext)
  const {toggleModal} = useUi()

  const onClick =(action:string) =>{
     setFarmAction(action)
     setPiglet(piglet)
     setGrowingPig(undefined)
     setPig(undefined)
     toggleModal()
  };

  return (
    <AccordionElement title='Información' open>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{fontSize:'15px'}}>
          <p>Código: <strong>{piglet?.code}</strong></p>
          <p>Ingresado: <strong>{new Date(piglet?.created_at!).toLocaleString().split(',')[0]}</strong></p>
          <p>Ubicación: <strong>{piglet?.ubication}</strong></p>
          <p>Cantidad: <strong>{piglet?.quantity}</strong></p>
          <p >Etapa: <strong className={styles.underline} onClick={()=>{onClick('EDIT')}}>{piglet?.stage}</strong></p>
          <p>Modificó: <strong>{piglet?.user}</strong></p>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'.3rem'}}>
          <Button size='small' onClick={()=>onClick('MOVE')} variant='outlined'>Mover</Button>
          <Button size='small' onClick={()=>onClick('LOSS')} variant='outlined'>Baja</Button>
        </div>
      </div>
    </AccordionElement>
  )
}
