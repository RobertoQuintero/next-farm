import React, { useContext} from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material';
import { AccordionElement } from '@/app/components';
import { useUi } from '@/app/context/ui/useUi';

export const InfoRowPiglets = () => {
  const {setFarmAction,piglet} = useContext(FarmsContext)
  const {toggleModal} = useUi()

  const onClick =(action:string) =>{
     setFarmAction(action)
     toggleModal()
  };

  
  return (
    <AccordionElement title='Información' open>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{fontSize:'15px'}}>
          <p>Código: <strong>{piglet?.code}</strong></p>
          <p>Ingresado: <strong>{new Date(piglet?.created_at!).toLocaleString().split(',')[0]}</strong></p>
          <p>Ubicación: <strong>{piglet?.ubication}</strong></p>
          <p>Padre: <strong>{piglet?.stallion}</strong></p>
          <p>Cantidad: <strong>{piglet?.quantity}</strong></p>
        </div>
        <div>
          <Button size='small' color='warning' onClick={()=>onClick('EDIT')} variant='contained'>Editar</Button>
        </div>
      </div>
    </AccordionElement>
  )
}
