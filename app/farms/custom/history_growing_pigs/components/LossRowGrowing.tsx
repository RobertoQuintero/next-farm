import React, { useContext, useEffect} from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material';
import { AccordionElement } from '@/app/components';
import { useUi } from '@/app/context/ui/useUi';
import { ILoss } from '@/interfaces';
import { LossRowElement } from './LossRowElement';

export const LossRowGrowing = () => {
  const {getLosses,losses,growing_pig} = useContext(FarmsContext)

  useEffect(() => {
    getLosses({id_lot_piglets:0,id_growing_lot:growing_pig?.id_growing_lot,id_pig:0} as ILoss)
  }, [])
  
  return (
    <AccordionElement title='Bajas'>
      <>
      {
        losses.length
          ?losses.map(l=><LossRowElement element={l} key={l.id_loss}/>)
          :<p style={{fontWeight:'bold',textAlign:'center',paddingTop:'1rem'}}>No hay bajas</p>
      }
      </>
    </AccordionElement>
  )
}
