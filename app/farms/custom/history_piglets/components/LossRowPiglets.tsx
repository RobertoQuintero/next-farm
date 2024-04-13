import React, { useContext, useEffect} from 'react'
import { FarmsContext } from '@/app/context/farms/FarmsContext';
import { Button } from '@mui/material';
import { AccordionElement } from '@/app/components';
import { useUi } from '@/app/context/ui/useUi';
import { ILoss } from '@/interfaces';
import { LossRowElement } from './LossRowElement';

export const LossRowPiglets = () => {
  const {getLosses,piglet,losses} = useContext(FarmsContext)


  // const onClick =(action:string) =>{
  //    setFarmAction(action)
  //    setPiglet(piglet)
  //    setGrowingPig(undefined)
  //    setPig(undefined)
  //    toggleModal()
  // };
  useEffect(() => {
    getLosses({id_lot_piglets:piglet?.id_lot_piglets!,id_growing_lot:0,id_pig:0} as ILoss)
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
