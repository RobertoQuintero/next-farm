import React, { useContext} from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material';

import { AccordionElement } from '@/app/components';
import { useUi } from '@/app/context/ui/useUi';

export const InfoRow = () => {
  const {setFarmAction,setPiglet,growing_pig,setPig} = useContext(FarmsContext)
  const {toggleModal} = useUi()

  const onClick =(action:string) =>{
     setFarmAction(action)
     setPig(undefined)
     setPiglet(undefined)
     toggleModal()
  };

  return (
    <AccordionElement title='Información' open>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{fontSize:'15px'}}>
          <p>Ingresado: <strong>{new Date(growing_pig?.created_at!).toLocaleString().split(',')[0]}</strong></p>
          <p>Salida: <strong>{new Date(growing_pig?.exit_date!).toLocaleString().split(',')[0]}</strong></p>
          <p>Ubicación: <strong>{growing_pig?.ubication}</strong></p>
          <p>Cantidad: <strong>{growing_pig?.quantity}</strong></p>
          <p>Peso promedio: <strong>{growing_pig?.average_weight} kg</strong></p>
          <p>Etapa: <strong>{growing_pig?.pig_stage}</strong></p>     
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'.5rem'}}>
          {/* <Button size='small' color='warning' onClick={()=>onClick('EDIT')} variant='contained'>Editar</Button> */}
          <Button size='small' onClick={()=>onClick('LOSS')} variant='outlined'>Baja</Button>
        </div>
      </div>
    </AccordionElement>
  )
}
